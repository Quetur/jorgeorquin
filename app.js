import 'dotenv/config';
import express              from 'express';
import { fileURLToPath }    from 'url';
import { dirname, join }    from 'path';
import { doctor }           from './config/doctor.js';
import indexRouter          from './routes/index.js';
import contactoRouter       from './routes/contacto.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT ?? 3000;

// ── Motor de vistas ──────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// ── Middleware de layout ─────────────────────────────────────
// Envuelve cada vista en views/layouts/main.ejs automáticamente
app.use((req, res, next) => {
  const _render = res.render.bind(res);

  res.render = (view, locals = {}) => {
    _render(view, locals, (err, bodyHtml) => {
      if (err) return next(err);
      _render('layouts/main', { ...locals, body: bodyHtml }, (err2, fullHtml) => {
        if (err2) return next(err2);
        res.send(fullHtml);
      });
    });
  };

  next();
});

// ── Middlewares ──────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// ── Rutas ────────────────────────────────────────────────────
app.use('/', indexRouter);
app.use('/contacto', contactoRouter);

// ── 404 ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada', activePage: '', doctor });
});

// ── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`<h1 style="font-family:sans-serif;padding:40px">Error del servidor</h1><p>${err.message}</p>`);
});

app.listen(PORT, () => console.log(`✅  http://localhost:${PORT}`));

# Dr. Jorge Orquin — Sitio Web

Node.js + Express + EJS + Nodemailer. ES6 con `"type": "module"`.

## Instalación

```bash
npm install
cp .env .env.local   # copiar y editar con credenciales reales
```

## Configurar email (Gmail)

1. **Cuenta Google → Seguridad → Verificación en dos pasos** (activar)
2. **Contraseñas de aplicación** → crear una para "Correo"
3. Pegar la contraseña de 16 chars en `MAIL_PASS` del `.env`

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASS=xxxx-xxxx-xxxx-xxxx
MAIL_TO=jorge.orquin@gmail.com
```

## Ejecutar

```bash
npm run dev    # desarrollo (nodemon)
npm start      # producción
```

Abrir → http://localhost:3000

## Estructura

```
dr-orquin/
├── app.js                   ← Express + middleware de layout automático
├── .env                     ← Variables (NO subir a Git)
├── routes/
│   ├── index.js             ← GET /  y  GET /servicios
│   └── contacto.js          ← GET /contacto  y  POST /contacto + email
├── views/
│   ├── layouts/main.ejs     ← Esqueleto: nav, os-bar, footer
│   ├── home.ejs             ← Hero (grid desktop / foto circular mobile)
│   ├── servicios.ejs        ← Cards de servicios
│   ├── contacto.ejs         ← Mapa + botones + formulario
│   └── 404.ejs
└── public/
    ├── css/style.css        ← Todos los estilos + responsive
    ├── js/main.js           ← Validación formulario (ES6 module)
    └── img/jorge.png
```

## Personalizar datos

Editar el objeto `doctor` en `routes/index.js` y `routes/contacto.js`.

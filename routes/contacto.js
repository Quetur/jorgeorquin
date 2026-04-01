import { Router }   from 'express';
import nodemailer    from 'nodemailer';
import { doctor }   from '../config/doctor.js';

const router = Router();

// ── Transportador SMTP (singleton) ───────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.MAIL_HOST,
  port:   Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ── Templates de email ───────────────────────────────────────
const htmlDoctor = ({ nombre, apellido, telefono, email, motivo, mensaje }) => `
  <h2 style="color:#1A2942;font-family:sans-serif">Nueva solicitud de turno</h2>
  <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
    <tr><td style="padding:10px 14px;font-weight:bold;background:#f5f5f5;width:140px">Nombre</td>
        <td style="padding:10px 14px">${nombre} ${apellido ?? ''}</td></tr>
    <tr><td style="padding:10px 14px;font-weight:bold">Teléfono</td>
        <td style="padding:10px 14px">${telefono}</td></tr>
    <tr><td style="padding:10px 14px;font-weight:bold;background:#f5f5f5">Email</td>
        <td style="padding:10px 14px;background:#f5f5f5">${email ?? '—'}</td></tr>
    <tr><td style="padding:10px 14px;font-weight:bold">Motivo</td>
        <td style="padding:10px 14px">${motivo}</td></tr>
    <tr><td style="padding:10px 14px;font-weight:bold;background:#f5f5f5;vertical-align:top">Mensaje</td>
        <td style="padding:10px 14px;background:#f5f5f5">${mensaje ?? '—'}</td></tr>
  </table>
`;

const htmlPaciente = ({ nombre, telefono }) => `
  <div style="font-family:sans-serif;max-width:500px">
    <h2 style="color:#1A2942">Recibimos tu solicitud, ${nombre}</h2>
    <p style="color:#555">Nos comunicaremos al <strong>${telefono}</strong> para confirmar tu turno.</p>
    <p style="color:#999;font-size:13px;margin-top:24px">
      Dr. ${doctor.nombre} · ${doctor.titulo} · ${doctor.matricula}
    </p>
  </div>
`;

// ── GET /contacto ────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('contacto', {
    title:      'Contacto',
    activePage: 'contacto',
    doctor,
    tipo:       req.query.tipo ?? '',
    success:    false,
    error:      null,
  });
});

// ── POST /contacto ───────────────────────────────────────────
router.post('/', async (req, res) => {
  const { nombre, apellido, telefono, email, motivo, mensaje } = req.body;

  if (!nombre?.trim() || !telefono?.trim() || !motivo?.trim()) {
    return res.render('contacto', {
      title: 'Contacto', activePage: 'contacto', doctor,
      tipo: '', success: false,
      error: 'Completá los campos obligatorios: nombre, teléfono y motivo.',
    });
  }

  try {
    await transporter.sendMail({
      from:    `"Web Dr. Orquin" <${process.env.MAIL_USER}>`,
      to:      process.env.MAIL_TO,
      subject: `Nuevo turno: ${nombre} ${apellido ?? ''} — ${motivo}`,
      html:    htmlDoctor({ nombre, apellido, telefono, email, motivo, mensaje }),
    });

    if (email?.trim()) {
      await transporter.sendMail({
        from:    `"Dr. ${doctor.nombre}" <${process.env.MAIL_USER}>`,
        to:      email,
        subject: 'Recibimos tu solicitud de turno',
        html:    htmlPaciente({ nombre, telefono }),
      });
    }

    res.render('contacto', {
      title: 'Contacto', activePage: 'contacto', doctor,
      tipo: '', success: true, error: null,
    });

  } catch (err) {
    console.error('Nodemailer:', err.message);
    res.render('contacto', {
      title: 'Contacto', activePage: 'contacto', doctor,
      tipo: '', success: false,
      error: 'Hubo un problema al enviar. Intentá más tarde o llamanos directamente.',
    });
  }
});

export default router;

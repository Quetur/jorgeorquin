// Fuente única de verdad para los datos del consultorio.
// Cambiar acá se propaga a todas las rutas y vistas.

export const doctor = {
  nombre:        'Jorge Orquin',
  titulo:        'Gerontólogo · Médico Especialista',
  matricula:     '',
  ciudad:        'Buenos Aires',
  telefono:      '+54 11 2680-1454',
  whatsapp:      '541126801454',
  direccion:     'Chacabuco 351 entre Colón, Avellaneda y, B1722 Merlo, Provincia de Buenos Aires',
  horarios:      'Consultar disponibilidad',
  obrasSociales: [],
};

export const servicios = [
  {
    icono:      '📅',
    colorClass: 'green',
    titulo:     '¿Necesita\nuna cita?',
    descripcion:'Cuidando tu salud, celebrando tu historia y verdadera experiencia de vida.',
    btnTexto:   '📋 Pedir turno',
    btnClase:   '',
    href:       '/contacto',
  },
  /*
  {
    icono:      '🏠',
    colorClass: 'blue',
    titulo:     '¿Consulta a\ndomicilio?',
    descripcion:'Atención médica geriátrica en la comodidad de tu hogar. Agenda una visita hoy.',
    btnTexto:   '🚗 Solicitar visita ()',
    btnClase:   'outline',
    href:       '/contacto?tipo=domicilio',
  },
  */
];

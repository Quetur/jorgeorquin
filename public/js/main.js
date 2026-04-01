// ── Validación del formulario de contacto ────────────────────
const form = document.querySelector('.form-contacto');

if (form) {
  const requeridos = ['nombre', 'telefono', 'motivo'];

  form.addEventListener('submit', (e) => {
    let valido = true;

    requeridos.forEach((id) => {
      const campo = form.querySelector(`#${id}`);
      if (!campo) return;

      if (!campo.value.trim()) {
        campo.style.borderColor = '#ff8080';
        valido = false;
      } else {
        campo.style.borderColor = '';
      }
    });

    if (!valido) {
      e.preventDefault();
      const primero = form.querySelector('[style*="ff8080"]');
      primero?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      primero?.focus();
    }
  });

  // Quitar borde rojo al empezar a corregir
  form.querySelectorAll('input, select, textarea').forEach((campo) => {
    campo.addEventListener('input', () => {
      campo.style.borderColor = '';
    });
  });
}

// ── Scroll suave para anclas internas ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

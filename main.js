/* ============================================================
   JORGE RAÚL VALENCIA SANTOS — Portfolio Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. CURSOR PERSONALIZADO ────────────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = (mouseX - 6) + 'px';
    cursor.style.top  = (mouseY - 6) + 'px';
  });

  // El anillo sigue al cursor con un pequeño lag
  function animateRing() {
    ringX += (mouseX - ringX - 20) * 0.12;
    ringY += (mouseY - ringY - 20) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Efecto hover en elementos interactivos
  const interactiveEls = document.querySelectorAll(
    'a, button, .skill-card, .cert-card, .repo-card, .soft-card'
  );
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });


  // ── 2. REVEAL AL HACER SCROLL (Intersection Observer) ──────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.reveal, .timeline-item, .skill-card')
    .forEach((el) => revealObserver.observe(el));


  // ── 3. NAVEGACIÓN SUAVE (smooth scroll) ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ── 4. NAVBAR: ocultar/mostrar al hacer scroll ─────────────
  let lastScrollY = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Bajando → ocultar nav
      nav.style.transform = 'translateY(-100%)';
      nav.style.transition = 'transform 0.35s ease';
    } else {
      // Subiendo → mostrar nav
      nav.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  });

});

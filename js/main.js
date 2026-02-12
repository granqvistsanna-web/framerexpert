/* ============================================
   MAIN.JS — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Animations (IntersectionObserver) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Stagger siblings within same parent
  const sections = document.querySelectorAll('.hero__content, .section__header, .portfolio__grid, .services__grid, .contact__inner');
  sections.forEach((section) => {
    const items = section.querySelectorAll(':scope > .animate-in');
    items.forEach((el, index) => {
      el.style.setProperty('--delay', `${index * 120}ms`);
    });
  });

  document.querySelectorAll('.animate-in').forEach((el) => {
    observer.observe(el);
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      // Close mobile menu
      document.body.classList.remove('menu-open');
    });
  });

  // --- Nav Scroll Effect ---
  const nav = document.getElementById('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // --- Mobile Hamburger ---
  const hamburger = document.getElementById('navHamburger');
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      document.body.classList.remove('menu-open');
    }
  });

});

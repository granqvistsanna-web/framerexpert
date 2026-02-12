document.addEventListener('DOMContentLoaded', () => {

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const parents = document.querySelectorAll('.hero__content, .section__header, .articles__grid, .topics__grid, .contact__inner, .about__inner, .newsletter__inner, .blog-grid, .blog-post__header');
  parents.forEach((parent) => {
    const items = parent.querySelectorAll(':scope > .animate-in');
    items.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 80}ms`);
    });
  });

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
      document.body.classList.remove('menu-open');
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('navHamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
  });

});

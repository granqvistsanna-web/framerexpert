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

  const parents = document.querySelectorAll('.hero__content, .cards-grid, .blog-grid, .blog-post__header, .blog-post__related-grid');
  parents.forEach((parent) => {
    const items = parent.querySelectorAll(':scope > .animate-in');
    items.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 80}ms`);
    });
  });

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));

});

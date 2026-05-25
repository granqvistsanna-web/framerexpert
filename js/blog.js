document.addEventListener('DOMContentLoaded', () => {

  const filterContainer = document.getElementById('blogFilter');
  const blogGrid = document.getElementById('blogGrid');

  if (!filterContainer || !blogGrid) return;

  const buttons = filterContainer.querySelectorAll('button');
  const cards = blogGrid.querySelectorAll('.card');

  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const initialQuery = (urlParams.get('q') || '').trim().toLowerCase();

  let currentCategory = initialCategory;
  let currentQuery = initialQuery;

  function applyFilters() {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.category === currentCategory;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
      const matchesQuery = currentQuery === '' || card.textContent.toLowerCase().includes(currentQuery);
      card.style.display = matchesCategory && matchesQuery ? '' : 'none';
    });
  }

  applyFilters();

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      applyFilters();
      const url = new URL(window.location);
      if (currentCategory === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', currentCategory);
      }
      history.replaceState(null, '', url);
    });
  });

});

document.addEventListener('DOMContentLoaded', () => {

  const filterContainer = document.getElementById('blogFilter');
  const blogGrid = document.getElementById('blogGrid');

  if (!filterContainer || !blogGrid) return;

  const buttons = filterContainer.querySelectorAll('button');
  const cards = blogGrid.querySelectorAll('.card');

  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';

  function filterByCategory(category) {
    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.category === category);
    });

    cards.forEach((card) => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterByCategory(initialCategory);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterByCategory(category);
      const url = new URL(window.location);
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      history.replaceState(null, '', url);
    });
  });

});

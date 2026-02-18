const { escapeHtml } = require('./notion-to-html');
const { mapTagToCategory } = require('./generate-post');
const fs = require('fs');
const path = require('path');

const BLOG_INDEX = path.join(__dirname, '..', 'blog', 'index.html');

function generateArticleCard(post) {
  const category = mapTagToCategory(post.tags);
  const coverHtml = post.cover_image
    ? `<img src="${escapeHtml(post.cover_image)}" alt="${escapeHtml(post.title)}" loading="lazy">`
    : `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`;

  const placeholderClass = post.cover_image ? '' : `
        <div class="article-card__placeholder">
          ${coverHtml}
        </div>`;

  const imageInner = post.cover_image
    ? `\n        ${coverHtml}\n      `
    : `${placeholderClass}\n      `;

  return `    <a href="/blog/${post.slug}.html" class="article-card" data-category="${escapeHtml(category)}" data-source="notion">
      <div class="article-card__image">${imageInner}</div>
      <p class="card__text"><strong class="article-card__title">${escapeHtml(post.title)}</strong> — <span class="article-card__excerpt">${escapeHtml(post.description)}</span></p>
    </a>`;
}

function updateBlogIndex(posts) {
  let html = fs.readFileSync(BLOG_INDEX, 'utf-8');

  // Remove previously generated Notion cards (marked with data-source="notion")
  html = html.replace(/\s*<a href="[^"]*" class="article-card" data-category="[^"]*" data-source="notion">[\s\S]*?<\/a>/g, '');

  // Generate new cards
  const newCards = posts.map(generateArticleCard).join('\n\n');

  // Insert before the closing </div> of #blogGrid
  html = html.replace(
    /(<div class="blog-grid blog-section container" id="blogGrid">[\s\S]*?)(  <\/div>\s*\n\s*<!-- FOOTER -->)/,
    `$1\n${newCards}\n  $2`
  );

  fs.writeFileSync(BLOG_INDEX, html);
  console.log(`Updated blog/index.html with ${posts.length} Notion posts.`);
}

module.exports = { updateBlogIndex };

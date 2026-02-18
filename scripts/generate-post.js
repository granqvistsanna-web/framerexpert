const { blocksToHtml, escapeHtml } = require('./notion-to-html');

function estimateReadTime(blocks) {
  let wordCount = 0;
  for (const block of blocks) {
    const textArrayKey = block.type;
    const data = block[textArrayKey];
    if (data && data.rich_text) {
      const text = data.rich_text.map(t => t.plain_text).join('');
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
    if (block.children) {
      wordCount += estimateReadTime(block.children);
    }
  }
  return wordCount;
}

function formatDateSv(dateStr) {
  if (!dateStr) return '';
  const months = [
    'januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december'
  ];
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function mapTagToCategory(tags) {
  if (!tags || !tags.length) return 'getting-started';
  const tag = tags[0].toLowerCase();
  const map = {
    'getting started': 'getting-started',
    'kom igång': 'getting-started',
    'comparison': 'comparison',
    'jämförelse': 'comparison',
    'tips': 'tips',
    'seo': 'seo',
    'cms': 'cms',
  };
  return map[tag] || tag.replace(/\s+/g, '-').toLowerCase();
}

function generatePostHtml(post) {
  const content = blocksToHtml(post.blocks);
  const wordCount = estimateReadTime(post.blocks);
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const category = mapTagToCategory(post.tags);
  const categoryLabel = post.tags.length ? post.tags[0] : 'Artikel';
  const dateFormatted = formatDateSv(post.published);
  const canonicalUrl = post.canonical_url || `https://framerexpert.se/blog/${post.slug}.html`;

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} — FramerExpert.se</title>
  <meta name="description" content="${escapeHtml(post.description)}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.description)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="sv_SE">${post.cover_image ? `
  <meta property="og:image" content="${escapeHtml(post.cover_image)}">` : ''}
  <meta property="article:published_time" content="${escapeHtml(post.published || '')}">
  <meta property="article:author" content="${escapeHtml(post.authors || 'FramerExpert')}">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Hreflang -->
  <link rel="alternate" hreflang="sv" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="en" href="${escapeHtml(canonicalUrl)}">

  <!-- Canonical -->
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/animations.css">

  <!-- JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(post.description)},
    "datePublished": "${post.published || ''}",
    "author": {
      "@type": "Organization",
      "name": "${post.authors || 'FramerExpert'}",
      "url": "https://framerexpert.se"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FramerExpert.se",
      "url": "https://framerexpert.se"
    },
    "mainEntityOfPage": ${JSON.stringify(canonicalUrl)},
    "inLanguage": "sv"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": "https://framerexpert.se" },
      { "@type": "ListItem", "position": 2, "name": "Blogg", "item": "https://framerexpert.se/blog/" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(post.title)} }
    ]
  }
  </script>
</head>
<body>

  <!-- NAVIGATION -->
  <nav data-twostep-nav data-nav-status="not-active" class="twostep-nav">
    <div data-nav-toggle="close" class="twostep-nav__bg"></div>
    <div class="twostep-nav__wrap">
      <div class="twostep-nav__width">
        <div class="twostep-nav__bar">
          <div class="twostep-nav__back">
            <div class="twostep-nav__back-bg"></div>
          </div>
          <div class="twostep-nav__top">
            <a href="/" class="twostep-nav__logo">
              framer.expert
            </a>
            <button data-nav-toggle="toggle" class="twostep-nav__toggle">
              <div class="twostep-nav__toggle-bar"></div>
              <div class="twostep-nav__toggle-bar"></div>
            </button>
            <div class="twostep-nav__top-line"></div>
          </div>
          <div class="twostep-nav__bottom">
            <div class="twostep-nav__bottom-overflow">
              <div class="twostep-nav__bottom-inner">
                <div class="twostep-nav__bottom-row">
                  <div class="twostep-nav__bottom-col">
                    <div class="twostep-nav__info">
                      <ul class="twostep-nav__ul">
                        <li class="twostep-nav__li">
                          <a href="/blog/" class="twostep-nav__link" data-nav-toggle="close"><span class="twostep-nav__link-span" data-i18n="nav.blog">Blogg</span></a>
                        </li>
                        <li class="twostep-nav__li">
                          <a href="/#about" class="twostep-nav__link" data-nav-toggle="close"><span class="twostep-nav__link-span" data-i18n="nav.about">Om</span></a>
                        </li>
                        <li class="twostep-nav__li">
                          <a href="mailto:sanna@framerexpert.se" class="twostep-nav__link" data-nav-toggle="close"><span class="twostep-nav__link-span" data-i18n="nav.contact">Kontakt</span></a>
                        </li>
                      </ul>
                      <ul class="twostep-nav__ul is--small">
                        <li class="twostep-nav__li">
                          <a href="https://www.framer.com" target="_blank" rel="noopener" class="twostep-nav__link"><span class="twostep-nav__link-eyebrow">Framer.com</span></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main>

  <!-- BREADCRUMBS -->
  <div class="breadcrumbs container">
    <ol class="breadcrumbs__list">
      <li><a href="/" data-i18n="nav.home">Hem</a></li>
      <li><a href="/blog/" data-i18n="nav.blog">Blogg</a></li>
      <li><span aria-current="page">${escapeHtml(post.title)}</span></li>
    </ol>
  </div>

  <!-- ARTICLE -->
  <article class="container">
    <header class="blog-post__header">
      <div class="blog-post__meta">
        <span class="blog-post__category">${escapeHtml(categoryLabel)}</span>
        <time datetime="${escapeHtml(post.published || '')}">${dateFormatted}</time>
        <span>${readMinutes} min läsning</span>
      </div>
      <h1 class="blog-post__title">${escapeHtml(post.title)}</h1>
      <p class="blog-post__intro">${escapeHtml(post.description)}</p>
    </header>

    <div class="blog-post__content">
${content}
    </div>
  </article>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer__inner">
      <span class="footer__left">&copy; <span data-current-year>${new Date().getFullYear()}</span> FramerExpert.se</span>
      <div class="footer__links">
        <a href="/#about" data-i18n="nav.about" data-underline-link>Om</a>
        <a href="mailto:sanna@framerexpert.se" data-i18n="nav.contact" data-underline-link>Kontakt</a>
        <button class="lang-toggle" id="langToggle" aria-label="Byt språk">
          <span class="lang-toggle__option is-active" data-lang="sv">SV</span>
          <span class="lang-toggle__divider">/</span>
          <span class="lang-toggle__option" data-lang="en">EN</span>
        </button>
      </div>
    </div>
  </footer>

  </main>

  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/CustomEase.min.js"></script>
  <script src="../js/i18n.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/init.js"></script>
</body>
</html>
`;
}

module.exports = { generatePostHtml, mapTagToCategory };

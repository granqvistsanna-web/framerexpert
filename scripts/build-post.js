#!/usr/bin/env node
/*
 * Build a single blog post HTML file from its markdown source.
 *
 *   node scripts/build-post.js <slug>     # build one post
 *   node scripts/build-post.js --all      # build every non-stub post
 *
 * Reads:  content/blog/<slug>.md
 * Reads:  blog/_template.html
 * Writes: blog/<slug>.html
 *
 * Zero runtime dependencies — uses only Node's stdlib.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const TEMPLATE_PATH = path.join(ROOT, 'blog', '_template.html');
const I18N_PATH = path.join(ROOT, 'js', 'i18n.js');
const OUT_DIR = path.join(ROOT, 'blog');

const CATEGORY_LABELS = {
  'getting-started': 'Kom igång',
  'comparison': 'Jämförelse',
  'tips': 'Tips',
  'seo': 'SEO',
  'cms': 'CMS',
};

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node scripts/build-post.js <slug> | --all');
    process.exit(1);
  }

  const registry = loadRegistry();
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const i18n = loadSwedishI18n();

  const slugs = args[0] === '--all'
    ? Object.keys(registry).filter((s) => !registry[s].stub)
    : [args[0]];

  for (const slug of slugs) {
    const post = registry[slug];
    if (!post) die(`No content/blog/${slug}.md found.`);
    if (post.stub) die(`${slug} is a stub — add body content before building.`);
    const html = render(template, post, registry, i18n);
    const outPath = path.join(OUT_DIR, `${slug}.html`);
    fs.writeFileSync(outPath, html);
    console.log(`wrote ${path.relative(ROOT, outPath)}`);
  }
}

function loadRegistry() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => {
    return f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md';
  });
  const registry = {};
  for (const f of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
    const parsed = parseMarkdown(raw);
    parsed.slug = parsed.slug || f.replace(/\.md$/, '');
    registry[parsed.slug] = parsed;
  }
  return registry;
}

/*
 * js/i18n.js rewrites document.title and the meta description on every page
 * load — including in Swedish. If the frontmatter and the Swedish i18n strings
 * disagree, a raw crawler reads one text and every human reads another. That
 * divergence is silent, so the build refuses to produce it.
 *
 * Returns { 'page.post5.title': '…', 'page.post5.description': '…', … } for the
 * sv block only. The en strings are translations and must NOT match.
 */
function loadSwedishI18n() {
  const raw = fs.readFileSync(I18N_PATH, 'utf8');

  const svStart = raw.indexOf('sv: {');
  const enStart = raw.indexOf('en: {');
  if (svStart === -1 || enStart === -1) die('js/i18n.js: could not locate the sv and en blocks.');
  const sv = raw.slice(svStart, enStart);

  const out = {};
  const re = /'(page\.[A-Za-z0-9]+\.(?:title|description))':\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(sv)) !== null) out[m[1]] = decodeJsString(m[2]);
  return out;
}

function decodeJsString(s) {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function assertI18nMatches(post, i18n) {
  const checks = [
    { key: `page.${post.page_id}.title`, field: 'meta_title', value: post.meta_title },
    { key: `page.${post.page_id}.description`, field: 'description', value: post.description },
  ];

  for (const { key, field, value } of checks) {
    if (!(key in i18n)) {
      die(`${post.slug}: js/i18n.js is missing '${key}' (sv). Add it, or the page will render `
        + `${field} from frontmatter to crawlers and nothing to visitors.`);
    }
    if (i18n[key] !== value) {
      die(`${post.slug}: ${field} differs between frontmatter and js/i18n.js (sv).\n`
        + `  frontmatter: ${value}\n`
        + `  i18n '${key}': ${i18n[key]}\n`
        + `  i18n.js wins at runtime — make them identical.`);
    }
  }
}

function render(template, post, registry, i18n) {
  required(post, ['slug', 'page_id', 'category', 'date', 'date_display', 'readtime',
    'thumbnail', 'title', 'meta_title', 'description', 'intro']);

  assertI18nMatches(post, i18n);

  const categoryLabel = CATEGORY_LABELS[post.category];
  if (!categoryLabel) die(`Unknown category "${post.category}" on ${post.slug}.`);

  const vars = {
    SLUG: post.slug,
    PAGE_ID: post.page_id,
    META_TITLE: escapeAttr(post.meta_title),
    TITLE: escapeHtml(post.title),
    DESCRIPTION: escapeAttr(post.description),
    OG_DESCRIPTION: escapeAttr(post.og_description || post.description),
    DATE: post.date,
    DATE_MODIFIED: post.date_modified || post.date,
    DATE_DISPLAY: escapeHtml(post.date_display),
    READTIME: escapeHtml(post.readtime),
    OG_IMAGE: post.og_image || 'og-default.png',
    CATEGORY_LABEL: escapeHtml(categoryLabel),
    INTRO: escapeHtml(post.intro),
    JSON_TITLE: JSON.stringify(post.title),
    JSON_DESCRIPTION: JSON.stringify(post.og_description || post.description),
    BODY: renderBody(post.body || ''),
    RELATED: renderRelated(post.related || [], registry, post.slug),
    FAQ_SCHEMA: renderFaqSchema(post.faqs || []),
  };

  return template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => {
    if (!(key in vars)) die(`Template placeholder {{${key}}} has no value.`);
    return vars[key];
  });
}

function renderBody(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let inList = false;

  const flushList = () => {
    if (inList) {
      out.push('      </ul>');
      inList = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { flushList(); i++; continue; }

    if (/^###\s+/.test(line)) {
      flushList();
      out.push(`      <h3>${inline(line.replace(/^###\s+/, '').trim())}</h3>`);
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushList();
      out.push(`      <h2>${inline(line.replace(/^##\s+/, '').trim())}</h2>`);
      i++;
      continue;
    }
    if (/^-\s+/.test(line)) {
      if (!inList) { out.push('      <ul>'); inList = true; }
      out.push(`        <li>${inline(line.replace(/^-\s+/, '').trim())}</li>`);
      i++;
      continue;
    }
    if (/^\s*\|/.test(line)) {
      flushList();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i].trim());
        i++;
      }
      out.push(renderTable(rows));
      continue;
    }
    if (/^>/.test(line)) {
      flushList();
      const block = [];
      while (i < lines.length && /^>/.test(lines[i])) {
        block.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(renderFactbox(block));
      continue;
    }

    // Paragraph: consume until blank line or structural token.
    const buf = [line.trim()];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{2,3}\s+|-\s+|\s*\||>)/.test(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    flushList();
    out.push(`      <p>${inline(buf.join(' '))}</p>`);
  }
  flushList();
  return out.join('\n');
}

/*
 * Pipe table. First column becomes a row header so that label/value pairs stay
 * readable for screen readers and for anything parsing the page as data.
 *
 *   | Uppdrag       | Prisspann          |
 *   | ---           | ---                |
 *   | Landningssida | 25 000–60 000 kr   |
 */
function renderTable(rows) {
  const cells = (row) => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const isSeparator = (row) => cells(row).every((c) => /^:?-{2,}:?$/.test(c));

  let head = null;
  let bodyRows = rows;
  if (rows.length >= 2 && isSeparator(rows[1])) {
    head = cells(rows[0]);
    bodyRows = rows.slice(2);
  }
  bodyRows = bodyRows.filter((row) => !isSeparator(row));

  const out = ['      <div class="blog-post__table-wrap">', '        <table>'];
  if (head) {
    out.push('          <thead>');
    out.push('            <tr>' + head.map((c) => `<th scope="col">${inline(c)}</th>`).join('') + '</tr>');
    out.push('          </thead>');
  }
  out.push('          <tbody>');
  for (const row of bodyRows) {
    const tds = cells(row).map((c, idx) => (idx === 0
      ? `<th scope="row">${inline(c)}</th>`
      : `<td>${inline(c)}</td>`));
    out.push('            <tr>' + tds.join('') + '</tr>');
  }
  out.push('          </tbody>', '        </table>', '      </div>');
  return out.join('\n');
}

/*
 * Fact block. Lines prefixed with `>` render as a highlighted aside — used for
 * key figures that should be easy to lift out of the article.
 * Supports `### heading`, paragraphs, blank-line separation and `- ` bullets.
 */
function renderFactbox(blockLines) {
  const out = ['      <aside class="blog-post__factbox">'];
  let para = [];
  let items = [];

  const flushPara = () => {
    if (para.length) { out.push(`        <p>${inline(para.join(' '))}</p>`); para = []; }
  };
  const flushItems = () => {
    if (items.length) {
      out.push('        <ul>');
      for (const item of items) out.push(`          <li>${inline(item)}</li>`);
      out.push('        </ul>');
      items = [];
    }
  };

  for (const raw of blockLines) {
    const line = raw.trim();
    if (line === '') { flushPara(); flushItems(); continue; }
    if (/^###\s+/.test(line)) {
      flushPara();
      flushItems();
      out.push(`        <h3>${inline(line.replace(/^###\s+/, ''))}</h3>`);
      continue;
    }
    if (/^-\s+/.test(line)) {
      flushPara();
      items.push(line.replace(/^-\s+/, ''));
      continue;
    }
    flushItems();
    para.push(line);
  }
  flushPara();
  flushItems();

  out.push('      </aside>');
  return out.join('\n');
}

function inline(text) {
  // Order matters: escape first, then apply inline tokens.
  let s = escapeHtml(text);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const isExternal = /^https?:\/\//i.test(url);
    const attrs = isExternal ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${escapeAttr(url)}"${attrs}>${label}</a>`;
  });
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s;
}

function renderRelated(slugs, registry, selfSlug) {
  if (!slugs.length) return '';
  const blocks = [];
  for (const slug of slugs) {
    if (slug === selfSlug) continue;
    const p = registry[slug];
    if (!p) die(`related: unknown slug "${slug}"`);
    required(p, ['thumbnail', 'title']);
    const excerpt = p.excerpt || p.description || '';
    blocks.push(
      `        <a href="/blog/${p.slug}.html" class="card">\n` +
      `          <div class="card__image">\n` +
      `            <img src="../assets/${p.thumbnail}" alt="${escapeAttr(p.title)}" loading="lazy">\n` +
      `          </div>\n` +
      `          <p class="card__text"><strong>${escapeHtml(p.title)}</strong>${excerpt ? ` — <span>${escapeHtml(excerpt)}</span>` : ''}</p>\n` +
      `        </a>`
    );
  }
  return blocks.join('\n');
}

function renderFaqSchema(faqs) {
  if (!faqs.length) return '';
  const mainEntity = faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
  return '  <script type="application/ld+json">\n  ' +
    JSON.stringify(schema, null, 2).split('\n').join('\n  ') +
    '\n  </script>\n';
}

/* ---------- Minimal frontmatter + markdown parser ---------- */

function parseMarkdown(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) die('Missing frontmatter (--- ... ---) block.');
  const front = parseFrontmatter(m[1]);
  front.body = m[2].trim();
  return front;
}

function parseFrontmatter(src) {
  const lines = src.split('\n');
  const out = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line) || /^\s*#/.test(line)) { i++; continue; }

    const topMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!topMatch) die(`Unparseable frontmatter line: ${line}`);
    const key = topMatch[1];
    const value = topMatch[2];

    if (value === '') {
      // Block value — either a sequence of `- ...` scalars or of `- q:`/`  a:` objects.
      const [collected, consumed] = collectBlock(lines, i + 1);
      i += 1 + consumed;
      out[key] = collected;
      continue;
    }

    out[key] = coerceScalar(key, value);
    i++;
  }
  return out;
}

function collectBlock(lines, start) {
  const items = [];
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    if (!/^\s+/.test(line)) break; // dedent = end of block
    if (/^\s*-\s+/.test(line)) {
      // New list item
      const firstLine = line.replace(/^\s*-\s+/, '');
      const inlineMatch = firstLine.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
      if (inlineMatch) {
        // Object item: collect this key + subsequent indented keys until next `-` or dedent.
        const obj = { [inlineMatch[1]]: unquote(inlineMatch[2]) };
        i++;
        while (i < lines.length) {
          const sub = lines[i];
          if (/^\s*$/.test(sub)) { i++; continue; }
          if (/^\s*-\s+/.test(sub)) break;
          if (!/^\s+/.test(sub)) break;
          const subMatch = sub.match(/^\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
          if (!subMatch) die(`Unparseable list sub-line: ${sub}`);
          obj[subMatch[1]] = unquote(subMatch[2]);
          i++;
        }
        items.push(obj);
      } else {
        items.push(unquote(firstLine.trim()));
        i++;
      }
    } else {
      die(`Expected list item (- ...) in block, got: ${line}`);
    }
  }
  return [items, i - start];
}

function coerceScalar(key, raw) {
  const v = unquote(raw.trim());
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (key === 'related') {
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return v;
}

function unquote(s) {
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
  return s;
}

/* ---------- Helpers ---------- */

function required(obj, keys) {
  for (const k of keys) {
    if (obj[k] === undefined || obj[k] === '') die(`Missing required frontmatter field: ${k} (in ${obj.slug || 'unknown'})`);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

function die(msg) {
  console.error('build-post: ' + msg);
  process.exit(1);
}

main();

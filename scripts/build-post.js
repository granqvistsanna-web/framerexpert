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

  const slugs = args[0] === '--all'
    ? Object.keys(registry).filter((s) => !registry[s].stub)
    : [args[0]];

  for (const slug of slugs) {
    const post = registry[slug];
    if (!post) die(`No content/blog/${slug}.md found.`);
    if (post.stub) die(`${slug} is a stub — add body content before building.`);
    const html = render(template, post, registry);
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

function render(template, post, registry) {
  required(post, ['slug', 'page_id', 'category', 'date', 'date_display', 'readtime',
    'thumbnail', 'title', 'meta_title', 'description', 'intro']);

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
    BODY: renderBody(post.body || '', registry),
    RELATED: renderRelated(post.related || [], registry, post.slug),
    FAQ_SCHEMA: renderFaqSchema(post.faqs || []),
  };

  return template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => {
    if (!(key in vars)) die(`Template placeholder {{${key}}} has no value.`);
    return vars[key];
  });
}

function renderBody(markdown, registry) {
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

  const SEE_ALSO_RE = /^\[see-also\]\(([^)]+)\)\s*$/;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { flushList(); i++; continue; }

    const seeAlso = line.match(SEE_ALSO_RE);
    if (seeAlso) {
      flushList();
      out.push(renderSeeAlso(seeAlso[1].trim(), registry));
      i++;
      continue;
    }

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

    // Paragraph: consume until blank line or structural token.
    const buf = [line.trim()];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{2,3}\s+|-\s+|\[see-also\]\()/.test(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    flushList();
    out.push(`      <p>${inline(buf.join(' '))}</p>`);
  }
  flushList();
  return out.join('\n');
}

function renderSeeAlso(slug, registry) {
  const target = registry[slug];
  if (!target) die(`see-also: unknown slug "${slug}"`);
  required(target, ['title']);
  const excerpt = target.excerpt || target.description || '';
  return (
    `      <aside class="see-also">\n` +
    `        <a href="/blog/${target.slug}.html" class="see-also__link">\n` +
    `          <span class="see-also__eyebrow">Läs också</span>\n` +
    `          <span class="see-also__title">${escapeHtml(target.title)}</span>\n` +
    (excerpt ? `          <span class="see-also__excerpt">${escapeHtml(excerpt)}</span>\n` : '') +
    `        </a>\n` +
    `      </aside>`
  );
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

#!/usr/bin/env node
/*
 * Generate sitemap.xml from content/blog/*.md plus the home + blog index.
 *
 *   node scripts/build-sitemap.js
 *
 * Reads:  content/blog/*.md  (frontmatter only — slug, date, date_modified, thumbnail, title)
 * Writes: sitemap.xml
 *
 * Includes <image:image> tags so post thumbnails appear in Google Image Search.
 * Zero runtime dependencies — uses only Node's stdlib.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_PATH = path.join(ROOT, 'sitemap.xml');
const SITE = 'https://framerexpert.se';

function main() {
  const posts = loadPosts();
  // Newest post sets the home + blog-index lastmod, so they reflect real freshness.
  const newest = posts.reduce((acc, p) => {
    const mod = p.date_modified || p.date;
    return !acc || mod > acc ? mod : acc;
  }, '');

  const urls = [];
  urls.push(urlEntry({ loc: `${SITE}/`, lastmod: newest, changefreq: 'weekly', priority: '1.0' }));
  urls.push(urlEntry({ loc: `${SITE}/blog/`, lastmod: newest, changefreq: 'weekly', priority: '0.9' }));

  for (const p of posts) {
    urls.push(urlEntry({
      loc: `${SITE}/blog/${p.slug}.html`,
      lastmod: p.date_modified || p.date,
      changefreq: 'monthly',
      priority: '0.8',
      image: p.thumbnail ? { loc: `${SITE}/assets/${p.thumbnail}`, title: p.title } : null,
    }));
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    urls.join('\n') + '\n' +
    '</urlset>\n';

  fs.writeFileSync(OUT_PATH, xml);
  console.log(`wrote ${path.relative(ROOT, OUT_PATH)} (${posts.length} posts + 2 hub pages)`);
}

function loadPosts() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => {
    return f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md';
  });
  const posts = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
    const meta = parseFrontmatterOnly(raw);
    meta.slug = meta.slug || f.replace(/\.md$/, '');
    // Stubs are real published pages that predate the build script — include them.
    if (!meta.date) die(`${f}: missing required 'date' field (needed for sitemap, even on stubs).`);
    posts.push(meta);
  }
  posts.sort((a, b) => {
    const da = a.date_modified || a.date;
    const db = b.date_modified || b.date;
    return da < db ? 1 : da > db ? -1 : 0;
  });
  return posts;
}

function urlEntry({ loc, lastmod, changefreq, priority, image }) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
  ];
  if (image) {
    lines.push('    <image:image>');
    lines.push(`      <image:loc>${escapeXml(image.loc)}</image:loc>`);
    if (image.title) lines.push(`      <image:title>${escapeXml(image.title)}</image:title>`);
    lines.push('    </image:image>');
  }
  lines.push('  </url>');
  return lines.join('\n');
}

/* Frontmatter-only parser — we don't need the body for the sitemap. */
function parseFrontmatterOnly(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) die('Missing frontmatter (--- ... ---) block.');
  const out = {};
  for (const line of m[1].split('\n')) {
    if (/^\s*$/.test(line) || /^\s*#/.test(line) || /^\s+/.test(line) || /^\s*-\s+/.test(line)) continue;
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    out[kv[1]] = unquote(kv[2].trim());
  }
  return out;
}

function unquote(s) {
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
  return s;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function die(msg) {
  console.error('build-sitemap: ' + msg);
  process.exit(1);
}

main();

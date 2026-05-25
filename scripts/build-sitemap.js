#!/usr/bin/env node
/*
 * Generate sitemap.xml from the markdown registry in content/blog/.
 *
 *   node scripts/build-sitemap.js
 *
 * Includes the homepage, blog index, and every published (non-stub) post.
 * Each blog post entry carries an <image:image> child pointing at its
 * thumbnail asset so Google Image Search can pick them up.
 *
 * Zero runtime dependencies.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUT_PATH = path.join(ROOT, 'sitemap.xml');
const BASE_URL = 'https://framerexpert.se';

function main() {
  const posts = loadPosts();
  const today = new Date().toISOString().slice(0, 10);

  const latestPostMod = posts
    .map((p) => p.date_modified || p.date)
    .filter(Boolean)
    .sort()
    .pop() || today;

  const entries = [
    {
      loc: `${BASE_URL}/`,
      lastmod: latestPostMod,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: `${BASE_URL}/blog/`,
      lastmod: latestPostMod,
      changefreq: 'weekly',
      priority: '0.9',
    },
  ];

  for (const p of posts) {
    entries.push({
      loc: `${BASE_URL}/blog/${p.slug}.html`,
      lastmod: p.date_modified || p.date,
      changefreq: 'monthly',
      priority: '0.8',
      image: p.thumbnail
        ? {
            loc: `${BASE_URL}/assets/${p.thumbnail}`,
            title: p.title,
          }
        : null,
    });
  }

  const xml = renderXml(entries);
  fs.writeFileSync(OUT_PATH, xml);
  console.log(`wrote ${path.relative(ROOT, OUT_PATH)} (${entries.length} urls)`);
}

function loadPosts() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => {
    return f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md';
  });
  const posts = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
    const front = parseFrontmatter(raw);
    const slug = front.slug || f.replace(/\.md$/, '');
    // Include any post whose generated HTML actually exists on disk —
    // a stub markdown can still ship if its HTML was hand-authored.
    if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.html`))) continue;
    front.slug = slug;
    posts.push(front);
  }
  posts.sort((a, b) => (a.date_modified || a.date || '').localeCompare(b.date_modified || b.date || ''));
  posts.reverse();
  return posts;
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const km = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!km) continue;
    const key = km[1];
    let val = km[2].trim();
    if (val === '') continue;
    if (val === 'true') { out[key] = true; continue; }
    if (val === 'false') { out[key] = false; continue; }
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function renderXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ];
  for (const e of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(e.loc)}</loc>`);
    if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
    if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
    if (e.priority) lines.push(`    <priority>${e.priority}</priority>`);
    if (e.image) {
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${escapeXml(e.image.loc)}</image:loc>`);
      if (e.image.title) lines.push(`      <image:title>${escapeXml(e.image.title)}</image:title>`);
      lines.push('    </image:image>');
    }
    lines.push('  </url>');
  }
  lines.push('</urlset>');
  lines.push('');
  return lines.join('\n');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

main();

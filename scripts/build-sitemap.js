#!/usr/bin/env node
/*
 * Generate sitemap.xml from the same frontmatter that drives the blog build.
 *
 *   node scripts/build-sitemap.js
 *
 * Reads:  content/blog/<slug>.md   (every non-stub post)
 * Writes: sitemap.xml
 *
 * The point of generating rather than hand-editing: <lastmod> and the page's
 * own dateModified come from one source, so they cannot drift apart. A crawler
 * uses lastmod to decide whether to re-fetch, so a stale value hides updates.
 *
 * Zero runtime dependencies — uses only Node's stdlib.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_PATH = path.join(ROOT, 'sitemap.xml');
const BASE = 'https://framerexpert.se';

const STATIC_PAGES = [
  { loc: `${BASE}/`, changefreq: 'weekly', priority: '1.0', lastmod: 'newest' },
  { loc: `${BASE}/blog/`, changefreq: 'weekly', priority: '0.9', lastmod: 'newest' },
  { loc: `${BASE}/framer-agents-hackathon-2026.html`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-08-13' },
];

function main() {
  const posts = loadPosts();
  if (!posts.length) die('No posts found in content/blog.');

  const newest = posts.map((p) => p.lastmod).sort().pop();

  const entries = [];
  for (const page of STATIC_PAGES) {
    entries.push({
      loc: page.loc,
      lastmod: page.lastmod === 'newest' ? newest : page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }
  for (const post of posts) {
    entries.push({
      loc: `${BASE}/blog/${post.slug}.html`,
      lastmod: post.lastmod,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  fs.writeFileSync(OUT_PATH, render(entries));
  console.log(`wrote ${path.relative(ROOT, OUT_PATH)} (${entries.length} urls)`);
}

function loadPosts() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => {
    return f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md';
  });

  const posts = [];
  for (const file of files) {
    const front = parseFrontmatter(path.join(CONTENT_DIR, file));
    const slug = front.slug || file.replace(/\.md$/, '');

    // A stub's HTML predates the build script and is maintained by hand, so its
    // own dateModified is the source of truth rather than the frontmatter.
    const lastmod = front.stub === 'true'
      ? dateModifiedFromHtml(slug)
      : front.date_modified || front.date;

    if (!lastmod) die(`${file}: missing both date_modified and date.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) die(`${file}: lastmod "${lastmod}" is not YYYY-MM-DD.`);
    posts.push({ slug, lastmod });
  }
  return posts.sort((a, b) => (a.lastmod < b.lastmod ? 1 : a.lastmod > b.lastmod ? -1 : a.slug.localeCompare(b.slug)));
}

function dateModifiedFromHtml(slug) {
  const htmlPath = path.join(ROOT, 'blog', `${slug}.html`);
  if (!fs.existsSync(htmlPath)) die(`${slug} is a stub but blog/${slug}.html does not exist.`);
  const m = fs.readFileSync(htmlPath, 'utf8').match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/);
  if (!m) die(`${slug}: stub HTML has no dateModified to read.`);
  return m[1];
}

/*
 * Only the handful of scalar keys the sitemap needs — the full parser lives in
 * build-post.js and reading dates does not justify duplicating it.
 */
function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) die(`${path.basename(filePath)}: missing frontmatter block.`);

  const out = {};
  for (const line of m[1].split('\n')) {
    const match = line.match(/^(slug|date|date_modified|stub):\s*(.+)$/);
    if (match) out[match[1]] = unquote(match[2].trim());
  }
  return out;
}

function unquote(s) {
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
  return s;
}

function render(entries) {
  const urls = entries.map((e) => [
    '  <url>',
    `    <loc>${e.loc}</loc>`,
    `    <lastmod>${e.lastmod}</lastmod>`,
    `    <changefreq>${e.changefreq}</changefreq>`,
    `    <priority>${e.priority}</priority>`,
    '  </url>',
  ].join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

function die(msg) {
  console.error('build-sitemap: ' + msg);
  process.exit(1);
}

main();

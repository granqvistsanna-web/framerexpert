require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const { generatePostHtml } = require('./generate-post');
const { updateBlogIndex } = require('./generate-index');
const { updateSitemap } = require('./generate-sitemap');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const BLOG_DIR = path.join(__dirname, '..', 'blog');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getRichText(prop) {
  if (!prop || !prop.rich_text) return '';
  return prop.rich_text.map(t => t.plain_text).join('');
}

function getTitle(prop) {
  if (!prop || !prop.title) return '';
  return prop.title.map(t => t.plain_text).join('');
}

function getTags(prop) {
  if (!prop || !prop.multi_select) return [];
  return prop.multi_select.map(t => t.name);
}

function getDate(prop) {
  if (!prop || !prop.date || !prop.date.start) return null;
  return prop.date.start;
}

function getUrl(prop) {
  if (!prop || !prop.url) return '';
  return prop.url;
}

function getStatus(prop) {
  if (!prop || !prop.status) return '';
  return prop.status.name || '';
}

async function getBlockChildren(blockId) {
  const blocks = [];
  let cursor;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  for (const block of blocks) {
    if (block.has_children) {
      block.children = await getBlockChildren(block.id);
    }
  }
  return blocks;
}

async function fetchPosts() {
  console.log('Fetching posts from Notion...');

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'draft',
      checkbox: { equals: false },
    },
    sorts: [
      { property: 'published', direction: 'descending' },
    ],
  });

  const posts = [];
  for (const page of response.results) {
    const p = page.properties;
    const title = getTitle(p.Name || p.title || p.Title);
    if (!title) continue;

    const slug = slugify(title);
    console.log(`  Fetching: ${title}`);

    const blocks = await getBlockChildren(page.id);

    posts.push({
      id: page.id,
      title,
      slug,
      tags: getTags(p.Tags),
      authors: getRichText(p.authors),
      canonical_url: getUrl(p.canonical_url),
      cover_image: getUrl(p.cover_image),
      description: getRichText(p.description),
      published: getDate(p.published),
      series: getStatus(p.series),
      blocks,
    });
  }

  console.log(`Found ${posts.length} published posts.\n`);
  return posts;
}

async function main() {
  if (!process.env.NOTION_API_KEY) {
    console.error('Error: NOTION_API_KEY not set. Copy .env.example to .env and fill in your values.');
    process.exit(1);
  }
  if (!process.env.NOTION_DATABASE_ID) {
    console.error('Error: NOTION_DATABASE_ID not set. Copy .env.example to .env and fill in your values.');
    process.exit(1);
  }

  const posts = await fetchPosts();

  if (posts.length === 0) {
    console.log('No published posts found. Nothing to generate.');
    return;
  }

  // Generate individual post pages
  for (const post of posts) {
    const html = generatePostHtml(post);
    const filePath = path.join(BLOG_DIR, `${post.slug}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`  Generated: blog/${post.slug}.html`);
  }

  // Update blog index with new cards
  updateBlogIndex(posts);

  // Update sitemap
  updateSitemap(posts);

  console.log('\nBuild complete!');
}

main().catch(err => {
  console.error('Build failed:', err.message);
  process.exit(1);
});

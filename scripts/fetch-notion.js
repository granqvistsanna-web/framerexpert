require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const OUTPUT_DIR = path.join(__dirname, '..', '_notion-data');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getRichText(property) {
  if (!property || !property.rich_text) return '';
  return property.rich_text.map(t => t.plain_text).join('');
}

function getTitle(property) {
  if (!property || !property.title) return '';
  return property.title.map(t => t.plain_text).join('');
}

function getTags(property) {
  if (!property || !property.multi_select) return [];
  return property.multi_select.map(t => t.name);
}

function getDate(property) {
  if (!property || !property.date || !property.date.start) return null;
  return property.date.start;
}

function getCheckbox(property) {
  if (!property || property.checkbox === undefined) return false;
  return property.checkbox;
}

function getUrl(property) {
  if (!property || !property.url) return '';
  return property.url;
}

function getStatus(property) {
  if (!property || !property.status) return '';
  return property.status.name || '';
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

  // Recursively fetch children for blocks that have them
  for (const block of blocks) {
    if (block.has_children) {
      block.children = await getBlockChildren(block.id);
    }
  }

  return blocks;
}

async function fetchPosts() {
  console.log('Fetching posts from Notion database...');

  const response = await notion.dataSources.query({
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
    const props = page.properties;
    const title = getTitle(props.Name || props.title || props.Title);
    const slug = slugify(title);

    console.log(`  Fetching content for: ${title}`);

    const blocks = await getBlockChildren(page.id);

    const post = {
      id: page.id,
      title,
      slug,
      tags: getTags(props.Tags),
      authors: getRichText(props.authors),
      canonical_url: getUrl(props.canonical_url),
      cover_image: getUrl(props.cover_image),
      description: getRichText(props.description),
      published: getDate(props.published),
      series: getStatus(props.series),
      blocks,
    };

    posts.push(post);
  }

  console.log(`Fetched ${posts.length} published posts.`);
  return posts;
}

async function main() {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.error('Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env');
    process.exit(1);
  }

  const posts = await fetchPosts();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'posts.json'),
    JSON.stringify(posts, null, 2)
  );
  console.log(`Saved data to ${OUTPUT_DIR}/posts.json`);
}

main().catch(err => {
  console.error('Error fetching from Notion:', err.message);
  process.exit(1);
});

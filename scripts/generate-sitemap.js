const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');

function updateSitemap(posts) {
  let xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');

  // Remove previously generated Notion entries (marked with comment)
  xml = xml.replace(/\s*<!-- notion-cms -->\s*<url>[\s\S]*?<\/url>/g, '');

  // Build new entries
  const entries = posts.map(post => {
    const loc = `https://framerexpert.se/blog/${post.slug}.html`;
    const lastmod = post.published || new Date().toISOString().split('T')[0];
    return `  <!-- notion-cms -->
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  // Insert before closing </urlset>
  xml = xml.replace('</urlset>', `${entries}\n</urlset>`);

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`Updated sitemap.xml with ${posts.length} Notion posts.`);
}

module.exports = { updateSitemap };

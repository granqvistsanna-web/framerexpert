/**
 * Converts Notion API block objects into HTML strings.
 */

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRichText(richTextArray) {
  if (!richTextArray || !richTextArray.length) return '';

  return richTextArray.map(segment => {
    let text = escapeHtml(segment.plain_text);

    if (segment.annotations) {
      if (segment.annotations.bold) text = `<strong>${text}</strong>`;
      if (segment.annotations.italic) text = `<em>${text}</em>`;
      if (segment.annotations.strikethrough) text = `<s>${text}</s>`;
      if (segment.annotations.underline) text = `<u>${text}</u>`;
      if (segment.annotations.code) text = `<code>${text}</code>`;
    }

    if (segment.href) {
      text = `<a href="${escapeHtml(segment.href)}" target="_blank" rel="noopener">${text}</a>`;
    }

    return text;
  }).join('');
}

function renderBlock(block) {
  const type = block.type;

  switch (type) {
    case 'paragraph': {
      const text = renderRichText(block.paragraph.rich_text);
      if (!text) return '';
      return `      <p>${text}</p>`;
    }

    case 'heading_1': {
      const text = renderRichText(block.heading_1.rich_text);
      return `      <h2>${text}</h2>`;
    }

    case 'heading_2': {
      const text = renderRichText(block.heading_2.rich_text);
      return `      <h2>${text}</h2>`;
    }

    case 'heading_3': {
      const text = renderRichText(block.heading_3.rich_text);
      return `      <h3>${text}</h3>`;
    }

    case 'bulleted_list_item': {
      const text = renderRichText(block.bulleted_list_item.rich_text);
      let html = `<li>${text}`;
      if (block.children && block.children.length) {
        html += '\n<ul>\n' + block.children.map(renderBlock).join('\n') + '\n</ul>';
      }
      html += '</li>';
      return html;
    }

    case 'numbered_list_item': {
      const text = renderRichText(block.numbered_list_item.rich_text);
      let html = `<li>${text}`;
      if (block.children && block.children.length) {
        html += '\n<ol>\n' + block.children.map(renderBlock).join('\n') + '\n</ol>';
      }
      html += '</li>';
      return html;
    }

    case 'quote': {
      const text = renderRichText(block.quote.rich_text);
      return `      <blockquote>${text}</blockquote>`;
    }

    case 'code': {
      const text = renderRichText(block.code.rich_text);
      const lang = block.code.language || '';
      return `      <pre><code class="language-${escapeHtml(lang)}">${text}</code></pre>`;
    }

    case 'divider':
      return '      <hr>';

    case 'image': {
      const src = block.image.type === 'external'
        ? block.image.external.url
        : block.image.file.url;
      const caption = block.image.caption
        ? renderRichText(block.image.caption)
        : '';
      let html = `      <figure>\n        <img src="${escapeHtml(src)}" alt="${caption ? caption.replace(/<[^>]*>/g, '') : ''}" loading="lazy">`;
      if (caption) {
        html += `\n        <figcaption>${caption}</figcaption>`;
      }
      html += '\n      </figure>';
      return html;
    }

    case 'video': {
      const videoSrc = block.video.type === 'external'
        ? block.video.external.url
        : block.video.file.url;
      return `      <div class="video-embed"><iframe src="${escapeHtml(videoSrc)}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
    }

    case 'embed': {
      return `      <div class="embed"><iframe src="${escapeHtml(block.embed.url)}" frameborder="0" loading="lazy"></iframe></div>`;
    }

    case 'callout': {
      const text = renderRichText(block.callout.rich_text);
      const icon = block.callout.icon?.emoji || '';
      return `      <div class="callout">${icon ? `<span class="callout__icon">${icon}</span> ` : ''}${text}</div>`;
    }

    case 'toggle': {
      const summary = renderRichText(block.toggle.rich_text);
      let childrenHtml = '';
      if (block.children && block.children.length) {
        childrenHtml = block.children.map(renderBlock).join('\n');
      }
      return `      <details>\n        <summary>${summary}</summary>\n${childrenHtml}\n      </details>`;
    }

    case 'bookmark': {
      const url = block.bookmark.url;
      const caption = block.bookmark.caption
        ? renderRichText(block.bookmark.caption)
        : url;
      return `      <p><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${caption}</a></p>`;
    }

    default:
      return '';
  }
}

/**
 * Convert an array of Notion blocks into an HTML string.
 * Groups consecutive list items into <ul>/<ol> wrappers.
 */
function blocksToHtml(blocks) {
  const parts = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === 'bulleted_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(renderBlock(blocks[i]));
        i++;
      }
      parts.push(`      <ul>\n        ${items.join('\n        ')}\n      </ul>`);
      continue;
    }

    if (block.type === 'numbered_list_item') {
      const items = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(renderBlock(blocks[i]));
        i++;
      }
      parts.push(`      <ol>\n        ${items.join('\n        ')}\n      </ol>`);
      continue;
    }

    const html = renderBlock(block);
    if (html) parts.push(html);
    i++;
  }

  return parts.join('\n\n');
}

module.exports = { blocksToHtml, renderRichText, escapeHtml };

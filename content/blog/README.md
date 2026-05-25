# Blog content bank

Source markdown for every blog post. The build script in
`scripts/build-post.js` turns a `.md` file in this directory into a full
HTML page under `blog/<slug>.html`, using `blog/_template.html` as the shell.

## Why this exists

A single blog post HTML file is 250–400 lines — mostly repeated boilerplate
(nav, JSON-LD, footer, script tags). Writing that boilerplate in one shot is
slow and risks timing out. With this bank, a new post is a ~80-line markdown
file; the boilerplate is re-used from the template.

## Files

- `_TEMPLATE.md` — skeleton to copy when adding a new post.
- `<slug>.md` — one file per post. Filename (without `.md`) is the slug used
  in the generated URL: `https://framerexpert.se/blog/<slug>.html`.
- Stub entries (`stub: true`) exist for legacy posts so that the `related:`
  lookup works without having to round-trip the original HTML through
  markdown. Generation skips stubs.

## Workflow for a new post

1. **Copy the template**: `cp content/blog/_TEMPLATE.md content/blog/<slug>.md`
2. **Fill in frontmatter**: slug, category, date, title, description, intro,
   related slugs, and (optionally) FAQs.
3. **Write the body** in plain markdown (`##`, `###`, paragraphs, `- lists`,
   `**bold**`, `*italic*`, `[link](url)`).
4. **Build**: `node scripts/build-post.js <slug>` (or `node scripts/build-post.js --all`).
5. **Wire it up** (small manual diffs — far less than writing the whole HTML):
   - Add a card to `blog/index.html` inside `#blogGrid`.
   - Rebuild the sitemap: `npm run build:sitemap` (auto-generated from
     markdown frontmatter — don't hand-edit `sitemap.xml`).
   - Add translation keys for the title/meta/body in `js/i18n.js` if you want
     English support for this post (optional — plain HTML falls back to
     Swedish if keys are missing).

## Frontmatter reference

| Field | Required | Notes |
| --- | --- | --- |
| `slug` | yes | Must match the filename. |
| `page_id` | yes | Value for `<body data-page>`, e.g. `post5`. |
| `category` | yes | One of `getting-started`, `comparison`, `tips`, `seo`, `cms`. |
| `date` | yes | ISO `YYYY-MM-DD`. |
| `date_modified` | no | Defaults to `date`. |
| `date_display` | yes | Human-readable date, e.g. `22 april 2026`. |
| `readtime` | yes | E.g. `6 min läsning`. |
| `thumbnail` | yes | File in `/assets/`, e.g. `thumb-my-post.svg`. |
| `og_image` | no | Defaults to `og-default.png`. |
| `title` | yes | Article H1 and breadcrumb label. |
| `meta_title` | yes | `<title>` tag (usually title + ` — FramerExpert.se`). |
| `description` | yes | `<meta name="description">` (≤ 160 chars). |
| `og_description` | no | Defaults to `description`. |
| `intro` | yes | Lead paragraph under the H1. |
| `related` | yes | Comma-separated list of slugs. Ideal count: 2. |
| `faqs` | no | List of `{ q, a }` pairs. Emits a `FAQPage` JSON-LD block. |

## Body syntax

Only a tiny markdown subset is supported — deliberately:

- `## Heading` → `<h2>`
- `### Heading` → `<h3>`
- Blank-line-separated paragraphs → `<p>`
- `- item` lines → `<ul><li>`
- Inline `**bold**`, `*italic*`, `` `code` ``, `[text](url)`
- `[see-also](slug)` on its own line → renders an inline cross-link
  callout to another post. Use 1–3 per long post to surface related
  reading mid-flow (the bottom `related:` block stays as-is).

Anything more exotic (tables, images mid-body, code fences) should be raised
as a feature request; the parser intentionally rejects it rather than guess.

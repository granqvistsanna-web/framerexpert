# scripts/

Build tooling for the static site. Zero runtime dependencies — everything runs
on Node's stdlib.

## `build-post.js`

Turns a markdown post in `content/blog/<slug>.md` into a full HTML page at
`blog/<slug>.html`, using `blog/_template.html` as the shell.

```bash
# Build one post
node scripts/build-post.js <slug>

# Build every non-stub post
node scripts/build-post.js --all

# Regenerate sitemap.xml only (from current file mtimes)
node scripts/build-post.js --sitemap
```

Or via npm:

```bash
npm run build:post -- <slug>
npm run build:all
npm run build:sitemap
```

The script is safe to re-run: it overwrites the output HTML in place. There
is no watch mode — re-run it after every content change.

`sitemap.xml` is regenerated automatically after any build, using the file
`mtime` of each emitted HTML as the `<lastmod>`. Use `--sitemap` to refresh
it without rebuilding posts.

See `content/blog/README.md` for the authoring workflow and frontmatter
reference.

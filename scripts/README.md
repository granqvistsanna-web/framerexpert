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
```

Or via npm:

```bash
npm run build:post -- <slug>
npm run build:all
```

The script is safe to re-run: it overwrites the output HTML in place. There
is no watch mode — re-run it after every content change.

See `content/blog/README.md` for the authoring workflow and frontmatter
reference.

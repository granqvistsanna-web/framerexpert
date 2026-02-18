# Code Review: FramerExpert.se

**Reviewer**: Automated code review
**Date**: 2026-02-18
**Scope**: Full codebase (HTML, CSS, JS, SEO, accessibility)

---

## CRITICAL

### 1. Barba.js + DOMContentLoaded scripts will not run on SPA navigation

**Files**: `js/main.js:1`, `js/i18n.js:222`, `js/blog.js:1`

All three scripts wrap their logic in `DOMContentLoaded`. When Barba.js fetches a new page via AJAX and swaps the `[data-barba="container"]`, scripts from the new page are not re-executed and `DOMContentLoaded` does not fire again. This means:

- **Scroll animations** (`main.js`) won't initialize on Barba-navigated pages
- **Language toggle** (`i18n.js`) won't rebind the click listener after navigation
- **Blog filtering** (`blog.js`) will never work when navigating to `/blog/` via a Barba transition

**Fix**: Move initialization into named functions and call them from Barba's `afterEnter` hook in `page-transitions.js`:

```js
function initAfterEnterFunctions(next) {
  nextPage = next || document;
  initDynamicCurrentYear();
  initScrollAnimations(nextPage);
  initI18n(nextPage);
  initBlogFilter(nextPage);
}
```

### 2. XSS vector in i18n.js via innerHTML

**File**: `js/i18n.js:189-191`

```js
if (key === 'hero.title') {
  el.innerHTML = translations[lang][key];
}
```

The `hero.title` translation contains HTML and is injected via `innerHTML`. While translations are currently hardcoded, this pattern is dangerous if translations ever come from external sources.

**Fix**: Use separate DOM elements instead of innerHTML for structured content.

### 3. initChangePageTitleOnLeave captures a stale title

**File**: `js/page-transitions.js:364-375`

`documentTitleStore` is captured once at page load. After Barba navigation, tabbing away and back restores the wrong title. The blur text is also hardcoded in Swedish, ignoring i18n. Each call adds duplicate event listeners.

---

## IMPORTANT

### 4. Hreflang tags point to identical URLs for both languages

**File**: Every HTML file

Both `hreflang="sv"` and `hreflang="en"` point to the same URL. This is semantically incorrect and will confuse search engines. Also missing `x-default`. Since both languages are served from the same URL, either remove hreflang tags or serve language-specific URLs.

### 5. Missing og:image despite summary_large_image Twitter card

**File**: All HTML files

`twitter:card` is set to `summary_large_image` but no `og:image` is provided. Social sharing previews will show no image.

### 6. Client-side i18n makes English content invisible to search engines

English content exists only in `i18n.js` and is rendered client-side. Crawlers will only index Swedish HTML fallback content. English content is not indexable or directly linkable.

### 7. Missing nav.home translation key

Blog post breadcrumbs use `data-i18n="nav.home"` but this key doesn't exist in the translations object. Switching to English leaves "Hem" displayed.

### 8. Duplicate CSS components with different class names

Two parallel component systems exist: `.filter-pills`/`.blog-filter`, `.card`/`.article-card`, `.cards-grid`/`.blog-grid`. The blog listing page even mixes them. Consolidate to one set.

### 9. No aria-label on hamburger menu button

The `.twostep-nav__toggle` button has no `aria-label` and no `aria-expanded` state management. Screen readers announce it as an empty button with no state.

### 10. CDN scripts loaded without Subresource Integrity (SRI)

Four external scripts and one CSS file loaded without `integrity` attributes. If the CDN is compromised, arbitrary code runs on your domain.

### 11. loading="lazy" on likely above-the-fold images

Homepage card images use `loading="lazy"` but may be visible without scrolling on desktop, hurting LCP.

### 12. Blog listing uses placeholder SVGs instead of real thumbnails

The blog listing page uses inline SVG placeholders while the homepage uses actual thumbnail images from `/assets/`. The thumbnails exist but aren't used on the blog listing.

---

## MINOR

### 13. Dead code in page-transitions.js

- `has()` helper (line 21): defined, never called
- `debounceOnWidthChange()` (lines 325-336): defined, never called
- `themeConfig` + `applyThemeFrom()`: references non-existent data attributes

### 14. Inconsistent var vs let/const in i18n.js

Lines 212-213 and 225 use `var` while the rest of the file uses `const`/`let`.

### 15. transition: all used in multiple CSS rules

`transition: all` in `style.css:487, 504, 523` transitions every property. Specify only intended properties.

### 16. Footer id="about" only exists on home page

The "Om" nav link targets `/#about` but only the homepage footer has this id.

### 17. Global CSS reset strips list-style from all ul

`ul { list-style: none; }` then blog content re-adds it. Fragile approach.

### 18. history.scrollRestoration disabled globally

Back button always scrolls to top instead of restoring previous scroll position.

---

## Summary

| Severity | Count | Key themes |
|----------|-------|------------|
| Critical | 3 | Barba.js/script re-init, XSS pattern, stale state |
| Important | 9 | SEO, accessibility, security, duplication |
| Minor | 6 | Dead code, consistency, minor CSS/UX |

**Priority fix**: Critical #1 (Barba.js script re-initialization) affects every user interaction after the first navigation.

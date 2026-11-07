# Next.js 15 Performance Checklist

Essential checklist to achieve sub-second LCP and zero CLS in production.

---

## 1. Images & Media
- [ ] Primary hero image uses `<Image priority ... />`.
- [ ] All images have explicit `width` & `height` or `fill` with appropriate `sizes="..."`.
- [ ] SVGs are cleaned of unnecessary metadata.
- [ ] Self-hosted videos have `preload="none"` or poster images.

## 2. Fonts
- [ ] Fonts loaded via `next/font/google` or `next/font/local` with `display: 'swap'`.
- [ ] Zero external render-blocking `@import url(...)` in CSS files.

## 3. Server vs. Client Components
- [ ] Push `'use client'` down to leaf interactive elements (buttons, inputs) instead of marking entire pages or layouts as client.
- [ ] Heavy data fetching remains inside Server Components.
- [ ] No client-side waterfall fetches (`useEffect` -> `fetch`).

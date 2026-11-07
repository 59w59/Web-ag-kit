---
name: core-web-vitals-guard
description: Audits and optimizes Next.js 15, React 19, and full-stack web applications for Core Web Vitals (LCP, CLS, INP). Eliminates unnecessary 'use client' bundle bloat, optimizes barrel-file tree-shaking, and enforces responsive image rules.
tags: [performance, core-web-vitals, nextjs, react, bundle-size, tree-shaking]
role: [performance-optimizer, frontend-specialist]
phase: [build, review, verify]
frameworks: [Next.js-15, React-19, Web-Vitals]
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
argument-hint: "[project-or-app-dir]"
---

# Core Web Vitals & Next.js Performance Guard

> "Performance is user experience. Fast applications convert, retain, and rank higher."

---

## 🔧 Runtime Scripts & References

| Tool / Reference | Purpose | Usage |
|------------------|---------|-------|
| `scripts/cwv_optimizer.js` | Scans codebase for bundle bloat, missing image dimensions (CLS), and 'use client' leaks | `node scripts/cwv_optimizer.js [dir]` |
| [references/nextjs-performance-checklist.md](references/nextjs-performance-checklist.md) | Checklist for achieving 95+ Google PageSpeed score | Performance guide |

---

## 🏎️ The 3 Core Web Vitals (2025 Targets)

| Metric | Target | Main Culprits in Web Apps | Mitigation |
|--------|--------|---------------------------|------------|
| **LCP** (Largest Contentful Paint) | `< 2.5s` | Huge unoptimized hero images, render-blocking fonts | Preload hero image with `priority`, use `next/font` |
| **CLS** (Cumulative Layout Shift) | `< 0.1` | Images without dimensions, late-injected banners | Always define `width`/`height` or `fill` with `sizes`, reserve ad/banner slots |
| **INP** (Interaction to Next Paint) | `< 200ms` | Heavy client JavaScript executing on main thread | Keep components as Server Components, wrap heavy updates in `startTransition` |

---

## 📦 Next.js 15 Tree-Shaking Configuration

In `next.config.js` / `next.config.mjs`, optimize package imports for heavy libraries:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'lodash'],
  },
};
export default nextConfig;
```

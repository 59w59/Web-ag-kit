---
name: react-performance
description: React 19 and Next.js 15 performance optimization patterns adapted from Vercel Engineering best practices. Covers waterfall elimination, bundle size reduction, barrel-file avoidance, Server Components parallelization, hydration flickering prevention, and re-render controls.
tags: [react, nextjs, performance, vercel, waterfalls, bundle-size, hydration, rsc]
role: [frontend-specialist, performance-optimizer]
phase: [build, review, refactor]
frameworks: [Next.js-15, React-19, TypeScript]
allowed-tools: Read, Grep, Glob, Edit, Write
injection-hardened: true
argument-hint: "[component-or-page-path]"
---

# React 19 & Next.js Performance Engineering

> "Waterfalls are the #1 performance killer in modern web applications. Every sequential await introduces avoidable network latency."

Origin: Adapted from Vercel Labs React Best Practices and `affaan-m/ECC`.

---

## 🎯 When to Activate

- Auditing or writing React 18/19 or Next.js 14/15 pages, components, and server actions.
- Investigating slow page loads (LCP regressions), bundle bloat, or slow interactions (INP > 200ms).
- Reviewing PRs touching `app/`, `pages/`, `components/`, or data fetching hooks.

---

## 🚫 Priority 1: Eliminating Network Waterfalls (CRITICAL)

### 1. Check Cheap Conditions Before `await`
Never fetch data before evaluating synchronous conditions:

```tsx
// ❌ BAD: Fetches flag even when id is invalid
async function UserPage({ id }: { id: string }) {
  const featureFlag = await getFeatureFlag('beta-user');
  if (!id || !featureFlag) return <NotFound />;
  const user = await getUser(id);
  return <UserProfile user={user} />;
}

// ✅ GOOD: Short-circuit on cheap sync check first
async function UserPage({ id }: { id: string }) {
  if (!id) return <NotFound />;
  const featureFlag = await getFeatureFlag('beta-user');
  if (!featureFlag) return <NotFound />;
  const user = await getUser(id);
  return <UserProfile user={user} />;
}
```

### 2. Parallelize Independent Data Requests
```tsx
// ❌ BAD: Sequential waterfall (3 RTTs)
const profile = await getProfile(userId);
const stats = await getStats(userId);
const activities = await getActivities(userId);

// ✅ GOOD: Parallel execution (1 RTT)
const [profile, stats, activities] = await Promise.all([
  getProfile(userId),
  getStats(userId),
  getActivities(userId),
]);
```

### 3. Server Components: Parallel Execution via Composition
When independent sections fetch their own data, split them into sibling Server Components wrapped in `<Suspense>`. React will stream them concurrently:

```tsx
// ✅ GOOD: Both components stream in parallel without blocking each other
export default async function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsSection />
      </Suspense>
      <Suspense fallback={<RecentOrdersSkeleton />}>
        <RecentOrdersSection />
      </Suspense>
    </div>
  );
}
```

---

## 📦 Priority 2: Bundle Size & Import Optimization (CRITICAL)

### 1. Avoid Barrel Imports
Barrel `index.ts` files force the bundler to parse hundreds of modules even when tree-shaking is active. Use direct subpath imports:

```tsx
// ❌ BAD: Imports barrel index, risking bundle bloating
import { Button, Dialog, Dropdown } from '@/components';
import { LucideShield, LucideLock } from 'lucide-react';

// ✅ GOOD: Direct imports (drastically cuts first-load JS)
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import LucideShield from 'lucide-react/dist/esm/icons/shield';
```

### 2. Dynamic Imports for Heavy Modals & Charts
```tsx
import dynamic from 'next/dynamic';

// Defer loading heavy chart library until user is on the analytics tab
const InteractiveChart = dynamic(
  () => import('@/components/charts/revenue-chart'),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
```

---

## 💧 Priority 3: Hydration & Rendering Guards

### 1. Zero-Flicker Theme & Locale via Inline Script
Never render default light mode on server and switch to dark mode in `useEffect` (causes noticeable flash of unstyled content - FOUC). Inject an inline blocking script in `<head>`:

```html
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(_){}})();`,
  }}
/>
```

### 2. Narrow Hydration Suppression
Use `suppressHydrationWarning` strictly on leaf elements (like timestamps), never on parent containers:

```tsx
// ✅ CORRECT: Only the leaf timestamp suppresses mismatch
<time dateTime={date.toISOString()} suppressHydrationWarning>
  {date.toLocaleDateString()}
</time>
```

### 3. Use `useTransition` for Non-Blocking Interactions
Wrap heavy filter, search, or sorting updates in `startTransition` to keep inputs responsive:

```tsx
const [isPending, startTransition] = useTransition();

function handleFilterChange(category: string) {
  startTransition(() => {
    setSelectedCategory(category);
  });
}
```

---

## 🚀 Priority 4: JavaScript Micro-Optimizations

- **`Set` / `Map` for Membership:** Use `new Set(ids).has(target)` ($O(1)$) instead of `array.includes(target)` ($O(n)$) when searching in loops.
- **Combined Transformations:** Use `.flatMap()` or single `.reduce()` instead of chaining `.filter().map()` over large arrays.
- **Stable Callback References:** Keep latest callback in `useRef` to avoid recreating event listeners in effects.

---

## 📊 Core Web Vitals Correlation

| Vitals Metric | Direct Code Fix |
|---------------|-----------------|
| **LCP** | Parallelize RSC queries, remove server waterfalls, prioritize hero image. |
| **INP** | Wrap state dispatches in `startTransition`, replace synchronous barrel parsing. |
| **CLS** | Provide explicit aspect-ratio or dimensions for images and skeleton loaders. |

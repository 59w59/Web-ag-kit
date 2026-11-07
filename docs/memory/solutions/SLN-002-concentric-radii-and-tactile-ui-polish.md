# SLN-002: Concentric Radii Formula & Tactile Micro-Interactions

- **Date:** 2026-11-07
- **Author Agent:** @frontend-specialist
- **Tags:** [design-engineering, tailwind, ui-polish, concentric-radii, micro-interactions]
- **Status:** Validated

## 1. Context & Challenge
AI-generated cards with nested badges, avatars, or inputs often look visually amateurish ("AI slop") due to equal radii (`rounded-2xl` on both outer card and inner element), causing distorted, pinched corner spacing.

## 2. The Winning Pattern
Apply the concentric corner formula:
```text
outer_radius = inner_radius + padding
```

Pair with tactile `:active` micro-press feedback and optical alignment on asymmetric icons:

```tsx
// Outer: 24px = Inner: 12px + Padding: 12px (p-3)
<div className="rounded-[24px] p-3 bg-neutral-900 border border-white/10 shadow-lg">
  <div className="rounded-[12px] bg-neutral-800 p-4 transition-transform duration-150 active:scale-[0.98]">
    <button className="relative flex items-center justify-center p-2 rounded-lg">
      <span className="absolute -inset-2.5" aria-hidden="true" /> {/* 44x44px touch area */}
      <PlayIcon className="w-5 h-5 ml-0.5 fill-current" /> {/* Optical offset */}
    </button>
  </div>
</div>
```

## 3. Gotchas & Pitfalls Avoided
- Never use `transition: all`; target explicit properties (`transform, opacity, box-shadow`).
- Always use `font-variant-numeric: tabular-nums` on dynamic metrics/counters to eliminate layout jitter.

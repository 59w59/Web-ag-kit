---
name: make-interfaces-feel-better
description: Apply concrete design-engineering details that make interfaces feel polished and crafted. Covers concentric radii, optical alignment, layered shadows, spring dynamics, text-wrapping, tabular numbers, image outlines, transition scopes, and 44x44px touch targets.
tags: [frontend, design-engineering, ui, ux, micro-interactions, polish, styling]
role: [frontend-specialist]
phase: [design, build, review]
frameworks: [TailwindCSS, CSS, React, Next.js]
allowed-tools: Read, Grep, Glob, Edit, Write
injection-hardened: true
argument-hint: "[component-or-css-file]"
---

# Make Interfaces Feel Better

> "Great interfaces are not made of generic components; they are made of compounded micro-decisions that respect human perception."

Origin: Adapted from the design-engineering corpus of `affaan-m/ECC` (Community PR #1659 by `linus707`).

---

## 🎯 When to Activate

- The user says the UI feels "flat", "generic", "cramped", "jumpy", or "unfinished".
- Building interactive components: buttons, cards, popovers, dropdowns, dashboards, navigation, form controls.
- Designing state transitions: hover, active, focus-visible, enter, exit, loading skeletons, empty states.
- Running frontend design review passes to elevate code from "functional" to "delightful".

---

## 📐 Core Design-Engineering Principles

### 1. Concentric Radius (Nested Rounded Corners)

When nesting rounded containers (e.g. an icon or avatar inside a card or badge), matching radii looks visually broken and creates awkward corner pinch.

**The Golden Formula:**
```text
outer_radius = inner_radius + padding
```

#### Tailwind Example:
```tsx
// ❌ BAD: Same radius causes optical distortion and thick corner pinching
<div className="rounded-2xl p-3 bg-neutral-900">
  <div className="rounded-2xl bg-neutral-800 p-4">...</div>
</div>

// ✅ GOOD: Concentric radius (Outer: 24px = Inner: 12px + Padding: 12px)
<div className="rounded-[24px] p-3 bg-neutral-900">
  <div className="rounded-[12px] bg-neutral-800 p-4">...</div>
</div>
```

*Note:* If padding is large (>32px), treat layers as independent surfaces rather than dogmatically inflating the outer radius.

---

### 2. Optical Alignment Over Pure Geometric Centering

Geometric centering frequently fails human perception because of visual weight distribution:
- **Play Buttons / Triangles:** Center of mass is to the right. Shift right by `1px` or `2px` (`translate-x-0.5`).
- **Chevrons & Arrows:** Asymmetric glyphs need manual nudges inside circular buttons.
- **Badges with Icons:** Center icon with cap-height of adjacent text, not overall font line-height.

```tsx
// ✅ Optical adjustment for a play icon in a circle button
<button className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-600">
  <PlayIcon className="h-5 w-5 ml-0.5 fill-current" />
</button>
```

---

### 3. Layered Shadows & Subtle Inset Borders

Avoid harsh, single-point black drop shadows (`box-shadow: 0 4px 6px rgba(0,0,0,0.4)`). Real light diffuses across multiple planes:

```css
/* Ambient soft layered shadow + 1px crisp separation */
.card-elevation {
  box-shadow:
    0 1px 2px -1px rgba(0, 0, 0, 0.08),
    0 4px 8px -2px rgba(0, 0, 0, 0.06),
    0 12px 24px -4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08); /* Dark mode edge */
}
```

---

### 4. Typography Polish

- **`text-wrap: balance`**: Mandatory for hero titles, section headings, and modals to eliminate awkward single-word orphans.
- **`text-wrap: pretty`**: Ideal for subtitles, card descriptions, and callout blocks.
- **`font-variant-numeric: tabular-nums`**: Essential for counters, timers, financial figures, stock quotes, and table values so digits don't jitter during updates:

```tsx
// ✅ Stable tabular numerals prevent layout jitter
<span className="font-mono tabular-nums text-lg font-semibold">
  ${balance.toFixed(2)}
</span>
```

---

### 5. Font Smoothing & Image Outlines

1. **Subtle Neutral Outlines on Images:** Prevents bright or dark photography from bleeding uncontrollably into the background:
```css
img.avatar, img.hero-thumb {
  outline: 1px solid rgba(0, 0, 0, 0.08);
  outline-offset: -1px;
}
@media (prefers-color-scheme: dark) {
  img.avatar, img.hero-thumb {
    outline-color: rgba(255, 255, 255, 0.12);
  }
}
```

2. **Font Antialiasing on macOS/Webkit:**
```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

### 6. Tactile Motion & Transition Discipline

- 🚫 **NEVER use `transition: all`:** It taxes GPU/CPU, animates irrelevant layout properties, and causes jank on resize.
- ✅ **Explicit Transition Properties:**
```css
/* Target only transform, opacity, and background-color */
.interactive-pill {
  transition-property: transform, opacity, background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* Snappy spring-like feel */
}

/* Micro-press tactile feedback */
.interactive-pill:active {
  transform: scale(0.97);
}
```
- **Asymmetric Transitions:** Enter should be smooth and deliberate (200-250ms), exit should be snappy and quiet (120-150ms).

---

### 7. Touch & Hit Targets (44×44px Rule)

Visual size can be compact (e.g. 24px icon button), but clickable hit target must never be under **40×40px** (WCAG recommends **44×44px**):

```tsx
// Compact visual button with expanded hit area via pseudo-element
<button className="relative p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
  <span className="absolute -inset-2.5" aria-hidden="true" />
  <SettingsIcon className="w-5 h-5 text-neutral-400" />
</button>
```

---

## 📋 Design Engineering Review Checklist

Before finishing UI components, verify:
- [ ] **Concentric Radii:** Inner elements have smaller radius matching `outer - padding`.
- [ ] **Tabular Numerals:** Changing numbers have `tabular-nums` applied.
- [ ] **Headings:** Wrapped with `text-wrap: balance` to prevent orphans.
- [ ] **Transitions:** No `transition: all` present in CSS / Tailwind classes.
- [ ] **Tactile Feedback:** Buttons have a subtle `:active` press state (`scale(0.97)` or `brightness`).
- [ ] **Hit Areas:** Small icons have expanded hit targets (`-inset-2.5`).
- [ ] **Optical Balance:** Asymmetric icons (play, chevron, back arrow) are nudged optically.

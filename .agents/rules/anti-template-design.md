---
paths:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.vue"
  - "**/*.html"
---

# Web Design Quality & Anti-Template Policy

> "Do not ship generic template-looking UI. Frontend output should look intentional, opinionated, and bespoke to the product domain."

Origin: Adapted from the design standards of `affaan-m/ECC`.

---

## 🚫 Banned Generic Patterns

AI coding agents tend to fall into stereotypical Tailwind templates. The following patterns are strictly banned in production UI:
1. **The Centered Gradient Hero:** Massive centered title with a generic purple/blue background radial blur and centered generic CTA.
2. **Dashboard-by-Numbers:** Monotonous 3-card grid with identical padding, uniform drop shadow, and no clear visual hierarchy.
3. **Card-In-Card Hell:** Nesting cards inside cards inside cards instead of using whitespace, subtle lines, or surface tint.
4. **Safe Corporate Slate:** 50 shades of slate gray with a single bright blue button.
5. **Uniform Border Radii:** Using `rounded-xl` on everything from avatars to modals, ignoring concentric radii rules.

---

## ✅ Required Design Qualities (Minimum 4 Required per Screen)

Every meaningful frontend surface crafted in this workspace MUST demonstrate at least four of these deliberate characteristics:

1. **Hierarchy Through Scale Contrast:** Significant typographic size jumps (e.g. 36px/40px hero stat vs 13px label) rather than uniform medium text.
2. **Rhythmic Spacing:** Varying padding and margins intentionally (dense data tables vs generous editorial whitespace).
3. **Layered Depth:** Multi-stop transparent shadows, subtle inset borders (`border-white/10` in dark mode), or subtle surface elevations.
4. **Typography with Character:** Deliberate font styling, tracking (`tracking-tight` on large titles), and `tabular-nums` on metrics.
5. **Semantic Color Strategy:** Color used for meaning (status, trends, alerts) rather than pure decorative blobs.
6. **Designed Interaction States:** Purposeful hover, active, and focus-visible states on all interactive controls.
7. **Optical Alignment:** Asymmetric icons (play, chevron, back) nudged optically rather than relying strictly on geometric center.
8. **Concentric Radii:** Inner corners smaller than outer corners (`outer = inner + padding`).

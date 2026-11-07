---
name: self-healing-qa
description: Generates, audits, and repairs resilient End-to-End tests using Playwright. Eliminates brittle selectors, enforces web-first assertions, and applies semantic accessibility locators that withstand UI redesigns.
tags: [qa, testing, playwright, e2e, self-healing, automation]
role: [qa-automation-engineer, test-engineer, frontend-specialist]
phase: [build, test, verify]
frameworks: [Playwright, Testing-Library, WCAG]
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
argument-hint: "[tests-directory-or-spec-file]"
---

# Self-Healing QA & Resilient E2E Testing

> "Tests should verify what the user experiences, not how CSS is styled." Build robust, self-healing Playwright suites that survive UI refactors.

---

## 🔧 Runtime Scripts & References

| Tool / Reference | Purpose | Usage |
|------------------|---------|-------|
| `scripts/test_healing_runner.js` | Audits test files for brittle CSS classes, deep DOM hierarchies, and flaky sleeps | `node scripts/test_healing_runner.js [dir]` |
| [references/resilient-selectors.md](references/resilient-selectors.md) | Locator priority hierarchy and healing strategies | Guide on resilient Playwright locators |

---

## 🏆 The Playwright Locator Hierarchy (Priority Order)

```
1. USER-FACING ROLES (Best - Resilient & Accessible)
   page.getByRole('button', { name: 'Submit Payment' })
   page.getByRole('heading', { level: 1 })

2. LABELS & PLACEHOLDERS (Great for form inputs)
   page.getByLabel('Email Address')
   page.getByPlaceholder('name@company.com')

3. ACCESSIBILITY TEXT & ALT
   page.getByText('Invoice #1042')
   page.getByAltText('Company Logo')

4. EXPLICIT TEST IDS (Fallback for complex widgets)
   page.getByTestId('checkout-summary-card')

❌ NEVER USE:
   page.locator('.bg-blue-600.hover\\:bg-blue-700')  // Breaks on Tailwind redesign
   page.locator('div > div:nth-child(3) > span')      // Breaks on any layout tweak
   page.waitForTimeout(5000)                         // Introduces flaky timing
```

---

## 🔄 Self-Healing Process on Test Failure

When a test fails because an element was moved or modified:
1. **Capture DOM & ARIA snapshot** at the point of failure.
2. **Search for semantic match**: Query the accessibility tree for an element with the same role and accessible name.
3. **Auto-propose the modern locator**: Swap brittle CSS selector with `getByRole` or `getByLabel`.
4. **Re-run test in headless mode** to confirm the fix.

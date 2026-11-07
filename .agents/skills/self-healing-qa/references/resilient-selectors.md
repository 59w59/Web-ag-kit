# Playwright Resilient Locators Cheat Sheet

Quick reference for writing Playwright tests that do not break when CSS classes change.

---

## 1. Forms & Inputs
```typescript
// ❌ Fragile:
await page.locator('input[type="email"]').fill('user@example.com');

// ✅ Resilient (Accessible):
await page.getByLabel('Email Address').fill('user@example.com');
```

## 2. Buttons & Actions
```typescript
// ❌ Fragile:
await page.locator('.btn-primary').click();

// ✅ Resilient:
await page.getByRole('button', { name: 'Save Changes' }).click();
```

## 3. Web-First Assertions (Eliminating Flakiness)
```typescript
// ❌ Flaky sleep:
await page.waitForTimeout(3000);
expect(await page.locator('.modal').isVisible()).toBe(true);

// ✅ Web-first auto-waiting assertion:
await expect(page.getByRole('dialog')).toBeVisible();
```

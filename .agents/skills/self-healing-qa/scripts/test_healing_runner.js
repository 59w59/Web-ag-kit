#!/usr/bin/env node
/**
 * Self-Healing QA & Resilient Locator Auditor
 * Scans Playwright/Cypress test files for brittle selectors and suggests resilient,
 * accessibility-first self-healing replacements.
 *
 * Usage:
 *   node test_healing_runner.js <tests-dir> [--json]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || 'tests';
const isJson = process.argv.includes('--json');

const BRITTLE_SELECTOR_PATTERNS = [
  {
    id: 'QA-LOC-001',
    name: 'Tailwind / Utility Class Locator (Brittle)',
    severity: 'high',
    regex: /(?:page\.locator|cy\.get)\s*\(\s*["'][^"']*\b(?:bg-|text-|p-|m-|flex|grid|rounded|shadow)[a-zA-Z0-9_-]+[^"']*["']\s*\)/g,
    recommendation: 'Replace styling classes with page.getByRole() or page.getByLabel() so tests do not break on redesigns.'
  },
  {
    id: 'QA-LOC-002',
    name: 'Deep DOM Hierarchy / Fragile Path',
    severity: 'high',
    regex: /(?:page\.locator|cy\.get)\s*\(\s*["'][^"']*(?:>\s*div\s*>\s*div|\/\/[a-zA-Z0-9_]+\/div\/div)[^"']*["']\s*\)/g,
    recommendation: 'Avoid tight DOM structural coupling. Use semantic roles (getByRole) or scoped data-testid.'
  },
  {
    id: 'QA-LOC-003',
    name: 'Hardcoded Arbitrary Sleep / Timeout',
    severity: 'medium',
    regex: /(?:page\.waitForTimeout|cy\.wait)\s*\(\s*[0-9]{3,}\s*\)/g,
    recommendation: 'Replace fixed sleeps with web-first assertions (e.g. expect(locator).toBeVisible()) to eliminate flakiness.'
  }
];

const SCAN_EXTENSIONS = new Set(['.ts', '.js', '.tsx', '.jsx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);

function scanTests(dir, findings = []) {
  if (!fs.existsSync(dir)) return findings;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanTests(fullPath, findings);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of BRITTLE_SELECTOR_PATTERNS) {
          pattern.regex.lastIndex = 0;
          let match;
          while ((match = pattern.regex.exec(content)) !== null) {
            const line = content.substring(0, match.index).split('\n').length;
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              file: path.relative(targetDir, fullPath),
              line,
              recommendation: pattern.recommendation,
              snippet: match[0].substring(0, 75).replace(/\r?\n/g, ' ')
            });
          }
        }
      } catch (err) {}
    }
  }
  return findings;
}

const findings = scanTests(path.resolve(targetDir));

if (isJson) {
  console.log(JSON.stringify({ target: targetDir, total: findings.length, findings }, null, 2));
  process.exit(0);
}

console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
console.log(`\x1b[1m🧪 Self-Healing QA & Resilient Locator Audit\x1b[0m`);
console.log(`Target: \x1b[34m${targetDir}\x1b[0m`);
console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (CLEAN - ALL TESTS RESILIENT)\x1b[0m' : `\x1b[33m${findings.length} fragile locators found\x1b[0m`}`);
console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

if (findings.length === 0) {
  console.log('\x1b[32m✔ No brittle styling classes, deep DOM paths, or arbitrary sleep statements found.\x1b[0m\n');
} else {
  findings.forEach((f, idx) => {
    const color = f.severity === 'high' ? '\x1b[31m[FRAGILE TEST]' : '\x1b[33m[FLAKY TIMING]';
    console.log(`${color} ${idx + 1}. [${f.id}] ${f.name}\x1b[0m`);
    console.log(`   File: ${f.file}:${f.line}`);
    console.log(`   Recommendation: ${f.recommendation}`);
    console.log(`   Snippet: \x1b[90m${f.snippet}\x1b[0m\n`);
  });
}

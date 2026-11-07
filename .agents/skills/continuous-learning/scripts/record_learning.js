#!/usr/bin/env node

/**
 * Living Memory & Continuous Learning Recorder
 * Auto-creates structured solution files and updates the project memory index.
 */

const fs = require('fs');
const path = require('path');

const memoryDir = path.resolve(process.cwd(), 'docs/memory');
const solutionsDir = path.join(memoryDir, 'solutions');
const indexPath = path.join(memoryDir, 'INDEX.json');
const learningsPath = path.join(memoryDir, 'LEARNINGS.md');

// Ensure directories exist
if (!fs.existsSync(solutionsDir)) {
  fs.mkdirSync(solutionsDir, { recursive: true });
}

// Parse arguments
const args = process.argv.slice(2);
function getArg(name, fallback = '') {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return fallback;
}

const title = getArg('title', 'Novel Solution');
const tags = getArg('tags', 'general').split(',').map(t => t.trim().toLowerCase());
const problem = getArg('problem', 'Challenge solved during implementation.');
const solution = getArg('solution', 'Implemented winning pattern.');
const gotcha = getArg('gotcha', 'None specified.');
const author = getArg('author', 'Full-Agent Squad');

// Load or create INDEX.json
let index = [];
if (fs.existsSync(indexPath)) {
  try {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (_) {
    index = [];
  }
}

// Calculate next SLN number
const nextNum = String(index.length + 1).padStart(3, '0');
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const filename = `SLN-${nextNum}-${slug}.md`;
const filePath = path.join(solutionsDir, filename);
const today = new Date().toISOString().split('T')[0];

const fileContent = `# SLN-${nextNum}: ${title}

- **Date:** ${today}
- **Author Agent:** ${author}
- **Tags:** [${tags.join(', ')}]
- **Status:** Validated

## 1. Context & Challenge
${problem}

## 2. The Winning Pattern
${solution}

## 3. Gotchas & Pitfalls Avoided
${gotcha}

## 4. Canonical Reference
\`\`\`typescript
// Reference implementation verified in project
\`\`\`
`;

fs.writeFileSync(filePath, fileContent, 'utf8');

// Update index
index.push({
  id: `SLN-${nextNum}`,
  title,
  file: `solutions/${filename}`,
  date: today,
  tags,
  author
});
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');

// Update LEARNINGS.md
const tableRow = `| [SLN-${nextNum}](solutions/${filename}) | ${title} | \`${tags.join('`, `')}\` | ${today} |\n`;

if (!fs.existsSync(learningsPath)) {
  const initialLearnings = `# Project Living Memory & Validated Learnings

This catalog contains architectural successes, solved bugs, and reusable patterns distilled by the AI Full-Agent Squad.

| ID | Title | Tags | Date |
|---|---|---|---|
${tableRow}`;
  fs.writeFileSync(learningsPath, initialLearnings, 'utf8');
} else {
  fs.appendFileSync(learningsPath, tableRow, 'utf8');
}

console.log(`\x1b[32m✔ Learning recorded successfully:\x1b[0m docs/memory/solutions/${filename}`);
console.log(`\x1b[36m✔ Memory Index updated:\x1b[0m ${index.length} total learnings registered.`);

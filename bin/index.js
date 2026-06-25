#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(process.argv[2] || '.');
const sourceAgents = path.join(__dirname, '../.agents');
const targetAgents = path.join(targetPath, '.agents');

console.log('\n\x1b[36m%s\x1b[0m', '🚀 Initializing Web-ag-kit agent workspace...');

try {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Check if .agents already exists in target
  if (fs.existsSync(targetAgents)) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️  A .agents folder already exists in the target directory.');
  }

  // Copy .agents folder recursively
  fs.cpSync(sourceAgents, targetAgents, { recursive: true });

  console.log('\x1b[32m%s\x1b[0m', '✅ Web-ag-kit initialized successfully!');
  console.log(`\nWorkspace template installed at: \x1b[34m${targetAgents}\x1b[0m`);
  console.log('\nNext steps:');
  console.log('  1. Open your project in VS Code / Cursor.');
  console.log('  2. Ensure Antigravity is active.');
  console.log('  3. Enjoy full-stack automation, specialized agents, and testing suites!');
} catch (err) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Initialization failed:', err.message);
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Scrapling Automated Installer & Health Checker
 * Verifies Python / uv environment, installs Scrapling with all extras,
 * installs stealth browser binaries, and verifies installation.
 *
 * Usage:
 *   node install_scrapling.js [--check-only]
 */

const { execSync, spawnSync } = require('child_process');

console.log('\n\x1b[36m🕷️  Scrapling Automated Setup & Health Check\x1b[0m\n');

function runCmd(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    return null;
  }
}

// 1. Detect Python or UV
let pythonCmd = null;
const candidates = ['uv', 'python3', 'python', 'py'];

for (const c of candidates) {
  const versionOut = runCmd(`${c} --version`);
  if (versionOut) {
    pythonCmd = c;
    console.log(`\x1b[32m✔ Found runtime:\x1b[0m ${c} (${versionOut})`);
    break;
  }
}

if (!pythonCmd) {
  console.error('\x1b[31m❌ Python 3.10+ or uv is not installed or not in PATH.\x1b[0m');
  console.log('\n\x1b[1mTo install Python on Windows:\x1b[0m');
  console.log('  winget install -e --id Python.Python.3.12');
  console.log('  # or install UV (ultra-fast Python package manager):');
  console.log('  winget install -e --id astral-sh.uv\n');
  console.log('Or use the official Docker image:');
  console.log('  docker pull pyd4vinci/scrapling\n');
  process.exit(1);
}

// 2. Install Scrapling
console.log('\n\x1b[34m📦 Installing Scrapling with all features (stealth fetcher, spiders, anti-bot bypass)...\x1b[0m');

try {
  if (pythonCmd === 'uv') {
    console.log('Running: uv pip install "scrapling[all]>=0.5.1"');
    execSync('uv pip install "scrapling[all]>=0.5.1"', { stdio: 'inherit' });
  } else {
    console.log(`Running: ${pythonCmd} -m pip install --upgrade "scrapling[all]>=0.5.1"`);
    execSync(`${pythonCmd} -m pip install --upgrade "scrapling[all]>=0.5.1"`, { stdio: 'inherit' });
  }
  console.log('\x1b[32m✔ Scrapling package installed successfully!\x1b[0m');
} catch (err) {
  console.error('\x1b[31m❌ Failed to install scrapling package via pip.\x1b[0m', err.message);
  process.exit(1);
}

// 3. Install Stealth Browser Dependencies
console.log('\n\x1b[34m🌐 Installing stealth browser dependencies (Playwright Chromium)...\x1b[0m');
try {
  execSync('scrapling install --force', { stdio: 'inherit' });
  console.log('\x1b[32m✔ Stealth browser binaries installed!\x1b[0m');
} catch (err) {
  console.warn('\x1b[33m⚠️  "scrapling install" fallback: trying python module...\x1b[0m');
  try {
    execSync(`${pythonCmd} -m scrapling install --force`, { stdio: 'inherit' });
    console.log('\x1b[32m✔ Stealth browser binaries installed via module call!\x1b[0m');
  } catch (e) {
    console.warn('\x1b[33m⚠️  Could not run automated browser installation. You can run "scrapling install" manually.\x1b[0m');
  }
}

// 4. Verification Check
console.log('\n\x1b[1m🔍 Verifying Scrapling installation...\x1b[0m');
const verifyOut = runCmd(`${pythonCmd} -c "import scrapling; print('Scrapling version:', scrapling.__version__)"`);

if (verifyOut) {
  console.log(`\x1b[32m${verifyOut}\x1b[0m`);
  console.log('\n\x1b[32m🎉 Scrapling is fully installed and ready to scrape!\x1b[0m');
  console.log('\nExample CLI usage:');
  console.log('  scrapling extract get "https://example.com" content.md --ai-targeted');
  console.log('  scrapling extract fetch "https://cloudflare-protected.com" result.html --solve-cloudflare --ai-targeted\n');
} else {
  console.log('\x1b[33m⚠️  Package installed, but verify check returned non-standard output. Please test in terminal.\x1b[0m');
}

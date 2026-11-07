#!/usr/bin/env node
/**
 * Core Web Vitals & Next.js Performance Scanner
 * Scans Next.js and React codebases for bundle bloat, barrel file imports,
 * unoptimized images (CLS risks), and Server Component leaks.
 *
 * Usage:
 *   node cwv_optimizer.js <project-or-app-dir> [--json]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.';
const isJson = process.argv.includes('--json');

const PERF_PATTERNS = [
  {
    id: 'CWV-IMG-001',
    name: 'Raw <img> Tag Used (Missing Next.js Image Optimization)',
    severity: 'high',
    regex: /<img\s+[^>]*src=/g,
    recommendation: 'Use next/image (<Image />) to automatically serve modern formats (WebP/AVIF) and prevent CLS.'
  },
  {
    id: 'CWV-IMG-002',
    name: 'Next.js <Image /> with fill missing "sizes"',
    severity: 'medium',
    regex: /<Image[^>]+fill(?![^>]*sizes=)[^>]*\/?>/g,
    recommendation: 'When using fill, always specify sizes="(max-width: 768px) 100vw, 50vw" to prevent downloading oversized images.'
  },
  {
    id: 'CWV-BUNDLE-001',
    name: 'Heavy Barrel File Import (Bundle Bloat Risk)',
    severity: 'medium',
    regex: /import\s*\{[^}]{15,}\}\s*from\s*['"](?:lucide-react|@radix-ui\/react-icons|react-icons)[^'"]*['"]/g,
    recommendation: 'Enable modularizeImports or optimizePackageImports in next.config.js for icon libraries.'
  },
  {
    id: 'CWV-RSC-001',
    name: 'Unnecessary "use client" on Static Leaf Component',
    severity: 'low',
    check: (content, filename) => {
      if (!filename.endsWith('.tsx') && !filename.endsWith('.jsx')) return false;
      const hasUseClient = /^['"]use client['"]/m.test(content);
      const hasInteractiveHooks = /\b(?:useState|useEffect|useReducer|useRef|useContext|onClick|onChange|onSubmit)\b/.test(content);
      return hasUseClient && !hasInteractiveHooks;
    },
    recommendation: 'Remove "use client" if component does not use React hooks or browser event listeners to keep it as a Server Component.'
  }
];

const SCAN_EXTENSIONS = new Set(['.tsx', '.jsx', '.ts', '.js']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);

function scanPerf(dir, findings = []) {
  if (!fs.existsSync(dir)) return findings;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanPerf(fullPath, findings);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of PERF_PATTERNS) {
          if (pattern.check && pattern.check(content, entry.name)) {
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              file: path.relative(targetDir, fullPath),
              recommendation: pattern.recommendation,
              snippet: '"use client" found with no hooks or event listeners'
            });
          } else if (pattern.regex) {
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
        }
      } catch (err) {}
    }
  }
  return findings;
}

const findings = scanPerf(path.resolve(targetDir));

if (isJson) {
  console.log(JSON.stringify({ target: targetDir, total: findings.length, findings }, null, 2));
  process.exit(0);
}

console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
console.log(`\x1b[1m⚡ Core Web Vitals & Next.js Performance Audit\x1b[0m`);
console.log(`Target: \x1b[34m${targetDir}\x1b[0m`);
console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (OPTIMAL CORE WEB VITALS)\x1b[0m' : `\x1b[33m${findings.length} performance bottlenecks found\x1b[0m`}`);
console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

if (findings.length === 0) {
  console.log('\x1b[32m✔ No raw <img> tags, un-treeshaken barrel imports, or unnecessary "use client" leaks detected.\x1b[0m\n');
} else {
  findings.forEach((f, idx) => {
    const color = f.severity === 'high' ? '\x1b[31m[HIGH IMPACT]' : '\x1b[33m[MEDIUM IMPACT]';
    console.log(`${color} ${idx + 1}. [${f.id}] ${f.name}\x1b[0m`);
    console.log(`   File: ${f.file}${f.line ? `:${f.line}` : ''}`);
    console.log(`   Recommendation: ${f.recommendation}`);
    console.log(`   Snippet: \x1b[90m${f.snippet}\x1b[0m\n`);
  });
}

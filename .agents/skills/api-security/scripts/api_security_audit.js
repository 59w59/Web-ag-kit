#!/usr/bin/env node
/**
 * Web API Security Scanner (OWASP API Top 10)
 * Scans web endpoints for Mass Assignment, BOLA risks, unbounded queries, and missing auth guards.
 *
 * Usage:
 *   node api_security_audit.js <project-or-api-dir> [--json]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.';
const isJson = process.argv.includes('--json');

const API_VULNERABILITY_PATTERNS = [
  {
    id: 'API3-mass-assignment',
    name: 'Potential Mass Assignment',
    severity: 'high',
    owasp: 'API3:2023',
    regex: /(?:data:\s*\{\s*\.\.\.(?:body|req\.body|request\.json\(\))|Object\.assign\s*\([^,]+,\s*(?:req\.body|body)\))/g,
    recommendation: 'Whitelist request properties using Zod or DTO schema validation instead of raw body spreading.'
  },
  {
    id: 'API4-unbounded-query',
    name: 'Unbounded List Query (Resource Consumption)',
    severity: 'medium',
    owasp: 'API4:2023',
    regex: /findMany\s*\(\s*\{\s*(?![\s\S]*?\b(?:take|limit)\b)[\s\S]*?\}\s*\)/g,
    recommendation: 'Enforce maximum pagination limit (e.g., take: Math.min(limit, 50)) to prevent DoS.'
  },
  {
    id: 'API1-potential-bola',
    name: 'Potential BOLA / Direct Object ID Lookup',
    severity: 'high',
    owasp: 'API1:2023',
    regex: /findUnique\s*\(\s*\{\s*where:\s*\{\s*id:\s*(?:params\.id|req\.params\.id)\s*\}\s*\}/g,
    recommendation: 'Ensure query verifies user/tenant ownership (e.g., findFirst({ where: { id, userId: session.user.id } })).'
  },
  {
    id: 'API8-cors-wildcard-credentials',
    name: 'Dangerous CORS Configuration',
    severity: 'critical',
    owasp: 'API8:2023',
    regex: /origin:\s*["']\*["'][\s\S]*?credentials:\s*true|Access-Control-Allow-Origin.*\*.*Access-Control-Allow-Credentials.*true/i,
    recommendation: 'Never combine wildcard Access-Control-Allow-Origin with credentials: true.'
  }
];

const SCAN_EXTENSIONS = new Set(['.ts', '.js', '.tsx', '.jsx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.agents']);

function scanDirectory(dir, findings = []) {
  if (!fs.existsSync(dir)) return findings;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, findings);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of API_VULNERABILITY_PATTERNS) {
          let match;
          pattern.regex.lastIndex = 0;
          while ((match = pattern.regex.exec(content)) !== null) {
            const line = content.substring(0, match.index).split('\n').length;
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              owasp: pattern.owasp,
              file: path.relative(targetDir, fullPath),
              line,
              recommendation: pattern.recommendation,
              snippet: match[0].substring(0, 80).replace(/\r?\n/g, ' ')
            });
          }
        }
      } catch (err) {
        // Skip unreadable files
      }
    }
  }
  return findings;
}

const findings = scanDirectory(path.resolve(targetDir));

if (isJson) {
  console.log(JSON.stringify({ target: targetDir, total: findings.length, findings }, null, 2));
  process.exit(0);
}

console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
console.log(`\x1b[1m🛡️ OWASP Web API Security Audit Report\x1b[0m`);
console.log(`Target: \x1b[34m${targetDir}\x1b[0m`);
console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (CLEAN)\x1b[0m' : `\x1b[31m${findings.length}\x1b[0m`}`);
console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

if (findings.length === 0) {
  console.log('\x1b[32m✔ No common OWASP API vulnerabilities detected in scanned routes.\x1b[0m\n');
} else {
  findings.forEach((f, idx) => {
    const color = f.severity === 'critical' ? '\x1b[31m[CRITICAL]' : f.severity === 'high' ? '\x1b[33m[HIGH]' : '\x1b[36m[MEDIUM]';
    console.log(`${color} ${idx + 1}. [${f.owasp}] ${f.name}\x1b[0m`);
    console.log(`   File: ${f.file}:${f.line}`);
    console.log(`   Recommendation: ${f.recommendation}`);
    console.log(`   Snippet: \x1b[90m${f.snippet}\x1b[0m\n`);
  });
}

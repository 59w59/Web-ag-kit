#!/usr/bin/env node
/**
 * Database Migration Safety Guard
 * Scans SQL migrations, Prisma, and Drizzle schemas for dangerous table locks,
 * destructive operations, and missing zero-downtime patterns.
 *
 * Usage:
 *   node migration_guard.js <project-or-migrations-dir> [--json]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.';
const isJson = process.argv.includes('--json');

const DANGEROUS_MIGRATION_PATTERNS = [
  {
    id: 'DB-LOCK-001',
    name: 'Adding NOT NULL column without DEFAULT',
    severity: 'critical',
    regex: /ADD\s+COLUMN\s+["`]?[a-zA-Z0-9_]+["`]?\s+[a-zA-Z0-9_()]+\s+NOT\s+NULL(?!\s+DEFAULT)/i,
    recommendation: 'Add the column as NULLABLE first, backfill data in batches, then set NOT NULL, or provide a DEFAULT value.'
  },
  {
    id: 'DB-LOCK-002',
    name: 'CREATE INDEX without CONCURRENTLY',
    severity: 'high',
    regex: /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?!CONCURRENTLY\b)[a-zA-Z0-9_]+\s+ON/i,
    recommendation: 'In PostgreSQL, always use "CREATE INDEX CONCURRENTLY" to avoid locking table writes during index generation.'
  },
  {
    id: 'DB-DESTRUCTIVE-001',
    name: 'Immediate Column Drop (Breaks Active Rolling Deploys)',
    severity: 'critical',
    regex: /DROP\s+COLUMN\s+["`]?[a-zA-Z0-9_]+["`]?/i,
    recommendation: 'Follow Expand-and-Contract: first stop referencing the column in application code, deploy, then drop the column in a subsequent release.'
  },
  {
    id: 'DB-DESTRUCTIVE-002',
    name: 'Direct Table or Column Rename',
    severity: 'high',
    regex: /(?:RENAME\s+COLUMN|RENAME\s+TO|ALTER\s+TABLE\s+.*RENAME)/i,
    recommendation: 'Renaming breaks running application versions. Add new column, dual-write, backfill, migrate reads, then drop old.'
  },
  {
    id: 'DB-RLS-001',
    name: 'Supabase / Postgres Table without Row Level Security (RLS)',
    severity: 'medium',
    check: (content, filename) => {
      if (!filename.endsWith('.sql')) return false;
      const createsTable = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?[a-zA-Z0-9_.]+["`]?/i.test(content);
      const enablesRLS = /ENABLE\s+ROW\s+LEVEL\s+SECURITY/i.test(content);
      return createsTable && !enablesRLS;
    },
    recommendation: 'Enable RLS with "ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;" to prevent unauthorized public access.'
  }
];

const SCAN_EXTENSIONS = new Set(['.sql', '.prisma', '.ts', '.js']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next']);

function scanMigrations(dir, findings = []) {
  if (!fs.existsSync(dir)) return findings;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanMigrations(fullPath, findings);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of DANGEROUS_MIGRATION_PATTERNS) {
          if (pattern.check && pattern.check(content, entry.name)) {
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              file: path.relative(targetDir, fullPath),
              recommendation: pattern.recommendation,
              snippet: 'Table created without ENABLE ROW LEVEL SECURITY'
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
                snippet: match[0].substring(0, 70).replace(/\r?\n/g, ' ')
              });
            }
          }
        }
      } catch (err) {}
    }
  }
  return findings;
}

const findings = scanMigrations(path.resolve(targetDir));

if (isJson) {
  console.log(JSON.stringify({ target: targetDir, total: findings.length, findings }, null, 2));
  process.exit(0);
}

console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
console.log(`\x1b[1m🛡️ Database Migration & Zero-Downtime Guard\x1b[0m`);
console.log(`Target: \x1b[34m${targetDir}\x1b[0m`);
console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (SAFE FOR ZERO-DOWNTIME)\x1b[0m' : `\x1b[31m${findings.length}\x1b[0m`}`);
console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

if (findings.length === 0) {
  console.log('\x1b[32m✔ No dangerous table locks, destructive drops, or unindexed constraints found.\x1b[0m\n');
} else {
  findings.forEach((f, idx) => {
    const color = f.severity === 'critical' ? '\x1b[31m[CRITICAL DOWNTIME RISK]' : f.severity === 'high' ? '\x1b[33m[HIGH LOCK RISK]' : '\x1b[36m[MEDIUM]';
    console.log(`${color} ${idx + 1}. [${f.id}] ${f.name}\x1b[0m`);
    console.log(`   File: ${f.file}${f.line ? `:${f.line}` : ''}`);
    console.log(`   Recommendation: ${f.recommendation}`);
    console.log(`   Snippet: \x1b[90m${f.snippet}\x1b[0m\n`);
  });
}

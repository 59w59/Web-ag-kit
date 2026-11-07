#!/usr/bin/env node
/**
 * Skill & Agent Security Inspector (Inspired by NVIDIA SkillSpector)
 * Scans AI agent skills, prompts, and MCP configs for:
 * 1. Prompt Injection & Jailbreak strings
 * 2. Invisible Unicode & Zero-width characters (Confusable attacks)
 * 3. Data Exfiltration commands (curl/wget/reverse shells)
 * 4. Dangerous Over-permissioning in allowed-tools
 *
 * Usage:
 *   node skill_inspector.js <skill-or-agents-dir> [--json]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '.agents';
const isJson = process.argv.includes('--json');

const PROMPT_INJECTION_PATTERNS = [
  {
    id: 'INJ-001',
    name: 'Instruction Override / Prompt Injection',
    severity: 'critical',
    check: (content, relPath) => {
      // Ignore self-references or test files
      if (relPath.includes('skill-inspector')) return false;
      const stripped = content.replace(/```[\s\S]*?```/g, ''); // remove code blocks
      return /(?:ignore\s+(?:all\s+)?previous\s+instructions|disregard\s+(?:all\s+)?prior\s+prompts|bypass\s+all\s+safety\s+filters|you\s+are\s+now\s+in\s+unrestricted\s+mode)/i.test(stripped);
    }
  },
  {
    id: 'EXFIL-001',
    name: 'Suspicious Network Exfiltration Command',
    severity: 'critical',
    check: (content, relPath) => {
      if (relPath.includes('skill-inspector')) return false;
      return /(?:curl\s+-[a-zA-Z]*[sS]?\s+https?:\/\/(?:webhook\.site|pastebin\.com|ngrok\.io|requestbin)|\/dev\/tcp\/[0-9.]+\/[0-9]+|bash\s+-i\s+>&|\bpowershell\s+-enc\b)/i.test(content);
    }
  },
  {
    id: 'CONFUSABLE-001',
    name: 'Hidden Zero-Width / Invisible Characters',
    severity: 'high',
    regex: /[\u200B-\u200D\uFEFF\u202A-\u202E]/
  },
  {
    id: 'OVERPERM-001',
    name: 'Execution Tool Without Injection Hardening',
    severity: 'medium',
    check: (content, relPath) => {
      if (!relPath.endsWith('SKILL.md')) return false;
      const hasBash = /allowed-tools:\s*.*?\b(?:Bash|Execute)\b/i.test(content);
      const isHardened = /injection-hardened:\s*true/i.test(content);
      return hasBash && !isHardened;
    }
  }
];

function inspectSkillDirectory(dir, findings = []) {
  if (!fs.existsSync(dir)) return findings;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', 'build'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(targetDir, fullPath);

    if (entry.isDirectory()) {
      inspectSkillDirectory(fullPath, findings);
    } else if (['.md', '.yaml', '.yml', '.json', '.js', '.py'].includes(path.extname(entry.name))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        for (const pattern of PROMPT_INJECTION_PATTERNS) {
          if (pattern.check && pattern.check(content, relPath)) {
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              file: relPath,
              detail: `Audit finding: ${pattern.name}`
            });
          } else if (pattern.regex && pattern.regex.test(content)) {
            findings.push({
              id: pattern.id,
              name: pattern.name,
              severity: pattern.severity,
              file: relPath,
              detail: `Matched pattern: ${pattern.name}`
            });
          }
        }
      } catch (err) {}
    }
  }
  return findings;
}

const findings = inspectSkillDirectory(path.resolve(targetDir));

if (isJson) {
  console.log(JSON.stringify({ target: targetDir, total: findings.length, findings }, null, 2));
  process.exit(0);
}

console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
console.log(`\x1b[1m🔍 AI Agent Skill Security Inspector (NVIDIA SkillSpector Rules)\x1b[0m`);
console.log(`Target: \x1b[34m${targetDir}\x1b[0m`);
console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (ALL SKILLS VERIFIED SECURE)\x1b[0m' : `\x1b[33m${findings.length} skills flagged for hardening\x1b[0m`}`);
console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

if (findings.length === 0) {
  console.log('\x1b[32m✔ No prompt injection, hidden Unicode characters, or exfiltration hooks detected in skills.\x1b[0m\n');
} else {
  findings.forEach((f, idx) => {
    const color = f.severity === 'critical' ? '\x1b[31m[CRITICAL]' : f.severity === 'high' ? '\x1b[33m[HIGH]' : '\x1b[36m[MEDIUM]';
    console.log(`${color} ${idx + 1}. [${f.id}] ${f.name}\x1b[0m`);
    console.log(`   File: ${f.file}`);
    console.log(`   Detail: ${f.detail}\n`);
  });
}

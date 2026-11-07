#!/usr/bin/env node
/**
 * Visual Security & Debugging Scanner (OCR & DOM Inspector)
 * 
 * Inspects target web pages or local builds for visual leaks, intrusion indicators,
 * defacement signatures, missing Turnstile shields, and clickjacking risks.
 * 
 * Usage:
 *   node visual_audit.js <url-or-html-file> [--json]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const target = process.argv[2];
const isJsonOutput = process.argv.includes('--json');

if (!target || target === '--help' || target === '-h') {
  console.log(`
\x1b[36m🔍 Visual Security & Debugging Inspector (Web-ag-kit)\x1b[0m

\x1b[1mUSAGE:\x1b[0m
  node visual_audit.js <url-or-html-file> [options]

\x1b[1mOPTIONS:\x1b[0m
  --json      Output pure JSON for agent consumption
  --help, -h  Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  node visual_audit.js https://myapp.local/login
  node visual_audit.js ./dist/index.html
`);
  process.exit(0);
}

// Security patterns for visual and DOM inspection
const AUDIT_RULES = [
  // 1. Defacement & Intrusion Signatures
  {
    id: 'intrusion-defacement',
    category: 'Intrusion Detection',
    severity: 'critical',
    regex: /(?:hacked\s+by|defaced\s+by|pwned\s+by|security\s+breach|all\s+your\s+database\s+are\s+belong)/i,
    description: 'Potential website defacement or breach notice detected on page.'
  },
  {
    id: 'intrusion-formjacking',
    category: 'Intrusion Detection',
    severity: 'critical',
    regex: /(?:eval\s*\(\s*unescape|document\.write\s*\(\s*unescape|fromCharCode\s*\(|payment.*\.value.*fetch\(["']https?:\/\/(?!localhost))/i,
    description: 'Suspicious obfuscated script or potential formjacking/Magecart injection.'
  },

  // 2. Visible Debug Screens & Stack Traces
  {
    id: 'debug-stack-trace',
    category: 'Information Leakage',
    severity: 'high',
    regex: /(?:Traceback\s*\(most\s+recent\s+call\s+last\)|at\s+[a-zA-Z0-9_.]+\s+\(.*:[0-9]+:[0-9]+\)|Fatal\s+error:.*in\s+.*\.php|Django\s+Version:.*Exception\s+Value:|Unhandled\s+Runtime\s+Error|Next\.js\s+\([0-9.]+\)\s+out-of-date)/i,
    description: 'Visible framework debug screen, stack trace, or unhandled runtime crash overlay.'
  },
  {
    id: 'debug-secret-leak',
    category: 'Information Leakage',
    severity: 'critical',
    regex: /(?:(?:postgres|mysql|mongodb):\/\/[a-zA-Z0-9_]+:[^@\s"']+@|(?:ghp|gho|ghu)_[a-zA-Z0-9]{36}|AKIA[0-9A-Z]{16}|0x4[a-zA-Z0-9_-]{30,60})/i,
    description: 'Exposed database connection string, cloud secret, or Turnstile private key visible on page.'
  },

  // 3. Auth & Bot Protection Form Checks
  {
    id: 'auth-missing-turnstile',
    category: 'Auth & Bot Protection',
    severity: 'medium',
    check: (html) => {
      const hasPasswordField = /<input[^>]+type=["']password["']/i.test(html);
      const hasTurnstile = /challenges\.cloudflare\.com\/turnstile|cf-turnstile/i.test(html);
      return hasPasswordField && !hasTurnstile;
    },
    description: 'Login or credential form found without active Cloudflare Turnstile / anti-bot defense.'
  },

  // 4. Insecure HTTP or Mixed Content
  {
    id: 'insecure-mixed-content',
    category: 'Network Security',
    severity: 'medium',
    regex: /<script[^>]+src=["']http:\/\/[^"']+/i,
    description: 'Insecure external script loaded via plain HTTP (vulnerable to MitM tampering).'
  }
];

function fetchTarget(targetUrl) {
  return new Promise((resolve, reject) => {
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      // Local file
      try {
        const content = fs.readFileSync(path.resolve(targetUrl), 'utf-8');
        return resolve({ html: content, headers: {} });
      } catch (err) {
        return reject(new Error(`Failed to read local file: ${err.message}`));
      }
    }

    const client = targetUrl.startsWith('https') ? https : http;
    client.get(targetUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const { html, headers } = await fetchTarget(target);
    const findings = [];

    // Run regex and custom checks
    for (const rule of AUDIT_RULES) {
      if (rule.regex && rule.regex.test(html)) {
        findings.push({
          id: rule.id,
          category: rule.category,
          severity: rule.severity,
          description: rule.description
        });
      } else if (rule.check && rule.check(html)) {
        findings.push({
          id: rule.id,
          category: rule.category,
          severity: rule.severity,
          description: rule.description
        });
      }
    }

    // Check Clickjacking headers if available
    if (Object.keys(headers).length > 0) {
      const xfo = headers['x-frame-options'];
      const csp = headers['content-security-policy'] || '';
      if (!xfo && !csp.includes('frame-ancestors')) {
        findings.push({
          id: 'clickjacking-vulnerable',
          category: 'UI Redressing / Clickjacking',
          severity: 'high',
          description: 'Page lacks X-Frame-Options or CSP frame-ancestors; vulnerable to clickjacking iframe attacks.'
        });
      }
    }

    // Determine Agent Coordination Recommendations
    const agentActions = [];
    if (findings.some(f => f.category === 'Intrusion Detection' || f.severity === 'critical')) {
      agentActions.push({
        agent: 'security-auditor',
        action: 'Immediate incident review: check origin integrity, server logs, and clean malicious scripts.'
      });
      agentActions.push({
        agent: 'penetration-tester',
        action: 'Audit perimeter defenses, check WAF block logs and verify exploit vectors.'
      });
    }
    if (findings.some(f => f.category === 'Information Leakage')) {
      agentActions.push({
        agent: 'debugger',
        action: 'Trace unhandled runtime exceptions, disable debug mode in production, sanitize client state.'
      });
    }
    if (findings.some(f => f.category === 'Auth & Bot Protection')) {
      agentActions.push({
        agent: 'frontend-specialist',
        action: 'Integrate Turnstile widget and secure form submission with server-side validation.'
      });
    }

    const report = {
      target,
      timestamp: new Date().toISOString(),
      findings_count: findings.length,
      findings,
      agent_coordination: agentActions
    };

    if (isJsonOutput) {
      console.log(JSON.stringify(report, null, 2));
      return;
    }

    // Pretty Terminal Output
    console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
    console.log(`\x1b[1m🔍 Visual Security & Debugging Audit Report\x1b[0m`);
    console.log(`Target: \x1b[34m${target}\x1b[0m`);
    console.log(`Total Findings: ${findings.length === 0 ? '\x1b[32m0 (CLEAN)\x1b[0m' : `\x1b[31m${findings.length}\x1b[0m`}`);
    console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

    if (findings.length === 0) {
      console.log('\x1b[32m✔ No visual security vulnerabilities or intrusion signs detected.\x1b[0m\n');
    } else {
      findings.forEach((f, idx) => {
        const color = f.severity === 'critical' ? '\x1b[31m[CRITICAL]' : f.severity === 'high' ? '\x1b[33m[HIGH]' : '\x1b[36m[MEDIUM]';
        console.log(`${color} ${idx + 1}. ${f.category}\x1b[0m: ${f.description}`);
      });

      console.log(`\n\x1b[1m🤖 Recommended Agent Actions:\x1b[0m`);
      agentActions.forEach(a => {
        console.log(`  • \x1b[35m@${a.agent}\x1b[0m: ${a.action}`);
      });
      console.log('');
    }

  } catch (err) {
    if (isJsonOutput) {
      console.log(JSON.stringify({ error: err.message }));
    } else {
      console.error(`\x1b[31m❌ Visual Audit Failed:\x1b[0m ${err.message}`);
    }
    process.exit(1);
  }
}

run();

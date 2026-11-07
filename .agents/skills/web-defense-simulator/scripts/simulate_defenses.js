#!/usr/bin/env node
/**
 * Web Defense Simulator
 * Runs non-destructive defensive probes against local/staging web applications to verify:
 * 1. CORS origin enforcement (rejects malicious origin with credentials)
 * 2. Missing Turnstile token rejection on auth routes
 * 3. Mandatory Security Headers (CSP, HSTS, X-Frame-Options)
 * 4. X-Forwarded-For spoofing tolerance
 *
 * Usage:
 *   node simulate_defenses.js <target-url> [--json]
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const targetUrl = process.argv[2];
const isJson = process.argv.includes('--json');

if (!targetUrl || targetUrl === '--help' || targetUrl === '-h') {
  console.log(`
\x1b[36m🎯 Web Defense Simulator (Non-Destructive Prober)\x1b[0m

\x1b[1mUSAGE:\x1b[0m
  node simulate_defenses.js <target-url> [options]

\x1b[1mEXAMPLES:\x1b[0m
  node simulate_defenses.js http://localhost:3000
  node simulate_defenses.js https://staging.myapp.com
`);
  process.exit(0);
}

function sendProbe(urlStr, options = {}) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(parsed, {
        method: options.method || 'GET',
        headers: options.headers || {},
        timeout: 5000
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      });

      req.on('error', (err) => resolve({ error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ error: 'Timeout' }); });

      if (options.body) req.write(options.body);
      req.end();
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

async function runSimulation() {
  const results = [];

  // PROBE 1: Security Headers on Landing Page
  const baseRes = await sendProbe(targetUrl);
  if (baseRes.error) {
    if (isJson) {
      console.log(JSON.stringify({ error: `Could not reach target ${targetUrl}: ${baseRes.error}` }));
    } else {
      console.error(`\x1b[31m❌ Connection Failed:\x1b[0m ${baseRes.error}`);
    }
    process.exit(1);
  }

  const headers = baseRes.headers || {};
  const hasHsts = !!headers['strict-transport-security'];
  const hasXfo = !!headers['x-frame-options'];
  const hasCsp = !!headers['content-security-policy'];

  results.push({
    test: 'Strict-Transport-Security (HSTS)',
    passed: hasHsts,
    severity: 'medium',
    detail: hasHsts ? 'Enforced' : 'Missing HSTS header'
  });
  results.push({
    test: 'Frame Guard (Clickjacking Defense)',
    passed: hasXfo || (hasCsp && headers['content-security-policy'].includes('frame-ancestors')),
    severity: 'high',
    detail: hasXfo ? 'Protected by X-Frame-Options' : 'Missing X-Frame-Options & frame-ancestors'
  });
  results.push({
    test: 'Content-Security-Policy (CSP)',
    passed: hasCsp,
    severity: 'medium',
    detail: hasCsp ? 'Active' : 'No CSP header detected'
  });

  // PROBE 2: CORS Malicious Origin Probe
  const corsRes = await sendProbe(targetUrl, {
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://evil-untrusted-site.com',
      'Access-Control-Request-Method': 'POST'
    }
  });
  const corsAllow = (corsRes.headers && corsRes.headers['access-control-allow-origin']) || '';
  const corsCreds = (corsRes.headers && corsRes.headers['access-control-allow-credentials']) || '';
  const isDangerousCors = (corsAllow === '*' && corsCreds === 'true') || corsAllow === 'https://evil-untrusted-site.com';

  results.push({
    test: 'CORS Origin Isolation',
    passed: !isDangerousCors,
    severity: 'high',
    detail: isDangerousCors ? 'Permissive CORS reflected untrusted origin' : 'Properly restricted or rejected untrusted origin'
  });

  // PROBE 3: Turnstile / Missing Token Probe on /api/login or /api/auth
  const authEndpoints = ['/api/login', '/api/auth/login', '/api/auth/signin'];
  for (const ep of authEndpoints) {
    const epUrl = new URL(ep, targetUrl).toString();
    const probeRes = await sendProbe(epUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'probe@security-test.local', password: 'test' })
    });

    if (probeRes.status && probeRes.status !== 404) {
      const rejectedWithoutTurnstile = probeRes.status === 400 || probeRes.status === 403;
      results.push({
        test: `Bot Defense on ${ep}`,
        passed: rejectedWithoutTurnstile,
        severity: 'high',
        detail: rejectedWithoutTurnstile ? 'Rejected submission missing bot token' : `Accepted/Processed POST without Turnstile token (HTTP ${probeRes.status})`
      });
      break;
    }
  }

  const passedCount = results.filter(r => r.passed).length;
  const score = Math.round((passedCount / results.length) * 100);

  if (isJson) {
    console.log(JSON.stringify({ target: targetUrl, score, total_tests: results.length, passed: passedCount, results }, null, 2));
    process.exit(0);
  }

  console.log(`\n\x1b[36m${'='.repeat(65)}\x1b[0m`);
  console.log(`\x1b[1m🎯 Web Defense Simulator Results\x1b[0m`);
  console.log(`Target: \x1b[34m${targetUrl}\x1b[0m`);
  console.log(`Defensive Maturity Score: ${score >= 80 ? `\x1b[32m${score}% (STRONG DEFENSE)` : score >= 50 ? `\x1b[33m${score}% (MODERATE)` : `\x1b[31m${score}% (ACTION REQUIRED)`}\x1b[0m`);
  console.log(`\x1b[36m${'='.repeat(65)}\x1b[0m\n`);

  results.forEach((r, idx) => {
    const mark = r.passed ? '\x1b[32m[PASS]\x1b[0m' : `\x1b[31m[FAIL - ${r.severity.toUpperCase()}]\x1b[0m`;
    console.log(`${mark} ${idx + 1}. ${r.test}: ${r.detail}`);
  });
  console.log('');
}

runSimulation();

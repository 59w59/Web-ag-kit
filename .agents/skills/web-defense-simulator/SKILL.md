---
name: web-defense-simulator
description: Probes web applications with non-destructive defensive simulations to verify that security controls (CORS isolation, Turnstile bot shields, and security headers) actively trigger and block unauthorized requests.
tags: [security, defensive-testing, red-team, cors, bot-defense, headers]
role: [penetration-tester, security-auditor]
phase: [test, verify, operate]
frameworks: [OWASP-Testing-Guide, Cloudflare-Defense]
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
argument-hint: "[target-url-or-host]"
---

# Web Defense Simulator

> "Don't assume security rules work—verify that they actively block attacks." Non-destructive verification of deployed web defenses.

---

## 🔧 Runtime Scripts & References

| Tool / Reference | Purpose | Usage |
|------------------|---------|-------|
| `scripts/simulate_defenses.js` | Sends safe diagnostic probes to test CORS, Turnstile enforcement, and security headers | `node scripts/simulate_defenses.js <url>` |
| [references/simulation-scenarios.md](references/simulation-scenarios.md) | Details on simulation vectors and expected responses | Defense test scenarios |

---

## 🛡️ Core Defense Probes

1. **CORS Origin Isolation**:
   - Sends an `OPTIONS` request with `Origin: https://evil-untrusted-site.com`.
   - Passes if the server does NOT reflect the malicious origin with `Access-Control-Allow-Credentials: true`.
2. **Bot Defense & Turnstile Enforcement**:
   - Sends a test payload to auth endpoints (`/api/login`, `/api/auth/signin`) omitting the `cf-turnstile-response` token.
   - Passes if the server returns HTTP 400 or 403, rejecting automated submissions.
3. **HTTP Header Guards**:
   - Verifies `Strict-Transport-Security` (HTTPS only), `X-Frame-Options` (anti-clickjacking), and `Content-Security-Policy`.

---

## 🤖 Activated Personas

- **[`@penetration-tester`](../agents/penetration-tester.md)**: Execute defense simulations against staging endpoints and document gaps.
- **[`@security-auditor`](../agents/security-auditor.md)**: Recommend Cloudflare WAF, CORS, or middleware adjustments for failed probes.

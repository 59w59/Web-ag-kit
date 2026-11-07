---
name: cloudflare-waf
description: Deploy, configure, troubleshoot, and review Cloudflare WAF (Web Application Firewall), Managed Rulesets, custom firewall rules, rate limiting, and DDoS protection for web apps and APIs.
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
---

# Cloudflare WAF & Edge Defense

> Defend web applications and APIs against attacks at the edge before traffic ever touches your origin servers.

## 📋 Reference Documents

| Reference | Description |
|-----------|-------------|
| [patterns.md](references/patterns.md) | Common protection patterns: managed rules, custom rules, attack score, rate limiting |
| [configuration.md](references/configuration.md) | Dashboard, API, SDK, and Terraform configuration guides |
| [gotchas.md](references/gotchas.md) | Troubleshooting false positives, rule ordering, rate limiting nuances, and rule evaluation phases |
| [api.md](references/api.md) | Cloudflare Ruleset Engine API operations and payloads |

---

## 🛡️ Core Capabilities

### 1. WAF Managed Rulesets
- **Cloudflare Managed Ruleset**: Pre-configured protection against OWASP Top 10 vulnerabilities (SQLi, XSS, RCE, SSRF).
- **OWASP Core Ruleset (CRS)**: Strict anomaly scoring mode for regulatory and high-compliance requirements.
- **Cloudflare Exposed Credentials Check**: Detects requests containing known leaked credentials and blocks or challenges them.

### 2. Custom WAF Rules & Edge Filtering
- Match by IP, country, URI path, HTTP headers, TLS fingerprint (JA4), and threat score (`cf.threat_score`).
- Actions: `block`, `managed_challenge`, `js_challenge`, `skip`, `log`.

### 3. Rate Limiting Rules
- Protect sensitive endpoints (`/api/login`, `/api/auth`, `/api/register`, `/api/checkout`, `/api/reset-password`).
- Track requests per IP, session cookie, or API key with custom threshold periods (e.g. 5 requests / 60 seconds).
- Mitigation action: `managed_challenge` or `block` with 429 status code.

### 4. DDoS & Bot Protection Integration
- Automatic L3/L4/L7 DDoS mitigation without latency impact.
- Integration with Cloudflare Turnstile to stop automated headless bots without annoying CAPTCHAs.

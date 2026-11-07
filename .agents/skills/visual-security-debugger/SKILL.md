---
name: visual-security-debugger
description: Visual page inspection, OCR-driven security auditing, intrusion detection, UI defacement analysis, and visual debugging for web applications. Coordinates visual agents to analyze screenshots, detect exposed sensitive data, and audit security controls.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
injection-hardened: true
---

# Visual Security & Debugging Inspector (OCR & Vision)

> "See what the user sees, catch what scanners miss." Combining visual page inspection, OCR text extraction, and cybersecurity intrusion detection.

---

## 🔧 Runtime Scripts & Tools

| Tool / Script | Purpose | Usage |
|---------------|---------|-------|
| `scripts/visual_audit.js` | Automated visual audit & intrusion scanner | `node scripts/visual_audit.js <url-or-html>` |
| `puppeteer-browser` (MCP) | Browser navigation & full-page screenshot capture | Trigger via MCP server in chat |

---

## 👁️ Core Philosophy: Visual Cybersecurity & Debugging

Automated vulnerability scanners check headers and raw AST, but visual analysis catches vulnerabilities and attacks at the presentation layer:

1. **OCR & Visual Text Analysis**: Reading on-screen rendered text, framework debug screens, unhandled runtime crashes, and exposed API keys/connection strings.
2. **Defacement & Intrusion Detection**: Detecting visual defacement banners ("Hacked by", "Pwned"), injected rogue iframes, and cryptomining indicators.
3. **UI Redressing & Clickjacking**: Identifying pages vulnerable to hidden overlay framing, transparency tricks, and click hijacking.
4. **Form & Bot Defense Shield**: Visually confirming whether sensitive input forms (login, payment, password reset) render active anti-bot verification (Cloudflare Turnstile).

---

## 🔄 The 4-Phase Visual Audit Workflow

```
1. CAPTURE & RENDER
   └── Render page via headless browser (Puppeteer) or analyze build output

2. OCR & TEXT EXTRACTION
   └── Extract on-screen text, inspect hydration state, identify error overlays

3. THREAT & INTRUSION CLASSIFICATION
   ├── Category A: Defacement / Magecart Script Tampering
   ├── Category B: Framework Crash Screens & Leaked Secrets
   ├── Category C: Clickjacking & Missing X-Frame-Options
   └── Category D: Unprotected Auth Forms (Missing Turnstile)

4. AGENT ACTIVATION
   └── Dispatch specialized agent based on finding type
```

---

## 🤖 Agent Activation Matrix

When a visual or intrusion issue is identified, coordinate with the appropriate agent persona:

| Finding | Activated Agent | Directive |
|---------|-----------------|-----------|
| **Defacement / Malicious Injected Script** | `@security-auditor` & `@penetration-tester` | Isolate compromised assets, inspect web server logs, analyze origin file changes, and check WAF rules. |
| **Crash Overlay / Stack Trace in UI** | `@debugger` | Trace unhandled runtime exceptions, eliminate root causes, and ensure production error sanitization. |
| **Missing Turnstile on Login/Checkout** | `@frontend-specialist` | Insert Cloudflare Turnstile widget and link with backend verification API. |
| **Clickjacking Vulnerability** | `@security-auditor` | Implement `X-Frame-Options: DENY` and CSP `frame-ancestors 'self'` in edge headers. |

---

## 📋 Visual Checklist

- [ ] **No Visual Stack Traces**: Next.js, Django, or PHP error traces are hidden in production builds.
- [ ] **No Client Hydration Leaks**: `window.__NEXT_DATA__` or Redux initial state does not contain raw API keys or passwords.
- [ ] **Turnstile Visible**: Login and registration forms display the Cloudflare Turnstile challenge box.
- [ ] **Frame Guard Active**: Application cannot be embedded inside external iframes.
- [ ] **No Insecure Third-Party Scripts**: No scripts loaded from unencrypted HTTP or unverified CDNs.

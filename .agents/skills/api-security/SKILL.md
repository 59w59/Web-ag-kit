---
name: api-security
description: Reviews web APIs and endpoints against the OWASP API Security Top 10:2023. Detects BOLA, BFLA, Mass Assignment, SSRF, missing rate limits, and broken auth in Next.js, Express, Fastify, and GraphQL endpoints.
tags: [appsec, web-security, owasp-api, rest, graphql]
role: [security-auditor, backend-specialist, penetration-tester]
phase: [design, build, review]
frameworks: [OWASP-API-Security-2023, CWE]
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
argument-hint: "[target-file-or-directory]"
---

# Web API Security Review (OWASP API Top 10:2023)

A structured, repeatable audit process for evaluating web REST, GraphQL, and Server Action endpoints against the **OWASP API Security Top 10:2023**.

---

## 🔧 Runtime Scripts & Checklists

| Tool / Reference | Purpose | Usage |
|------------------|---------|-------|
| `scripts/api_security_audit.js` | Automated endpoint code pattern & mass-assignment scanner | `node scripts/api_security_audit.js <project-or-api-dir>` |
| [api-top10-checklist.md](api-top10-checklist.md) | In-depth checklist with vulnerable vs secure code patterns | Review during endpoint audits |

---

## 🎯 OWASP API Security Top 10:2023 Categories

| Category | Vulnerability | Core Web Defense |
|----------|---------------|------------------|
| **API1:2023** | Broken Object Level Authorization (BOLA) | Always verify `userId === resource.ownerId` at the query level. Never trust client IDs. |
| **API2:2023** | Broken Authentication | Enforce strict JWT signature verification, secure session cookies (`HttpOnly; Secure; SameSite=Lax`), and Cloudflare Turnstile on auth endpoints. |
| **API3:2023** | Broken Object Property Level Auth | Prevent **Mass Assignment**. Validate and whitelist input payloads using Zod or Valibot instead of spreading `{ ...req.body }`. |
| **API4:2023** | Unrestricted Resource Consumption | Enforce pagination limits (max 50-100 items), request body size limits, and edge/middleware rate limiting. |
| **API5:2023** | Broken Function Level Authorization (BFLA) | Ensure administrative and privileged routes check user roles (e.g., `user.role === 'admin'`) before execution. |
| **API6:2023** | Unrestricted Access to Sensitive Business Flows | Guard purchase, ticket reservation, and checkout flows against automated scalper bots using Turnstile & rate limiting. |
| **API7:2023** | Server-Side Request Forgery (SSRF) | Validate all outgoing webhook or fetch URLs against strict domain allow-lists; block private network IP ranges (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`). |
| **API8:2023** | Security Misconfiguration | Disable verbose error stack dumps in production; restrict CORS to trusted origins (`Access-Control-Allow-Origin: https://app.example.com`). |
| **API9:2023** | Improper Inventory Management | Remove unused debug or staging API routes (`/api/v1/test`, `/api/debug`); maintain OpenAPI schema documentation. |
| **API10:2023**| Unsafe Consumption of APIs | Validate third-party API and incoming webhook responses before passing them into databases or internal functions. |

---

## 🔍 4-Step API Audit Workflow

```
1. DISCOVERY & INVENTORY
   ├── Scan app/api/**/route.ts, pages/api/**/*.ts, or server/routes/*.js
   └── Map public vs authenticated vs administrative endpoints

2. AUTHORIZATION MATRIX
   ├── Verify object ownership checks on /api/orders/[id], /api/users/[id]
   └── Check role-based guards on mutation actions

3. INPUT HARDENING & MASS ASSIGNMENT
   ├── Ensure Zod/Valibot schema parses request bodies
   └── Check for unvalidated spread operators in database inserts/updates

4. RATE LIMITING & EDGE SHIELD
   └── Verify Cloudflare WAF / edge middleware limits high-frequency endpoints
```

---

## 🤖 Activated Personas

- **[`@backend-specialist`](../agents/backend-specialist.md)**: Refactor API endpoints to use validated DTOs, query-level ownership filters, and transactional integrity.
- **[`@security-auditor`](../agents/security-auditor.md)**: Produce OWASP API compliance findings with severity ratings and remediation diffs.
- **[`@penetration-tester`](../agents/penetration-tester.md)**: Verify exploitability of identified BOLA and SSRF endpoints with reproducible proof-of-concept tests.

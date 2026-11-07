---
name: web-threat-modeling
description: Runs a structured STRIDE threat modeling assessment on full-stack web architectures, Next.js applications, API gateways, and cloud backends. Maps trust boundaries, data flows, and prioritized mitigations to OWASP & MITRE ATT&CK.
tags: [appsec, web-security, threat-modeling, stride, architecture]
role: [security-auditor, backend-specialist, database-architect]
phase: [design, build, review]
frameworks: [STRIDE, OWASP-Top-10, MITRE-ATT&CK]
allowed-tools: Read, Grep, Glob
injection-hardened: true
argument-hint: "[target-file-or-architecture-doc]"
---

# Web Threat Modeling (STRIDE for Full-Stack Web)

A systematic framework for identifying security risks, trust boundary violations, and threat scenarios across modern web application architectures before writing code or deploying to production.

---

## 🎯 The STRIDE Web Matrix

| Threat | Definition in Web Apps | Typical Vector | Web Defense / Mitigation |
|--------|------------------------|----------------|--------------------------|
| **S**poofing | Pretending to be another user or service | Stolen session cookie, JWT forgery, missing CSRF | Signed HttpOnly cookies, PKCE OAuth, Cloudflare Turnstile |
| **T**ampering | Modifying data in transit or in database | Parameter tampering, Mass Assignment, SQLi | Input schema validation (Zod), ORM parameterization, TLS |
| **R**epudiation | Denying an action without audit trail | Lack of audit logs on financial / admin actions | Immutable audit logs, structured event logging |
| **I**nformation Disclosure | Exposing sensitive data to unauthorized parties | Leaked .env keys, stack traces, verbose API errors | Zero client secrets, error boundary sanitization |
| **D**enial of Service | Exhausting server or database resources | ReDoS, large payload injection, endpoint abuse | Edge rate limiting, payload caps, connection pooling |
| **E**levation of Privilege | Gaining unauthorized admin/higher permissions | BFLA, IDOR, unauthenticated internal endpoints | Strict RBAC middleware, Zero Trust Access boundaries |

---

## 🗺️ Web Trust Boundaries Mapping

```
[ Public Internet: Browser Client / Untrusted ]
               │
══ TRUST BOUNDARY 1: Edge Perimeter ═════════════════════════════
               │ Cloudflare WAF / Turnstile / Rate Limiting
               ▼
[ Edge Proxy / Next.js Middleware / Reverse Proxy ]
               │
══ TRUST BOUNDARY 2: Application Core ═══════════════════════════
               │ Authenticated Session / JWT Verification
               ▼
[ Server Actions / REST API Handlers / Business Logic ]
               │
══ TRUST BOUNDARY 3: Data Tier ══════════════════════════════════
               │ Parameterized ORM / Network Isolated
               ▼
[ PostgreSQL / Redis / Cloudflare R2 / Stripe API ]
```

---

## 📋 Threat Modeling Assessment Steps

1. **Deconstruct the Architecture**:
   - Identify all data stores, third-party APIs (Stripe, Resend, Auth0), and ingress points.
2. **Identify Trust Boundaries**:
   - Where does untrusted input cross into trusted code? (Form inputs, webhooks, query params).
3. **Apply STRIDE**:
   - For each boundary crossing, evaluate what happens if an attacker spoofs identity or tampers with payload.
4. **Define Mitigations**:
   - Assign specific framework-level remediations (Next.js middleware, Zod schemas, DB row-level security).

For the complete template and question matrix, see [references/stride-matrix.md](references/stride-matrix.md).

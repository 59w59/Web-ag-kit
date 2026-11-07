---
description: Comprehensive 360° security audit across code, APIs, databases, edge defenses, and AI agent skills. Orchestrates @security-auditor, @penetration-tester, and @backend-specialist.
---

# /security-audit - Full-Stack 360° Security Audit

$ARGUMENTS

---

## 🎯 Purpose

Runs a unified, end-to-end security audit of the entire web application stack. Combines static code analysis, OWASP API Top 10 auditing, database migration lock checks, visual/Turnstile verification, and AI skill integrity.

---

## 🤖 Orchestrated Agent Roles

| Agent | Responsibilities in Audit |
|-------|--------------------------|
| **`@security-auditor`** | Coordinates the audit, analyzes code patterns, checks secret leaks, and drafts the final report |
| **`@penetration-tester`** | Evaluates API exploitability (BOLA, SSRF), tests WAF bypasses, and runs defensive simulations |
| **`@backend-specialist`** | Reviews database schemas for zero-downtime safety, validates Zod DTOs, and checks auth middleware |

---

## ⚡ The 5-Phase 360° Audit Workflow

### Phase 1: Code, Secrets & Dependency Scan
Execute the primary vulnerability scanner:
```bash
python .agents/skills/vulnerability-scanner/scripts/security_scan.py . --output summary
```
- Checks for hardcoded secrets, database URLs, and Cloudflare/Turnstile keys.
- Audits `package-lock.json` supply chain dependencies.

### Phase 2: Web API Security Audit (OWASP API Top 10)
Scan all API routes and controllers:
```bash
node .agents/skills/api-security/scripts/api_security_audit.js .
```
- Checks for Mass Assignment (`...req.body`).
- Checks for BOLA / direct ID lookups without tenant/user ownership filters.
- Checks for unbounded list queries without pagination caps.

### Phase 3: Database & Migration Safety
Audit database schemas and migrations:
```bash
node .agents/skills/db-migration-guard/scripts/migration_guard.js .
```
- Checks for dangerous `NOT NULL` additions without default values.
- Checks for unindexed foreign keys and unconcurrent index creation.
- Confirms Row-Level Security (RLS) on PostgreSQL tables.

### Phase 4: Visual & Edge Defense Inspection
Inspect public entry points (login, signup, checkout) and skills:
```bash
node .agents/skills/visual-security-debugger/scripts/visual_audit.js http://localhost:3000/login
node .agents/skills/skill-inspector/scripts/skill_inspector.js .agents
```
- Checks for visible debug traces and Turnstile anti-bot presence.
- Verifies that AI agent skills are free from prompt injection and exfiltration hooks.

### Phase 5: Consolidated Report Formulation
Formulate the final **SECURITY_REPORT.md** with:
1. Executive Risk Summary (Critical / High / Medium / Low count)
2. Specific Code Diffs for Remediation
3. Cloudflare Edge WAF & Turnstile recommendations

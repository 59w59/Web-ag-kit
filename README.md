# 🚀 Web-ag-kit

<p align="left">
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/v/@59w59/web-ag-kit.svg?logo=npm&color=CB3837" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/dm/@59w59/web-ag-kit.svg?color=44CC11" alt="npm downloads">
  </a>
  <a href="https://github.com/59w59/web-ag-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@59w59/web-ag-kit.svg?color=blue" alt="license">
  </a>
</p>

**Web-ag-kit** is a ready-to-use **AI Agent Workspace** designed specifically for full-stack web development (frontend & backend). It instantly equips your local coding agents (like Antigravity, Gemini, or Claude) with specialized roles, reusable software engineering skills, custom workflows, zero-downtime safety, and automated quality checks.

Stop teaching your AI how you want to build websites in every session. Scaffold a structured workspace in one command and let your agents code with senior-level guidelines.

---

## 🎯 What it Focuses On

This kit is built to solve common pitfalls in AI-generated web development (like generic color schemes, unoptimized queries, missing test suites, or lack of accessibility compliance):

- 💻 **Frontend Engineering**: Configured for React 19, Next.js 15, and standard CSS/Tailwind. Bundles design guidelines, UX principles, typography systems, and Framer Motion animation instructions.
- ⚡ **Core Web Vitals & Next.js Performance**: Employs `core-web-vitals-guard` to eliminate `'use client'` bundle bloat, optimize tree-shaking for icon barrel files, and enforce responsive image formats (LCP/CLS/INP).
- 🗄️ **Zero-Downtime Database Engineering**: Employs `db-migration-guard` to audit Prisma, Drizzle, and PostgreSQL migrations against exclusive table locks, destructive drops, and missing Row-Level Security (RLS).
- 🧪 **Self-Healing QA Automation**: Employs `self-healing-qa` to generate robust Playwright tests using semantic, accessible locators (`getByRole`, `getByLabel`) that withstand UI refactors.
- 🛡️ **Cloudflare Edge Defense**: Integrates OWASP 2025 compliance with **Cloudflare Edge Defense** (WAF, Turnstile bot verification, Cloudflare One Zero Trust, and Rate Limiting).
- 🔐 **Web API & Architecture Security**: Implements **OWASP API Security Top 10:2023** (`api-security`) to eliminate BOLA, BFLA, and Mass Assignment, paired with STRIDE web threat modeling (`web-threat-modeling`).
- 🎯 **Defensive Attack Simulation**: Uses `web-defense-simulator` to send non-destructive probes verifying that CORS origin isolation and Turnstile bot shields actively block unauthorized requests.
- 👁️ **Visual Security & OCR Debugging**: Employs `visual-security-debugger` to visually inspect pages, extract on-screen error dumps, detect defacement / Magecart intrusions, and audit clickjacking risks.
- 🔍 **AI Agent & Skill Hardening (NVIDIA SkillSpector)**: Audits AI skills, prompts, and MCP servers with `skill-inspector` to detect prompt injection, invisible Unicode attacks, and exfiltration hooks.

---

## 🚀 Quick Start (Interactive Setup Wizard)

You can initialize the `.agents/` workspace interactively or via automated flags:

#### Option A: Run via NPX (Interactive Wizard)
```bash
npx @59w59/web-ag-kit
```

#### Option B: Install Globally
```bash
npm install -g @59w59/web-ag-kit
web-ag-kit ./my-new-project
```

#### Option C: Non-Interactive / CI Mode
```bash
web-ag-kit ./my-new-project -y
```

#### Option D: 🛡️ Security & Cybersecurity Edition Only
Install ONLY the cybersecurity and edge defense suite (Cloudflare WAF, Turnstile, OWASP API, STRIDE, Pentest, SkillSpector):
```bash
npx @59w59/web-ag-kit security ./my-project
# or with global CLI:
web-ag-kit security ./my-project -y
```

---

## 🤖 Meet the Specialist Agents

- **Frontend Specialist** (`frontend-specialist.md`): Generates accessible, responsive UI components with clean Tailwind classes and fluid animations.
- **Backend Specialist** (`backend-specialist.md`): Secure, robust RESTful APIs, database optimizations, mass-assignment prevention, and server-side middleware.
- **Database Architect** (`database-architect.md`): Transactional schemas, zero-downtime migrations (expand/contract), index optimization, and RLS policies.
- **Performance Optimizer** (`performance-optimizer.md`): Core Web Vitals optimization, server/client component boundaries, and bundle tree-shaking.
- **QA Automation Engineer** (`qa-automation-engineer.md`): Self-healing Playwright E2E suites, semantic accessibility locators, and regression prevention.
- **Debugger & Root Cause Analyst** (`debugger.md`): Investigates runtime crashes, visual anomalies, stack trace overlays, and production breaks.
- **Penetration Tester & Security Auditor** (`security-auditor.md`, `penetration-tester.md`): Audits code against OWASP Web & API Top 10, validates Cloudflare WAF & Turnstile anti-bot integration, and executes defensive simulations.

---

## 💡 Example Prompts to Try

Once initialized, try prompts like:

* **For Full 360° Security Audit**:
  > *"Run /security-audit across our codebase to test API routes, secrets, database migrations, and edge defenses."*

* **For Zero-Downtime Migration Review**:
  > *"Use the @database-architect and db-migration-guard to verify whether our latest Prisma migration locks any tables."*

* **For Core Web Vitals Optimization**:
  > *"Audit our Next.js app with core-web-vitals-guard and eliminate unnecessary 'use client' directives."*

* **For Resilient E2E Tests**:
  > *"Use self-healing-qa to generate Playwright tests for our user checkout flow using getByRole semantic locators."*

* **For Web API Security**:
  > *"Use the @security-auditor and api-security skill to audit our Next.js /api routes for BOLA and mass-assignment risks."*

* **For Defensive Probing**:
  > *"Run web-defense-simulator on http://localhost:3000 to verify that missing Turnstile tokens are rejected on login."*

---

## 🔌 Connecting Local MCP Servers

The workspace comes with a template config at `.agents/mcp/mcp_config.json` defining helpful tools:
* **cloudflare**: Query Cloudflare API, DNS, WAF rules, and documentation directly.
* **21st-dev-magic**: Quick UI component insertion.
* **postgres-inspector**: Query your database directly inside the agent chat.
* **sqlite-inspector**: Inspect and query local SQLite databases.
* **puppeteer-browser**: Renders and inspects UI layouts.

To enable them, copy the configuration block and paste it into your local global configuration (`~/.gemini/config/mcp_config.json` or `%USERPROFILE%\.gemini\config\mcp_config.json` on Windows).

---

## 🙈 Git Configuration (.gitignore)

Add the following to your project's `.gitignore` file:

```text
# Ignore local agent execution logs
.agents/preview.log
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

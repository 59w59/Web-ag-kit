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

**Web-ag-kit** is a ready-to-use **AI Agent Workspace** designed specifically for full-stack web development (frontend & backend). It instantly equips your local coding agents (like Antigravity, Gemini, or Claude) with specialized roles, reusable software engineering skills, custom workflows, zero-downtime safety, automated quality checks, stealth web crawling, and design-engineering craftsmanship.

Stop teaching your AI how you want to build websites in every session. Scaffold a structured workspace in one command and let your agents code with senior-level guidelines.

---

## 🎯 What it Focuses On

This kit is built to solve common pitfalls in AI-generated web development (generic color schemes, unoptimized queries, missing test suites, or context amnesia):

- 🎨 **Design Engineering & Craftsmanship**: Implements `make-interfaces-feel-better` and the **Anti-Template Policy** to ban generic AI/Tailwind slop. Enforces concentric radii (`outer = inner + padding`), optical alignment, tactile feedback (`active:scale-[0.97]`), 44×44px hit targets, and `tabular-nums`.
- 🏛️ **Architecture Decision Records (ADRs)**: Employs `architecture-decision-records` following the Michael Nygard standard to record technical decisions, alternatives, and trade-offs directly in `docs/adr/`.
- ⚡ **React 19 & Next.js 15 Performance Guard**: Combines `react-performance` (Vercel Labs best practices) and `core-web-vitals-guard` to eliminate sequential network waterfalls, remove barrel file bloat, enforce parallel Server Components via composition, and preserve 95+ Core Web Vitals (LCP/CLS/INP).
- 🧠 **Context Budget & Strategic Compaction**: Equips agents with `context-budget` to prevent context drift and amnesia during large sessions by persisting plans to disk before compacting.
- 🗄️ **Zero-Downtime Database Engineering**: Employs `db-migration-guard` to audit Prisma, Drizzle, and PostgreSQL migrations against exclusive table locks, destructive drops, and missing Row-Level Security (RLS).
- 🧪 **Self-Healing QA Automation**: Employs `self-healing-qa` to generate robust Playwright tests using semantic, accessible locators (`getByRole`, `getByLabel`) that withstand UI refactors.
- 🕷️ **Stealth Web Scraping & Crawling (Scrapling Framework)**: Equips agents with the official `scrapling` skill and MCP server for adaptive web crawling, JavaScript rendering, RAG data extraction, and anti-bot challenge validation.
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

#### Option E: 🕷️ Install Scrapling Stealth Crawler
Installs Python Scrapling framework and headless stealth browsers:
```bash
web-ag-kit install-scrapling
# or via npx:
npx @59w59/web-ag-kit install-scrapling
```

---

## 🤖 Meet the Specialist Agents

- **Frontend Specialist** (`frontend-specialist.md`): Crafts bespoke, high-polish UI components with concentric radii, optical alignment, and zero generic template slop.
- **Project Planner** (`project-planner.md`): Formulates 4-phase implementation plans, records ADRs in `docs/adr/`, and manages token context budgets.
- **Backend Specialist** (`backend-specialist.md`): Secure, robust RESTful APIs, zero-downtime database migrations, mass-assignment prevention, and web crawling.
- **Explorer Agent** (`explorer-agent.md`): Deep codebase discovery, architectural analysis, and web research with Scrapling.
- **Database Architect** (`database-architect.md`): Transactional schemas, zero-downtime migrations (expand/contract), index optimization, and RLS policies.
- **Performance Optimizer** (`performance-optimizer.md`): Core Web Vitals optimization, React 19 waterfall elimination, Server Component composition, and bundle tree-shaking.
- **QA Automation Engineer** (`qa-automation-engineer.md`): Self-healing Playwright E2E suites, semantic accessibility locators, and regression prevention.
- **Debugger & Root Cause Analyst** (`debugger.md`): Investigates runtime crashes, visual anomalies, stack trace overlays, and production breaks.
- **Penetration Tester & Security Auditor** (`security-auditor.md`, `penetration-tester.md`): Audits code against OWASP Web & API Top 10, validates Cloudflare WAF & Turnstile anti-bot integration, and tests anti-bot resilience with Scrapling.

---

## 💡 Example Prompts to Try

Once initialized, try prompts like:

* **For UI Polish & Micro-Interactions**:
  > *"Review our UI components using make-interfaces-feel-better to check concentric radii, optical alignment on icon buttons, and remove transition: all."*

* **For Architectural Decision Records**:
  > *"We need to choose between Drizzle and Prisma for our edge runtime. Use @project-planner and architecture-decision-records to document the trade-offs in docs/adr/."*

* **For Eliminating React Waterfalls & Core Web Vitals**:
  > *"Audit our Next.js dashboard using react-performance to parallelize Server Component data fetching and eliminate waterfalls."*

* **For Web Crawling & Scraping (Scrapling)**:
  > *"Use the @explorer-agent and scrapling skill to fetch https://news.ycombinator.com, extract top articles with CSS selectors, and format into Markdown."*

* **For Full 360° Security Audit**:
  > *"Run /security-audit across our codebase to test API routes, secrets, database migrations, and edge defenses."*

* **For Zero-Downtime Migration Review**:
  > *"Use the @database-architect and db-migration-guard to verify whether our latest Prisma migration locks any tables."*

---

## 🔌 Connecting Local MCP Servers

The workspace comes with a template config at `.agents/mcp/mcp_config.json` defining helpful tools:
* **scrapling**: Stealth HTTP requests, JavaScript rendering, browser actions, and Cloudflare challenge solving via MCP.
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

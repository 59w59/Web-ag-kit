# 🚀 Web-ag-kit

<p align="left">
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/v/@59w59/web-ag-kit.svg?logo=npm&color=CB3837" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/dm/@59w59/web-ag-kit.svg?color=44CC11" alt="npm downloads">
  </a>
  <a href="https://github.com/59w59/Web-ag-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@59w59/web-ag-kit.svg?color=blue" alt="license">
  </a>
  <img src="https://img.shields.io/badge/agents-20_specialists-7928CA?logo=robot" alt="agents">
  <img src="https://img.shields.io/badge/skills-30_hardened_skills-0070F3?logo=codersrank" alt="skills">
  <img src="https://img.shields.io/badge/security-NVIDIA_SkillSpector_Verified-green?logo=nvidia" alt="SkillSpector verified">
</p>

**Web-ag-kit** is a production-grade **AI Agent Workspace & Engineering Harness** built specifically for full-stack web development. It transforms local coding agents (such as Antigravity, Gemini CLI, Claude Code, Cursor, and Codex) from generic code-completers into a coordinated senior engineering department.

Instead of retraining your AI on every session, scaffold a structured `.agents/` environment in seconds. Your agents will write zero-template-slop UI, prevent network waterfalls, audit zero-downtime database migrations, enforce Cloudflare edge security, bypass bot blockers stealthily, and record architectural decisions automatically.

---

## 📑 Table of Contents

- [🎯 What Web-ag-kit Solves](#-what-web-ag-kit-solves)
- [📦 Installation & Quick Start](#-installation--quick-start)
- [🏗️ Workspace Architecture](#️-workspace-architecture)
- [🌟 Core Capabilities & Pillars](#-core-capabilities--pillars)
  - [1. 🎨 Design Engineering & Anti-Template Craftsmanship](#1--design-engineering--anti-template-craftsmanship)
  - [2. 🏛️ Architecture Decision Records (ADRs)](#2-️-architecture-decision-records-adrs)
  - [3. ⚡ React 19 & Next.js 15 Performance Guard](#3--react-19--nextjs-15-performance-guard)
  - [4. 🧠 Context Budget & Strategic Compaction](#4--context-budget--strategic-compaction)
  - [5. 🕷️ Stealth Web Crawling & Scraping (Scrapling)](#5-️-stealth-web-crawling--scraping-scrapling)
  - [6. 🛡️ Cloudflare Edge Defense & OWASP API Security](#6-️-cloudflare-edge-defense--owasp-api-security)
  - [7. 🔍 AI Skill Hardening (NVIDIA SkillSpector Scanner)](#7--ai-skill-hardening-nvidia-skillspector-scanner)
  - [8. 👁️ Visual Security & OCR Debugger](#8-️-visual-security--ocr-debugger)
  - [9. 🗄️ Zero-Downtime Database Engineering](#9-️-zero-downtime-database-engineering)
  - [10. 🧪 Self-Healing Playwright QA](#10--self-healing-playwright-qa)
- [🤖 Specialist Agents Catalog (20 Roles)](#-specialist-agents-catalog-20-roles)
- [🧰 Hardened Skills Catalog (30 Skills)](#-hardened-skills-catalog-30-skills)
- [⚡ Workflows & Slash Commands](#-workflows--slash-commands)
- [🔌 MCP Servers Configuration](#-mcp-servers-configuration)
- [💡 Example Prompts](#-example-prompts)
- [📄 License](#-license)

---

## 🎯 What Web-ag-kit Solves

| Without Web-ag-kit (Generic AI) | With Web-ag-kit |
|---------------------------------|-----------------|
| Monotonous AI templates (centered hero, purple gradient blobs, cards inside cards). | **Anti-Template Policy**: Concentric radii, optical alignment, tactile states, and bespoke product identity. |
| Sequential `await` statements creating 3-5s network waterfalls in Server Components. | **React Performance Guard**: Parallel RSC composition via `<Suspense>`, no barrel imports, zero-flicker hydration. |
| Accidental destructive DB locks (`ALTER TABLE DROP COLUMN`) during migrations. | **Zero-Downtime DB Guard**: Expand/Contract patterns, safe index creation (`CONCURRENTLY`), RLS enforcement. |
| Fragile E2E tests breaking every time CSS classes or DOM nesting changes. | **Self-Healing QA**: Playwright semantic locators (`getByRole`, `getByLabel`) resilient to visual refactors. |
| Context amnesia and lost plans when session context limits are reached. | **Context Budgeting**: Disk-first persistence, trigger-table lazy loading, and strategic milestone compaction. |
| Web scraping blocked by Cloudflare Turnstile, DataDome, or Cloudflare 403s. | **Scrapling Stealth Crawler**: Adaptive selectors, headless stealth browsers, and MCP tools. |
| Insecure API endpoints vulnerable to BOLA, BFLA, and Mass Assignment. | **OWASP API Top 10 + Cloudflare WAF**: Automated edge rule validation, rate limiting, and origin defense. |

---

## 📦 Installation & Quick Start

Scaffold the workspace directly with `npx` or install globally:

### Option A: Interactive Wizard via NPX (Recommended)
```bash
npx @59w59/web-ag-kit
```
*The wizard lets you choose your target folder and pick between the full suite (18+ agents & 30 skills) or the standalone security edition.*

### Option B: Global CLI Installation
```bash
npm install -g @59w59/web-ag-kit

# Scaffold in current directory
web-ag-kit .

# Scaffold in a specific project directory
web-ag-kit ./my-new-app
```

### Option C: Non-Interactive / CI Mode (`-y`)
```bash
web-ag-kit ./my-project -y
```

### Option D: 🛡️ Cybersecurity & Edge Defense Edition Only
Install *only* cybersecurity, Cloudflare WAF/Turnstile, OWASP API, STRIDE, Pentest, and SkillSpector:
```bash
npx @59w59/web-ag-kit security ./my-api
# or with global CLI:
web-ag-kit security ./my-api -y
```

### Option E: 🕷️ Install Scrapling Stealth Crawler (Python 3.10+)
Installs Python dependencies and headless stealth browser binaries:
```bash
web-ag-kit install-scrapling
# or via npx:
npx @59w59/web-ag-kit install-scrapling
```

---

## 🏗️ Workspace Architecture

When initialized, Web-ag-kit creates a clean, self-contained `.agents/` folder:

```text
my-project/
├── .agents/
│   ├── agents/                   # 20 Specialist Personas (Markdown instructions)
│   │   ├── frontend-specialist.md
│   │   ├── backend-specialist.md
│   │   ├── project-planner.md
│   │   ├── security-auditor.md
│   │   └── ...
│   ├── skills/                   # 30 Modular, Injection-Hardened Skills
│   │   ├── make-interfaces-feel-better/
│   │   ├── architecture-decision-records/
│   │   ├── react-performance/
│   │   ├── context-budget/
│   │   ├── scrapling/
│   │   ├── cloudflare-waf/
│   │   ├── skill-inspector/
│   │   └── ...
│   ├── rules/                    # Global Governance & Quality Standards
│   │   ├── GEMINI.md             # Antigravity & Agent protocol
│   │   └── anti-template-design.md
│   ├── workflows/                # Slash Commands & Multi-Agent Workflows
│   │   ├── security-audit.md     # /security-audit
│   │   ├── ui-ux-pro-max.md      # /ui-ux-pro-max
│   │   └── ...
│   └── mcp/                      # Model Context Protocol Configurations
│       └── mcp_config.json
└── docs/                         # (Auto-scaffolded for project decisions)
    └── adr/                      # Architecture Decision Records
        ├── README.md
        └── template.md
```

---

## 🌟 Core Capabilities & Pillars

### 1. 🎨 Design Engineering & Anti-Template Craftsmanship
*Derived from the design-engineering corpus of `affaan-m/ECC` and refined for modern web applications.*
* **Concentric Radii Formula**: Automatically aligns nested rounded elements (`outer_radius = inner_radius + padding`) to avoid optical corner distortion.
* **Optical Alignment**: Corrects asymmetric icons (play buttons, chevrons, arrows) that fail standard geometric centering.
* **Typography Polish**: Enforces `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, and `tabular-nums` on all counters, prices, and metrics.
* **Tactile Interactions**: Bans `transition: all`. Applies micro-press states (`active:scale-[0.97]`) and WCAG-compliant 44×44px hit targets.
* **Anti-Template Policy**: Strictly bans repetitive AI Tailwind slop (uniform cards, centered purple gradient blobs, card-in-card nesting). Requires at least 4 deliberate design attributes per screen.

### 2. 🏛️ Architecture Decision Records (ADRs)
* **Standard Michael Nygard Format**: Captures significant architectural decisions (frameworks, ORMs, state management, auth) in `docs/adr/000X-*.md`.
* **Complete Context & Trade-offs**: Documents why a choice was made, what alternatives were evaluated, and positive/negative consequences.
* **Full Lifecycle**: Supports `proposed`, `accepted`, `superseded`, and `deprecated` states with auto-updating index tables.

### 3. ⚡ React 19 & Next.js 15 Performance Guard
*Adapted from Vercel Engineering's 70+ rule performance suite.*
* **Waterfall Elimination**: Resolves cheap sync conditions before `await`, batches independent queries with `Promise.all`, and parallelizes Server Components via composition.
* **Bundle Tree-Shaking**: Enforces direct imports over barrel index files (`lucide-react/dist/esm/icons/...`), saving 200–800ms of initial JS evaluation.
* **Zero-Flicker Hydration**: Inline theme script in `<head>` prevents dark-mode flash of unstyled content (FOUC); contains `suppressHydrationWarning` strictly to leaf elements.
* **React 19 Transitions**: Wraps expensive client filter/sort dispatches in `useTransition` to keep main thread interactions under 200ms (INP).

### 4. 🧠 Context Budget & Strategic Compaction
* **Disk-First Persistence**: Before running `/compact`, agents persist implementation plans, test outputs, and architectural decisions to disk (`{task-slug}.md` or `docs/adr/`).
* **Compaction Decision Table**: Guides agents on when to compact (after research, after milestones) and when *not* to compact (mid-implementation).
* **Trigger-Table Lazy Loading**: Skills load only the specific markdown section required for the task, reducing initial token consumption by over 50%.

### 5. 🕷️ Stealth Web Crawling & Scraping (Scrapling)
*Integrated with `D4Vinci/Scrapling`.*
* **Anti-Bot Challenge Bypass**: Headless stealth browsing, fingerprint spoofing, and Cloudflare Turnstile handling.
* **Adaptive Content Extraction**: Auto-adapts CSS selectors to website structure shifts.
* **MCP Integration**: Offers `scrapling_fetch`, `scrapling_render_js`, and `scrapling_stealth_fetch` directly within agent chat.

### 6. 🛡️ Cloudflare Edge Defense & OWASP API Security
* **Cloudflare WAF & Turnstile**: Automated edge rules for bot detection, token verification, and DDoS rate-limiting.
* **OWASP API Security Top 10:2023**: Hardens endpoints against BOLA (Broken Object Level Auth), BFLA, and Mass Assignment using strict Zod / JSON schemas.
* **STRIDE Threat Modeling**: Identifies Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege before coding.
* **Defense Simulator**: Sends non-destructive test probes to verify CORS isolation and WAF rule efficacy.

### 7. 🔍 AI Skill Hardening (NVIDIA SkillSpector Scanner)
* **Static Rule Verification**: Scans agent markdown files and MCP manifests using NVIDIA SkillSpector rules.
* **Detection Vectors**: Detects prompt injection, hidden zero-width Unicode characters, excessive bash permissions, and data exfiltration hooks.
* **Zero Findings Guaranteed**: All bundled Web-ag-kit skills pass with 0 warnings. Run anytime via:
  ```bash
  node .agents/skills/skill-inspector/scripts/skill_inspector.js .agents
  ```

### 8. 👁️ Visual Security & OCR Debugger
* Extracts visual text, toasts, and stack traces from screenshots using OCR patterns.
* Detects defacement, unauthorized third-party script injections (Magecart), and layout clickjacking overlays.

### 9. 🗄️ Zero-Downtime Database Engineering
* Audits Prisma, Drizzle, and PostgreSQL migrations against exclusive table locks.
* Enforces the **Expand / Contract** pattern for renaming or dropping columns.
* Validates concurrent index creation (`CREATE INDEX CONCURRENTLY`) and Row-Level Security (RLS).

### 10. 🧪 Self-Healing Playwright QA
* Generates resilient E2E tests using semantic accessibility locators (`getByRole`, `getByLabel`, `getByTestId`).
* Automatically falls back to resilient selectors when visual components undergo refactoring.

---

## 🤖 Specialist Agents Catalog (20 Roles)

All agents are configured in `.agents/agents/` with precise system prompts, tool permissions, and skill bindings:

| Agent | Focus & Capabilities | Primary Skills |
|-------|----------------------|----------------|
| **`frontend-specialist`** | Crafts accessible, high-polish UI components with concentric radii, optical alignment, and zero template slop. | `make-interfaces-feel-better`, `react-performance`, `core-web-vitals-guard`, `clean-code` |
| **`project-planner`** | Formulates 4-phase implementation plans, records ADRs, and manages token context budgets. | `architecture-decision-records`, `context-budget`, `plan-writing`, `brainstorming` |
| **`backend-specialist`** | RESTful APIs, zero-downtime DB migrations, mass-assignment defense, and serverless edge logic. | `api-patterns`, `api-security`, `db-migration-guard`, `scrapling`, `clean-code` |
| **`explorer-agent`** | Deep codebase discovery, architectural surveying, and live web research with Scrapling. | `scrapling`, `context-budget`, `documentation-templates` |
| **`performance-optimizer`** | Eliminates React waterfalls, enforces bundle tree-shaking, and preserves 95+ Core Web Vitals. | `react-performance`, `core-web-vitals-guard`, `performance-profiling` |
| **`security-auditor`** | Audits code against OWASP Web & API Top 10, validates edge defenses, and reviews secret hygiene. | `api-security`, `web-threat-modeling`, `cloudflare-waf`, `skill-inspector` |
| **`penetration-tester`** | Non-destructive offensive probing, CORS origin testing, and anti-bot resilience testing. | `red-team-tactics`, `web-defense-simulator`, `scrapling`, `turnstile-spin` |
| **`database-architect`** | Schema design, zero-downtime migrations (expand/contract), index optimization, and RLS policies. | `db-migration-guard`, `database-design`, `architecture-decision-records` |
| **`qa-automation-engineer`** | Self-healing Playwright E2E suites, semantic accessibility locators, and regression prevention. | `self-healing-qa`, `webapp-testing`, `testing-patterns` |
| **`debugger`** | Root cause analysis, crash reproduction, stack trace parsing, and visual anomaly debugging. | `visual-security-debugger`, `clean-code` |
| **`orchestrator`** | Master coordinator that breaks complex multi-domain tasks into parallel subagent workflows. | `context-budget`, `clean-code`, `plan-writing` |
| **`devops-engineer`** | CI/CD pipelines, Docker containerization, edge workers, and deployment automation. | `cloudflare-one`, `gateway-workers`, `clean-code` |
| **`code-archaeologist`** | Reverse-engineers legacy codebases, maps undocumented dependencies, and plans migrations. | `documentation-templates`, `clean-code` |
| **`seo-specialist`** | Technical SEO, metadata, OpenGraph tags, structured JSON-LD data, and sitemap generation. | `nextjs-react-expert`, `frontend-design` |
| **`mobile-developer`** | React Native, Expo, and Flutter mobile applications with platform-specific UX guidelines. | `frontend-design`, `clean-code` |
| **`product-manager`** | PRD generation, user story refinement, acceptance criteria, and edge-case discovery. | `brainstorming`, `plan-writing` |
| **`product-owner`** | Feature prioritization, scope control, backlog grooming, and milestone validation. | `plan-writing` |
| **`test-engineer`** | Unit testing, integration testing, Mock Service Worker (MSW), and AAA test patterns. | `testing-patterns`, `clean-code` |
| **`documentation-writer`** | Architecture documentation, API references, runbooks, and developer guides. | `documentation-templates` |
| **`game-developer`** | Canvas, WebGL, Three.js, and browser-based 2D/3D interactive experiences. | `clean-code` |

---

## 🧰 Hardened Skills Catalog (30 Skills)

Every skill in `.agents/skills/` contains a comprehensive `SKILL.md`, runtime scripts, reference examples, and passes NVIDIA SkillSpector rules:

| Category | Skills | Description |
|----------|--------|-------------|
| **Design & UI Polish** | `make-interfaces-feel-better`, `frontend-design` | Concentric radii, optical alignment, layered shadows, tactile micro-press, 44px hit areas. |
| **Performance & RSC** | `react-performance`, `core-web-vitals-guard`, `performance-profiling`, `nextjs-react-expert` | Eliminating network waterfalls, bundle direct imports, Suspense streaming, Core Web Vitals. |
| **Architecture & Planning** | `architecture-decision-records`, `context-budget`, `documentation-templates`, `website-builder-setup` | Michael Nygard ADRs in `docs/adr/`, disk-first persistence, token budget optimization. |
| **Stealth Web Crawling** | `scrapling` | D4Vinci Scrapling crawler: anti-bot challenge bypass, adaptive parsing, spiders, and MCP server. |
| **Cloudflare Edge Defense** | `cloudflare-waf`, `cloudflare-one`, `turnstile-spin`, `gateway-workers` | Cloudflare WAF custom rules, Turnstile verification, Zero Trust tunnels, Edge Workers. |
| **Application Security** | `api-security`, `web-threat-modeling`, `skill-inspector`, `visual-security-debugger`, `vulnerability-scanner`, `web-defense-simulator`, `red-team-tactics` | OWASP API Top 10, STRIDE threat modeling, NVIDIA SkillSpector scanner, visual OCR defacement detection, non-destructive attack simulation. |
| **Database & Migrations** | `db-migration-guard`, `database-design` | Zero-downtime migrations (expand/contract), table lock prevention, concurrent indexing, RLS. |
| **Testing & Quality** | `self-healing-qa`, `webapp-testing`, `testing-patterns`, `clean-code`, `api-patterns` | Semantic Playwright locators, unit/integration testing pyramid, clean code enforcement. |

---

## ⚡ Workflows & Slash Commands

Web-ag-kit includes specialized agent workflows in `.agents/workflows/` that can be executed directly:

- **`/security-audit`**: Runs a full 360° security inspection across API routes, secrets, database migrations, edge WAF rules, and AI skills.
- **`/ui-ux-pro-max`**: Design intelligence workflow featuring 50+ styles, 95+ palettes, and automated design system generation.
- **`/plan`**: Deep discovery and 4-phase planning before writing complex full-stack code.
- **`/orchestrate`**: Coordinates multi-agent parallel execution across frontend, backend, security, and QA.
- **`/deploy`**: 5-phase production deployment safety checks.
- **`/test`**: Full-suite automated test verification (Unit, Integration, E2E).

---

## 🔌 MCP Servers Configuration

Web-ag-kit includes an MCP configuration template at `.agents/mcp/mcp_config.json`:

```json
{
  "mcpServers": {
    "scrapling": {
      "command": "uvx",
      "args": ["scrapling", "mcp"]
    },
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"]
    },
    "postgres-inspector": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    },
    "sqlite-inspector": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./dev.db"]
    },
    "puppeteer-browser": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

*To activate, paste the server definitions into your global Gemini or Claude configuration file (`~/.gemini/config/mcp_config.json` or `%USERPROFILE%\.gemini\config\mcp_config.json`).*

---

## 💡 Example Prompts

Try these prompts with your AI coding assistant:

#### 1. UI Craftsmanship & Anti-Template Review
> *"Use @frontend-specialist and make-interfaces-feel-better to review our components. Fix concentric border radii on nested cards, add optical offsets to icon buttons, and eliminate transition: all."*

#### 2. Architectural Decision Records (ADR)
> *"We need to choose between Drizzle and Prisma for our edge runtime. Use @project-planner and architecture-decision-records to document the trade-offs in docs/adr/."*

#### 3. Eliminating React 19 Network Waterfalls
> *"Use @performance-optimizer and react-performance to audit our dashboard Server Components. Parallelize independent queries using Suspense and Promise.all."*

#### 4. Stealth Web Crawling with Scrapling
> *"Use @explorer-agent and the scrapling skill to fetch https://news.ycombinator.com, extract top headlines using adaptive CSS selectors, and format into Markdown."*

#### 5. Zero-Downtime Migration Validation
> *"Use @database-architect and db-migration-guard to inspect our latest Prisma/Drizzle migration. Ensure no tables are exclusively locked and columns use the expand/contract pattern."*

#### 6. Full 360° Security Audit
> *"Execute /security-audit across our repository to audit API routes against OWASP API Top 10, check for exposed secrets, and verify Cloudflare Turnstile token validation."*

---

## 🙈 Git Configuration (.gitignore)

Add the following to your project's `.gitignore` file to keep your git tree clean:

```text
# Ignore local agent execution logs and preview artifacts
.agents/preview.log
```

---

## 📄 License

Distributed under the **MIT License**. Created by **59w59**. See `LICENSE` for details.

---
description: Run the Full-Agent Squad Pipeline (Entender > Planejar > Executar > Revisar Seg > Revisar QA > Aprender)
---

# /full-agent - Full-Agent Autonomous Squad Pipeline

Trigger this workflow for complex features, refactors, or new architectural modules to engage the complete cooperative squad.

## Usage
```text
/full-agent [task description]
```

---

## 🎼 The Autonomous 6-Phase Execution Chain

### Phase 1: ENTENDER (Memory-First Discovery)
- **Agent**: `@explorer-agent`
- **Action**:
  1. Reads `docs/memory/INDEX.json` and `docs/memory/LEARNINGS.md` to see if a similar challenge was already solved in this repository.
  2. Analyzes affected files, dependencies, and environment constraints.
  3. If essential requirements are ambiguous, triggers the Socratic Gate (max 3 questions).

### Phase 2: PLANEJAR (Architect & Disk-First Plan)
- **Agent**: `@project-planner` (+ `@database-architect` if touching database schemas)
- **Action**:
  1. Drafts Architecture Decision Record (ADR) in `docs/adr/000X-*.md` if technology or architectural trade-offs exist.
  2. Creates execution plan in `.agents/tasks/{task-slug}.md` (*Disk-First Rule* to prevent context loss).
  3. Breaks work into atomic, verifiable steps.

### Phase 3: EXECUTAR (Craftsmanship & Engineering)
- **Agents**: `@frontend-specialist` and/or `@backend-specialist`
- **Action**:
  1. **Frontend**: Applies `make-interfaces-feel-better` (concentric radii formula, optical alignment, tactile feedback `active:scale-[0.97]`, WCAG 44×44px hit areas, and zero generic template slop).
  2. **Backend**: Implements strict Zod/TypeScript schemas, zero-downtime database patterns (Expand/Contract), and secure error boundaries.

### Phase 4: REVISAR 1 — SEGURANÇA (Security & Edge Hardening)
- **Agent**: `@security-auditor` (+ `@penetration-tester`)
- **Action**:
  1. Audits code against **OWASP API Security Top 10:2023** (BOLA, BFLA, Mass Assignment).
  2. Validates Cloudflare Turnstile token handling and edge WAF rules.
  3. Runs SkillSpector static security scan (`skill_inspector.js`).

### Phase 5: REVISAR 2 — QUALIDADE & PERFORMANCE (QA & Vitals)
- **Agents**: `@performance-optimizer` + `@qa-automation-engineer`
- **Action**:
  1. **Performance**: Eliminates network waterfalls, optimizes barrel imports, and validates Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
  2. **QA**: Generates or executes Playwright E2E tests using semantic accessibility locators (`getByRole`, `getByLabel`).

### Phase 6: APRENDER (Continuous Learning & Living Memory Ledger)
- **Agent**: `@orchestrator` with `continuous-learning`
- **Action**:
  1. Reflects on the completed task: *Did we create an elegant pattern, solve a framework gotcha, or implement a novel edge defense?*
  2. If YES, registers the victory into `docs/memory/solutions/SLN-*.md`, updates `docs/memory/INDEX.json`, and records in `docs/memory/LEARNINGS.md`.
  3. Consolidates final execution report for the user.

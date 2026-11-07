---
trigger: on_complex_task
description: Full-Agent Thought Chain Pipeline (Entender > Planejar > Executar > Revisar Segurança > Revisar QA)
---

# Full-Agent Squad Pipeline Protocol

> "Software engineering by AI agents must not be a monolithic guess; it is an orchestrated thought chain where specialists discover, plan, build, and verify cooperatively."

---

## 🎯 When Activated

The **Full-Agent Squad Pipeline** is automatically triggered whenever a user request involves:
1. Creating a new feature, component, page, or API route.
2. Refactoring existing architecture or database schemas.
3. Complex debugging or performance optimization.
4. Explicit invocation of the `/full-agent` workflow.

---

## 🔄 The 5-Stage Thought Chain (Passagem de Bastão)

Every complex task MUST flow through these 5 sequential stages:

```text
[1. ENTENDER] ──► [2. PLANEJAR] ──► [3. EXECUTAR] ──► [4. REVISAR SEG] ──► [5. REVISAR QA] ──► [6. APRENDER]
  @explorer-agent   @project-planner  @frontend/@backend  @security-auditor    @performance/@qa   continuous-learning
```

### Stage 1: ENTENDER (Memory-First Discovery)
* **Lead Agent**: `@explorer-agent` (or `@debugger` for defects)
* **Protocol**:
  1. **Check Memory**: Read `docs/memory/INDEX.json` and `docs/memory/LEARNINGS.md`. If a similar problem, pattern, or gotcha was previously recorded, inject that proven solution into the prompt.
  2. **Bounded Inspection**: Read only target manifests (`package.json`, `tsconfig.json`, target route/component) without unbounded file dumps.
  3. **Socratic Check**: If the task lacks clarity on business logic or constraints, ask up to 3 focused questions before writing any code.

### Stage 2: PLANEJAR (Architect & Disk-First Plan)
* **Lead Agent**: `@project-planner` (+ `@database-architect` if touching database/migrations)
* **Protocol**:
  1. **ADR Evaluation**: If choosing between frameworks, ORMs, auth strategies, or state libraries, draft an ADR in `docs/adr/000X-*.md`.
  2. **Task File**: Persist the implementation steps in `.agents/tasks/{task-slug}.md` or `docs/PLAN.md` (*Disk-First Rule* to protect against context loss).
  3. **No premature code**: Do not start implementation until steps and file paths are locked.

### Stage 3: EXECUTAR (Craftsmanship & Engineering)
* **Lead Agent**: `@frontend-specialist` (UI/CSS/React) and/or `@backend-specialist` (API/DB/Edge)
* **Protocol**:
  1. **Frontend**: Strictly enforce `make-interfaces-feel-better` (concentric radii formula `outer = inner + padding`, optical alignment on icon buttons, tactile press `active:scale-[0.97]`, WCAG 44×44px hit areas, and zero generic template slop).
  2. **Backend**: Strictly enforce schema validation (Zod), zero-downtime database patterns (Expand/Contract), and proper error boundary codes.

### Stage 4: REVISAR 1 — SEGURANÇA & BORDA (Security & Edge Hardening)
* **Lead Agent**: `@security-auditor` (+ `@penetration-tester`)
* **Protocol**:
  1. Audit code against **OWASP API Security Top 10:2023** (BOLA, BFLA, Mass Assignment).
  2. Verify edge protections: Cloudflare Turnstile token validation and WAF compatibility.
  3. Confirm 0 prompt injection or exfiltration risks via SkillSpector.

### Stage 5: REVISAR 2 — QUALIDADE & QA (Vitals & Self-Healing QA)
* **Lead Agent**: `@performance-optimizer` + `@qa-automation-engineer`
* **Protocol**:
  1. **Performance**: Eliminate sequential network waterfalls (`Promise.all`, Server Component composition via `<Suspense>`), prevent barrel import bloat, and protect Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
  2. **QA**: Generate or run resilient Playwright tests using semantic accessibility locators (`getByRole`, `getByLabel`).

---

## 🧠 Stage 6: APRENDER (Auto-Aprimoramento Contínuo)

Once Stage 5 completes successfully:
1. The `@orchestrator` activates the `continuous-learning` skill.
2. If the task resolved a non-trivial challenge, created an elegant reusable pattern, or avoided a dangerous bug, it documents the solution in `docs/memory/solutions/SLN-*.md` and appends it to `docs/memory/LEARNINGS.md`.
3. In future sessions, Stage 1 will retrieve this knowledge automatically.

---

## 📢 Announcing Pipeline Execution in Chat

When executing a multi-stage task, the orchestrator MUST announce progress to the user:

```markdown
🤖 **Full-Agent Squad em Ação:**

- [1. ENTENDER]  🔍 @explorer-agent: [Resumo do que foi descoberto e aprendizados prévios consultados]
- [2. PLANEJAR]  📐 @project-planner: [Plano estruturado / ADR gravado]
- [3. EXECUTAR]  💻 @frontend/@backend: [Código implementado com senior guidelines]
- [4. REV-SEC]   🛡️ @security-auditor: [Auditoria OWASP, WAF e integridade concluída]
- [5. REV-QA]    ⚡ @performance/@qa: [Core Web Vitals validados e testes semânticos prontos]
- [6. APRENDER]  🧠 docs/memory/: [Sucesso documentado para contexto futuro em SLN-XXX]
```

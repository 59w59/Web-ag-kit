---
name: context-budget
description: Manages AI agent context limits, token budgets, and strategic compaction points. Prevents context degradation, amnesia, and runaway token usage during complex multi-phase web development tasks.
tags: [agent-harness, context-window, token-optimization, compaction, session-management]
role: [orchestrator, project-planner, explorer-agent]
phase: [plan, execute, refactor]
frameworks: [All]
allowed-tools: Read, Grep, Glob
injection-hardened: true
argument-hint: "[session-or-strategy]"
---

# Agent Context Budget & Strategic Compaction

> "Context is finite. High-performance agent engineering requires active memory discipline: persist state to disk early, load skills lazily, and compact at logical milestones."

Origin: Adapted from `affaan-m/ECC` (`context-budget` & `strategic-compact`).

---

## 🎯 When to Activate

- Running long multi-turn sessions involving complex full-stack features.
- When transitioning between project phases (e.g. Research → Planning → Implementation → Verification).
- Preventing LLM degradation ("context drift", forgetting requirements, repeating mistakes).

---

## 🧠 The 3 Core Principles of Context Optimization

### 1. The Disk-First Persistence Rule
**Compaction erases in-memory reasoning, but disk files survive.**
Never rely on context history to remember task state. Before compacting or clearing context:
- ✅ Write the implementation plan to `{task-slug}.md` or `docs/adr/`.
- ✅ Record test commands, reproduction steps, and key findings in documentation.
- ✅ Commit working code to git branch.

```text
[Research Phase] ──► Write Findings to Disk ──► /compact ──► [Implementation Phase]
```

### 2. Strategic Compaction vs. Auto-Compaction
Arbitrary auto-compaction frequently triggers mid-function edit or while debugging tricky race conditions, resulting in lost variables and context amnesia.

| Phase Transition | Compact? | Rationale |
|------------------|----------|-----------|
| **Research → Planning** | **YES** | Exploration logs are bulky; the structured plan on disk is what matters. |
| **Planning → Implementation** | **YES** | Plan is written in `{task-slug}.md`; clear out draft discussions to maximize coding token headroom. |
| **Mid-Implementation** | **NO** | Keep local variable names, diff context, and recent syntax in memory. |
| **Debugging Failed Run → Retrying** | **YES** | Erase failed hypothesis context so the agent doesn't get stuck in a confirmation loop. |
| **Feature Done → Starting Next Task** | **YES** | Fresh clean slate prevents cross-feature pollution. |

---

### 3. Trigger-Table Lazy Loading
Do not dump entire skills or library references into the active prompt at the start of a session. Load only the specific section matching the user's immediate goal:

```text
User Request ──► Match Trigger Keyword ──► Load Target Skill Section Only
```

- When discussing database migrations: load `.agents/skills/db-migration-guard`.
- When styling interactive components: load `.agents/skills/make-interfaces-feel-better`.
- When optimizing bundle size: load `.agents/skills/react-performance`.

---

## 🔍 Bounded Static File Inspection

When surveying codebases or inspecting files:
- **Never perform unbounded recursive dumps** (`cat` or reading every file in directory).
- **Use target filters:** Inspect only relevant configuration manifests (`package.json`, `tsconfig.json`, `next.config.js`).
- **Grep with line bounds:** Search for specific symbols with limiters instead of loading 500-line files.

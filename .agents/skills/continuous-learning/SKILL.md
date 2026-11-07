---
name: continuous-learning
description: Extracts proven patterns, solved challenges, and architectural decisions into docs/memory/ to ensure agents continuously self-improve and never repeat mistakes.
tags: [memory, continuous-learning, self-improvement, knowledge-base, instincts]
role: [orchestrator, explorer-agent, project-planner]
phase: [discover, review, complete]
frameworks: [All]
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
injection-hardened: true
argument-hint: "[solution-title-or-topic]"
---

# Continuous Learning & Self-Improving Living Memory

> "The difference between an amateur agent and an expert agent is memory. An expert agent learns from every commit, preserves winning patterns, and never repeats a solved mistake."

---

## 🎯 When to Activate

- **Post-Task Completion (Reflect & Save)**: After any task completes with successful tests, clean code, or resolved production bug.
- **Pre-Task Discovery (Retrieve & Apply)**: During Phase 1 (ENTENDER) of any new task, to check if a relevant pattern or gotcha was previously documented in `docs/memory/`.
- When the user says: "remember this pattern", "learn this solution", "document how we solved this for future context", or "salve essa memória".

---

## 📁 Living Memory Structure (`docs/memory/`)

```text
docs/
└── memory/
    ├── README.md               ← Memory ledger overview & guidelines
    ├── LEARNINGS.md            ← Categorized master table of all project learnings
    ├── INDEX.json              ← Fast machine-readable tag index for agents
    ├── template.md             ← Standard blueprint template for new learnings
    └── solutions/              ← Detailed solution records (SLN-*.md)
        ├── SLN-001-scrapling-and-cloudflare-defense.md
        └── SLN-002-concentric-radii-polish.md
```

---

## 📝 Learning Record Specification (`SLN-NNN-[title].md`)

Each record in `docs/memory/solutions/` MUST contain:

1. **Title & Number**: Sequential identifier (`SLN-001`, `SLN-002`, etc.).
2. **Date & Author Agent**: Timestamp and specialist agent that created the solution.
3. **Tags**: Searchable keywords (e.g. `[cloudflare, turnstile, nextjs-15, server-actions, security]`).
4. **Context & The Obstacle**: What was failing, broken, or complex?
5. **The Winning Pattern**: The exact architecture, logic, or technique that solved it.
6. **Gotchas Avoided**: Pitfalls that other developers or LLMs commonly fall into.
7. **Canonical Snippet**: Clean, type-safe, copy-pasteable reference code.

---

## 🔄 The 3-Step Continuous Learning Cycle

### Step 1: Pre-Task Retrieval (Memory-First Discovery)
At the start of any task, `@explorer-agent`:
1. Reads `docs/memory/INDEX.json` and filters by keywords matching the user's request.
2. If a match is found, reads the corresponding `SLN-*.md` file.
3. Informs the team: *"💡 Past Learning Found: Applying proven pattern from SLN-XXX..."*

### Step 2: Post-Task Reflection (Auto-Extraction)
When Stage 5 (Verification) passes with 0 errors:
1. Orchestrator checks: *"Did we solve a tricky challenge, design a reusable pattern, or configure an edge service?"*
2. If YES, runs:
   ```bash
   node .agents/skills/continuous-learning/scripts/record_learning.js \
     --title "Title of the Solution" \
     --tags "tag1,tag2,tag3" \
     --problem "Description of the challenge" \
     --solution "Description of the winning pattern" \
     --gotcha "Key pitfall avoided"
   ```
3. Appends the new learning to `docs/memory/LEARNINGS.md` and updates `docs/memory/INDEX.json`.

### Step 3: Rule Promotion (Instinct Graduation)
When a learning in `docs/memory/` is successfully referenced and reused 3 times across different tasks, it graduates to `.agents/rules/` as a permanent project rule.

---
name: architecture-decision-records
description: Capture and manage Architectural Decision Records (ADRs) as lightweight numbered markdown documents in docs/adr/ following the Michael Nygard standard. Use when evaluating database, auth, state management, API design, or framework trade-offs.
tags: [architecture, adr, documentation, decision-records, planning, governance]
role: [project-planner, backend-specialist, database-architect]
phase: [plan, architecture, review]
frameworks: [All]
allowed-tools: Read, Grep, Glob, Edit, Write
injection-hardened: true
argument-hint: "[decision-topic-or-number]"
---

# Architecture Decision Records (ADR)

> "An architectural decision record (ADR) captures an important architectural choice made along with its context, alternatives considered, and consequences."

Origin: Adapted from the Michael Nygard ADR standard and `affaan-m/ECC`.

---

## 🎯 When to Activate

- Evaluating significant architectural alternatives (e.g. Prisma vs Drizzle vs Kysely, Next.js Server Actions vs tRPC, JWT vs Session Cookies, Supabase vs Self-hosted Postgres).
- When a user says: "let's record this decision", "ADR this", "why did we choose X instead of Y?", or "document the architectural trade-off".
- During project planning (`@project-planner`) before writing complex implementation code.

---

## 📁 Repository Structure

```text
docs/
└── adr/
    ├── README.md               ← Master index table of all decisions
    ├── template.md             ← Reusable ADR template
    ├── 0001-use-nextjs-app-router.md
    ├── 0002-drizzle-orm-for-edge-db.md
    └── 0003-turnstile-over-recaptcha.md
```

---

## 📝 ADR Template Specification (`Michael Nygard Standard`)

Every ADR document in `docs/adr/NNNN-[kebab-case-title].md` MUST follow this structure:

```markdown
# ADR-NNNN: [Decision Title]

- **Date:** YYYY-MM-DD
- **Status:** proposed | accepted | superseded | deprecated
- **Deciders:** [Agent / Engineering Roles involved]
- **Supersedes:** [Optional: ADR-XXXX]

## 1. Context & Problem Statement
What is the problem or architectural requirement driving this decision? What are the technical or business constraints? (2-5 concise paragraphs).

## 2. Decision Outcome
Chosen option: **"[Option Name]"**, because [primary justification].

### Positive Consequences
- [Consequence 1, e.g. Native edge runtime support, zero cold-start delay]
- [Consequence 2, e.g. Type-safety with automatic schema generation]

### Negative Consequences & Trade-offs
- [Trade-off 1, e.g. Steeper initial learning curve for raw SQL queries]
- [Trade-off 2, e.g. Requires manual migration validation checks]

## 3. Alternatives Considered

### Alternative A: [Option Name]
- **Pros:** [List key advantages]
- **Cons:** [List key disadvantages]
- **Why Rejected:** [Specific architectural reason for disqualification]

### Alternative B: [Option Name]
- **Pros:** [List key advantages]
- **Cons:** [List key disadvantages]
- **Why Rejected:** [Specific architectural reason for disqualification]

## 4. Mitigation & Implementation Steps
- [ ] Implement database connection pooling via Cloudflare Hyperdrive / PgBouncer.
- [ ] Add integration test suite in `tests/db/`.
```

---

## 🔄 ADR Lifecycle States

```text
proposed ──► accepted ──► [ superseded by ADR-NNNN | deprecated ]
```

1. **`proposed`**: Open for architectural review and discussion.
2. **`accepted`**: Approved, active, and binding across all code implementations.
3. **`superseded`**: Replaced by a newer decision (always link to `ADR-NNNN`).
4. **`deprecated`**: No longer applicable due to system evolution.

---

## 🤖 Agent Workflow for Recording ADRs

When an architectural choice is reached:
1. Check `docs/adr/` directory. If it doesn't exist, create it along with `README.md` and `template.md`.
2. Inspect existing ADR numbers to determine the next sequential number (e.g. `0004`).
3. Draft the ADR capturing the exact trade-offs discussed with the user.
4. Present the draft summary to the user for confirmation.
5. Write `docs/adr/NNNN-[title].md` and update `docs/adr/README.md`.

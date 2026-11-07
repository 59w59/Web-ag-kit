# 🧠 Project Living Memory & Knowledge Ledger

Welcome to the **Living Memory Ledger** of this project.

## Why this exists
AI coding agents often suffer from session amnesia: they solve a complex problem on Monday, but on Tuesday in a new session, they forget the solution and make the same mistakes or recreate sub-optimal patterns.

The Living Memory Ledger solves this by giving agents a permanent, on-disk knowledge store that survives session compaction and context wipes.

## Structure
- **`LEARNINGS.md`**: Master index table of all documented victories and architectural patterns.
- **`INDEX.json`**: Machine-readable keyword and tag index for instant pre-task querying by `@explorer-agent`.
- **`template.md`**: Standard template for new memory records.
- **`solutions/`**: Detailed records (`SLN-001`, `SLN-002`, etc.) explaining the challenge, the winning solution, and pitfalls avoided.

## How Agents Use This Memory
1. **Pre-Task (Discovery)**: In Phase 1 of any task, `@explorer-agent` checks `INDEX.json` for relevant tags. If a match exists, the proven pattern is retrieved immediately.
2. **Post-Task (Continuous Learning)**: In Phase 6, after all tests and security reviews pass, the `@orchestrator` distills any non-trivial pattern into a new `SLN-*.md` record.

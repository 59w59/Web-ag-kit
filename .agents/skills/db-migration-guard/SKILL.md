---
name: db-migration-guard
description: Audits database schemas, SQL migrations, Prisma, and Drizzle definitions for zero-downtime safety. Prevents exclusive table locks, unindexed foreign keys, destructive column drops, and missing Row-Level Security (RLS).
tags: [database, migrations, zero-downtime, postgresql, prisma, drizzle, supabase]
role: [database-architect, backend-specialist]
phase: [design, build, review]
frameworks: [PostgreSQL-Zero-Downtime, Supabase-RLS]
allowed-tools: Read, Grep, Glob, Bash
injection-hardened: true
argument-hint: "[migration-directory-or-schema]"
---

# Database Migration & Zero-Downtime Guard

> "Zero downtime is not luck—it is deliberate architecture." Guarding web databases against production-halting locks and breaking changes.

---

## 🔧 Runtime Scripts & References

| Tool / Reference | Purpose | Usage |
|------------------|---------|-------|
| `scripts/migration_guard.js` | Scans SQL, Prisma, and Drizzle migrations for table locks & destructive DDL | `node scripts/migration_guard.js [path]` |
| [references/safe-migrations-guide.md](references/safe-migrations-guide.md) | Recipes for the Expand-and-Contract migration pattern | Step-by-step zero-downtime guide |

---

## 🛑 Top 5 High-Risk Database Anti-Patterns

1. **Adding `NOT NULL` without `DEFAULT`**:
   - Acquires an `ACCESS EXCLUSIVE` lock in Postgres on older engines or causes migration failure if rows exist.
2. **`CREATE INDEX` without `CONCURRENTLY`**:
   - Blocks all write operations (`INSERT`, `UPDATE`, `DELETE`) on the table until index building finishes.
3. **Dropping Columns Immediately**:
   - Old application server pods still running during a rolling deployment will immediately throw 500 errors.
4. **Renaming Columns / Tables In-Place**:
   - Instant break for any running query or API process.
5. **Missing Row Level Security (RLS)**:
   - Exposes public tables to direct client queries in Supabase / PostgREST setups.

---

## 🔄 The Expand-and-Contract Pattern (Zero-Downtime)

```
PHASE 1: EXPAND (Release N)
├── Add new column (nullable or with default)
├── Update application code to dual-write (write old AND new)
└── Backfill existing records in small background batches

PHASE 2: MIGRATE READS (Release N+1)
├── Update application code to read from the new column
└── Maintain dual-write during transition

PHASE 3: CONTRACT (Release N+2)
├── Remove application references to the old column
└── Drop old column safely in a final migration
```

---

## 🤖 Activated Personas

- **[`@database-architect`](../agents/database-architect.md)**: Design transactional schemas, indexing strategies, and verify zero-downtime migration steps.
- **[`@backend-specialist`](../agents/backend-specialist.md)**: Implement dual-writing and batch backfill scripts in application services.

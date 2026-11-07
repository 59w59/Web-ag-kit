# Zero-Downtime Safe Migrations Guide

Recipes for common database operations without downtime in PostgreSQL, Prisma, and Drizzle.

---

## 1. Safely Adding a NOT NULL Column

### Dangerous (Locks table or fails):
```sql
ALTER TABLE users ADD COLUMN organization_id UUID NOT NULL;
```

### Safe 3-Step Recipe:
1. Add as nullable:
   ```sql
   ALTER TABLE users ADD COLUMN organization_id UUID;
   ```
2. Backfill existing records:
   ```sql
   UPDATE users SET organization_id = 'default-org-id' WHERE organization_id IS NULL;
   ```
3. Add constraint without blocking writes:
   ```sql
   ALTER TABLE users ADD CONSTRAINT check_org_id CHECK (organization_id IS NOT NULL) NOT VALID;
   ALTER TABLE users VALIDATE CONSTRAINT check_org_id;
   ```

---

## 2. Safely Adding an Index

### Dangerous (Blocks writes for table duration):
```sql
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

### Safe:
```sql
CREATE INDEX CONCURRENTLY idx_orders_customer_id ON orders(customer_id);
```

---

## 3. Safely Renaming a Column

1. **Step 1**: Add the new column name.
2. **Step 2**: Add a database trigger or application dual-write to keep both synchronized.
3. **Step 3**: Deploy app code reading from new column.
4. **Step 4**: Remove trigger and drop old column.

---
title: "SQL Quick Wins: CTEs, Group By, Query Optimization"
description: "Three practical SQL patterns that save time and make queries run faster."
date: "2026-04-14"
tags: ["SQL", "Performance", "Tips & Tricks"]
readTime: "4 min read"
---

## 1. CTEs for Readability (Not Just Elegance)

A WITH clause isn't fancy syntax—it's a readability tool. Break complex logic into digestible steps.

**Without CTE (hard to follow):**
```sql
SELECT 
  customer_id,
  SUM(amount) as total_spent,
  COUNT(*) as num_orders
FROM orders
WHERE order_date >= '2026-01-01'
  AND customer_id IN (
    SELECT id FROM customers 
    WHERE created_at <= '2025-01-01'
  )
GROUP BY customer_id
HAVING COUNT(*) > 5
```

**With CTE (clear intent):**
```sql
WITH established_customers AS (
  SELECT id 
  FROM customers 
  WHERE created_at <= '2025-01-01'
),
recent_orders AS (
  SELECT customer_id, amount
  FROM orders
  WHERE order_date >= '2026-01-01'
)
SELECT 
  customer_id,
  SUM(amount) as total_spent,
  COUNT(*) as num_orders
FROM recent_orders
WHERE customer_id IN (SELECT id FROM established_customers)
GROUP BY customer_id
HAVING COUNT(*) > 5
```

Each CTE answers one question. Future-you (and teammates) will understand instantly.

---

## 2. GROUP BY: Watch Your Aggregations

GROUP BY is straightforward, but easy to mess up. Two things to watch:

**Gotcha 1: Non-aggregated columns**

```sql
-- ❌ WRONG (some databases will error, others guess)
SELECT 
  customer_id, 
  email,  -- This isn't in GROUP BY and isn't aggregated!
  SUM(amount) as total
FROM orders
GROUP BY customer_id

-- ✓ RIGHT
SELECT 
  customer_id, 
  MAX(email) as email,  -- Or use DISTINCT if you know it's one per customer
  SUM(amount) as total
FROM orders
GROUP BY customer_id
```

**Gotcha 2: NULL handling**

GROUP BY treats NULL as a distinct value—all NULLs group together:

```sql
SELECT 
  category,  -- If NULL values exist, they'll be grouped as one row
  COUNT(*) as count
FROM products
GROUP BY category
```

If you have 50 products with no category, they'll appear as one `NULL` row with count 50. Handle intentionally:

```sql
SELECT 
  COALESCE(category, 'Uncategorized') as category,
  COUNT(*) as count
FROM products
GROUP BY COALESCE(category, 'Uncategorized')
```

---

## 3. Query Optimization: Execution Time Wins

You don't need to be a DBA—focus on structure, not tuning.

**Pattern 1: Filter Early**

Move WHERE clauses before JOINs when possible. Filter the largest tables first.

```sql
-- ❌ SLOW (joins millions of rows, then filters)
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.created_at >= '2026-01-01'

-- ✓ FAST (filters orders first, then joins)
SELECT o.*, c.name
FROM (
  SELECT * FROM orders 
  WHERE created_at >= '2026-01-01'
) o
JOIN customers c ON o.customer_id = c.id
```

**Pattern 2: Use UNION Instead of OR**

OR conditions force the database to evaluate every row. UNION can use separate indexes:

```sql
-- ❌ SLOWER
SELECT * FROM orders
WHERE status = 'completed' OR status = 'pending'

-- ✓ FASTER
SELECT * FROM orders WHERE status = 'completed'
UNION ALL
SELECT * FROM orders WHERE status = 'pending'
```

**Pattern 3: Check Execution Time (EXPLAIN ANALYZE)**

Before optimizing, measure:

```sql
EXPLAIN ANALYZE
SELECT customer_id, SUM(amount)
FROM orders
GROUP BY customer_id
```

Look for:
- **Seq Scan** = full table scan (slow if table is huge)
- **Index Scan** = using an index (fast)
- **Actual vs. Planned rows** = big difference = bad estimate

If you see sequential scans on large tables, an index might help. Ask your DBA.

---

## The Pattern

These three techniques work together:
1. **CTEs** = clear, readable structure
2. **GROUP BY** = correct aggregations, handle NULLs
3. **Optimization** = filter early, measure, optimize intentionally

Write for clarity first. Optimize only if it's slow.
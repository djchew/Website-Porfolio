---
title: "Python/Pandas Quick Wins: Data Cleaning & Analysis"
description: "Four practical pandas patterns that speed up exploratory analysis and data cleaning."
date: "2026-04-14"
tags: ["Python", "Pandas", "Data Analysis"]
readTime: "4 min read"
---

## 1. Handling Missing Values (Smart, Not Lazy)

Don't just drop rows. Understand what's missing first. Missing data tells a story—ignoring it without looking is how bad analyses happen.

**Check the damage:**
```python
# See what's missing
df.isnull().sum()  # Count per column
df.isnull().sum() / len(df)  # Percentage

# Visualize patterns
import pandas as pd
df[df.columns[df.isnull().any()]].isnull().sum()
```

Before you do anything, know the scale. 5% missing? Fine. 50% missing? That's a problem with your data source, not something to hide by dropping rows.

**Smart filling:**
```python
# ❌ Don't just do this
df.fillna(0)  # Zeros mean something—now they don't

# ✓ Fill intentionally
df['age'].fillna(df['age'].median())  # Use median for age (won't skew like mean)
df['category'].fillna('Unknown')  # Use category for text (preserves missing info)
df['score'].interpolate()  # Use interpolation for time series (assumes trend continues)
```

Different columns need different strategies. For numeric data, median is safer than mean (one outlier won't skew it). For categories, "Unknown" is honest—it says "we don't know" instead of guessing. For time series, interpolation assumes the trend continues naturally.

**Drop strategically:**
```python
# Drop rows only if critical columns are missing
df.dropna(subset=['customer_id', 'amount'])

# Don't drop if <5% missing
missing_pct = df.isnull().sum().sum() / (len(df) * len(df.columns))
if missing_pct < 0.05:
    df = df.dropna()
```

Only drop rows when that specific data is truly critical. Dropping entire rows because one column is missing wastes good data. Check the percentage first—if it's low, filling is better than deleting.

---

## 2. Data Cleaning Patterns

Real data is messy. These patterns solve 80% of cases. The key: always *check* before you clean.

**Whitespace & case:**
```python
# Strip spaces from text columns
df['name'] = df['name'].str.strip()

# Standardize case
df['category'] = df['category'].str.lower()
```

Why? `"JOHN"`, `"john"`, and `" john "` are three different strings to a database. When you aggregate or filter, they won't match. Standardize first, before you lose data to subtle mismatches.

**Type conversion with safety:**
```python
# ❌ This crashes if there's junk data
df['amount'] = df['amount'].astype(float)

# ✓ Coerce errors to NaN, then investigate
df['amount'] = pd.to_numeric(df['amount'], errors='coerce')
print(df[df['amount'].isnull()])  # See what failed
```

`.astype(float)` will crash on non-numeric values. `pd.to_numeric(..., errors='coerce')` converts bad values to NaN instead—then you can *see* what went wrong. This is crucial. You need to know if you're losing 10 rows or 10,000 rows to bad data.

**Remove duplicates (but check first):**
```python
# How many duplicates?
print(len(df) - len(df.drop_duplicates()))

# Drop, but keep first occurrence
df = df.drop_duplicates(subset=['customer_id'], keep='first')

# Or investigate duplicates
duplicates = df[df.duplicated(subset=['id'], keep=False)]
print(duplicates.sort_values('id'))
```

Count duplicates before dropping them. If you have 1000 duplicates out of 10,000 rows, that's 10%—that's a red flag. Maybe there's a system issue creating duplicates. Just deleting them without asking is sloppy data work.

**Fix date columns:**
```python
# Convert to datetime
df['order_date'] = pd.to_datetime(df['order_date'])

# Handle parse errors
df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')

# Extract components for analysis
df['year'] = df['order_date'].dt.year
df['month'] = df['order_date'].dt.month
df['quarter'] = df['order_date'].dt.quarter
```

Text dates are useless for comparisons or math. Convert to `datetime` so pandas understands them. Then you can extract components for analysis (grouping by month, comparing date ranges, etc.).

---

## 3. List Comprehensions (When & When Not To)

List comprehensions are tempting—they're concise and feel Pythonic. But there's a tradeoff: speed vs. readability.

**Good use case (readable + fast):**
```python
# ✓ Simple, clear transformation
results = [x * 2 for x in numbers if x > 10]

# ✓ Creating a dictionary
df['category_upper'] = [cat.upper() for cat in df['category']]
```

Use them for simple, one-line transformations that are instantly understandable.

**Bad use case (hard to read):**
```python
# ❌ Nested comprehension = hard to debug
results = [[x * y for y in row] for row in matrix if len(row) > 1]

# ✓ Use loops instead (slower, but readable)
results = []
for row in matrix:
    if len(row) > 1:
        results.append([x * y for y in row])
```

Nested comprehensions hurt readability. A 5-line loop is better than a 1-line mystery. Code is read more than written.

**For dataframes, use vectorized operations instead:**
```python
# ❌ List comprehension (slow—iterates row-by-row)
df['bonus'] = [salary * 0.1 if role == 'senior' else salary * 0.05 
               for salary, role in zip(df['salary'], df['role'])]

# ✓ Vectorized (fast—operates on entire columns at once)
df['bonus'] = df['salary'] * df['role'].apply(lambda x: 0.1 if x == 'senior' else 0.05)

# ✓ Or even cleaner
df['bonus'] = df['salary'] * (df['role'] == 'senior').astype(int) * 0.1 + \
              df['salary'] * (df['role'] != 'senior').astype(int) * 0.05
```

Why vectorized operations matter: A list comprehension on 1 million rows is 10x slower than a vectorized pandas operation. For small datasets it doesn't matter. For real data analysis with millions of rows, it does.

**Use `.apply()` for complex logic:**
```python
def categorize_age(age):
    if age < 18:
        return 'Minor'
    elif age < 65:
        return 'Working'
    else:
        return 'Retired'

df['age_category'] = df['age'].apply(categorize_age)
```

When the logic is too complex for a one-liner, extract it into a function and use `.apply()`. It's readable and still efficient.

---

## 4. DataFrame Tricks That Save Time

**Select columns efficiently:**
```python
# Get specific columns
df[['name', 'email', 'created_at']]

# Get all columns except some
df.drop(columns=['id', 'internal_notes'])

# Get columns by type (this is gold)
df.select_dtypes(include=['number'])  # Just numeric
df.select_dtypes(include=['object'])   # Just strings
```

`select_dtypes()` is huge. Instead of manually listing 20 numeric columns, just grab them all. Saves time and is easier to maintain.

**Filter like a pro:**
```python
# Multiple conditions (use & not 'and')
df[(df['age'] > 18) & (df['status'] == 'active')]

# Using .isin() (cleaner than multiple OR)
df[df['status'].isin(['active', 'pending'])]

# Inverse filter (~ means NOT)
df[~df['category'].isin(['spam', 'test'])]  # Everything except spam/test
```

Important: Pandas uses `&` (bitwise AND) and `|` (bitwise OR), not `and`/`or`. And `~` negates a condition. `.isin()` beats chaining ORs—it's faster and more readable.

**Quick aggregations:**
```python
# Group and aggregate multiple ways at once
df.groupby('category').agg({
    'amount': ['sum', 'mean', 'count'],
    'customer_id': 'nunique'
})

# Rename columns after aggregation
df.groupby('category')['amount'].sum().rename('total_amount')
```

Instead of running `.sum()`, `.mean()`, `.count()` separately, do it all at once with `.agg()`. Much faster, cleaner output.

**Get insights fast (do this first):**
```python
# Data quality snapshot
df.info()  # Types, nulls, memory usage

df.describe()  # Mean, std, min, max for numeric columns

# Most common values
df['category'].value_counts()
df['category'].value_counts(normalize=True)  # As percentages
```

Spend 2 minutes exploring your dataframe with `.info()` and `.describe()` before diving into analysis. You'll catch data quality issues early (wrong types, unexpected NULLs, outliers) instead of discovering them 30 minutes into your analysis.

---

## The Philosophy

Clean data = good analysis. These patterns all come down to one principle: **understand before you act**.

- **Handle missing values thoughtfully** — Check what's missing first. 5% is fine. 50% is a problem with your source.
- **Investigate before cleaning** — Count duplicates, check type errors, see what actually failed. Don't just silence errors.
- **Choose the right tool** — List comprehensions for simple transforms, vectorized operations for dataframes, loops for complex logic.
- **Explore first** — Spend 2 minutes with `.info()` and `.describe()` before analyzing. You'll catch 90% of issues upfront.

The best analysts aren't the ones with fancy pandas tricks—they're the ones who ask questions about their data before diving in. These patterns help you ask the right questions fast.

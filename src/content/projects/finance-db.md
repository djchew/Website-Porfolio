---
name: Finance Tracking Database
description: Personal finance tracking system with automated data ingestion, stock price monitoring, analytics dashboards, and investment tracking.
tags:
  - Python
  - SQL
  - Power BI
  - ETL
link: https://github.com/djchew/finance-db
images:
  - /images/projects/finance-db/finance_overview.png
  - /images/projects/finance-db/finance_investments.png
  - /images/projects/finance-db/finance_spending.png
  - /images/projects/finance-db/finance_transactions.png
  - /images/projects/finance-db/finance_budget.png
  - /images/projects/finance-db/finance_insights.png
    
date: "2024"
---
> **Note:** The financial information shown in this app are fictional and used for demonstration purposes only.

Started this project because I was tired of having my financial life spread across five different apps — my bank's app, a brokerage portal, a crypto exchange, a spreadsheet for budgets, and nothing tying it all together.

The idea was simple: one database, everything in it, queried however I want.

The core is a Supabase PostgreSQL database with tables for bank and credit card transactions, stock trades, crypto trades, and daily portfolio snapshots. Python scripts pull CSV exports from my broker and bank, parse them, deduplicate with row hashes, and load them in. Prices get fetched from Yahoo Finance and CoinGecko on a schedule. Everything runs locally — no cloud function, no subscription, no middleman.

The dashboard is a FastAPI app serving a single-page HTML dashboard on localhost:7777. It shows net worth, unrealised P&L across stocks and crypto, cash balances, spending by category, budget tracking, and a few "insights" features — opportunity cost, behavioural patterns, lifestyle creep. Refreshing the page re-queries live data.

Recently added multi-user support. The personal data sits under user_id = NULL, accessible only via service role. Web app users get their own UUID and are isolated by Postgres row-level security. Added a login page to the dashboard so I can switch between my real data and a seeded sample user for testing and demo purposes.

It's not pretty from the outside, but it's exactly what I needed.

---

### How I used AI

Claude was my pair programmer throughout this project. I used it for scaffolding the database schema, writing the ETL scripts, debugging edge cases in the data ingestion pipeline, and iterating on the dashboard layout. All architecture decisions, data modelling choices, and feature priorities were mine — AI handled the implementation grunt work so I could focus on what the tool actually needed to do.


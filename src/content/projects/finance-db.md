---
name: Finance Tracking Database
description: Pull all your finances into one place and spot the patterns spreadsheets hide—where your money goes, what spending really costs you, where lifestyle creep is creeping.
tags:
  - Python
  - SQL
  - Power BI
  - ETL
link: https://github.com/djchew/finance-db
role: End-to-end developer
outcomes:
  - Centralized banking, investment, and budget data into one queryable platform.
  - Added multi-user isolation with PostgreSQL row-level security.
  - Automated ingestion and pricing updates to reduce manual tracking overhead.
images:
  - /images/projects/finance-db/finance_overview.png
  - /images/projects/finance-db/finance_investments.png
  - /images/projects/finance-db/finance_spending.png
  - /images/projects/finance-db/finance_transactions.png
  - /images/projects/finance-db/finance_budget.png
  - /images/projects/finance-db/finance_insights.png
    
date: "2024"
seoImage: /images/projects/finance-db/finance_overview.png
---
> **Note:** The financial information shown in this app are fictional and used for demonstration purposes only.

I was tracking money across ANZ Plus, ING, CMC Invest, Vanguard, and Coinbase, and none of them talked to each other — so I built a self-hosted tracker that pulls it all into one Supabase Postgres database and gives me an actual view of where things stand.

It covers what matters for a DIY investor in Australia: net worth over 1M/3M/6M/1Y windows, per-holding performance with cost basis and P&L, dividend tracking with DRP elections per ticker, and CGT calculations so tax time isn't a scramble through five statements. Transaction categorisation runs on custom rules I've tuned over time, and prices refresh every 15 minutes during market hours so the numbers stay current without me touching anything.

The dashboard is split into 11 tabs — overview, investments, spending, transactions, budgeting, portfolio, tax, trade history, watchlists, market ideas, and savings goals — so each part of my finances gets its own space instead of being crammed into one view. Multi-user support runs on Supabase row-level security, which keeps my data isolated and lets me flip between a demo dataset and my real one without exposing either.


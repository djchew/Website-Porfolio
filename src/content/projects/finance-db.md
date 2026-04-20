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

I got tired of checking five different apps to understand my finances. Bank app, brokerage, crypto exchange, spreadsheet for budgets — nothing connected. So I built one database that pulls it all in and lets me ask whatever questions I want.

The magic happens when you stop fragmenting your data. Once everything's in one place, patterns emerge. You see where money actually goes, spot lifestyle creep before it spirals, calculate what spending really costs you in opportunity (that daily coffee adds up). Those insights are impossible to see when your data lives in five silos.

The system centralizes transactions, trades, and holdings into PostgreSQL. Python imports pull from bank and broker CSVs, live price feeds update automatically, and a dashboard re-queries everything on refresh. I recently added multi-user support — your data stays yours, isolated by Postgres row-level security, so I can toggle between real data and a demo dataset for testing.

It's the same principle big data teams use: the questions you can ask of clean, unified data reveal truths that spreadsheets hide.


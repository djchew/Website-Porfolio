---
name: Real Estate Tracker
description: Full-stack application for tracking real estate listings and portfolio data, with a TypeScript frontend, Python backend, and PostgreSQL database.
tags:
  - TypeScript
  - Python
  - PostgreSQL
  - Full-Stack
link: https://github.com/djchew/real-estate-tracker
images:
  - /images/projects/Dashboard.png
  - /images/projects/Properties.png
  - /images/projects/Analytics.png
date: "2024"
---
> **Note:** The properties shown in this app are fictional and used for demonstration purposes only.
Started this project with a simple question: why do small landlords still manage their properties in spreadsheets?

The app is called RealTrack. It's built for Australian property investors who own between two and ten properties — people who are serious enough about real estate to need proper tooling, but not running a large enough operation to justify enterprise software. That gap is where this lives.

The stack is Next.js 16 on the frontend with the App Router, TypeScript, and Tailwind CSS. The backend is FastAPI in Python, talking to a Supabase PostgreSQL database. Everything launches from a single terminal command — npm run dev — and closes automatically when you shut the browser. There's a desktop shortcut. No terminal required.

The design is deliberately warm. Stone and amber instead of the cold blues you see everywhere in fintech. Rounded cards, a map hero on the dashboard, colour-coded metrics. It's supposed to feel like something you'd actually want to open every morning, not a tool you dread using.

What it does today: tracks owned properties with full financial records, calculates cap rate and cash-on-cash return automatically, alerts you when leases are expiring, logs maintenance requests, exports financials as a CSV for the accountant in July–June financial year format, generates printable PDF reports per property, and lets you track properties you're considering buying — paste a realestate.com.au link and it pulls the listing photo and description automatically.

There's also a demo mode that seeds the whole database with two realistic Australian properties in a single click.

The part I'm proudest of is probably the smallest thing: the address fields autocomplete using OpenStreetMap's Nominatim API, filtered to Australia only, with results cached in localStorage for 30 days. It just works, and it makes the app feel polished in a way that's hard to articulate.

Authentication is the obvious next step. Right now it's a single-tenant app — one set of data, one user. Multi-tenancy and proper login would open it up to SaaS. The architecture is ready for it; Supabase Auth would slot in cleanly.

There's something satisfying about building a tool with a clear, specific user in mind. Not "property managers" in the abstract — a person in Melbourne or Sydney with three investment properties, a spreadsheet they hate, and a lease renewal coming up in 47 days.

That's who this is for.
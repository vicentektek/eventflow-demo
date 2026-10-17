# EventFlow — Safe Interactive Portfolio Demo

An isolated, browser-only demonstration of event and workforce management workflows, inspired by a separate private production application.

**Live demo:** Deployment pending (Vercel or GitHub Pages).  
**Code status:** Functional prototype.  
**Data:** All names, venues, events and monetary amounts are fictional.

## Features
- Event dashboard and calendar
- Create/edit/remove example events
- Create/edit fictional staff members
- Assign people to events with roles, hours and hourly rates
- Calculate sample compensation and register simulated partial payments
- Local activity log
- Reset the demo to its original data

## Privacy and security

This public repository is **not the company's private application** and does not contain its source code, production database, employee records or credentials.

The demo has no backend, API endpoints, database connection, authentication or payment integrations. It does not access the company's Turso database or Vercel environment variables. Data changes are stored only in the visitor's browser through localStorage. The included Vercel configuration blocks network connections through a Content Security Policy.

**Do not enter real employee details or use this as a payroll system.**

## Run locally

Open `index.html` in your browser. Alternatively, serve the folder with:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Deploy

Import this repository into Vercel as a new static site. Do not link it to the existing production Vercel project, domain, database or environment variables. No build step or environment variables are required. After deployment, test all workflows in a browser.

## About the developer

Built by [Vicentekk](https://github.com/vicentektek), an award-winning Meta Horizon Worlds creator and live-event technician. The private production application that inspired these workflows was developed using Next.js, React, TypeScript, Prisma and Turso, with AI-assisted programming through GitHub Copilot and Claude. This public demo is a simplified standalone implementation.

[Devpost portfolio](https://devpost.com/Vicentekk) · [LinkedIn](https://www.linkedin.com/in/vicent-andujar-rico-b19b33aa)

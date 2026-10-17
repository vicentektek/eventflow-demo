# EventFlow Studio

### A production control center — built as an interactive, privacy-safe portfolio demo.

[**Open the live demonstration**](https://vicentektek.github.io/eventflow-demo/) · [**Developer profile**](https://github.com/vicentektek) · [**Devpost portfolio**](https://devpost.com/Vicentekk)

> **Public demo environment.** Every production, crew member, venue, amount and transaction in this project is fictional. No company backend, production database, employee records or secrets are connected.

## Explore the product

| Section | Interactive capabilities |
| --- | --- |
| Overview | Operational dashboard, financial KPIs, upcoming shows, live roster and charts |
| Events | Create, edit, delete, filter and search sample productions |
| Crew & staff | Add and edit sample crew members and their availability |
| Assignments | Assign technicians, calculate estimated fees and simulate partial payments |
| Show calendar | Browse any month and schedule a fictional production by clicking a day |
| Analytics | Estimated project value, labor cost comparisons, settlement progress and CSV export |
| Activity log | Review your browser-local demo changes and export a JSON snapshot |
| Demo & privacy | Understand exactly what the public demonstration does and does not connect to |

The interface is responsive and requires **no signup**, database or API key.

## Architecture

The demonstration intentionally uses **vanilla JavaScript, HTML and CSS**, optimized for GitHub Pages. It runs entirely in the visitor's browser.

- `index.html` — application entry point and startup fallback
- `studio.css` — responsive dark design system
- `studio.js` — fictional data, event/crew workflows, calculations, local persistence
- `favicon.svg` — brand mark
- `vercel.json` — optional configuration for a separate Vercel deployment

Browser-only changes are stored in `localStorage`. Use **Reset sample data** to start fresh. Data is not shared between visitors.

### Run locally

Clone the repository and serve the root directory with a local web server:

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

### Deploy with GitHub Pages

In your repository, open **Settings → Pages** and select **Deploy from a branch**, branch `main`, folder `/ (root)`. GitHub Pages can publish the site without a build step.

## Security boundaries

- No Turso database, production API, authentication service or real payroll integration
- No API requests or external JavaScript libraries
- No personal employee data, credentials, tokens or production configuration
- Forms accept only fictional information and store it in browser-local storage
- Payment actions only update simulated balances; they **cannot transfer money**
- Public code is separate from the production event management application

**Important:** The demo is not a payroll application, does not implement server-side authorization, and should not be used to process real employee information.

## Background

This standalone portfolio experience is inspired by an internal event-management application developed for live productions with **Next.js, React, TypeScript, Prisma, Turso and AI-assisted programming tools**. The public version is a separate simulation; it does **not** represent the private system's source code or a live integration with AI services.

Created by [Vicentekk](https://github.com/vicentektek), a Meta Horizon Worlds creator and professional live-event technician based in Valencia, Spain.

---

*Concept and example data are for portfolio demonstration purposes only.*

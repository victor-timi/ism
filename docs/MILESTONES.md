# ISM — Milestone Tracker

## Overview

| Milestone | Scope | Budget | Status |
|---|---|---|---|
| M1 | Foundation & CMS Setup | $600 USD | Complete |
| M2 | Hub Core Functionality | $600 USD | Not Started |
| M3 | Aggregation, Forum, Launch & Handover | $800 USD | Not Started |

---

## Milestone 1 — Foundation & CMS Setup ($600)

**Status: COMPLETE**

### Deliverables

| # | Deliverable | Status | Notes |
|---|---|---|---|
| 1 | Next.js application scaffold with responsive layout and navigation | Done | Next.js 16 App Router, Tailwind v4 + shadcn/ui, responsive nav with mobile Sheet menu |
| 2 | Sanity CMS connected with content types for pages, announcements, and homepage statistics | Done | 4 schemas (Page, Announcement, Homepage Stats, Site Settings), GROQ queries, client with CDN |
| 3 | Northflank staging deployment with environment configuration | Done | Dockerfile (multi-stage, Node 22 Alpine), deployed and accessible |
| 4 | CI/CD pipeline configured and verified | Done | GitHub Actions: install, prisma generate, lint, type-check, test — all passing |
| 5 | Initial documentation and repository setup | Done | 5 docs in `docs/`, `.env.example` with all vars, README |

### Acceptance Criteria

| # | Criteria | Status | How to Verify |
|---|---|---|---|
| 1 | CMS content can be edited and reflected on staging | Done | Go to `/studio`, edit Site Settings or Announcements, verify on staging |
| 2 | Staging deployment updates automatically from repository | Done | Push to `main` → CI passes → Northflank auto-deploys |
| 3 | Core layout is responsive and navigable | Done | Test on mobile/tablet/desktop — nav collapses to hamburger on mobile |
| 4 | Code available in client Git repository | Done | GitHub repo with full commit history |

### What Was Built

**Pages:**
- Marketing: Home, About, Blog, Community, Contact, Forum, Privacy, Terms
- Auth: Sign In, Sign Up (with animated split-panel layout)
- Account: Saved Items, Alerts, Settings (protected by middleware)
- Hub: Jobs / Housing / Discounts tabs with filter bar (mock data for now)
- Sanity Studio embedded at `/studio` (protected)

**Infrastructure:**
- Auth.js v5 with Credentials provider, bcrypt password hashing, JWT sessions
- Prisma 6 schema with models: User, Account, Session, Listing, SavedItem, Alert, IngestionRun
- Middleware protecting `/saved`, `/alerts`, `/settings`, `/studio`
- Docker multi-stage build (runs as non-root user, port 3000)
- docker-compose.yml for local Postgres development

**Documentation:**
- `docs/SETUP_AND_DEPLOYMENT.md` — Sanity setup, Northflank deploy, env var reference, CI/CD
- `docs/CLIENT_BRIEF.md` — Hub data sources (jobs, housing, discounts)
- `docs/BRAND.md` — Brand guidelines
- `docs/LANDING_PAGE_SECTIONS.md` — Homepage structure
- `docs/project-brief.md` — Project overview
- `.env.example` — All environment variables with milestone annotations

---

## Milestone 2 — Hub Core Functionality ($600)

**Status: NOT STARTED**

### Deliverables

| # | Deliverable | Dependencies |
|---|---|---|
| 1 | Opportunity Hub UI with Jobs, Housing, and Discounts tabs | Hub UI exists with mock data — needs real API routes |
| 2 | Neon PostgreSQL and Prisma models for users, saved items, alerts, and ingestion | Schema exists — needs first migration run against Neon |
| 3 | Discounts ingestion from OzBargain RSS | New: RSS parser + background worker |
| 4 | Background worker for ingestion | New: cron/worker architecture on Northflank |
| 5 | Saved items functionality linked to authenticated users | New: API routes for save/unsave + UI integration |
| 6 | NextAuth authentication and Zoho SMTP email functionality | Auth done — Zoho SMTP integration is new |

### Acceptance Criteria

| # | Criteria | How to Verify |
|---|---|---|
| 1 | Users can authenticate and receive required emails | Sign up → receive welcome/verification email via Zoho SMTP |
| 2 | Discounts listings populate reliably | OzBargain deals appear in Hub > Discounts tab within ingestion cycle |
| 3 | Saved items persist correctly per user | Sign in → save a listing → reload → still saved; sign out → sign in → still saved |
| 4 | Hub interface operates correctly across desktop and mobile | Test filters, pagination, tab switching on all screen sizes |

### Implementation Scope

- **API Routes:** `GET /api/listings` (with type/filter/pagination), `POST/DELETE /api/saved-items`
- **Ingestion Worker:** OzBargain RSS → parse → deduplicate (contentHash) → upsert to Listing table → log to IngestionRun
- **Email Service:** Zoho SMTP transport via Nodemailer, templates for password reset and alert notifications
- **Database:** Run `prisma migrate deploy` against Neon, seed initial data if needed
- **Hub UI:** Replace mock data with real API calls, wire up save buttons, implement pagination

### Environment Variables Needed

```
DATABASE_URL        — Neon Postgres connection string
SMTP_HOST           — smtp.zoho.com.au
SMTP_PORT           — 465
SMTP_USER           — Zoho email account
SMTP_PASS           — Zoho app password
EMAIL_FROM          — noreply@ism.org.au
```

---

## Milestone 3 — Aggregation, Forum, Launch & Handover ($800)

**Status: NOT STARTED**

### Deliverables

| # | Deliverable | Dependencies |
|---|---|---|
| 1 | Jobs ingestion from SEEK, Indeed Australia, and Jora | New scrapers/API integrations |
| 2 | Housing ingestion from Flatmates.com.au, Flatmate Finders, Sharehouse.app, Gumtree, and university portals | New scrapers |
| 3 | Alerts system with deduplication and unsubscribe functionality | Depends on M2 email service |
| 4 | Discourse forum deployment with full SSO integration | New: Discourse hosting + SSO consumer config |
| 5 | Production deployment with Cloudflare, SSL, and environment configuration | New: DNS, SSL, prod env vars |
| 6 | Monitoring, logging, and automated database backups | New: Northflank monitoring + Neon backup schedule |
| 7 | Complete documentation and project handover | New: operational runbooks, handover pack |

### Acceptance Criteria

| # | Criteria | How to Verify |
|---|---|---|
| 1 | Jobs and housing listings populate reliably | Hub > Jobs and Hub > Housing tabs show fresh listings from all sources |
| 2 | Alerts deliver correctly and allow unsubscribe | Set an alert → new matching listing appears → email received → click unsubscribe → no more emails |
| 3 | SSO functions across website and forum | Sign in on ISM → click Forum → auto-logged into Discourse; sign up on forum → account created on ISM |
| 4 | Production platform is stable and publicly accessible | `ism.org.au` loads, SSL valid, no errors in Northflank logs |
| 5 | All documentation and service access delivered | Client has admin access to all services + handover pack |

### Data Sources

**Jobs:**

| Source | Method | Frequency | Compliance |
|---|---|---|---|
| SEEK | Affiliate/API, fallback metadata scraping | Every 3-6 hours | Summary + click-through only |
| Indeed AU | Metadata scraping | Every 6 hours | Summary only, redirect to source |
| Jora | RSS/API, fallback scraping | Every 6 hours | Summary only |

**Housing:**

| Source | Method | Frequency | Compliance |
|---|---|---|---|
| Flatmates.com.au | Metadata scraping | Every 6 hours | No full listing storage |
| Flatmate Finders | Scraping | Every 6 hours | Summary only |
| Real Estate Share Listings | Scraping/feed | Every 6 hours | Display summaries |
| Sharehouse.app | Scraping | Every 6 hours | Summary only |
| Gumtree | Scraping | Every 6 hours | Summary + throttling |
| University portals | RSS or structured scrape | Every 12 hours | Summary only |

**Discounts (from M2):**

| Source | Method | Frequency | Compliance |
|---|---|---|---|
| OzBargain | RSS | Every 1 hour | RSS compliant |
| Finder Deals | RSS/API | Every 2 hours | RSS/API compliant |

### Environment Variables Needed

```
DISCOURSE_URL           — e.g. https://forum.ism.org.au
DISCOURSE_SSO_SECRET    — shared secret for SSO handshake
NEXT_PUBLIC_PLAUSIBLE_DOMAIN — ism.org.au (for analytics)
```

### Handover Checklist

- [ ] Source code repository with full commit history
- [ ] README and local development setup guide
- [ ] Environment variable reference
- [ ] Database schema and migration overview
- [ ] Worker job schedules and locations
- [ ] Deployment and rollback procedures
- [ ] Operational runbooks and monitoring references
- [ ] Staging and production deployments working
- [ ] Admin access transferred for: Northflank, Neon, Sanity, Cloudflare, Discourse, Zoho SMTP
- [ ] Verified email delivery
- [ ] Verified analytics tracking

---

## Post-Launch Support

**Duration:** 2 months hypercare after M3 launch

**Included:**
- Bug fixes for delivered functionality
- Monitoring ingestion stability
- Minor configuration or UX adjustments
- Scraper fixes if source layouts change
- Response target: 1 business day for critical issues

**Out of Scope:**
- New feature development
- Large UI redesigns
- New source integrations
- Additional support billed separately (hourly or fixed-price)

---

## Timeline

**Estimated delivery:** 3-5 weeks total across all milestones

**Assumptions:**
- Required service accounts and credentials available at project start
- Third-party platform stability may affect ingestion timelines (communicated proactively)

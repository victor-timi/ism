# ISM Platform Rebuild & Student Services Expansion

*Jobs, Housing & Discounts Aggregation Platform*

## Objective

Rebuild and expand the ISM platform into a modern, student-focused digital hub combining:

- Community engagement (forum + SSO)
- Resources & editorial content (CMS)
- Curated opportunities for international students in Australia (jobs, shared accommodation, verified discounts)

**Goal:** Solid foundational architecture for scalability, maintainability, and extensibility.

---

## Core Product Features

### 1. Student Opportunity Hub

Three-tab experience for students:

**A. Part-Time Jobs**
- Aggregated from SEEK, Indeed Australia, Jora
- Listings displayed as summaries; click-through to original platforms
- Filters: Location, Casual / Part-time, Industry
- Save jobs & set alerts

**B. Share Accommodation**
- Aggregated from Flatmates.com.au, Flatmate Finders, Realestate.com.au (Share), Sharehouse.app, Gumtree, University housing portals
- Student-safe filtering, saved listings, scam-awareness indicators
- Alerts for new listings

**C. Student Discounts / Deals**
- Primary: OzBargain RSS feed
- Secondary: Finder (Deals)
- Features: category filtering, popularity ranking, expiry tracking, saved deals, notifications

Aggregation runs via background workers using Playwright; all scraping is compliant and lightweight.

### 2. Homepage Enhancements

**Hero Section:**
- JOIN THE MOVEMENT
- Subtitle: FOR STUDENTS. BY STUDENTS

**Animated Statistics Section:**
- ~833,000 international students in Australia (2025)
- A$53.6 billion annual economic contribution
- International education as a top export (#3)
- 50%+ students from Asia-Pacific regions
- ~32-35% international enrolment in universities

Smooth count-up animations and scroll-based transitions. Lightweight and performance-safe.

### 3. Community Forum

- Discourse recommended
- Mobile-first, open-source, strong moderation tools
- SSO integrated with Next.js authentication
- Single account across website + forum

---

## Technology Stack

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| Frontend | Next.js (latest, App Router) | SSR/SSG, API routes, server actions, mobile-first |
| Backend / API | Next.js API routes + Node.js workers | Handles scraping, aggregation, notifications |
| Database | PostgreSQL on Neon | Structured storage; Prisma ORM for clean models |
| CMS | Sanity | Editorial content; real-time updates; low maintenance |
| Authentication | NextAuth.js | OAuth/email login; SSO with Discourse |
| Background Workers | Node.js + Playwright | Aggregates jobs/housing/discounts; isolated for compliance |
| Email | Zoho Mail Lite SMTP | Transactional emails (password resets, alerts, notifications) |
| Optional Storage | Cloudflare R2 | Store media or files |
| Deployment | Northflank | CI/CD, containerized services, monitoring, scaling |
| CDN / Security | Cloudflare | Edge caching, SSL, DNS |
| Analytics | Google Analytics / Plausible | Flexible tracking & privacy-friendly analytics |
| SEO | Structured metadata, SSR/SSG | Optimized discoverability & rich snippets |

---

## CMS / Project Strategy

Sanity Free Plan supports 2 projects:
- Up to 20 user seats per project
- 2 permission roles, 2 datasets (public only)
- Unlimited content types & locales
- Real-time editing & live previews

**Usage:**
- Pages, homepage, stats, announcements, blog -> Sanity
- Jobs, housing, discounts, saved items -> PostgreSQL (Neon)

---

## Scraping & Background Workers

Node.js + Playwright for:
- Jobs aggregation (SEEK, Indeed, Jora)
- Housing aggregation (Flatmates.com.au, Gumtree, others)
- RSS ingestion for discounts (OzBargain, Finder)

Workers run in isolated Northflank containers, scheduled or triggered.

---

## Deployment & Infrastructure

- **Northflank:** Next.js + worker containers
- **Neon PostgreSQL:** database hosting
- **Sanity CMS:** SaaS
- **Discourse:** separate container/service, SSO integration
- **Cloudflare:** CDN, SSL, DNS
- **Monitoring & Logs:** Northflank + Cloudflare analytics

---

## Scope of Work

- UI/UX redesign (responsive, mobile-first)
- Homepage animation & stats
- Student Opportunity Hub (Jobs, Housing, Discounts)
- Backend APIs & data models (Next.js + PostgreSQL + Prisma)
- Forum SSO integration (NextAuth + Discourse)
- CMS integration (Sanity Free Plan)
- Email infrastructure (Zoho Mail Lite SMTP, phase 1)
- SEO optimization (SSR + structured metadata)
- Performance & security hardening
- Background workers (Node.js + Playwright)
- Clean, scalable codebase

---

## Timeline & Investment

- **Estimated Completion:** 3-5 Weeks
- **Total Investment:** $2,000 USD

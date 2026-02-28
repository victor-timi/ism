# ISM — Milestone 1: Foundation & CMS Setup

**Status**: Complete
**Date**: February 2026

> **Important — this is a scaffold, not the final design for all internal pages.** The internal pages (Hub, Settings, Saved Items, Alerts, etc.) are structural placeholders and their UI will change significantly as we build them out in M2 and M3. For design reference, focus on:
>
> - **Landing page** — the homepage is where color palette, brand identity, typography, and animation choices were finalized. Use it as the source of truth for visual direction.
> - **Auth pages (Sign In / Sign Up)** — these reflect final UI decisions around form layout, spacing, and component styling. Base UI decisions on them.
>
> Internal page layouts, components, and styles should not be treated as final.

---

## What Was Delivered

### 1. Fully Responsive Web Application

A modern, production-ready web application built with Next.js 16, featuring:

- **10 pages**: Home, About, Blog, Community, Contact, Forum (preview), Privacy, Terms, Sign In, Sign Up
- **Student Opportunity Hub**: Tabbed interface for Jobs, Housing, and Discounts (ready for real data in M2)
- **Account pages**: Saved Items, Alerts, Settings (protected — requires sign-in)
- **Mobile-optimized**: Every page is fully responsive across phone, tablet, and desktop

### 2. Brand & Design System

**Color palette**: Emerald green as the primary accent — representing growth, opportunity, and Australia. Paired with warm cream backgrounds (light mode) and deep navy (dark mode) for a premium, trustworthy feel.

**Logo**: Stylized "M" mark in an emerald gradient square. The three peaks represent ISM's three pillars: Jobs, Housing, and Deals.

**Typography**: Manrope — a modern geometric font with wide language support. Fluid sizing that scales smoothly from mobile to desktop without breakpoints.

**Animations**: Scroll-triggered reveals, count-up counters, typewriter effects, parallax, and glassmorphism cards. All animations are GPU-optimized and follow a consistent easing curve for a cohesive feel.

**Dark mode**: Full light/dark mode support with independently designed color schemes (not just inverted). Loads instantly without any flash.

### 3. Navigation

- Fixed top bar that transitions from transparent to solid on scroll
- Dropdown menus for Hub and Resources
- Full-screen mobile menu with smooth animations
- Session-aware: shows account menu when logged in, Sign In / Join Now when not

### 4. Homepage Sections

| Section | Content |
|---|---|
| **Hero** | Animated headline, typewriter tagline, growth chart, 5 stat counters |
| **Value Proposition** | Forum community preview, three pillar cards (Jobs, Housing, Deals) |
| **Getting Started** | Four-step onboarding flow |
| **FAQ** | Collapsible Q&A accordion |
| **CTA** | Final call-to-action with sign-up and explore buttons |

### 5. Authentication

- Sign up with name, email, and password
- Sign in with email and password
- Secure password hashing
- Protected routes (saved items, alerts, settings require sign-in)
- Split-panel auth pages with animated network diagram showing Jobs, Housing, and Deals

### 6. Sanity CMS

Connected and accessible at `/studio`. Four content types ready to populate:

| Content Type | Purpose |
|---|---|
| **Site Settings** | Site name, tagline, hero content, footer text |
| **Announcements** | Banner messages (toggle active/inactive) |
| **Homepage Stats** | Jobs, housing, discounts, and members count values |
| **Pages** | Generic pages with rich text and images (Privacy, Terms, etc.) |

**To populate the CMS**, create these documents in the studio:

1. **Site Settings** — site name, tagline, hero heading/subheading, CTA text, footer text
2. **Homepage Stats** — display values for each counter (e.g. "2,400+", "890+", "150+", "833,000+")
3. **Announcements** — any launch banners or alerts
4. **Pages** — Privacy Policy, Terms of Service

### 7. Database Schema

All database models are designed and ready for M2 activation:

- Users and authentication
- Listings (jobs, housing, discounts)
- Saved items (user bookmarks)
- Alerts (notification preferences)
- Ingestion tracking (worker run logs)

### 8. Deployment & CI/CD

- **Hosting**: Deployed to Northflank with Docker
- **Auto-deploy**: Every push to `main` triggers a new deployment
- **CI pipeline**: Automated linting, type-checking, and tests on every push and PR
- **Zero-downtime**: Northflank handles rolling deployments

---

## What's NOT in M1

| Item | Planned For | Notes |
|---|---|---|
| Live database | M2 | Schema written, migration runs when Neon is connected |
| Email delivery | M2 | Using Resend for transactional emails (password reset, alerts) |
| Data ingestion | M2/M3 | Background workers for scraping/RSS |
| Discourse forum | M3 | Separate application with SSO — the `/forum` page is a UI preview |
| Playwright (scraping) | M3 | For JS-rendered sites like Indeed and Gumtree |
| WebSockets / Socket.io | Not needed | Forum is handled by Discourse |
| Production DNS / SSL | M3 | Cloudflare setup for `ism.org.au` |

---

## What's Needed for M2

### Services to Set Up

| Service | Purpose | Cost |
|---|---|---|
| **Neon Postgres** | Database for users, listings, saved items | Free tier |
| **Resend** | Transactional email (password reset, alerts) | Free tier (3,000 emails/month) |

### Environment Variables

```
DATABASE_URL          — Neon connection string
RESEND_API_KEY        — Resend API key
EMAIL_FROM            — ISM <noreply@ism.org.au>
```

### What M2 Builds

1. Connect database and run migrations
2. OzBargain RSS ingestion (discounts)
3. API routes for listings with filters and pagination
4. Save/unsave functionality tied to user accounts
5. Email service (welcome, password reset, alert notifications)
6. Replace Hub mock data with real database queries

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (React 19) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Motion.js 12 |
| Database | Prisma 6 + Neon PostgreSQL |
| Auth | Auth.js v5 |
| CMS | Sanity v5 |
| Email | Resend |
| Hosting | Northflank (Docker) |
| CI/CD | GitHub Actions |
| Testing | Vitest 4 |

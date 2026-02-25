# ISM — Setup & Deployment Guide

## Table of Contents

- [Sanity CMS Setup](#sanity-cms-setup)
- [Northflank Deployment](#northflank-deployment)
- [Environment Variables Reference](#environment-variables-reference)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Sanity CMS Setup

All Sanity schemas, client, and GROQ queries are already configured in the codebase. You just need to connect your Sanity project.

### Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign up / log in
2. Click **"Create project"** — name it **"ISM"** — dataset: `production`
3. Copy your **Project ID** from the project dashboard

### Step 2: Get an API Token

1. In your Sanity project dashboard, go to the **API** tab → **Tokens**
2. Click **"Add API token"** — name: `ISM Next.js` — permissions: **Editor**
3. Copy the token (you won't be able to see it again)

### Step 3: Configure Environment Variables

Add these to your `.env.local` file (create it at the project root if it doesn't exist):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-editor-token"
SANITY_REVALIDATE_SECRET="any-random-string-you-choose"
```

### Step 4: Access the Studio

Run `pnpm dev` and navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

You'll see the Sanity Studio with 4 content types ready to populate:

| Content Type | Purpose |
|---|---|
| **Site Settings** | Site name, tagline, hero content, footer text |
| **Announcements** | Banner announcements (active/inactive toggle) |
| **Homepage Stats** | Jobs, housing, discounts, members counts |
| **Pages** | Generic pages with title, slug, description, rich body |

### Sanity File Structure

```
sanity/
├── sanity.config.ts       # Studio configuration
├── lib/
│   ├── client.ts          # Sanity client (CDN in prod)
│   └── queries.ts         # GROQ queries
└── schemas/
    ├── index.ts            # Schema exports
    ├── page.ts             # Page document type
    ├── site-settings.ts    # Site settings (singleton)
    ├── announcement.ts     # Announcements
    └── homepage-stats.ts   # Homepage statistics (singleton)
```

### Webhook Revalidation (Optional)

To enable on-demand revalidation when content changes in Sanity:

1. In your Sanity project dashboard → **API** → **Webhooks**
2. Create a webhook pointing to `https://your-domain.com/api/sanity/revalidate`
3. Set the secret to match your `SANITY_REVALIDATE_SECRET` value
4. Trigger on: Create, Update, Delete

---

## Northflank Deployment

The project includes a production-ready multi-stage Dockerfile and CI pipeline.

### Option A: Connect GitHub Repo (Recommended)

This gives you automatic deploys on every push to `main`.

#### 1. Create a Northflank Project

1. Go to [northflank.com](https://northflank.com) and create a project
2. Click **Add Service** → **Build & Deploy**
3. Connect your GitHub repository

#### 2. Configure Build Settings

Northflank auto-detects the `Dockerfile`. Verify these settings:

- **Dockerfile path:** `./Dockerfile`
- **Build context:** `.`
- **Port:** `3000`

#### 3. Provision a Database

**Option 1 — Northflank Postgres Addon:**
- In your project, click **Add Addon** → **PostgreSQL**
- Copy the connection string

**Option 2 — Neon (Free Tier):**
- Go to [neon.tech](https://neon.tech), create a project
- Copy the connection string (with `?sslmode=require`)

#### 4. Set Environment Variables

In the Northflank service settings → **Environment**:

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Auth
AUTH_SECRET="<generate with: openssl rand -base64 32>"
AUTH_URL="https://your-app.northflank.app"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="fzz34o09"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-editor-token"
SANITY_REVALIDATE_SECRET="your-secret"
```

#### 5. Database Migration

Add a **Job** or **init command** to run migrations before the app starts:

```bash
npx prisma migrate deploy
```

Alternatively, add it as a pre-start script in the Dockerfile or Northflank's build hooks.

#### 6. Deploy

Northflank builds the Docker image and deploys automatically. Every subsequent push to `main` triggers a new deployment.

### Option B: Push Docker Image Manually

For a one-time deploy without GitHub integration:

```bash
# Build the image locally
docker build -t ism-app .

# Tag for Northflank registry
docker tag ism-app registry.northflank.com/<your-project>/ism-app:latest

# Push to Northflank
docker push registry.northflank.com/<your-project>/ism-app:latest
```

Then create a service in Northflank pointing to that image.

### Dockerfile Summary

The Dockerfile uses a multi-stage build for optimal image size:

| Stage | Purpose |
|---|---|
| **base** | Node.js 22-alpine with pnpm enabled |
| **deps** | Install dependencies (frozen lockfile) |
| **builder** | Run `prisma generate` + `next build` |
| **runner** | Production image with standalone output only |

Runtime details:
- Runs as unprivileged `nextjs` user (UID 1001)
- Listens on port `3000` (host `0.0.0.0`)
- Entry point: `node server.js`

---

## Environment Variables Reference

| Variable | Required | Public | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | No | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | No | NextAuth.js secret key |
| `AUTH_URL` | Yes | No | App base URL for auth callbacks |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Yes | Sanity dataset name |
| `SANITY_API_TOKEN` | Yes | No | Sanity API token (Editor role) |
| `SANITY_REVALIDATE_SECRET` | Yes | No | Secret for webhook revalidation |
| `SMTP_HOST` | M2 | No | Email SMTP host |
| `SMTP_PORT` | M2 | No | Email SMTP port |
| `SMTP_USER` | M2 | No | Email SMTP username |
| `SMTP_PASS` | M2 | No | Email SMTP password |
| `EMAIL_FROM` | M2 | No | Sender email address |
| `DISCOURSE_URL` | M3 | No | Discourse forum URL |
| `DISCOURSE_SSO_SECRET` | M3 | No | Discourse SSO secret |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | M2 | Yes | Plausible analytics domain |

**M2** = Milestone 2, **M3** = Milestone 3 (not needed for initial deployment)

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main` and every PR:

1. **Install dependencies** — `pnpm install --frozen-lockfile`
2. **Generate Prisma client** — `pnpm prisma generate`
3. **Lint** — `eslint . --max-warnings 0`
4. **Type check** — `tsc --noEmit`
5. **Test** — `vitest run`

### Recommended Deployment Flow

```
Feature branch → PR → CI passes (lint/typecheck/test) → Merge to main → Northflank auto-deploys
```

---

## Service Summary

| Service | Provider | Cost |
|---|---|---|
| App hosting | Northflank | Free tier available |
| Database | Northflank Postgres addon or Neon | Free tier available |
| CMS | Sanity (hosted) | Free tier (3 users, 100K API requests/mo) |
| CI/CD | GitHub Actions | Free for public repos |

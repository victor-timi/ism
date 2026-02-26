# ISM — International Students Movement

One platform for jobs, housing, and student discounts for international students in Australia.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Neon PostgreSQL + Prisma 6
- **Auth:** Auth.js v5 (Credentials provider)
- **CMS:** Sanity v5 (embedded studio at `/studio`)
- **Testing:** Vitest 4
- **Deployment:** Northflank (Docker), GitHub Actions CI

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in DATABASE_URL, AUTH_SECRET, Sanity credentials (see docs/SETUP_AND_DEPLOYMENT.md)

# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Home, About, Blog, Contact, etc.
│   ├── (auth)/          # Sign In, Sign Up
│   ├── (account)/       # Saved Items, Alerts, Settings (protected)
│   ├── (hub)/           # Student Opportunity Hub
│   └── api/             # API routes (auth, listings)
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Navigation, Footer, Providers
│   ├── home/            # Homepage sections
│   ├── auth/            # Auth layout
│   └── hub/             # Hub components
├── lib/                 # Auth config, hooks, utilities
└── middleware.ts        # Route protection

sanity/
├── schemas/             # CMS content types
└── lib/                 # Client + GROQ queries

prisma/
└── schema.prisma        # Database models
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint (zero warnings) |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test` | Run Vitest tests |
| `pnpm prisma studio` | Open Prisma database browser |

## Documentation

- [Setup & Deployment](docs/SETUP_AND_DEPLOYMENT.md) — Sanity, Northflank, env vars, CI/CD
- [Milestones](docs/MILESTONES.md) — Deliverables, acceptance criteria, and progress
- [Client Brief](docs/CLIENT_BRIEF.md) — Hub data sources
- [Brand Guidelines](docs/BRAND.md) — Colors, typography, tone
- [Project Brief](docs/project-brief.md) — Project overview

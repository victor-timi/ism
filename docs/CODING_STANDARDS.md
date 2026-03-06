# Coding Standards

Rules and conventions for the ISM codebase. Every contributor (human or AI) must follow these.

## Architecture

### File Organisation
- **One component per file** — no exceptions.
  - Acknowledged violations: `SignInForm` inside sign-in page (required for `<Suspense>` + `useSearchParams()` in Next.js 16), `NetworkDiagram` inside `auth-layout.tsx`.
- **Editable text in data files** — headings, descriptions, FAQ items, stats, and other copy go in `data.ts` files alongside their page/component, not inline in JSX.

### Import Rules
- **`@/` aliases always** — never `../../..` relative imports.
- **Import order** — React/Next → external libs → internal UI (`@/components/ui/`) → internal components → internal lib (`@/lib/`) → types.

### Centralised Modules
- **Routes** — always import from `ROUTES` in `src/lib/routes.ts`. Never hardcode path strings.
- **Validation** — always Zod schemas in `src/lib/validations/`. No inline validation logic.
- **API client** — always use `apiClient` from `src/lib/api/client.ts`. No raw `fetch()`.
- **Hooks** — reusable hooks live in `src/lib/hooks/`. Check before creating new ones.
- **UI components** — always use `Button`, `Input`, `Label`, `Textarea`, `Select`, etc. from `src/components/ui/`. Never use raw HTML form elements.

### Check Before Creating
Before writing a new utility, hook, or component, search these directories:
- `src/lib/hooks/`
- `src/lib/utils.ts`
- `src/lib/validations/`
- `src/components/ui/`

## Forms

Every form follows this pattern — no exceptions:

1. **Zod schema** in `src/lib/validations/` for validation rules.
2. **`react-hook-form`** with `zodResolver` for client-side form state.
3. **`useAppMutation`** from `src/lib/hooks/use-app-mutation.ts` for submission.
4. **shadcn Form components** (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`) for complex forms (3+ fields).
5. **`register()` + inline errors** for simple forms (1-2 fields, e.g. newsletter).

### Mutation Hook
`useAppMutation` accepts any `mutationFn: (data: T) => Promise<R>`. It is axios-agnostic — pass `apiClient.post()`, `signIn()`, or any async function.

## API Routes

- All routes return `{ error: string, fieldErrors?: Record<string, string[]> }` on failure.
- Validate input with Zod `safeParse()` using schemas from `src/lib/validations/`.
- Never trust client input — always validate at the API boundary.

## TypeScript

- **Strict mode** — no `any`, no `@ts-ignore`.
- Prefer `unknown` + type narrowing over `any`.
- Export types alongside their schemas (e.g. `export type SignUpValues = z.infer<typeof signUpSchema>`).

## Accessibility

- All form fields must have associated labels (use `FormLabel` or `Label`).
- Inputs in error state must have `aria-invalid={true}`.
- All interactive elements must be keyboard navigable.

## Code Style

- **No premature abstraction** — three similar lines of code is better than one abstraction nobody understands. Only abstract when you have 3+ concrete use cases.
- **No over-engineering** — don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and framework guarantees.
- **No inline business logic in components** — extract to hooks (`src/lib/hooks/`) or utils (`src/lib/utils.ts`).

## Security

- Validate at system boundaries (API routes). Never trust client input server-side.
- Never commit secrets (`.env`, credentials, API keys).
- Sanitise user-generated content before rendering.

## Build & CI

- **Lint runs in build** — `pnpm build` executes `next lint --max-warnings 0` before `next build`. A lint failure blocks the build.
- **Zero warnings policy** — ESLint is configured with `--max-warnings 0`. Fix warnings, don't suppress them.
- **CI pipeline** — install → prisma generate → lint → type-check → test → build. All steps must pass.

## Commit Hygiene

- Imperative mood in commit messages ("Add feature", not "Added feature").
- One concern per commit.
- Run `pnpm lint` and `pnpm type-check` before pushing.

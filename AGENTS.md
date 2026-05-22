# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-22
**Stack:** Next.js 16.1.7 + React 19.2.4 + Tailwind CSS v4 + shadcn/ui (radix-lyra)
**Path alias:** `@/*` → `./*`
**Package manager:** bun (Turbopack enabled)

## OVERVIEW

Perfume e-commerce storefront. Fixed header (announcement banner + navbar), landing hero, shop with URL-synced filters, product detail with reviews, cart page. All data is currently hardcoded mocks — no API integration yet.

## STRUCTURE

```
├── app/
│   ├── layout.tsx          # Root layout: ThemeProvider + NuqsAdapter + AppShell
│   ├── page.tsx            # Home → HeroSection
│   ├── shop/page.tsx       # Listing: filters + product grid + sort
│   ├── shop/[productId]/   # Detail: gallery, variants, ratings, reviews
│   ├── cart/page.tsx       # Cart: item list + order summary
│   └── checkout/           # Empty — not implemented
├── components/
│   ├── ui/                 # 17 shadcn primitives (button, card, sheet, etc.)
│   ├── storefront/
│   │   ├── layout/         # AppShell, NavBar
│   │   ├── landing/        # HeroSection
│   │   ├── products/       # ProductCard, ImageSlider, VariantSelector, etc.
│   │   ├── products/filters/ # Filter sections (brand, notes, category)
│   │   ├── cart/           # CartItem
│   │   └── ui/             # AnnouncementBanner, Logo, PageHeader, TapButton
│   └── form/               # QuantityInput
├── hooks/
│   └── useFiltersHook.ts   # nuqs-based URL filter state
├── lib/
│   └── utils.ts            # cn() + TakaFormatter (BDT currency)
├── public/                 # hero.webp, favicon.ico
├── app/globals.css         # All design tokens + Tailwind v4 @theme + animations
├── next.config.mjs         # Image remote: unsplash.com, i.pravatar.cc
├── tsconfig.json           # strict: true, @/* alias
├── postcss.config.mjs      # @tailwindcss/postcss
├── eslint.config.mjs       # Next.js core-web-vitals + TypeScript
├── .prettierrc             # no semi, double quotes, printWidth 150
└── components.json         # shadcn registry (radix-lyra, mauve, phosphor)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add theme colors | `app/globals.css` `@theme inline {}` | OKLCH, light/dark via `.dark` |
| Add/modify page | `app/<route>/page.tsx` | Server by default; add `"use client"` only for interactivity |
| Add UI primitive | `components/ui/<name>.tsx` | Follow shadcn pattern: cva + Radix + data-slot |
| Add storefront component | `components/storefront/<area>/` | Default exports preferred |
| Add filter logic | `components/storefront/products/filters/` + `hooks/useFiltersHook.ts` | nuqs URL params |
| Add icon | `@phosphor-icons/react` (client) or `@phosphor-icons/react/dist/ssr` (server) | Do NOT mix paths |
| Add animation | Use `motion` (v12) for JS, CSS `@keyframes` for loops, `transition-*` for simple | Use `ease-ios-smooth`/`ease-ios-spring` |
| Add form control | Follow `InputGroup` pattern in `components/ui/input-group.tsx` | Use `cn()` + `cva()` |
| Modify routing | `app/` — add `loading.tsx`, `error.tsx`, `not-found.tsx` per route | Currently NONE exist |
| Real data fetching | Replace hardcoded arrays in `app/shop/page.tsx`, `app/shop/[productId]/page.tsx`, `components/storefront/layout/AppShell.tsx` | No API routes exist yet |

## CONVENTIONS (PROJECT-SPECIFIC)

- **No semicolons** — Prettier `semi: false`. Never add `;`.
- **Double quotes** — All strings use `"`. Prettier enforces.
- **Wide lines (150 chars)** — Don't break JSX/expressions early.
- **`cn()` for class merging** — Always `import { cn } from "@/lib/utils"`.
- **`cva()` for variants** — Mandatory for UI primitives with variant/size combos.
- **`data-slot` on component roots** — shadcn targeting convention.
- **Server by default** — Only add `"use client"` when the component needs state, effects, browser APIs, or event handlers.
- **Phosphor icons split** — Server components: `@phosphor-icons/react/dist/ssr`. Client: `@phosphor-icons/react`.
- **Import order**: React/Next → `@/components` → `@/lib`/`@/hooks` → Phosphor → libraries.
- **No barrel/index.ts files** — All imports are direct file paths.
- **No CSS modules or CSS-in-JS** — Tailwind v4 only. Custom tokens in `@theme inline {}`.
- **Mobile-first responsive** — Base = mobile, `md:` = 768px, `lg:` = 1024px primary layout shift.
- **Self-closing tags** — `<Component />` not `<Component></Component>`.

## ANTI-PATTERNS (THIS PROJECT)

| Rule | Why | Example |
|------|-----|---------|
| **Never `as any`** | Subverts strict TypeScript. Refactor with proper generics. | 4 violations in `hooks/useFiltersHook.ts` |
| **Never `nanoid()` as `key`** | Re-creates on every render, defeats reconciliation. | `ProductCard.tsx:23` — use `product.id` |
| **Never define components inside render** | Recreated every render cycle, breaks referential stability. | `ClearFilter` in `BrandFilterSection` / `NotesFilterSection` |
| **Never use native `<img>`** | Bypasses Next.js optimization. Use `next/image`. | `HeroSection.tsx` (2 violations) |
| **Never used `useQueryState` without using it** | Import only what you use from `nuqs`. | `PerfumeForFilterSection.tsx` unused import |
| **Never omit `key` in `.map()`** | React needs stable keys. | `NavBar.tsx:147` missing key |
| **Never leave empty props interfaces** | Use `React.FC<Props>` or inline types. | `ProductWishlistButton.tsx` — `type Props = {}` |
| **Never mix Phosphor import paths** | Server vs client path mismatch causes runtime errors. | Some client components use `/dist/ssr` incorrectly |

## COMMANDS

```bash
# Dev (Turbopack)
bun run dev

# Build
bun run build

# Lint
bun run lint

# Format (Prettier — no semi, double quotes, 150 width)
bun prettier --write .
```

## NOTES

- **No API routes exist** — `app/api/` doesn't exist. All data is hardcoded mocks.
- **No global state management** — Cart uses component-local `useState`. No Zustand/Redux/Context.
- **No loading/error/not-found boundaries** — Missing `loading.tsx`, `error.tsx`, `not-found.tsx` for all routes.
- **Dark mode** — Toggled by `.dark` class on `<html>` via `next-themes`. Press `D` key to toggle.
- **Filter state is URL-bound** — Via `nuqs` (`useQueryState`). Params: `brands`, `top`, `middle`, `base`, `perfumeFor`.
- **Easing curves** — Custom iOS-style `linear()` easings defined in `globals.css`: `--ease-ios-smooth`, `--ease-ios-spring`.
- **shadcn style: radix-lyra** — Not default shadcn style. Has inverted sidebar, mauve palette.
- **Theme design** — See `DESIGN.md` at root for 585-line design system documentation.

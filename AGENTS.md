# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-22
**Stack:** Next.js 16.1.7 + React 19.2.4 + Tailwind CSS v4 + shadcn/ui (radix-lyra) + Zustand + Sonner
**Path alias:** `@/*` → `./*`
**Package manager:** bun (Turbopack enabled)

## OVERVIEW

Perfume e-commerce storefront. Fixed header (announcement banner + navbar), landing hero, shop with URL-synced filters, product detail with reviews, cart page, "Find Your Scent" guided filter page. All data is currently hardcoded mocks — no API integration yet.

## STRUCTURE

```
├── app/
│   ├── layout.tsx              # Root layout: ThemeProvider + NuqsAdapter + AppShell + Toaster
│   ├── page.tsx                # Home → HeroSection
│   ├── shop/page.tsx           # Listing: filters + product grid + sort
│   ├── shop/[productId]/       # Detail: gallery, variants, ratings, reviews
│   ├── cart/page.tsx           # Cart: item list + animated order summary (uses Zustand)
│   ├── find-scent/page.tsx     # NEW: "Find Your Scent" guided filter page
│   └── checkout/               # Empty — not implemented
├── components/
│   ├── ui/                      # 18 shadcn primitives + sonner (toast)
│   │   ├── sonner.tsx           # NEW: Toast container
│   ├── storefront/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx     # Fixed wrapper + NEW: ConditionalFooter
│   │   │   ├── NavBar.tsx       # Navigation + NEW: BottomNavBar (mobile)
│   │   │   ├── Footer.tsx       # NEW: Full footer (social + legal links)
│   │   │   └── ConditionalFooter.tsx # NEW: Hides on specific routes
│   │   ├── landing/
│   │   │   └── HeroSection.tsx  # Split panel: brand list + image slider (native img with eslint-disable)
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductImageSlider.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   ├── ProductWishlistButton.tsx
│   │   │   ├── ProductRatingAndReview.tsx
│   │   │   ├── ProductBadge.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── types.ts          # NEW: TypeScript types (Product, MlVariant, BadgeType)
│   │   │   └── ProductDetailAddToCartSection.tsx  # NEW: Add-to-cart with variant selection
│   │   ├── products/filters/
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartPageSkeleton.tsx  # NEW: Loading skeleton for cart page
│   │   └── ui/
│   ├── form/
│   └── theme-provider.tsx       # NEW: next-themes ThemeProvider wrapper
├── hooks/
│   └── useFiltersHook.ts        # nuqs-based URL filter state
├── lib/
│   ├── stores/
│   │   └── cart-store.ts        # NEW: Zustand global cart store
│   └── utils.ts                  # cn() + TakaFormatter (BDT currency)
├── public/
├── app/globals.css
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── .prettierrc
└── components.json
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
| Modify routing | `app/` — add `loading.tsx`, `error.tsx`, `not-found.tsx` per route | Currently NONE exist except cart skeleton |
| Cart state management | `lib/stores/cart-store.ts` | Zustand global store — use `useCartStore()` hook |
| Toast notifications | `components/ui/sonner.tsx` + `toast()` from `sonner` | Configured in layout.tsx via `<Toaster />` |
| Footer | `components/storefront/layout/Footer.tsx` + `ConditionalFooter.tsx` | Logo, social links, legal links, copyright |
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
- **Cart state**: Use `useCartStore()` from `@/lib/stores/cart-store.ts` — actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
- **Toasts**: Import `toast` from `"sonner"` — used for add-to-cart confirmations, etc.

## ANTI-PATTERNS (THIS PROJECT)

| Rule | Why | Status / Location |
|------|-----|-------------------|
| **Avoid `as any`** | Subverts strict TypeScript. Refactor with proper generics. | **ACTIVE** — 5 violations in `hooks/useFiltersHook.ts` (lines 11, 23, 30, 32, 37) |
| **Never `nanoid()` as `key`** | Re-creates on every render, defeats reconciliation. | **FIXED** — ProductCard and elsewhere now use stable IDs |
| **Avoid defining components inside render** | Recreated every render cycle, breaks referential stability. | **ACTIVE** — `ClearFilter` component defined inside `BrandFilterSection`, `NotesFilterSection`, `PerfumeForFilterSection` |
| **Prefer `next/image` over native `<img>`** | Bypasses Next.js optimization. | **ACTIVE** (intentional exception) — `HeroSection.tsx` uses native `<img>` with explicit `eslint-disable-next-line @next/next/no-img-element` for dynamic cursor effect |
| **Remove unused imports** | Import only what you use. | **ACTIVE** — `PerfumeForFilterSection.tsx:7` imports `useQueryState` from `nuqs` but uses `useUrlFilter` wrapper instead |
| **Never omit `key` in `.map()`** | React needs stable keys. | **FIXED** — All `.map()` calls now have proper `key` props |
| **Avoid empty props interfaces** | Use `React.FC<Props>` or inline types. | **ACTIVE** — `ProductWishlistButton.tsx` has `type Props = {}` |
| **Never mix Phosphor import paths** | Server vs client path mismatch causes runtime errors. | **NEEDS AUDIT** — Verify each client component uses `@phosphor-icons/react` (not `/dist/ssr`) and server uses `/dist/ssr` |

## NEW FEATURES / CHANGES

| Feature | Location | Description |
|---------|----------|-------------|
| **Zustand Cart Store** | `lib/stores/cart-store.ts` | Global cart state with `addItem`, `removeItem`, `updateQuantity`, `clearCart`. Composite key: `productId-ml`. |
| **Sonner Toasts** | `components/ui/sonner.tsx` | Toast notifications. Used in ProductCard for add-to-cart feedback. `<Toaster />` in root layout. |
| **Footer** | `components/storefront/layout/Footer.tsx` | Logo, social links (Facebook/Instagram/Twitter), legal links (Privacy/Terms/Shipping/Contact), copyright. |
| **Conditional Footer** | `components/storefront/layout/ConditionalFooter.tsx` | Wrapper that excludes Footer from certain routes (e.g., checkout flow). |
| **Bottom NavBar** | `components/storefront/layout/NavBar.tsx` | Mobile-only floating bottom nav (search, user, cart) with scroll-hide behavior. |
| **Cart Page Skeleton** | `components/storefront/cart/CartPageSkeleton.tsx` | Loading skeleton shown during `useCartStore` hydration (client-only `mounted` pattern). |
| **Find Your Scent Page** | `app/find-scent/page.tsx` | Standalone filter-focused route with PageHeader + DesktopProductsFilters centered. |
| **Product Types** | `components/storefront/products/types.ts` | Shared TypeScript types: `Product`, `MlVariant`, `BadgeType`, `ProductColor`. |
| **Theme Provider Component** | `components/theme-provider.tsx` | Extracts next-themes provider with `attribute="class"`, `defaultTheme="system"`. |

## COMMANDS

```bash
# Dev (Turbopack)
bun run dev

# Build
bun run build

# Lint
bun run lint

# Type check
bun run typecheck

# Format (Prettier — no semi, double quotes, 150 width)
bun run format
```

## NOTES

- **No API routes exist** — `app/api/` doesn't exist. All data is hardcoded mocks.
- **Global state: Cart uses Zustand** — `lib/stores/cart-store.ts`. Previously local `useState` in pages.
- **Loading state exists for cart** — `CartPageSkeleton.tsx` used during hydration. Still missing: `loading.tsx`, `error.tsx`, `not-found.tsx` at route level.
- **Empty state wired for cart** — Cart page uses `Empty` component when `items.length === 0`.
- **Footer is implemented** — Full three-column footer with social and legal links. Conditionally excluded via `ConditionalFooter`.
- **Dark mode** — Toggled by `.dark` class on `<html>` via `next-themes`. Press `D` key to toggle.
- **Filter state is URL-bound** — Via `nuqs` (`useQueryState`). Params: `brands`, `top`, `middle`, `base`, `for` (was `perfumeFor`).
- **Easing curves** — Custom iOS-style `linear()` easings defined in `globals.css`: `--ease-ios-smooth`, `--ease-ios-spring`.
- **shadcn style: radix-lyra** — Not default shadcn style. Has inverted sidebar, mauve palette.
- **Theme design** — See `DESIGN.md` at root for full design system documentation.
- **HeroSection native `<img>`** — Intentional exception with eslint-disable. Used for custom cursor effect that needs direct DOM image sizing.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ten-ml-perfume** (873 symbols, 1624 relationships, 58 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ten-ml-perfume/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ten-ml-perfume/clusters` | All functional areas |
| `gitnexus://repo/ten-ml-perfume/processes` | All execution flows |
| `gitnexus://repo/ten-ml-perfume/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

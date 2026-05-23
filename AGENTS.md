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

This project is indexed by GitNexus as **ten-ml-perfume** (894 symbols, 1663 relationships, 62 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

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

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Ten ML Perfume — User Account Feature**

A perfume e-commerce storefront where customers can browse products by brand and fragrance notes, manage a cart, and find their perfect scent through guided filtering. We're adding a user account area so customers can view order history and manage their account settings.

**Core Value:** Customers can browse, discover, and purchase perfumes — and with this feature, track their orders and manage their profile.

### Constraints

- **Tech stack**: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (radix-lyra), Zustand, TypeScript
- **Data**: All mock data — no backend, no database, no API routes
- **Pattern**: Follow existing component conventions (no semicolons, double quotes, 150 char width, cn() for classes, cva() for variants)
- **Routing**: App Router — /account, /account/orders, /account/settings, /login, /register
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages & Runtimes
| Layer | Technology | Version | Location |
|-------|-----------|---------|----------|
| Language | TypeScript (strict mode) | 5.9.3 | `tsconfig.json` |
| Runtime | Node.js (via Bun) | — | `package.json` |
| Package Manager | Bun | — | `bun.lock` |
## Framework
| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Web Framework | Next.js (App Router) | 16.1.7 | Turbopack dev, Server Components by default |
| UI Library | React | 19.2.4 | Server components default, client only when needed |
| Styling | Tailwind CSS | 4.2.1 | CSS-first config (`@theme inline {}`), no tailwind.config.ts |
| UI Primitives | shadcn/ui (radix-lyra style) | 4.8.0 | 18 primitives in `components/ui/` |
| UI Foundation | Radix UI | 1.4.3 | Via shadcn — `radix-ui` meta-package |
## Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.7 | Framework |
| `react` / `react-dom` | 19.2.4 | UI runtime |
| `@phosphor-icons/react` | 2.1.10 | Icon library (server + client split) |
| `class-variance-authority` | 0.7.1 | Component variant system |
| `clsx` | 2.1.1 | Class name utility |
| `tailwind-merge` | 3.6.0 | Class merging (via `cn()`) |
| `tw-animate-css` | 1.4.0 | CSS animation utilities |
| `motion` | 12.38.0 | Animation library (Framer Motion successor) |
| `zustand` | 5.0.13 | Global state management (cart) |
| `nuqs` | 2.8.9 | URL query state (filters) |
| `sonner` | 2.0.7 | Toast notifications |
| `nanoid` | 5.1.11 | ID generation |
| `embla-carousel-react` | 8.6.0 | Carousel engine |
| `embla-carousel-autoplay` | 8.6.0 | Carousel autoplay plugin |
| `next-themes` | 0.4.6 | Dark mode toggle |
| `@vercel/blob` | 2.4.0 | Vercel Blob storage (declared, not used in app code) |
## Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.9.3 | Type checking |
| `eslint` | 9.39.4 | Linting |
| `eslint-config-next` | 16.1.7 | Next.js ESLint config |
| `@tailwindcss/postcss` | 4.2.1 | PostCSS plugin for Tailwind v4 |
| `postcss` | 8 | CSS processing |
| `prettier` | 3.8.1 | Code formatting |
| `prettier-plugin-tailwindcss` | 0.7.2 | Tailwind class sorting |
## Configuration Files
| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript strict mode, `@/*` path alias, `bundler` module resolution |
| `next.config.mjs` | Image remote patterns (unsplash, pravatar) |
| `postcss.config.mjs` | PostCSS with Tailwind v4 plugin |
| `eslint.config.mjs` | ESLint flat config, Next.js core-web-vitals + TypeScript rules |
| `.prettierrc` | No semicolons, double quotes, 150 print width, tailwind plugin |
| `components.json` | shadcn/ui configuration (radix-lyra style) |
| `bun.lock` | Lockfile |
## Build & Run Commands
| Command | Script | Notes |
|---------|--------|-------|
| `bun run dev` | `next dev --turbopack` | Development server with Turbopack |
| `bun run build` | `next build` | Production build |
| `bun run lint` | `eslint` | ESLint check |
| `bun run typecheck` | `tsc --noEmit` | TypeScript check |
| `bun run format` | `prettier --write "**/*.{ts,tsx}"` | Code formatting |
## Image Sources (configured in next.config.mjs)
| Source | Usage |
|--------|-------|
| `images.unsplash.com` | Product images, hero slider, cart items |
| `i.pravatar.cc` | Review avatars |
## Key Architectural Decisions
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Code Style (Enforced by Prettier)
| Rule | Value | Config |
|------|-------|--------|
| Semicolons | **None** | `.prettierrc`: `semi: false` |
| Quotes | **Double** only | `.prettierrc`: `singleQuote: false` |
| Print Width | **150 characters** | `.prettierrc`: `printWidth: 150` |
| Trailing Commas | ES5 | `.prettierrc`: `trailingComma: "es5"` |
| Tab Width | 2 spaces | `.prettierrc`: `tabWidth: 2` |
| Tailwind Plugin | Yes | `prettier-plugin-tailwindcss` with `app/globals.css` stylesheet |
| End of Line | LF | `.prettierrc`: `endOfLine: "lf"` |
## Naming Conventions
| Construct | Convention | Example |
|-----------|-----------|---------|
| Components | PascalCase | `ProductCard`, `NavBar` |
| Files (components) | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Hooks | camelCase, `use` prefix | `useFiltersHook.ts` |
| Utilities | camelCase | `utils.ts`, `cart-store.ts` |
| Directories | kebab-case for routes, PascalCase for components | `[productId]/` |
| Types/Interfaces | PascalCase | `Product`, `MlVariant`, `BadgeType` |
| Functions | camelCase | `handleAddToCart`, `setFilter` |
| CSS variables | kebab-case | `--navbar-height`, `--ease-ios-spring` |
| Zustand stores | camelCase with `-store` suffix | `cart-store.ts` |
## Import Order Convention
## Server / Client Component Pattern
- **Default: Server component** — No `"use client"` directive
- **Client if:** Needs state, effects, browser APIs, event handlers, or `usePathname()`
- **Client boundary at:** Pages that interact with Zustand, nuqs, or local state
## shadcn UI Pattern
- `data-slot` attribute on root elements for targeting
- `cn()` for class merging
- `asChild` via Radix Slot for polymorphic components (Button, Badge)
## State Management Patterns
### Zustand (Global Cart)
- Subscribe to individual selectors for re-render optimization
- Composite key pattern: `${productId}-${ml}`
- Client-only — hydrates after mount (`mounted` pattern in CartPage)
### nuqs (URL-bound Filters)
- All filter state lives in URL search params
- `clearOnDefault: true` removes param when value matches default
- Async setters (`await setFilter(...)`)
### Local State (Component-Specific)
- `useState` for: variant selection, menu open/close, hover states, active slide
- `useRef` for: timers, scroll position, touch start positions
## Responsive Design Pattern
## Animation Patterns
| Type | Tool | Example |
|------|------|---------|
| Complex JS | `motion` (v12) | `AnimatePresence`, stagger, spring physics |
| Simple state | CSS transitions | `transition-colors duration-200` |
| Loops | CSS `@keyframes` | marquee, progress bar |
| Easing | Custom CSS `linear()` | `ease-ios-smooth`, `ease-ios-spring` |
## Error Handling Patterns
### Form Validation (WriteReviewForm)
- Early returns with error state strings
- Loading/success/error status enum pattern
### Cart Store Guards
### Fallback Values
- Arrays default to `[]` when undefined: `value ?? []`
- Variant selector has `FALLBACK_VARIANTS`
- Product image slider has `DEFAULT_IMAGES`
## CSS Architecture
- **Tailwind v4 CSS-first** — No `tailwind.config.ts`
- **Theme tokens** in `@theme inline {}` in `globals.css`
- **CSS Variables** for theme colors (OKLCH) + layout constants
- **Dark mode** via `.dark` class on `<html>`, toggled by `next-themes`
- **Custom utilities**: `@utility flex-center`, `@utility safe-pt-*`
- **Custom animations**: `@keyframes marquee`, `@keyframes progress`, `@keyframes collapsible-slide-down/up`
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` block
## Accessibility Patterns
| Pattern | Implementation |
|---------|---------------|
| ARIA labels | `aria-label` on buttons, icons, interactive elements |
| Keyboard nav | Arrow keys on carousel, Escape on sheets, Tab through filters |
| Focus management | `focus-visible:ring` on interactive elements |
| Reduced motion | `prefers-reduced-motion` respected |
| Semantic HTML | `<nav>`, `<button>`, `<img alt="">` |
| Touch targets | Min 44px for mobile interactive elements |
| Role attributes | `radiogroup` on StarPicker, `aria-checked` on stars |
## Phosphor Icons Split Convention
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Architectural Pattern
### Component Hierarchy
```
```
## Data Flow
### Current State (All Mock Data)
```
```
### Mock Data Locations
| Data | Location | Type |
|------|----------|------|
| Products | `app/shop/page.tsx` (DEFAULT_PRODUCTS) | Server-side const array |
| Product Detail | `app/shop/[productId]/page.tsx` (MY_IMAGES, FRAGRANCE_NOTES, reviews) | Server-side const arrays |
| Banner | `components/storefront/layout/AppShell.tsx` (getBannerData) | Server-side async mock function |
| Reviews/Ratings | `app/shop/[productId]/page.tsx` (summary, reviews) | Server-side const objects |
| Hero Brands/Slides | `components/storefront/landing/HeroSection.tsx` (BRANDS, SLIDES) | Client-side const arrays |
| Filter Options | `components/storefront/products/filters/ProductsFiltersBase.tsx` (FRAG_NOTES, BRANDS, FOR_CAT) | Client-side const arrays |
## Layers
### 1. Route Layer (`app/`)
- **Server by default** — pages fetch data (mock) and pass as props
- **Dynamic routes:** `/shop/[productId]`
- **Missing route-level files:** No `loading.tsx`, `error.tsx`, or `not-found.tsx` exist (except cart skeleton which is inline)
### 2. Layout Layer (`components/storefront/layout/`)
- `AppShell` — fixed header wrapper with banner + navbar + footer
- `NavBar` — responsive navigation with hamburger menu, logo, actions, cart badge
- `Footer` — three-column layout (logo, social, legal)
- `ConditionalFooter` — route-aware footer visibility
### 3. Page Content Layer
- **Landing:** `HeroSection` — split panel (brand list + image slider), marquee, custom cursor
- **Shop:** Filter sidebar + product grid + sort select
- **Product Detail:** Image gallery, variant selector, wishlist, reviews, ratings
- **Cart:** Item list + collapsible order summary (mobile-fixed, desktop-sticky)
- **Find Scent:** Centered filter panel
### 4. State Management Layer
- **Zustand** (`lib/stores/cart-store.ts`): Cart items with composite key (`productId-ml`)
- **nuqs** (`hooks/useFiltersHook.ts`): URL-bound filter params (`for`, `top`, `middle`, `base`, `brands`)
- **local useState**: Component-local UI state (variant selection, menu open, scroll position, etc.)
### 5. Shared UI Layer (`components/ui/`)
- 18 shadcn primitives: Button, Badge, Card, Input, Textarea, InputGroup, Item, Sheet, Carousel, Accordion, Collapsible, Separator, AspectRatio, NativeSelect, Empty, FancyText, IconSwap, Sonner
- Pattern: `cva()` variants + Radix primitives + `data-slot` convention
### 6. Utility Layer (`lib/`)
- `utils.ts`: `cn()` (clsx + tailwind-merge), `TakaFormatter` (BDT currency)
- No data fetching utilities, no API helpers, no server actions
## Key Abstractions
### Filter System (`useUrlFilter` hook)
- Wraps `nuqs` `useQueryState` with `setFilter`, `clearFilter`, `isFilterActive`, `hasActiveFilter`
- URL params automatically serialize/deserialize via nuqs parsers
- `clearOnDefault: true` removes param from URL when value equals default
### Cart Store (Zustand)
- `addItem`: Creates composite key from `productId-ml`, increments quantity if exists
- `removeItem`: Filters by composite key
- `updateQuantity`: Clamps to minimum 1
- `clearCart`: Resets to empty array
### Layout Constants (CSS)
- `--navbar-height: 4rem`, `--announcement-banner-height: 3rem`
- `--safe-space`: Combined 112px offset for fixed header
- `--page-height-safe`: Viewport minus fixed chrome
## Entry Points
| File | Route | Type | Description |
|------|-------|------|-------------|
| `app/page.tsx` | `/` | Server | Home page → HeroSection |
| `app/shop/page.tsx` | `/shop` | Server | Product listing with filters |
| `app/shop/[productId]/page.tsx` | `/shop/[id]` | Server | Product detail page |
| `app/cart/page.tsx` | `/cart` | Client | Shopping cart |
| `app/find-scent/page.tsx` | `/find-scent` | Server | Guided filter page |
| `app/checkout/page.tsx` | `/checkout` | Server | Not implemented (empty shell) |
## Rendering Decisions
| Component | Server/Client | Reason |
|-----------|---------------|--------|
| AppShell | Server | Pure layout, no interactivity |
| NavBar | Client | Hamburger toggle, scroll detection, cart badge |
| Footer | Server | Static content only |
| ConditionalFooter | Client | Needs `usePathname()` |
| HeroSection | Client | Autoplay timer, custom cursor, slide state |
| ProductCard | Client | Add-to-cart button, variant selection |
| ShopPage | Server | Only renders static markup + passes data |
| ProductDetailsPage | Server | Renders static data, passes to client children |
| CartPage | Client | Stateful (Zustand), animations, localStorage |
| Filter sections | Client | URL state (nuqs), button interactions |
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

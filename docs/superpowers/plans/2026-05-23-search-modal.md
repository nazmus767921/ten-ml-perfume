# Search Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unified search modal to both top-nav (desktop) and bottom-nav (mobile) with debounced search, curtain drop animation, and configurable result limit.

**Architecture:** Single `SearchModal` component used in both nav locations, backed by `useSearch` hook + `search-service.ts` mock. Modal drops from top of viewport with height animation (curtain effect). View All navigates to `/shop?q=<query>`.

**Tech Stack:** Next.js 16, React 19 (useDeferredValue), motion (AnimatePresence), Phosphor icons, shadcn Empty

---

### Task 1: Add brand, notes, category to Product type

**Files:**
- Modify: `components/storefront/products/types.ts`

- [ ] **Step 1: Add new optional fields to Product interface**

Open `components/storefront/products/types.ts`. The current `Product` interface has these fields:
```ts
id: string | number
name: string
originalPrice?: number
price: number
badge?: BadgeType
secondaryBadge?: BadgeType
colors?: ProductColor[]
defaultColorIndex?: number
outOfStock?: boolean
colorLabel?: string
mlVariants?: MlVariant[]
```

Add these fields after `mlVariants?`:
```ts
brand?: string
notes?: {
  top?: string[]
  heart?: string[]
  base?: string[]
}
category?: "Men" | "Women" | "Unisex"
```

All fields are optional — no breaking changes to existing consumers.

- [ ] **Step 2: Commit**
```bash
git add components/storefront/products/types.ts
git commit -m "feat: add brand, notes, category fields to Product type"
```

---

### Task 2: Populate mock products with brand/notes/category

**Files:**
- Modify: `lib/mock/products.ts`

- [ ] **Step 1: Add brand, notes, category to each of the 6 products**

Read the file first. Each product object needs three new fields. Here are the exact values:

Product 1 "Midnight Oud":
```ts
brand: "Latafa",
notes: { top: ["Bergamot", "Pink Pepper"], heart: ["Rose", "Patchouli"], base: ["Oud", "Amber", "Musk"] },
category: "Unisex",
```

Product 2 "Santal Intense":
```ts
brand: "Dunhill",
notes: { top: ["Lavender", "Bergamot"], heart: ["Sandalwood", "Cedar"], base: ["Vanilla", "Musk"] },
category: "Men",
```

Product 3 "Néroli Blanc":
```ts
brand: "Chanel",
notes: { top: ["Mandarin Orange", "Lemon"], heart: ["Jasmine", "Rose"], base: ["Musk", "Cedar"] },
category: "Women",
```

Product 4 "Rouge 540":
```ts
brand: "Dior",
notes: { top: ["Saffron", "Pink Pepper"], heart: ["Jasmine", "Amber"], base: ["Cedar", "Musk"] },
category: "Unisex",
```

Product 5 "Bleu de Select":
```ts
brand: "Chanel",
notes: { top: ["Lemon", "Mint"], heart: ["Ginger", "Nutmeg"], base: ["Cedar", "Amber"] },
category: "Men",
```

Product 6 "Vanilla Absolute":
```ts
brand: "Mont Black",
notes: { top: ["Vanilla"], heart: ["Tonka Bean"], base: ["Sandalwood", "Musk"] },
category: "Unisex",
```

- [ ] **Step 2: Commit**
```bash
git add lib/mock/products.ts
git commit -m "feat: populate brand, notes, category on mock products"
```

---

### Task 3: Create search-service.ts

**Files:**
- Create: `components/storefront/search/search-service.ts`

- [ ] **Step 1: Create the search service**

Create `components/storefront/search/search-service.ts`:
```ts
import { MOCK_PRODUCTS } from "@/lib/mock/products"
import type { Product } from "@/components/storefront/products/types"

export const SEARCH_RESULT_LIMIT = 5

export interface SearchResult {
  product: Product
  matchField: "name" | "brand"
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

export async function searchProducts(
  query: string,
  limit: number = SEARCH_RESULT_LIMIT,
): Promise<SearchResponse> {
  const q = query.toLowerCase().trim()
  if (!q) return { results: [], total: 0 }

  // Simulate network latency for realistic UX
  await new Promise((r) => setTimeout(r, 150))

  const allResults: SearchResult[] = []

  for (const product of MOCK_PRODUCTS) {
    if (product.name.toLowerCase().includes(q)) {
      allResults.push({ product, matchField: "name" })
    } else if (product.brand?.toLowerCase().includes(q)) {
      allResults.push({ product, matchField: "brand" })
    }
  }

  return {
    results: allResults.slice(0, limit),
    total: allResults.length,
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add components/storefront/search/search-service.ts
git commit -m "feat: add mock search service with configurable result limit"
```

---

### Task 4: Create useSearch hook

**Files:**
- Create: `components/storefront/search/useSearch.ts`

- [ ] **Step 1: Create the hook**

Create `components/storefront/search/useSearch.ts`:
```ts
"use client"

import { useState, useDeferredValue, useEffect, useCallback } from "react"
import {
  searchProducts,
  SEARCH_RESULT_LIMIT,
  type SearchResult,
} from "./search-service"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const hasQuery = query.trim().length > 0
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    if (!deferredQuery.trim()) return

    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)

    searchProducts(deferredQuery)
      .then((res) => {
        if (cancelled) return
        setResults(res.results)
        setTotal(res.total)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))

    return () => {
      cancelled = true
    }
  }, [deferredQuery])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setResults([])
    setTotal(0)
  }, [])

  const handleSetQuery = useCallback((q: string) => {
    setQuery(q)
  }, [])

  return {
    query,
    setQuery: handleSetQuery,
    results: hasQuery ? results : [],
    total: hasQuery ? total : 0,
    isLoading,
    isOpen,
    open,
    close,
    limit: SEARCH_RESULT_LIMIT,
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add components/storefront/search/useSearch.ts
git commit -m "feat: add useSearch hook with useDeferredValue debounce"
```

---

### Task 5: Create SearchResultsCard component

**Files:**
- Create: `components/storefront/search/SearchResultsCard.tsx`

- [ ] **Step 1: Create the results card**

Create `components/storefront/search/SearchResultsCard.tsx`:
```tsx
"use client"

import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { TakaFormatter } from "@/lib/utils"
import type { SearchResult } from "./search-service"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"

interface SearchResultsCardProps {
  results: SearchResult[]
  total: number
  isLoading: boolean
  query: string
  limit: number
  onClose: () => void
}

export function SearchResultsCard({
  results,
  total,
  isLoading,
  query,
  limit,
  onClose,
}: SearchResultsCardProps) {
  const router = useRouter()

  const handleProductClick = (productId: string | number) => {
    router.push(`/shop/${productId}`)
    onClose()
  }

  const handleViewAll = () => {
    router.push(`/shop?q=${encodeURIComponent(query)}`)
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-3"
        >
          {[0, 1, 2].map((i) => (
            <div key={`skeleton-${i}`} className="flex items-center gap-3 py-2">
              <div className="size-12 animate-pulse bg-muted" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 animate-pulse bg-muted" />
                <div className="h-2.5 w-1/2 animate-pulse bg-muted" />
              </div>
            </div>
          ))}
        </motion.div>
      ) : results.length === 0 && query.trim() ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Empty>
            <EmptyMedia>
              <MagnifyingGlassIcon className="size-6" />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try a different search term</EmptyDescription>
          </Empty>
        </motion.div>
      ) : results.length > 0 ? (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-2"
        >
          <div className="space-y-1">
            {results.map((result) => (
              <button
                key={result.product.id}
                type="button"
                onClick={() => handleProductClick(result.product.id)}
                className="flex w-full items-center gap-3 p-2 text-left transition-colors hover:bg-muted"
              >
                <div className="size-12 shrink-0 bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {result.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.product.brand}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold">
                  {TakaFormatter.format(result.product.price)}
                </span>
              </button>
            ))}
          </div>

          {total > limit && (
            <>
              <div className="my-1 border-t border-border" />
              <button
                type="button"
                onClick={handleViewAll}
                className="flex w-full items-center justify-center py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
              >
                View all {total} results
              </button>
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/storefront/search/SearchResultsCard.tsx
git commit -m "feat: add SearchResultsCard with loading, empty, list, and view all states"
```

---

### Task 6: Create SearchModal component

**Files:**
- Create: `components/storefront/search/SearchModal.tsx`

- [ ] **Step 1: Create the modal**

Create `components/storefront/search/SearchModal.tsx`:
```tsx
"use client"

import { useSearch } from "./useSearch"
import { SearchResultsCard } from "./SearchResultsCard"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"
import { TapButton } from "@/components/storefront/ui/TapButton"

export function SearchModal() {
  const {
    query,
    setQuery,
    results,
    total,
    isLoading,
    isOpen,
    open,
    close,
    limit,
  } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(id)
    }
  }, [isOpen])

  // Global Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  return (
    <>
      <TapButton aria-label="Search products" onClick={open}>
        <MagnifyingGlassIcon className="size-5" />
      </TapButton>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={close}
            />

            {/* Panel — drops from top with curtain height animation */}
            <motion.div
              key="search-panel"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: "100vh", opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden bg-background shadow-2xl"
            >
              <div className="p-4">
                {/* Input row */}
                <div className="flex items-center gap-3">
                  <MagnifyingGlassIcon className="size-5 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products or brands..."
                    className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                  />
                  <button type="button" onClick={close} aria-label="Close search">
                    <XIcon className="size-5" />
                  </button>
                </div>

                {/* Results */}
                <div className="mt-3">
                  <SearchResultsCard
                    results={results}
                    total={total}
                    isLoading={isLoading}
                    query={query}
                    limit={limit}
                    onClose={close}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/storefront/search/SearchModal.tsx
git commit -m "feat: add SearchModal with curtain drop animation"
```

---

### Task 7: Wire SearchModal into NavBar

**Files:**
- Modify: `components/storefront/layout/NavBar.tsx`

- [ ] **Step 1: Add import**

Add to the imports at the top of the file:
```ts
import { SearchModal } from "@/components/storefront/search/SearchModal"
```

- [ ] **Step 2: Remove MagnifyingGlassIcon from imports and NAV_ACTION_BUTTONS**

Change the Phosphor import line — remove `MagnifyingGlassIcon`:
```ts
import {
  ListIcon,
  ShoppingCartSimpleIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react"
```

Change `NAV_ACTION_BUTTONS` — remove the search icon entry:
```ts
const NAV_ACTION_BUTTONS = [
  {
    icon: <UserIcon className="size-5" />,
    href: "/account",
    ariaLabel: "Account",
  },
]
```

- [ ] **Step 3: Add SearchModal to desktop nav**

In the desktop nav section (`className="hidden lg:flex items-center gap-1 justify-self-end"`), add `<SearchModal />` before the account button:
```tsx
<div className="hidden lg:flex items-center gap-1 justify-self-end">
  <SearchModal />
  {NAV_ACTION_BUTTONS.map((item) => (
    <TapButton key={item.ariaLabel} asChild aria-label={item.ariaLabel}>
      <Link href={item.href}>{item.icon}</Link>
    </TapButton>
  ))}
  <CartButton />
</div>
```

- [ ] **Step 4: Add SearchModal to bottom nav**

In `BottomNavBar`, replace the search icon with `<SearchModal />`:
```tsx
<div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 shadow-lg shadow-black/20">
  <SearchModal />
  <TapButton key="account" asChild aria-label="Account" className="text-primary-foreground">
    <Link href="/account">
      <UserIcon className="size-5" />
    </Link>
  </TapButton>
  <div className="h-5 w-px bg-primary-foreground/20" />
  <Link href="/cart">
    ...
  </Link>
</div>
```

- [ ] **Step 5: Commit**
```bash
git add components/storefront/layout/NavBar.tsx
git commit -m "feat: wire SearchModal into desktop navbar and bottom nav"
```

---

### Task 8: Add search param filtering to shop page

**Files:**
- Modify: `app/shop/page.tsx`

- [ ] **Step 1: Update ShopPage to accept searchParams and filter products**

Replace the current `ShopPage` with:
```tsx
import DesktopProductsFilters from "@/components/storefront/products/filters/DesktopProductsFilters"
import MobileProductsFilters from "@/components/storefront/products/filters/MobileProductsFilters"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import PageTitle from "@/components/storefront/ui/PageHeader"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ShoppingBagIcon } from "@phosphor-icons/react/dist/ssr"
import { MOCK_PRODUCTS } from "@/lib/mock/products"

const SortFilter = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only text-base tracking-wide text-muted-foreground/80 lg:not-sr-only">Sort by</span>
      <div className="max-w-30 lg:max-w-45">
        <NativeSelect className="border border-border/40">
          <NativeSelectOption value="apple" defaultChecked>
            A-Z (Alphabetically)
          </NativeSelectOption>
          <NativeSelectOption value="banana">Z-A (Alphabetically)</NativeSelectOption>
          <NativeSelectOption value="blueberry">by Lowest Price </NativeSelectOption>
          <NativeSelectOption value="pineapple">by Highest Price</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}

interface ShopPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { q } = await searchParams
  const query = (q ?? "").trim().toLowerCase()

  const filtered = query
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query),
      )
    : MOCK_PRODUCTS

  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      {/* BANNER */}
      <div className="mb-4 mt-3 px-3 py-6 bg-primary text-primary-foreground">
        <span className="sr-only">Frontend design and developed by Nazmus Sakib - nazmus.dev.0@gmail.com.</span>
        <span className="sr-only">co-founder & full-stack developer Bohuvuj softwares</span>
        <div className="text-3xl font-black tracking-tighter uppercase text-center">Banner will be placed here</div>
      </div>

      {/* TITLE */}
      <div className="px-3">
        <PageTitle
          icon={<ShoppingBagIcon />}
          title={query ? `Search: "${q}"` : "Shop"}
          subtitle={query ? `${filtered.length} results found` : "Smell Great, Feel Great."}
        />
      </div>

      {/* Section wrapper */}
      <section className="grid w-full flex-1 grid-cols-1 gap-6 px-3 lg:grid-cols-[1fr_3fr]">
        {/* Filters Section */}
        <div className="mt-6">
          <div className="hidden lg:flex">
            <DesktopProductsFilters />
          </div>
          <div className="flex lg:hidden">
            <MobileProductsFilters />
          </div>
        </div>
        {/* Products listing */}
        <div className="flex flex-col">
          {/* title */}
          <div className="flex items-center">
            <div className="flex-1 text-sm tracking-wider text-muted-foreground/80 uppercase">
              {query ? `${filtered.length} items` : "Shown 256 items"}
            </div>
            <SortFilter />
          </div>

          {/* listing */}
          {filtered.length > 0 ? (
            <section className="mt-4 grid w-full flex-1 grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          ) : (
            <div className="mt-10 flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground">No products found matching &quot;{q}&quot;</p>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add app/shop/page.tsx
git commit -m "feat: add search param filtering to shop page for View All"
```

---

### Task 9: Run typecheck, lint, and format

- [ ] **Step 1: Run typecheck**
```bash
bun run typecheck
```
Expected: No errors.

- [ ] **Step 2: Run lint**
```bash
bun run lint 2>&1 | grep "search/" || echo "No errors in search files"
```
Expected: No errors in search files.

- [ ] **Step 3: Run format**
```bash
bun run format
```

- [ ] **Step 4: Commit any fixes**
```bash
git add -A && git commit -m "chore: fix typecheck and lint issues"
```

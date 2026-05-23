# Search Modal — Design Spec

**Date:** 2026-05-23
**Feature:** Unified search modal for desktop top-nav + mobile bottom-nav
**Approach:** Single `SearchModal` component used in both nav locations, backed by shared `useSearch` hook + `search-service.ts` (swappable mock). Modern rectangular UI, no nested card.

## Architecture

```
NavBar (desktop top nav)          BottomNavBar (mobile)
       │                                │
       └──────────┬─────────────────────┘
                  │
         SearchModal (same component)
                  │
            useSearch hook
                  │
          search-service.ts (mock → real API)
```

Both nav search icons trigger the **same** centered modal overlay. No mobile-specific morph or inline behavior — just a clean modal on both platforms.

## Files

### New files

| File | Purpose |
|------|---------|
| `components/storefront/search/search-service.ts` | Async search function, mock impl, `SEARCH_RESULT_LIMIT = 5` constant |
| `components/storefront/search/useSearch.ts` | Hook: query state, `useDeferredValue` debounce, loading, results, open/close |
| `components/storefront/search/SearchModal.tsx` | Unified centered modal — backdrop + card + input + results |
| `components/storefront/search/SearchResultsCard.tsx` | Results panel: loading skeletons, list, view all, empty state |

### Modified files

| File | Change |
|------|--------|
| `components/storefront/products/types.ts` | Add `brand`, `notes`, `category` to `Product` |
| `lib/mock/products.ts` | Populate brand/notes/category on all 6 products |
| `components/storefront/layout/NavBar.tsx` | Wire `SearchModal` into desktop (replaces search icon) and bottom nav (replaces search icon) |
| `app/shop/page.tsx` | Add `searchParams.q` filtering — View All goes to `/shop?q=<query>` |

## Search Modal UI

- Full-screen backdrop (`bg-black/40`, z-50)
- Modal panel drops from the top of the viewport (same behavior regardless of which icon triggered it)
- On open: panel drops down with height animation (max-h-0 → max-h-screen, opacity 0 → 1)
- On close: folds back up with reverse animation
- No rounded corners
- Input row at top: MagnifyingGlass icon + auto-focused input + X close button
- Results rendered directly inside the panel (no nested card)
- Close: X button, Escape key, backdrop click
- Styled with project's radix-lyra theme tokens

## Component Design

### SearchModal

Prop-less component. Self-contained: calls `useSearch()` internally. Renders trigger icon + modal overlay. The modal itself is the container — no nested card.

```tsx
export function SearchModal() {
  const { query, setQuery, results, total, isLoading, isOpen, open, close, limit } = useSearch()

  // Renders search trigger icon
  // When open, renders full-screen backdrop + modal container
  // Modal has: input row + results directly inside it
  // Close on X, Escape, backdrop click
}
```

Used twice in NavBar:
```tsx
// Desktop (replaces MagnifyingGlass in NAV_ACTION_BUTTONS)
<SearchModal />

// Mobile bottom nav (replaces MagnifyingGlass icon)
<SearchModal />
```

### SearchModal trigger icon placement

In both navs, the `SearchModal` replaces the existing MagnifyingGlass icon button. The component itself renders the icon trigger — no separate trigger button needed.

## Data Layer

Same as previous design:
- `brand?`, `notes?`, `category?` on Product type
- Mock data populated with realistic values
- `search-service.ts` with `SEARCH_RESULT_LIMIT` constant

## Interaction Summary

| Trigger | Both platforms |
|---------|---------------|
| Open | Tap search icon → centered modal opens |
| Search | Debounced via `useDeferredValue`, results in card |
| Close | X button, Escape key, backdrop click |
| Select result | Navigate to `/shop/[productId]`, close modal |
| View All | Navigate to `/shop?q=<query>`, close modal |
| Shop page with `q` param | Filter products by name or brand, update title |

## Shop Page Changes (`app/shop/page.tsx`)

- Make `ShopPage` accept `searchParams: Promise<{ q?: string }>` (Next.js 16 async API)
- When `q` is present, filter `MOCK_PRODUCTS` by name or brand match (same logic as search-service)
- Show filtered results in the product grid
- Update page title/subtitle to reflect the search query
- This replaces the separate `/search` route from the previous design

## Backend Integration Path

Same as before: replace body of `search-service.ts`'s `searchProducts()` with `fetch("/api/search")`. That's it.

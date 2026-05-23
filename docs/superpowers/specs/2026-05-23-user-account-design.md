# User Account Feature — Design Spec

**Date:** 2026-05-23
**Project:** 10ML Perfume

## Overview

Add a user account area to the perfume e-commerce storefront. Customers can view their order history, manage their profile and shipping address, and access a wishlist. All data is mocked but structured for easy swap to a real backend (Better Auth).

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Auto-login with mock user, redirects to `/account` |
| `/register` | Register | Empty placeholder shell |
| `/account` | Account Overview | Dashboard: profile summary, recent orders, quick links |
| `/account/orders` | Order History | Full list of past orders with status badges |
| `/account/wishlist` | Wishlist | Product grid of saved items |
| `/account/settings` | Settings | Edit profile (name, email, phone) and default shipping address |

All account pages live under `app/(account)/` route group with shared layout.

## Data Model

### `lib/types/user.ts`

```typescript
interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  shippingAddress: ShippingAddress // from lib/types/order.ts
}
```

### Mock User (pre-seeded)

```typescript
{
  id: "user_1",
  name: "Sarah Chen",
  email: "sarah@example.com",
  phone: "+880 1700 000000",
  shippingAddress: {
    fullName: "Sarah Chen",
    phoneNumber: "+880 1700 000000",
    email: "sarah@example.com",
    district: "Dhaka",
    area: "Gulshan",
    streetAddress: "123 Fragrance Lane, Apt 4B",
  }
}
```

## State Management

### `lib/stores/user-store.ts` (Zustand)

Parallels `cart-store.ts`. Provides:

- **State:** `user` (UserProfile | null), `isAuthenticated`, `wishlist` (Product["id"][])
- **Actions:** `login()`, `logout()`, `updateProfile(data)`, `updateAddress(address)`, `toggleWishlist(productId)`, `isInWishlist(id)`
- **Persistence:** None (mock). Future: swap store internals for Better Auth SDK.

Login auto-seeds the mock user. `logout()` sets `user` to null and redirects to `/login`.

## Layout

### `app/(account)/layout.tsx`

Shared account layout with:

- **Desktop (lg+):** Left sidebar nav (240px) + content area. Sidebar items: Overview, Orders, Wishlist, Settings — with Phosphor icons + active state.
- **Mobile:** Horizontal tab bar at top of content area, scrollable.
- **Footer:** Shown on account pages (no `ConditionalFooter` exclusion needed).

The account layout sits within the existing `AppShell` (banner + navbar remain visible).

## Components

### New

| Component | File | Type | Description |
|-----------|------|------|-------------|
| `AccountSidebar` | `components/storefront/account/AccountSidebar.tsx` | Client | Desktop nav + mobile tab bar, `usePathname()` active state |
| `AccountOverview` | `components/storefront/account/AccountOverview.tsx` | Client | Profile summary card + recent orders link + quick stats |
| `OrderHistoryList` | `components/storefront/account/OrderHistoryList.tsx` | Client | Fetches `/api/orders`, renders order cards with status badges |
| `SettingsForm` | `components/storefront/account/SettingsForm.tsx` | Client | Edit profile fields + expandable shipping address section |
| `WishlistGrid` | `components/storefront/account/WishlistGrid.tsx` | Client | Grid of `ProductCard` from wishlist IDs in store |

### Modified

| Component | Change |
|-----------|--------|
| `NavBar.tsx` | Wire `UserIcon` → `href="/account"`. Add "Account" link to mobile `BottomNavBar` (replaces current `#`) |
| `Footer.tsx` | Add "My Account" link to legal/links section |

## Existing Integrations

- **Orders:** Fetched from existing `/api/orders` route (Vercel Blob order storage already works)
- **Wishlist:** New string[] field in `user-store`, drives ProductCard grid via product IDs
- **ProductCard:** Reused in wishlist grid — takes a `Product` prop, already works with mock data

## Mock Data Seeding

### Shared Product Source

Extract a subset of `DEFAULT_PRODUCTS` from `app/shop/page.tsx` into a shared file `lib/mock/products.ts` so both the shop page and wishlist can import the same mock data. This avoids duplication and keeps the single source of truth.

### Mock Orders for Development

Seed 2–3 mock `Order` objects in `lib/mock/orders.ts` (following the `Order` type from `lib/types/order.ts`) and in `user-store` seed them into a local `mockOrders` array. The `OrderHistoryList` component reads from this array instead of fetching from the API (since the API requires a real checkout flow). Flagged clearly for easy swap to API calls when real data exists.

## Future Backend Wiring

| Store Method | Backend Replacement |
|-------------|--------------------|
| `login()` | Better Auth `signIn()` |
| `logout()` | Better Auth `signOut()` |
| `updateProfile()` | PATCH `/api/user/profile` |
| `updateAddress()` | PATCH `/api/user/address` |
| `toggleWishlist()` | POST/DELETE `/api/user/wishlist` |
| `wishlist` | GET `/api/user/wishlist` |

## Non-Goals

- Real authentication, password management, OAuth, email verification
- Order detail page (clicking an order shows a detail view — not in scope)
- Pagination for orders (mock data is small)
- Registration form

## Implementation Order

1. `lib/mock/products.ts` — Extract shared mock products
2. `lib/mock/orders.ts` — Seed mock orders
3. `lib/types/user.ts` + `lib/stores/user-store.ts`
4. `app/(account)/layout.tsx` + `AccountSidebar`
5. `/login` page (auto-login redirect)
6. `/account` overview page
7. `/account/orders` with `OrderHistoryList`
8. `/account/wishlist` with `WishlistGrid`
9. `/account/settings` with `SettingsForm`
10. Wire NavBar + BottomNavBar + Footer links
11. Cleanup and typecheck

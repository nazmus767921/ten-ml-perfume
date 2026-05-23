# User Account Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mock user account area with login, overview, orders, wishlist, and settings pages.

**Architecture:** Zustand `user-store.ts` parallels existing `cart-store.ts` for mock auth state. Route group `app/(account)/` with shared sidebar layout. Mock data in `lib/mock/`. Components in `components/storefront/account/`. All pages client where interactive, server where static.

**Tech Stack:** Next.js 16 App Router, Zustand, TypeScript, shadcn Card/Button/InputGroup/Separator, Phosphor Icons

---

### Task 1: Seed shared mock products

**Files:**
- Create: `lib/mock/products.ts`
- Modify: `app/shop/page.tsx`

- [ ] **Step 1: Create `lib/mock/products.ts`**

Export the `Product` array that will be shared between shop and wishlist:

```typescript
import { Product } from "@/components/storefront/products/types"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Midnight Oud Eau de Parfum (100ml)",
    originalPrice: 14500,
    price: 12500,
    badge: "sales",
    colors: [
      { value: "#1e1b4b", label: "Deep Indigo" },
      { value: "#b45309", label: "Amber Gold" },
      { value: "#111827", label: "Obsidian" },
    ],
    defaultColorIndex: 0,
    mlVariants: [
      { ml: 3, price: 1200 },
      { ml: 5, price: 1800 },
      { ml: 10, price: 3200 },
      { ml: 15, price: 4800 },
      { ml: 30, price: 8500 },
    ],
  },
  {
    id: 2,
    name: "Santal Intense Extrait de Parfum (50ml)",
    price: 18000,
    badge: "premium",
    outOfStock: true,
    colors: [
      { value: "#d97706", label: "Warm Sandalwood" },
      { value: "#78350f", label: "Dark Cedar" },
    ],
    defaultColorIndex: 0,
    mlVariants: [
      { ml: 3, price: 1500 },
      { ml: 5, price: 2400 },
      { ml: 10, price: 4500 },
      { ml: 15, price: 6500 },
      { ml: 30, price: 12000 },
    ],
  },
  {
    id: 3,
    name: "Néroli Blanc Bright Blossom (75ml)",
    originalPrice: 9500,
    price: 8200,
    secondaryBadge: "new",
    colors: [
      { value: "#fef08a", label: "Soft Citrus" },
      { value: "#f0fdf4", label: "Clear Glass" },
      { value: "#f472b6", label: "Rose Tint" },
    ],
    colorLabel: "Frosted Crystal",
    defaultColorIndex: 1,
    mlVariants: [
      { ml: 3, price: 800 },
      { ml: 5, price: 1200 },
      { ml: 10, price: 2200 },
      { ml: 15, price: 3200 },
      { ml: 30, price: 5800 },
    ],
  },
  {
    id: 4,
    name: "Rouge 540 Amber Floral Elegance",
    price: 24000,
    badge: "premium",
    colors: [
      { value: "#991b1b", label: "Crimson Red" },
      { value: "#ca8a04", label: "Liquid Gold" },
    ],
    defaultColorIndex: 0,
    mlVariants: [
      { ml: 3, price: 2200 },
      { ml: 5, price: 3500 },
      { ml: 10, price: 6500 },
      { ml: 15, price: 9500 },
      { ml: 30, price: 18000 },
    ],
  },
  {
    id: 5,
    name: "Bleu de Select Refreshing Cologne (150ml)",
    originalPrice: 11000,
    price: 9900,
    badge: "sales",
    colors: [
      { value: "#0f172a", label: "Navy Blue" },
      { value: "#64748b", label: "Slate Gray" },
    ],
    defaultColorIndex: 0,
    mlVariants: [
      { ml: 3, price: 700 },
      { ml: 5, price: 1100 },
      { ml: 10, price: 2000 },
      { ml: 15, price: 3000 },
      { ml: 30, price: 5500 },
    ],
  },
  {
    id: 6,
    name: "Vanilla Absolute Unisex Oil Mist (30ml)",
    price: 4500,
    badge: "sales",
    colors: [{ value: "#f59e0b", label: "Warm Honey" }],
    defaultColorIndex: 0,
    mlVariants: [
      { ml: 3, price: 600 },
      { ml: 5, price: 900 },
      { ml: 10, price: 1600 },
      { ml: 15, price: 2400 },
      { ml: 30, price: 4500 },
    ],
  },
]
```

- [ ] **Step 2: Update `app/shop/page.tsx` to import from `@/lib/mock/products`**

Import `MOCK_PRODUCTS` at the top and remove the inline `DEFAULT_PRODUCTS` array:

```typescript
import { MOCK_PRODUCTS } from "@/lib/mock/products"
```

Replace `DEFAULT_PRODUCTS` in JSX:

```typescript
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
```

- [ ] **Step 3: Commit**

```bash
git add lib/mock/products.ts app/shop/page.tsx
git commit -m "feat: extract shared mock products to lib/mock/products.ts"
```

---

### Task 2: Seed mock orders

**Files:**
- Create: `lib/mock/orders.ts`

- [ ] **Step 1: Create `lib/mock/orders.ts`**

```typescript
import type { Order } from "@/lib/types/order"

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord_mock_001",
    tranId: "TENML-1715000000-abc123",
    status: "completed",
    paymentMethod: "sslcommerz",
    paymentStatus: "paid",
    shippingAddress: {
      fullName: "Sarah Chen",
      phoneNumber: "+880 1700 000000",
      email: "sarah@example.com",
      district: "Dhaka",
      area: "Gulshan",
      streetAddress: "123 Fragrance Lane, Apt 4B",
    },
    items: [
      { productId: 1, name: "Midnight Oud Eau de Parfum", imageUrl: "", ml: 10, price: 3200, quantity: 1 },
      { productId: 3, name: "Néroli Blanc Bright Blossom", imageUrl: "", ml: 5, price: 1200, quantity: 2 },
    ],
    subtotal: 5600,
    shipping: 0,
    total: 5600,
    createdAt: "2026-05-20T10:30:00Z",
    updatedAt: "2026-05-20T10:35:00Z",
  },
  {
    id: "ord_mock_002",
    tranId: "TENML-1714900000-def456",
    status: "processing",
    paymentMethod: "cod",
    paymentStatus: "pending",
    shippingAddress: {
      fullName: "Sarah Chen",
      phoneNumber: "+880 1700 000000",
      email: "sarah@example.com",
      district: "Dhaka",
      area: "Banani",
      streetAddress: "456 Lake View Road",
    },
    items: [
      { productId: 4, name: "Rouge 540 Amber Floral Elegance", imageUrl: "", ml: 15, price: 9500, quantity: 1 },
    ],
    subtotal: 9500,
    shipping: 0,
    total: 9500,
    createdAt: "2026-05-18T14:00:00Z",
    updatedAt: "2026-05-18T14:05:00Z",
  },
  {
    id: "ord_mock_003",
    tranId: "TENML-1714800000-ghi789",
    status: "cancelled",
    paymentMethod: "sslcommerz",
    paymentStatus: "refunded",
    shippingAddress: {
      fullName: "Sarah Chen",
      phoneNumber: "+880 1700 000000",
      email: "sarah@example.com",
      district: "Dhaka",
      area: "Gulshan",
      streetAddress: "123 Fragrance Lane, Apt 4B",
    },
    items: [
      { productId: 5, name: "Bleu de Select Refreshing Cologne", imageUrl: "", ml: 30, price: 5500, quantity: 1 },
    ],
    subtotal: 5500,
    shipping: 200,
    total: 5700,
    createdAt: "2026-05-15T09:00:00Z",
    updatedAt: "2026-05-16T11:00:00Z",
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add lib/mock/orders.ts
git commit -m "feat: add mock orders for account order history"
```

---

### Task 3: UserProfile type + Zustand user store

**Files:**
- Create: `lib/types/user.ts`
- Create: `lib/stores/user-store.ts`

- [ ] **Step 1: Create `lib/types/user.ts`**

```typescript
import type { ShippingAddress } from "@/lib/types/order"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  shippingAddress: ShippingAddress
}
```

- [ ] **Step 2: Create `lib/stores/user-store.ts`**

```typescript
"use client"

import { create } from "zustand"
import type { UserProfile } from "@/lib/types/user"
import type { ShippingAddress } from "@/lib/types/order"

interface UserStore {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  wishlist: (string | number)[]
  login: () => void
  logout: () => void
  updateProfile: (data: Partial<Pick<UserProfile, "name" | "email" | "phone">>) => void
  updateAddress: (address: ShippingAddress) => void
  toggleWishlist: (productId: string | number) => void
  isInWishlist: (productId: string | number) => boolean
}

const MOCK_USER: UserProfile = {
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
  },
}

export const useUserStore = create<UserStore>()((set, get) => ({
  user: MOCK_USER,
  isAuthenticated: true,
  isLoading: false,
  wishlist: [1, 3],
  login: () => {
    set({ user: MOCK_USER, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, wishlist: [] })
  },
  updateProfile: (data) => {
    const current = get().user
    if (!current) return
    set({ user: { ...current, ...data } })
  },
  updateAddress: (address) => {
    const current = get().user
    if (!current) return
    set({ user: { ...current, shippingAddress: address } })
  },
  toggleWishlist: (productId) => {
    const current = get().wishlist
    if (current.includes(productId)) {
      set({ wishlist: current.filter((id) => id !== productId) })
    } else {
      set({ wishlist: [...current, productId] })
    }
  },
  isInWishlist: (productId) => {
    return get().wishlist.includes(productId)
  },
}))
```

- [ ] **Step 3: Commit**

```bash
git add lib/types/user.ts lib/stores/user-store.ts
git commit -m "feat: add UserProfile type and Zustand user store"
```

---

### Task 4: Account layout + sidebar navigation

**Files:**
- Create: `app/(account)/layout.tsx`
- Create: `components/storefront/account/AccountSidebar.tsx`

- [ ] **Step 1: Create `app/(account)/layout.tsx`**

```typescript
import AccountSidebar from "@/components/storefront/account/AccountSidebar"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-(--page-height-safe) w-full max-w-7xl flex-col gap-6 px-3 py-6 lg:flex-row lg:px-8 lg:py-10">
      <AccountSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/storefront/account/AccountSidebar.tsx`**

```typescript
"use client"

import { cn } from "@/lib/utils"
import {
  HouseIcon,
  ShoppingBagIcon,
  HeartIcon,
  GearSixIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SIDEBAR_ITEMS = [
  { icon: <HouseIcon className="size-5" />, label: "Overview", href: "/account" },
  { icon: <ShoppingBagIcon className="size-5" />, label: "Orders", href: "/account/orders" },
  { icon: <HeartIcon className="size-5" />, label: "Wishlist", href: "/account/wishlist" },
  { icon: <GearSixIcon className="size-5" />, label: "Settings", href: "/account/settings" },
]

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
        <h2 className="mb-4 px-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          My Account
        </h2>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = item.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-none px-3 py-2.5 text-sm transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile tabs */}
      <nav className="flex overflow-x-auto border-b border-border lg:hidden">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = item.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-colors duration-200",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(account\)/layout.tsx components/storefront/account/AccountSidebar.tsx
git commit -m "feat: add account layout with sidebar navigation"
```

---

### Task 5: Login page (auto-login redirect)

**Files:**
- Create: `app/login/page.tsx`

- [ ] **Step 1: Create `app/login/page.tsx`**

```typescript
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/stores/user-store"

export default function LoginPage() {
  const login = useUserStore((s) => s.login)
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    login()
    router.push("/account")
  }, [login, router])

  return (
    <div className="flex min-h-(--page-height-safe) items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing in...</p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/login/page.tsx
mkdir -p app/login
git add app/login/page.tsx
git commit -m "feat: add login page with auto-login redirect"
```

---

### Task 6: Account overview page

**Files:**
- Create: `app/(account)/page.tsx`
- Create: `components/storefront/account/AccountOverview.tsx`

- [ ] **Step 1: Create `components/storefront/account/AccountOverview.tsx`**

```typescript
"use client"

import { useUserStore } from "@/lib/stores/user-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserIcon, ShoppingBagIcon, HeartIcon } from "@phosphor-icons/react"
import Link from "next/link"

export default function AccountOverview() {
  const user = useUserStore((s) => s.user)
  const wishlist = useUserStore((s) => s.wishlist)

  if (!user) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/account/orders">
          <Card className="transition-colors duration-200 hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBagIcon className="size-4" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">View order history</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="transition-colors duration-200 hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="size-4" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{wishlist.length}</p>
              <p className="text-xs text-muted-foreground">Saved items</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Separator />

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-widest uppercase text-muted-foreground">Profile</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Phone</span>
            <span className="font-medium">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/(account)/page.tsx`**

```typescript
import AccountOverview from "@/components/storefront/account/AccountOverview"

export default function AccountPage() {
  return <AccountOverview />
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(account\)/page.tsx components/storefront/account/AccountOverview.tsx
git commit -m "feat: add account overview page"
```

---

### Task 7: Orders page

**Files:**
- Create: `app/(account)/orders/page.tsx`
- Create: `components/storefront/account/OrderHistoryList.tsx`

- [ ] **Step 1: Create `components/storefront/account/OrderHistoryList.tsx`**

```typescript
"use client"

import { MOCK_ORDERS } from "@/lib/mock/orders"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TakaFormatter } from "@/lib/utils"
import type { OrderStatus, PaymentStatus } from "@/lib/types/order"

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  refunded: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function OrderHistoryList() {
  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20">
        <p className="text-sm text-muted-foreground">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
      {MOCK_ORDERS.map((order) => (
        <Card key={order.id} size="sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={STATUS_COLORS[order.status]}>
                  {order.status}
                </Badge>
                <Badge variant="outline" className={PAYMENT_COLORS[order.paymentStatus]}>
                  {order.paymentStatus}
                </Badge>
                <Badge variant="outline">
                  {order.paymentMethod === "sslcommerz" ? "Card" : "COD"}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.ml}`} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} ({item.ml}ml) &times; {item.quantity}
                    </span>
                    <span className="font-medium">{TakaFormatter.format(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2 text-sm font-bold">
                <span>Total</span>
                <span>{TakaFormatter.format(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `app/(account)/orders/page.tsx`**

```typescript
import OrderHistoryList from "@/components/storefront/account/OrderHistoryList"

export default function OrdersPage() {
  return <OrderHistoryList />
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(account\)/orders/page.tsx components/storefront/account/OrderHistoryList.tsx
git commit -m "feat: add order history page"
```

---

### Task 8: Wishlist page

**Files:**
- Create: `app/(account)/wishlist/page.tsx`
- Create: `components/storefront/account/WishlistGrid.tsx`

- [ ] **Step 1: Create `components/storefront/account/WishlistGrid.tsx`**

```typescript
"use client"

import { useUserStore } from "@/lib/stores/user-store"
import { MOCK_PRODUCTS } from "@/lib/mock/products"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { HeartIcon } from "@phosphor-icons/react"

export default function WishlistGrid() {
  const wishlist = useUserStore((s) => s.wishlist)
  const products = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id))

  if (products.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <HeartIcon className="size-8" />
          <EmptyTitle>Your wishlist is empty</EmptyTitle>
        </EmptyHeader>
        <EmptyDescription>
          Save your favorite scents by tapping the heart icon on any product.
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/(account)/wishlist/page.tsx`**

```typescript
import WishlistGrid from "@/components/storefront/account/WishlistGrid"

export default function WishlistPage() {
  return <WishlistGrid />
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(account\)/wishlist/page.tsx components/storefront/account/WishlistGrid.tsx
git commit -m "feat: add wishlist page"
```

---

### Task 9: Settings page

**Files:**
- Create: `app/(account)/settings/page.tsx`
- Create: `components/storefront/account/SettingsForm.tsx`

- [ ] **Step 1: Create `components/storefront/account/SettingsForm.tsx`**

```typescript
"use client"

import { useState } from "react"
import { useUserStore } from "@/lib/stores/user-store"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@phosphor-icons/react"

export default function SettingsForm() {
  const user = useUserStore((s) => s.user)
  const updateProfile = useUserStore((s) => s.updateProfile)
  const updateAddress = useUserStore((s) => s.updateAddress)

  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [phone, setPhone] = useState(user?.phone ?? "")
  const [fullName, setFullName] = useState(user?.shippingAddress?.fullName ?? "")
  const [phoneNumber, setPhoneNumber] = useState(user?.shippingAddress?.phoneNumber ?? "")
  const [shipEmail, setShipEmail] = useState(user?.shippingAddress?.email ?? "")
  const [district, setDistrict] = useState(user?.shippingAddress?.district ?? "")
  const [area, setArea] = useState(user?.shippingAddress?.area ?? "")
  const [streetAddress, setStreetAddress] = useState(user?.shippingAddress?.streetAddress ?? "")

  if (!user) return null

  const handleProfileSave = () => {
    updateProfile({ name, email, phone })
    toast.success("Profile updated")
  }

  const handleAddressSave = () => {
    updateAddress({
      fullName,
      phoneNumber,
      email: shipEmail,
      district,
      area,
      streetAddress,
    })
    toast.success("Shipping address updated")
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <UserIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <EnvelopeIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <PhoneIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
          <div className="flex justify-end">
            <Button onClick={handleProfileSave}>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Shipping Address Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="size-4" />
            Default Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <UserIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <PhoneIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <EnvelopeIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Email"
              type="email"
              value={shipEmail}
              onChange={(e) => setShipEmail(e.target.value)}
            />
          </InputGroup>
          <div className="grid grid-cols-2 gap-3">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>District</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>Area</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </InputGroup>
          </div>
          <InputGroup>
            <InputGroupAddon>
              <MapPinIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </InputGroup>
          <div className="flex justify-end">
            <Button onClick={handleAddressSave}>Save Address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/(account)/settings/page.tsx`**

```typescript
import SettingsForm from "@/components/storefront/account/SettingsForm"

export default function SettingsPage() {
  return <SettingsForm />
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(account\)/settings/page.tsx components/storefront/account/SettingsForm.tsx
git commit -m "feat: add settings page with profile and address editing"
```

---

### Task 10: Wire navigation links

**Files:**
- Modify: `components/storefront/layout/NavBar.tsx` (UserIcon href + BottomNavBar)
- Modify: `components/storefront/layout/Footer.tsx` (add "My Account" link)

- [ ] **Step 1: Update `NavBar.tsx` — wire UserIcon to `/account`**

Change the `NAV_ACTION_BUTTONS` array:

```typescript
const NAV_ACTION_BUTTONS = [
  {
    icon: <MagnifyingGlassIcon className="size-5" />,
    href: "#",
    ariaLabel: "Search products",
  },
  {
    icon: <UserIcon className="size-5" />,
    href: "/account",
    ariaLabel: "Account",
  },
]
```

- [ ] **Step 2: Update `NavBar.tsx` — exclude account routes from BottomNavBar**

In `BottomNavBar`, update the return-null condition:

```typescript
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/account")) return null
```

- [ ] **Step 3: Update `Footer.tsx` — add "My Account" to links**

Add to `TERMS_LINKS`:

```typescript
const TERMS_LINKS = [
  { text: "Privacy Policy", href: "/privacy" },
  { text: "Terms of Service", href: "/terms" },
  { text: "Shipping & Returns", href: "/shipping" },
  { text: "Contact", href: "/contact" },
  { text: "My Account", href: "/account" },
]
```

- [ ] **Step 4: Commit**

```bash
git add components/storefront/layout/NavBar.tsx components/storefront/layout/Footer.tsx
git commit -m "feat: wire navigation links to account pages"
```

---

### Task 11: Typecheck and cleanup

**Files:**
- Check all created/modified files compile

- [ ] **Step 1: Run typecheck**

```bash
bun run typecheck
```

Expected: No TypeScript errors.

- [ ] **Step 2: Run lint**

```bash
bun run lint
```

Expected: No ESLint errors.

- [ ] **Step 3: Fix any issues found**

If there are type or lint errors, fix them and re-run both checks.

- [ ] **Step 4: Final commit if fixes were needed**

```bash
git add -A
git commit -m "chore: fix typecheck and lint issues"
```

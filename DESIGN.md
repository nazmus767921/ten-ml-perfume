# Frontend UI Design System

> Design documentation for **10ML Perfume** — a Next.js e-commerce storefront for premium fragrance decants.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius System](#border-radius-system)
6. [Animation & Motion](#animation--motion)
7. [Icon System](#icon-system)
8. [Component Architecture](#component-architecture)
9. [Responsive Design](#responsive-design)
10. [Design Patterns & Conventions](#design-patterns--conventions)
11. [Accessibility Patterns](#accessibility-patterns)
12. [Image Strategy](#image-strategy)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.1.7 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript (strict mode) | 5.9.3 |
| **Styling** | Tailwind CSS (v4, CSS-first config) | 4.2.1 |
| **UI Primitives** | shadcn/ui (radix-lyra style) + Radix UI | 1.4.3 |
| **Icons** | Phosphor Icons | 2.1.10 |
| **Animation** | Motion (Framer Motion successor) | 12.38.0 |
| **Carousel** | Embla Carousel w/ autoplay | 8.6.0 |
| **Theme** | next-themes | 0.4.6 |
| **URL State** | nuqs | 2.8.9 |
| **CSS Utilities** | tw-animate-css | 1.4.0 |
| **Class Utilities** | clsx + tailwind-merge (via `cn()`) + class-variance-authority | — |
| **Global State** | Zustand | 5.0.13 |
| **Notifications** | Sonner | 2.0.7 |
| **ID Generation** | nanoid | 5.1.11 |

---

## Color System

All colors use the **OKLCH** color space for perceptually uniform hues across lightness levels. The palette is **warm mauve-based** (~322–326° hue) with neutral undertones.

### Theme Variables

Defined in `app/globals.css` as CSS custom properties on `:root` (light) and `.dark` (dark).

#### Light Mode (`:root`)

| Token | OKLCH Value | Visual Description |
|-------|-------------|--------------------|
| `--background` | `oklch(1 0 0)` | Pure white |
| `--foreground` | `oklch(0.145 0.008 326)` | Near-black with warm mauve tint |
| `--primary` | `oklch(0.212 0.019 322.12)` | Very dark warm mauve |
| `--primary-foreground` | `oklch(0.985 0 0)` | Near-white |
| `--secondary` | `oklch(0.96 0.003 325.6)` | Light warm mauve-gray |
| `--muted` | `oklch(0.96 0.003 325.6)` | Light warm mauve-gray |
| `--muted-foreground` | `oklch(0.542 0.034 322.5)` | Medium warm gray |
| `--accent` | `oklch(0.96 0.003 325.6)` | Light warm mauve-gray |
| `--accent-foreground` | `oklch(0.212 0.019 322.12)` | Very dark warm mauve |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Red (warm tone) |
| `--destructive-foreground` | `oklch(0.985 0 0)` | Near-white |
| `--border` | `oklch(0.922 0.005 325.62)` | Light warm border |
| `--input` | `oklch(0.922 0.005 325.62)` | Light warm border |
| `--ring` | `oklch(0.711 0.019 323.02)` | Medium warm focus ring |
| `--card` | `oklch(1 0 0)` | White card surface |
| `--card-foreground` | `oklch(0.145 0.008 326)` | Near-black on card |
| `--popover` | `oklch(1 0 0)` | White popover surface |
| `--sidebar` | `oklch(0.985 0 0)` | Near-white sidebar |
| `--sidebar-foreground` | `oklch(0.145 0.008 326)` | Near-black on sidebar |

#### Dark Mode (`.dark`)

The palette inverts: backgrounds become dark, foregrounds become light, border/subtle elements use low-opacity white.

| Token | OKLCH Value |
|-------|-------------|
| `--background` | `oklch(0.145 0.008 326)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.922 0.005 325.62)` |
| `--primary-foreground` | `oklch(0.212 0.019 322.12)` |
| `--secondary` | `oklch(0.263 0.024 320.12)` |
| `--muted` | `oklch(0.263 0.024 320.12)` |
| `--muted-foreground` | `oklch(0.711 0.019 323.02)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |
| `--card` | `oklch(0.212 0.019 322.12)` |
| `--sidebar` | `oklch(0.208 0.019 325.05)` |

#### Product Badge Colors

Hardcoded foreground colors for product badges (not theme tokens):

- **Sales badge** (`#f00` — red)
- **Premium badge** (`--primary` — dark mauve)
- **New badge** (`--background` — white)

### Usage Pattern

Colors are referenced via Tailwind's `bg-*`, `text-*`, `border-*` utilities mapped to CSS variables:

```tsx
// Example: semantic color usage
<div className="bg-background text-foreground border-border" />
<Button variant="default" className="bg-primary text-primary-foreground" />
<Badge variant="destructive" />
```

Accessible contrast is maintained across themes by inverting primary/secondary roles rather than shifting hue.

---

## Typography

### Font Family

| Role | Font | Source | CSS Variable |
|------|------|--------|-------------|
| **Sans (body + headings)** | Inter (variable) | `next/font/google` | `--font-sans` |
| **Mono** | Geist Mono (variable) | `next/font/google` | `--font-mono` |
| **Logo accent** | System serif/script (fallback) | Inline `font-logo-script` class | — |

The root `<html>` element is set to `font-sans antialiased`.

### Type Scale

| Usage | Size | Weight | Letter Spacing | Context |
|-------|------|--------|----------------|---------|
| **Hero headline** | `clamp(4rem, 10vw, 7rem)` | `font-black` (900) | `tracking-tighter` | Landing page |
| **Page title** | `text-3xl` (30px) | `font-bold` (700) | `uppercase` | Shop, cart headers |
| **Section title** | `text-xl` (20px) | `font-bold` (700) | — | Filter, review sections |
| **Product name (card)** | `text-sm` (14px) | `font-semibold` (600) | — | Product cards |
| **Product name (detail)** | `text-3xl` (30px) | `font-bold` (700) | `tracking-tight` | Product detail page |
| **Price** | `text-sm`–`text-lg` | `font-bold` (700) | `tracking-tighter` | Cards, cart, detail |
| **Body / UI text** | `text-xs` (12px) | `font-medium` (500) | — | shadcn default, labels |
| **Meta / description** | `text-xs` (12px) | — (400) | — | Card descriptions, review text |
| **Filter section title** | `text-xs` (12px) | `font-semibold` (600) | `tracking-widest uppercase` | Filter panels |
| **Logo "10ML"** | `text-lg` (18px) → `text-xl` (22px) on md | `font-bold` | — | NavBar |
| **Logo "perfume"** | `text-sm` (14px) → `text-base` (16px) on md | — | — | NavBar, script-style |

### Line Heights

- Tight: `leading-none` (1) — badges, prices
- Normal: `leading-relaxed` (1.625) — card descriptions
- Dense: `text-xs/relaxed` — card content default

---

## Spacing & Layout

### CSS Custom Properties

| Variable | Value | Purpose |
|----------|-------|---------|
| `--navbar-height` | `4rem` (64px) | Fixed top navigation bar |
| `--announcement-banner-height` | `3rem` (48px) | Announcement marquee banner |
| `--safe-space` | `calc(var(--navbar-height) + var(--announcement-banner-height))` = **112px** | Combined fixed header offset |
| `--page-height-safe` | `calc(100svh - var(--safe-space))` | Viewport minus fixed chrome |

### Container System

- **Page wrapper**: `container mx-auto` (Tailwind v4 default max-widths)
- **Full-bleed sections**: no container, use flex/grid directly
- **Max-width on large screens**: `lg:max-w-7xl` (implicit in container)

### Key Layout Measurements

| Element | Value |
|---------|-------|
| NavBar horizontal padding | `px-3` (12px) → `lg:px-8` (32px) |
| Page section padding | `py-6`–`py-10` |
| Product grid gap | `gap-2` (8px) → `lg:gap-4` (16px) |
| Card content padding | `p-4` (16px) for cards |
| Filter section gap | `gap-2` (8px) internal |
| Sheet side panel | `w-5/6` → `sm:max-w-sm` (384px) |
| Cart summary card | `p-4 lg:p-6` |

### Stacking Contexts

| z-layer | Elements |
|---------|----------|
| `z-99` | Fixed AppShell (navbar + banner) |
| `z-50` | Sheet overlay, Menu overlay |
| `z-40` | Sheet content |
| `z-10` | Bottom-fixed cart summary (mobile) |

---

## Border Radius System

The design uses a **rounded-none** (sharp/rectilinear) aesthetic as the default, with radius only on specific interactive elements via the theme scale.

| Token | Calculation | Value | Used On |
|-------|-------------|-------|---------|
| `--radius-sm` | `calc(--radius * 0.6)` | **6px** | Cards (default) |
| `--radius-md` | `calc(--radius * 0.8)` | **8px** | — |
| `--radius` (base) | `0.625rem` | **10px** | Buttons, inputs, badges |
| `--radius-lg` | `= --radius` | **10px** | Default radius value |
| `--radius-xl` | `calc(--radius * 1.4)` | **14px** | Review cards |
| `--radius-2xl` | `calc(--radius * 1.8)` | **18px** | — |
| `--radius-3xl` | `calc(--radius * 2.2)` | **22px** | Image slider thumbnails |
| `--radius-4xl` | `calc(--radius * 2.6)` | **26px** | — |

> **Note**: Despite having a radius scale, most components use `rounded-none` (rectilinear) for a sharp, modern editorial look. Rounded corners are applied selectively to cards and review elements.

---

## Animation & Motion

### Easing Curves

Two custom iOS-inspired easing curves are defined as CSS `linear()` functions in `globals.css`:

- `--ease-ios-smooth`: 13-keyframe linear() curve mimicking iOS smooth transitions
- `--ease-ios-spring`: 13-keyframe linear() curve mimicking iOS spring physics (subtle overshoot)

### CSS Keyframe Animations

```css
@keyframes marquee {
  from  { transform: translateX(0%); }
  to    { transform: translateX(-50%); }
}
```
Used in: `AnnouncementBanner` — infinite horizontal scroll of announcement items.

```css
@keyframes progress {
  from  { width: 0%; }
  to    { width: 100%; }
}
```
Used in: `HeroSection` slider progress bar — auto-advance timer indicator (resets on slide change via remount).

### Motion Library Usage

| Component | Animation | Technique |
|-----------|-----------|-----------|
| **AnnouncementBanner** | Infinite horizontal scroll | `motion.div` with `animate={{ x: [0, "-33.33%"] }}`, `transition.repeat: Infinity` |
| **Mobile filter sheet** | Slide-in from right | `AnimatePresence` wrapping Sheet, fade + slide |
| **IconSwap** | Toggle transition (heart, etc.) | `AnimatePresence` with `mode="popLayout"`, spring (opacity + scale + blur) |
| **FancyText** | Character-by-character reveal | Clip-path inset animation from bottom, staggered `0.08s` per character |
| **Filter section caret** | Rotation on expand/collapse | CSS `transition-transform duration-500` with `ease-ios-spring` |
| **Hero image slider** | Crossfade | `transition-opacity duration-700` |
| **Hero custom cursor** | Mouse follower | Direct `motion` transform binding, `scale(1.2)` on thumbnail hover |
| **Product image slider** | Fade / swipe | Embla carousel transitions |
| **Star picker (review)** | Scale on hover | `transition-transform hover:scale-110` |
| **Cart summary (mobile)** | Slide up on scroll | `transition-transform duration-300` |
| **Sheet overlay** | Fade in/out | Tailwind `animate-in fade-in-0 / animate-out fade-out-0` |
| **Accordion** | Expand/collapse | `animate-accordion-down / animate-accordion-up` |

### Transition Durations

| Duration | Used For |
|----------|----------|
| `duration-200` | Color transitions, filter caret |
| `duration-300` | Icon swaps, sheet animations, cart summary |
| `duration-500` | Filter section expand/collapse |
| `duration-700` | Hero image crossfade |
| `duration-100` | Sheet overlay |

---

## Icon System

All icons from `@phosphor-icons/react` (v2.1.10). The project uses the **Phosphor icon family** with consistent weight (default `regular` unless specified).

### Complete Icon Inventory

| Icon | Component | Usage Context |
|------|-----------|---------------|
| `PhosphorLogoIcon` | Logo | Brand mark in NavBar |
| `MagnifyingGlassIcon` | NavBar | Search action |
| `UserIcon` | NavBar | User / account |
| `ListIcon` | NavBar | Hamburger menu toggle |
| `XIcon` | MenuOverlay, Sheet | Close buttons |
| `ShoppingCartSimpleIcon` | NavBar | Cart navigation (icon only) |
| `ShoppingCartIcon` | ProductCard | Add to cart button |
| `ShoppingBagIcon` | Shop page title, ProductDetail | Page header icon, "Add to Bag" |
| `HeartIcon` | ProductWishlistButton | Wishlist toggle (fill weight when active) |
| `StarIcon` | StarRating | Rating display (fill weight for filled, regular for empty) |
| `TrashIcon` | CartItem | Remove item |
| `MinusIcon` | QuantityInput | Decrement quantity |
| `PlusIcon` | QuantityInput | Increment quantity |
| `EraserIcon` | Filter sections | Clear/reset filter |
| `CaretDownIcon` | Accordion, Collapsible, NativeSelect | Expand indicator |
| `CaretUpIcon` | Accordion | Collapse indicator (expanded) |
| `CaretLeftIcon` | Carousel, ReviewCarousel | Previous navigation |
| `CaretRightIcon` | Carousel, ReviewCarousel | Next navigation |
| `CommandIcon` | Filters header | Filter panel header icon |
| `SlidersHorizontalIcon` | MobileFilters | Mobile filter trigger button |
| `TildeIcon` | ProductDetail | "About this fragrance" card |
| `DropIcon` | ProductDetail | "Fragrance Notes" card |
| `ArrowRightIcon` | Hero CTA, Cart checkout | Forward action indicator |
| `HandSoapIcon` | NavBar (imported, unused in JSX) | — |

### Icon Sizing Pattern

- NavBar action buttons: `size-14` (icon-lg) Button with icon at default (1em / `size-4`)
- Filter carat: `size-4` (matches text size)
- Star rating: dynamic sizing via `fontSize` prop (14–20px)
- Badges / inline: `size-3`–`size-4`

---

## Component Architecture

### Component Tree

```
RootLayout (app/layout.tsx)
├── ThemeProvider (next-themes, "d" hotkey)
│   └── NuqsAdapter
│       └── AppShell (fixed header wrapper)
│           ├── AnnouncementBanner — infinite marquee
│           ├── NavBar
│           │   ├── Hamburger → MenuOverlay (fullscreen)
│           │   ├── Logo (PhosphorLogoIcon + "10ML PERFUME")
│           │   ├── TapButton[search, user]
│           │   ├── CartButton + Badge
│           │   └── BottomNavBar (mobile floating nav)
│           ├── Page Content
│           └── ConditionalFooter
│               └── Footer (three-column: logo, social, legal)
│               ├── Home → HeroSection
│               │   ├── HeroLogoHeader (fluid headline)
│               │   ├── BrandList (hover underline animation)
│               │   ├── MarqueeBar (CSS keyframe scroll)
│               │   ├── SliderProgressBar (CSS keyframe)
│               │   └── ImageSlider (crossfade + thumbnails + custom cursor)
│               ├── Shop
│               │   ├── PageHeader (ShoppingBagIcon + title)
│               │   ├── DesktopProductsFilters / MobileProductsFilters (Sheet)
│               │   │   └── ProductsFiltersBase
│               │   │       ├── PerfumeForFilterSection (single-select toggle)
│               │   │       ├── NotesFilterSection (multi-select tiers)
│               │   │       └── BrandFilterSection (multi-select)
│               │   ├── NativeSelect (sort)
│               │   └── ProductCard[] (grid cols-2 lg:cols-3)
│               │       ├── ProductBadge (sales/premium/new)
│               │       ├── StarRating
│               │       └── Badge pills (sizes)
│               ├── ProductDetail
│               │   ├── ProductImageSlider (thumbnails + swipe + autoplay)
│               │   ├── VariantSelector (size grid)
│               │   ├── ProductWishlistButton (animated heart)
│               │   ├── Card "About this Fragrance"
│               │   ├── Card "Fragrance Notes" (accordion tiers)
│               │   └── RatingAndReviews
│               │       ├── RatingSummaryPanel (big number + bar chart)
│               │       ├── ReviewCarousel (embla + autoplay 2s)
│               │       │   └── ReviewCard (avatar, name, rating, body)
│               │       └── WriteReviewForm (name + star picker + textarea)
│               └── Cart
│                   ├── CartItem[] (image, info, QuantityInput, price, delete)
│                   └── OrderSummaryCard (sticky, subtotal/shipping/total)
```

### Component Classification

#### Layout Components (Server Components except NavBar)

| Component | File | Type | Description |
|-----------|------|------|-------------|
| `AppShell` | `storefront/layout/AppShell.tsx` | Server | Fixed wrapper: banner + navbar + spacer + children + ConditionalFooter |
| `NavBar` | `storefront/layout/NavBar.tsx` | Client | Navigation: hamburger, logo, actions, cart badge + BottomNavBar (mobile) |
| `AnnouncementBanner` | `storefront/ui/AnnouncementBanner.tsx` | Client | Infinite marquee announcement strip |
| `Footer` | `storefront/layout/Footer.tsx` | Server | Three-column footer: logo + description, social links, legal links |
| `ConditionalFooter` | `storefront/layout/ConditionalFooter.tsx` | Client | Wrapper that excludes Footer from specific routes |

#### Page Components

| Component | File | Route | Key Features |
|-----------|------|-------|--------------|
| `HeroSection` | `storefront/landing/HeroSection.tsx` | `/` | Split panel: brand list + image slider + marquee + progress bar + custom cursor |
| `ShopPage` | `app/shop/page.tsx` | `/shop` | Filter sidebar + product grid + sort |
| `ProductDetailPage` | `app/shop/[productId]/page.tsx` | `/shop/[id]` | Image gallery + info + variants + reviews |
| `CartPage` | `app/cart/page.tsx` | `/cart` | Item list + order summary |

#### Product Components

| Component | Type | Description |
|-----------|------|-------------|
| `ProductCard` | Server | Grid card: image, badges, star rating, name, sizes, price, add-to-cart |
| `ProductBadge` | Server | Color-coded badge (sales=red, premium=dark, new=white) |
| `StarRating` | Client | Display-only 5-star row (Phosphor StarIcon fill/regular) |
| `ProductImageSlider` | Client | Full gallery: main image, thumbnail strip, dots, swipe, keyboard, autoplay |
| `VariantSelector` | Client | Size grid toggle (3ml–30ml) |
| `ProductWishlistButton` | Client | Animated heart toggle using IconSwap |
| `ProductRatingAndReview` | Client | Complete reviews: summary, carousel, write form |

#### Filter Components

| Component | Type | Description |
|-----------|------|-------------|
| `DesktopProductsFilters` | Server | Sidebar filter panel (hidden on mobile) |
| `MobileProductsFilters` | Client | Sheet-based filter (visible on mobile only) |
| `ProductsFiltersBase` | Client | Shared filter form: PerfumeFor + Notes + Brands + "Find" button |
| `FilterSectionWrapper` | Client | Collapsible section with animated caret |
| `PerfumeForFilterSection` | Client | Single-select category (Men/Women/Unisex) — nuqs URL state |
| `NotesFilterSection` | Client | Multi-select tiers (top/heart/base) — nuqs URL state |
| `BrandFilterSection` | Client | Multi-select brands — nuqs URL state |

#### Cart Components

| Component | Type | Description |
|-----------|------|-------------|
| `CartItem` | Client | Row: thumbnail, title/variant, QuantityInput, price, trash button |
| `CartPageSkeleton` | Client | Loading skeleton shown during Zustand store hydration (`mounted` pattern) |

#### Form Components

| Component | Type | Description |
|-----------|------|-------------|
| `QuantityInput` | Client | Stepper: minus + number + plus, clamp on blur, InputGroup pattern |

#### UI Primitives (shadcn/ui — 18 files in `components/ui/`)

| Component | Variants | Key Features |
|-----------|----------|--------------|
| **Button** | 7 (default, outline, secondary, ghost, destructive, link, none) × 9 sizes | `asChild` Slot, active translate-y-px press effect |
| **Badge** | 6 (default, secondary, destructive, outline, ghost, link) | Inline, truncated text |
| **Card** | 2 sizes (default, sm) | 7 sub-components (Header, Title, Description, Action, Content, Footer) |
| **Input** | — | Focus ring, disabled, aria-invalid states |
| **Textarea** | — | `field-sizing-content` auto-resize |
| **InputGroup** | — | Composite: addon + input + button, focus ring propagation |
| **Item** | 3 variants × 3 sizes | 10 sub-components (Group, Media, Content, Title, Description, Actions, Header, Footer, Separator) |
| **Sheet** | 4 sides (top/right/bottom/left) | AnimatePresence, overlay, close button, header/footer |
| **Carousel** | horizontal/vertical | Embla engine, context provider, prev/next buttons |
| **Accordion** | single/multiple | Collapse/expand with icon rotation |
| **Collapsible** | — | Radix primitive wrapper |
| **Separator** | horizontal/vertical | Radix primitive wrapper |
| **AspectRatio** | — | Radix primitive wrapper |
| **NativeSelect** | 2 sizes | Styled `<select>` with CaretDown icon |
| **Empty** | — | 6 sub-components (Header, Media, Title, Description, Content) |
| **FancyText** | — | Character-by-character clip-path reveal animation |
| **IconSwap** | — | AnimatePresence icon transition wrapper |

---

## Responsive Design

### Breakpoint Strategy

Mobile-first, with layout shifts at the following breakpoints:

| Breakpoint | Width | Behavioral Changes |
|-----------|-------|--------------------|
| **Default** | 0+ | Stacked layouts, full-width, Sheet-based filters, bottom-fixed cart summary |
| **sm** | 640px | Review card width, Sheet max-width |
| **md** | 768px | HeroSection → side-by-side, wider logo, thumbnail sizes increase |
| **lg** | 1024px | **Primary layout shift**: sidebar filters visible, product grid 3-col, cart side-by-side, sticky order summary |

### Responsive Patterns

| Pattern | Mobile | Desktop (lg+) |
|---------|--------|---------------|
| **Filters** | Hidden behind `SlidersHorizontalIcon` trigger → Sheet from right | Inline sidebar (`hidden lg:flex`) |
| **Product grid** | `grid-cols-2` | `lg:grid-cols-3` |
| **Hero section** | `flex-col` | `md:flex-row` |
| **Cart layout** | `flex-col` | `lg:flex-row lg:gap-16` |
| **Cart summary** | `fixed bottom-4` with backdrop blur + shadow | `lg:sticky lg:top-[calc(var(--navbar-height)+5rem)]` |
| **Filter header icon** | Visible | Visible (command icon) |
| **NavBar padding** | `px-3` | `lg:px-8` |
| **Logo text** | `text-lg`/`text-sm` | `lg:text-xl`/`lg:text-base` |
| **Logo in Hero** | Standard size | Large clamp-based |
| **Thumbnail sizes** | `h-10 w-10` | `md:h-12 md:w-12` |

### Controlled Visibility

```tsx
// Desktop-only element
<div className="hidden lg:flex">...</div>

// Mobile-only element
<div className="flex lg:hidden">...</div>
```

---

## Design Patterns & Conventions

### 1. Server / Client Component Split

- **Server by default**: Pages, layout shells, `ProductCard`, `Logo`, `PageHeader`, `DesktopProductsFilters`
- **Client** (`"use client"`): Any interactive element — `NavBar`, `AnnouncementBanner`, `HeroSection`, `ProductImageSlider`, `VariantSelector`, `ProductWishlistButton`, `StarRating`, `RatingAndReview`, `MobileProductsFilters`, all filter sections, `CartItem`, `QuantityInput`, `IconSwap`, `FancyText`
- `ThemeProvider` wraps all client context providers (next-themes, NuqsAdapter)

### 2. CSS Variable-Driven Theming

- No Tailwind config file (Tailwind v4 CSS-first approach)
- All design tokens in `@theme inline {}` block in `globals.css`
- Dark mode via `.dark` class on `<html>` toggled by `next-themes`
- Layout constants as CSS custom properties for runtime consistency

### 3. URL-Synced Filter State

- `nuqs` (useQueryState) keeps filter selections in URL search params
- Enables shareable/bookmarkable filter URLs
- `useFiltersHook` abstracts the pattern with `setFilter`, `clearFilter`, `isFilterActive`, `hasActiveFilter`
- Filter params: `for` (was `perfumeFor`), `top`/`middle`/`base`, `brands`

### 4. CVA (class-variance-authority) Pattern

Used in all shadcn UI primitives for component variant/size systems:

```tsx
const buttonVariants = cva(
  "base classes shared by all variants",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "h-8", lg: "h-14" },
    },
  }
)
```

### 5. Composition / Slot Pattern

- Radix `Slot` (via `asChild` prop) allows swapping rendered element in Button, Badge
- Compound component pattern for Card (CardHeader + CardContent + CardFooter), Item (ItemMedia + ItemContent + ItemActions), Sheet (SheetHeader + SheetContent + SheetFooter)

### 6. Animation Pattern

- **Motion** for complex JS-driven animations (scroll, stagger, spring physics, AnimatePresence)
- **CSS transitions** for simple state changes (hover, focus, color shifts)
- **CSS keyframes** for looped animations (marquee, progress bar)
- Custom `ease-ios-smooth` and `ease-ios-spring` for consistent motion language

### 7. Theme Toggle

- `next-themes` with `attribute="class"`, default `system`
- Keyboard shortcut: press `D` (not in input/textarea) to toggle
- Transition disabled on theme change via `class:disable-transition` to prevent layout flash

### 8. Class Merge Pattern

```tsx
import { cn } from "@/lib/utils"

cn("base-class", variant && "variant-class", className) // clsx + tailwind-merge
```

---

## Accessibility Patterns

| Pattern | Implementation |
|---------|---------------|
| **Keyboard navigation** | Arrow keys on carousel, sliders; Escape on sheets; Tab through filters |
| **ARIA labels** | Buttons, icons, interactive elements via `aria-label` |
| **ARIA roles** | `radiogroup` on StarPicker, `aria-checked` on stars |
| **Focus management** | `focus-visible:ring` on all interactive elements, Sheet focus trap |
| **Reduced motion** | `prefers-reduced-motion` respected via `@media` queries in CSS variables |
| **Color contrast** | OKLCH palette ensures AA-compliant contrast in both themes |
| **Semantic HTML** | `<nav>`, `<button>`, `<img alt="">`, `<select>` throughout |
| **Touch targets** | Min 44px for mobile interactive elements (size-11+, p-3) |

---

## Image Strategy

| Context | Implementation | Sources |
|---------|---------------|---------|
| **Product cards** | `next/image` with `aspect-square` | Unsplash (configured in next.config.mjs) |
| **Hero slider** | Native `<img>` with CSS crossfade | Unsplash |
| **Product detail** | Native `<img>` with Embla carousel | Unsplash |
| **Review avatars** | `next/image` (small, circular) | `i.pravatar.cc` (configured) |
| **Cart items** | `next/image` (80×80) | Unsplash |

**Configuration** (`next.config.mjs`):
- Allowed remote patterns: `images.unsplash.com`, `i.pravatar.cc`

---

## Future Design Considerations

- **Checkout flow**: Not yet implemented — will need form components, progress stepper, payment method cards
- **Authentication**: Not yet implemented — will need login/signup modals or pages
- **Footer**: **IMPLEMENTED** — Full three-column footer with logo, social links, legal links, copyright
- **Empty states**: **Partially wired** — `Empty` component used in cart page, but may be needed elsewhere
- **Skeleton loading**: **Partially implemented** — `CartPageSkeleton.tsx` exists for cart hydration, but route-level `loading.tsx` not yet implemented

---

*Last updated: May 22, 2026*

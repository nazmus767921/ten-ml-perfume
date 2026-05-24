# Ten ML Perfume — Landing Page Sections Plan

**Generated:** 2026-05-24  
**Brand Positioning:** Premium / luxury decant shop — Maison Margiela meets affordable decants  
**Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui (radix-lyra), motion v12, Zustand  
**Data:** All hardcoded mock data — no API  

---

## Section Order (Top → Bottom)

```
1. Hero            ← already exists (HeroSection.tsx)
2. New Arrivals
3. Trending Now / Bestsellers
4. Shop by Category
5. Brand Spotlight
6. Gift Sets & Bundles
7. Top Reviews Marquee
8. Why Ten ML (Trust Bar)
9. FAQ
```

---

## Section Specs

---

### ✅ Section 1 — Hero *(Already Built)*

**File:** `components/storefront/landing/HeroSection.tsx`  
**Status:** Complete — split-panel layout, brand list, image slider, marquee, progress bar, custom cursor.  
**No changes needed in this plan.**

---

### 📦 Section 2 — New Arrivals

**File (to create):** `components/storefront/landing/NewArrivalsSection.tsx`

**Layout:** Horizontal scroll carousel — 4 cards visible on desktop, 1.5 on mobile (peek effect)  
**Navigation:** Left/right arrow buttons (Phosphor `ArrowLeft` / `ArrowRight`) + drag-to-scroll  
**Card:** Reuse existing `ProductCard` component from `components/storefront/products/ProductCard.tsx`  
**Scroll engine:** `embla-carousel-react` (already installed) with `embla-carousel-autoplay` disabled (manual nav only)  
**Header:** Section label `NEW ARRIVALS` (uppercase, tracked) + `View All →` link to `/shop?badge=new`  
**Animation:** Cards fade-in with `motion` stagger on mount (viewport trigger)  
**Badge:** Each product card should carry `badge: "new"` in mock data

**Mock data shape:**
```ts
const NEW_ARRIVALS: Product[] = [
  { id: "na-1", name: "Sauvage Dior", brand: "Dior", price: 480, badge: "new", mlVariants: [...] },
  // 5–6 items total
]
```

**Component file locations:**
```
components/storefront/landing/NewArrivalsSection.tsx   ← section wrapper
```

**Page integration:** Add `<NewArrivalsSection />` below `<HeroSection />` in `app/page.tsx`

---

### 🔥 Section 3 — Trending Now / Bestsellers

**File (to create):** `components/storefront/landing/TrendingNowSection.tsx`

**Layout:** 2-column grid on mobile → 4-column grid on desktop  
**Visual differentiator:** Numbered rank badge overlaid on top-left of each card (`#1`, `#2`…) in bold black  
**Badge on cards:** `badge: "sales"` (already a supported `BadgeType`)  
**Header:** `TRENDING NOW` label + subtle animated fire emoji or Phosphor `Flame` icon  
**Animation:** Scroll-triggered stagger (motion `whileInView`) — each card slides up with opacity fade  
**Data:** 4–8 products with `badge: "sales"` and ranking data field

**Mock data shape:**
```ts
const TRENDING_PRODUCTS: (Product & { rank: number })[] = [
  { id: "tr-1", rank: 1, name: "Oud Wood", brand: "Tom Ford", price: 650, badge: "sales", ... },
]
```

**Component file locations:**
```
components/storefront/landing/TrendingNowSection.tsx
```

---

### 🚻 Section 4 — Shop by Category

**File (to create):** `components/storefront/landing/ShopByCategorySection.tsx`

**Layout:** 3 large pill/image cards side by side — Men, Women, Unisex  
**Card design:**  
- Full-bleed background perfume image  
- Dark gradient overlay (bottom-up)  
- Category label centered in white bold text  
- Hover: slight scale-up (`scale-105`) + reveal "Shop Now →" CTA button  
**Links:** Each card links to `/shop?for=men`, `/shop?for=women`, `/shop?for=unisex` (matches existing nuqs param)  
**Images:** Unsplash perfume/lifestyle images (gender-coded aesthetics)  
**Animation:** Cards animate in with motion stagger on scroll entry  

**Component file locations:**
```
components/storefront/landing/ShopByCategorySection.tsx
```

**Mock data shape:**
```ts
const CATEGORIES = [
  { id: "men",    label: "For Him",    image: "https://images.unsplash.com/...", href: "/shop?for=men" },
  { id: "women",  label: "For Her",    image: "https://images.unsplash.com/...", href: "/shop?for=women" },
  { id: "unisex", label: "Unisex",     image: "https://images.unsplash.com/...", href: "/shop?for=unisex" },
]
```

---

### 🏷️ Section 5 — Brand Spotlight

**File (to create):** `components/storefront/landing/BrandSpotlightSection.tsx`

**Layout:** Grid of brand pill/tile buttons — logo name + subtle background  
**Interaction:** Hover reveals a floating image card showing the brand's top product image  
**Hover effect:** CSS absolute positioned preview image fades in with slight scale — no JS tooltip library, pure CSS/motion  
**Click:** Each brand pill links to `/shop?brands=<brandSlug>` (matches existing `brands` nuqs param)  
**Brands to include:** Lattafa, Afnan, Dior, Tom Ford, Maison Margiela, Chanel, YSL, Decant  
**Background:** Cream / off-white to contrast with surrounding sections  

**Mock data shape:**
```ts
const BRANDS_SPOTLIGHT = [
  { id: "dior",    name: "Dior",    slug: "dior",    previewImage: "https://images.unsplash.com/..." },
  { id: "lattafa", name: "Lattafa", slug: "lattafa", previewImage: "https://images.unsplash.com/..." },
  // ...
]
```

**Component file locations:**
```
components/storefront/landing/BrandSpotlightSection.tsx
```

---

### 🎁 Section 6 — Gift Sets & Bundles

**File (to create):** `components/storefront/landing/GiftBundlesSection.tsx`

**Layout:** Horizontal scroll — 3 bundle cards, each showing:  
- Bundle name + "Perfect for ___" tagline  
- Stacked product image thumbnails (2–3 images fanned out)  
- List of included scents (names only)  
- Original total vs. discounted bundle price  
- `Add Bundle to Cart` button → calls `addItem()` for each product in the bundle via `useCartStore`

**Card style:** Rounded dark card (`bg-card` dark), premium feel  
**Header:** `GIFT SETS & BUNDLES` + `"The Perfect Gift"` subheadline  
**Animation:** Horizontal reveal on scroll with motion

**Mock data shape:**
```ts
interface Bundle {
  id: string
  name: string
  tagline: string
  items: Product[]
  totalOriginalPrice: number
  bundlePrice: number
  coverImages: string[]
}

const BUNDLES: Bundle[] = [
  {
    id: "bundle-1",
    name: "The Oud Lover",
    tagline: "Perfect for date nights",
    items: [...],
    totalOriginalPrice: 1800,
    bundlePrice: 1400,
    coverImages: ["...", "...", "..."],
  }
]
```

**Component file locations:**
```
components/storefront/landing/GiftBundlesSection.tsx
lib/data/bundles.ts   ← mock bundle data
```

---

### ⭐ Section 7 — Top Reviews Marquee

**File (to create):** `components/storefront/landing/ReviewsMarqueeSection.tsx`

**Layout:** Continuous auto-scroll marquee (CSS `@keyframes marquee`) — same technique as the existing `MarqueeBar` in `HeroSection`  
**Two rows:** Row 1 scrolls left → Row 2 scrolls right (counter-scroll for visual depth)  
**Card design per review:**
- Avatar (`i.pravatar.cc`, already in `next.config.mjs`)  
- Reviewer name  
- Star rating (reuse `StarRating` component from `components/storefront/products/StarRating.tsx`)  
- Review text (1–2 sentences, max 120 chars)  
- Product name tag  
**Pause on hover:** `animation-play-state: paused` on `hover:` via Tailwind  
**Background:** Dark (`bg-foreground` / near-black) for premium contrast  

**Mock data shape:**
```ts
interface Review {
  id: string
  name: string
  avatar: string
  rating: number   // 1–5
  text: string
  product: string
}

const TOP_REVIEWS: Review[] = [
  { id: "r1", name: "Rafi A.", avatar: "https://i.pravatar.cc/48?img=1", rating: 5, text: "Smells exactly like the real thing...", product: "Dior Sauvage" },
  // 8–12 reviews total for seamless loop
]
```

**Component file locations:**
```
components/storefront/landing/ReviewsMarqueeSection.tsx
```

---

### 🛡️ Section 8 — Why Ten ML (Trust Bar)

**File (to create):** `components/storefront/landing/WhyTenMLSection.tsx`

**Background:** Dark (near-black, `bg-foreground` or deep `#0a0a0a`) — premium, high-contrast  
**Layout:** 4-column icon + label + description grid on desktop, 2-col on mobile  
**Trust pillars (4 items):**  

| Icon (Phosphor) | Title | Description |
|---|---|---|
| `ShieldCheck` | Authentic Decants | 100% genuine, sourced directly |
| `Truck` | Fast Delivery | Ships within 24 hours |
| `ArrowCounterClockwise` | Easy Returns | Hassle-free 7-day returns |
| `Star` | Premium Quality | Only top-rated fragrances |

**Animation:** Each pillar fades up with staggered motion on scroll entry  
**Dividers:** Subtle `border-white/10` vertical lines between pillars on desktop  

**Component file locations:**
```
components/storefront/landing/WhyTenMLSection.tsx
```

---

### ❓ Section 9 — FAQ

**File (to create):** `components/storefront/landing/FAQSection.tsx`

**Layout:** Centered single-column accordion — max-width `max-w-3xl mx-auto`  
**Accordion:** Reuse shadcn `Accordion` primitive from `components/ui/accordion.tsx`  
**Questions (5 total):**  
1. What is a perfume decant?  
2. Are your decants authentic?  
3. What sizes are available?  
4. How long does delivery take?  
5. Can I return a decant if I don't like the scent?  

**Animation:** Uses existing shadcn `collapsible-slide-down/up` keyframes (already in `globals.css`)  
**Background:** Matches page background (light/dark adaptive)  
**CTA below accordion:** `"Still have questions? Contact us →"` link  

**Component file locations:**
```
components/storefront/landing/FAQSection.tsx
```

---

## Final `app/page.tsx` Structure

```tsx
import HeroSection           from "@/components/storefront/landing/HeroSection"
import NewArrivalsSection    from "@/components/storefront/landing/NewArrivalsSection"
import TrendingNowSection    from "@/components/storefront/landing/TrendingNowSection"
import ShopByCategorySection from "@/components/storefront/landing/ShopByCategorySection"
import BrandSpotlightSection from "@/components/storefront/landing/BrandSpotlightSection"
import GiftBundlesSection    from "@/components/storefront/landing/GiftBundlesSection"
import ReviewsMarqueeSection from "@/components/storefront/landing/ReviewsMarqueeSection"
import WhyTenMLSection       from "@/components/storefront/landing/WhyTenMLSection"
import FAQSection            from "@/components/storefront/landing/FAQSection"

export default function Page() {
  return (
    <div className="flex min-h-(--page-height-safe) flex-col">
      <HeroSection />
      <NewArrivalsSection />
      <TrendingNowSection />
      <ShopByCategorySection />
      <BrandSpotlightSection />
      <GiftBundlesSection />
      <ReviewsMarqueeSection />
      <WhyTenMLSection />
      <FAQSection />
    </div>
  )
}
```

---

## Shared Conventions for New Sections

| Rule | Value |
|---|---|
| All new files | `"use client"` only if they use state/effects/events |
| Section spacing | `py-16 md:py-24` on the outer `<section>` |
| Section header pattern | `<SectionHeader label="NEW ARRIVALS" cta={{ text: "View All", href: "/shop" }} />` shared subcomponent |
| Animations | `motion` (`whileInView`, `initial`, `animate`) with `viewport={{ once: true }}` |
| Icon library | `@phosphor-icons/react/dist/ssr` for server, `@phosphor-icons/react` for client |
| Data location | Hardcoded `const` arrays at top of each section file — no separate data files (except bundles) |
| Responsive | Mobile-first: base = mobile, `md:` = tablet, `lg:` = desktop |
| Dark mode | Use CSS variable colors (`bg-background`, `text-foreground`) so dark mode works automatically |

---

## New Shared Component to Create

**`SectionHeader`** — reusable section title + optional CTA link  
**File:** `components/storefront/landing/SectionHeader.tsx`

```tsx
interface SectionHeaderProps {
  label: string
  subtitle?: string
  cta?: { text: string; href: string }
}
```

---

## Implementation Priority

| Priority | Section | Complexity | Why |
|---|---|---|---|
| P1 | SectionHeader | Low | Build first — used by all sections |
| P1 | New Arrivals | Medium | Core discovery, uses existing ProductCard |
| P1 | Trending Now | Medium | Core discovery, uses existing ProductCard |
| P2 | Reviews Marquee | Low | CSS marquee pattern already exists in HeroSection |
| P2 | Why Ten ML | Low | Static, no interactivity |
| P3 | Shop by Category | Medium | Needs image sourcing |
| P3 | Brand Spotlight | Medium | Hover preview needs care |
| P4 | FAQ | Low | shadcn Accordion is ready to use |
| P4 | Gift Bundles | High | New Bundle type + cart integration |

---

## Files to Create (Summary)

```
components/storefront/landing/
  SectionHeader.tsx          ← shared utility (build first)
  NewArrivalsSection.tsx
  TrendingNowSection.tsx
  ShopByCategorySection.tsx
  BrandSpotlightSection.tsx
  GiftBundlesSection.tsx
  ReviewsMarqueeSection.tsx
  WhyTenMLSection.tsx
  FAQSection.tsx

lib/data/
  bundles.ts                 ← Bundle mock data (for GiftBundlesSection)

app/
  page.tsx                   ← MODIFY: add all section imports
```

**Total new files: 11**  
**Modified files: 1** (`app/page.tsx`)

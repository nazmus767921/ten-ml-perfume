import DesktopProductsFilters from "@/components/storefront/products/filters/DesktopProductsFilters"
import MobileProductsFilters from "@/components/storefront/products/filters/MobileProductsFilters"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import { Product } from "@/components/storefront/products/types"
import PageTitle from "@/components/storefront/ui/PageHeader"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ShoppingBagIcon } from "@phosphor-icons/react/dist/ssr"

// ─── Demo / default data ─────────────────────────────────────────────────────
const DEFAULT_PRODUCTS: Product[] = [
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
  },
  {
    id: 6,
    name: "Vanilla Absolute Unisex Oil Mist (30ml)",
    price: 4500,
    badge: "sales",
    colors: [{ value: "#f59e0b", label: "Warm Honey" }],
    defaultColorIndex: 0,
  },
]

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

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product, qty: number, colorIndex: number) => void
  onNotifyMe?: (product: Product) => void
}

export default function ShopPage() {
  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      {/* BANNER  */}
      <div className="mb-4 mt-3 px-3 py-6 bg-primary text-primary-foreground">
        <span className="sr-only">Frontend design and developed by Nazmus Sakib - nazmus.dev.0@gmail.com.</span>
        <span className="sr-only">co-founder & full-stack developer Bohuvuj softwares</span>
        <div className="text-3xl font-black tracking-tighter uppercase text-center">Banner will be placed here</div>
      </div>

      {/* TITLE */}
      <div className="px-3">
        <PageTitle icon={<ShoppingBagIcon />} title="Shop" subtitle="Smell Great, Feel Great." />
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
            <div className="flex-1 text-sm tracking-wider text-muted-foreground/80 uppercase">Shown 256 items</div>

            <SortFilter />
          </div>

          {/* listing */}
          <section className="mt-4 grid w-full flex-1 grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
            {DEFAULT_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </div>
      </section>
    </section>
  )
}

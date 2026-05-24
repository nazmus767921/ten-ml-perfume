import { Product } from "@/components/storefront/products/types"
import { MOCK_PRODUCTS } from "@/lib/mock/products"

export interface Bundle {
  id: string
  name: string
  tagline: string
  items: Product[]
  totalOriginalPrice: number
  bundlePrice: number
  coverImages: string[]
}

export const BUNDLES: Bundle[] = [
  {
    id: "bundle-1",
    name: "The Oud Lover",
    tagline: "Perfect for date nights",
    items: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
    totalOriginalPrice: 32500,
    bundlePrice: 28000,
    coverImages: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595425970377-c9703bc48baf?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "bundle-2",
    name: "Fresh Everyday",
    tagline: "Your daily signature",
    items: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[4]],
    totalOriginalPrice: 20500,
    bundlePrice: 16500,
    coverImages: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615397323136-1e0e84b840fb?q=80&w=600&auto=format&fit=crop",
    ],
  },
  {
    id: "bundle-3",
    name: "Discovery Set",
    tagline: "Explore the bestsellers",
    items: [MOCK_PRODUCTS[3], MOCK_PRODUCTS[5]],
    totalOriginalPrice: 28500,
    bundlePrice: 24000,
    coverImages: [
      "https://images.unsplash.com/photo-1608698628285-802521c7ecda?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop",
    ],
  },
]

import { Product } from "@/components/storefront/products/types"
import { MOCK_PRODUCTS } from "@/lib/mock/products"
import { getImageUrl } from "../getImageUrl"

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
    coverImages: [getImageUrl(), getImageUrl()],
  },
  {
    id: "bundle-2",
    name: "Fresh Everyday",
    tagline: "Your daily signature",
    items: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[4]],
    totalOriginalPrice: 20500,
    bundlePrice: 16500,
    coverImages: [getImageUrl(), getImageUrl()],
  },
  {
    id: "bundle-3",
    name: "Discovery Set",
    tagline: "Explore the bestsellers",
    items: [MOCK_PRODUCTS[3], MOCK_PRODUCTS[5]],
    totalOriginalPrice: 28500,
    bundlePrice: 24000,
    coverImages: [getImageUrl(), getImageUrl()],
  },
]

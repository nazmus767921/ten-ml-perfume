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

export async function searchProducts(query: string, limit: number = SEARCH_RESULT_LIMIT): Promise<SearchResponse> {
  const q = query.toLowerCase().trim()
  if (!q) return { results: [], total: 0 }

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

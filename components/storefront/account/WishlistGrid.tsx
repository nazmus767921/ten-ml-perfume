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
        <EmptyDescription>Save your favorite scents by tapping the heart icon on any product.</EmptyDescription>
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

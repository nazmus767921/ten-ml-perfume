"use client"

import VariantSelector from "@/components/storefront/products/VariantSelector"
import ProductWishlistButton from "@/components/storefront/products/ProductWishlistButton"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { ShoppingBagIcon } from "@phosphor-icons/react"
import type { Product } from "@/components/storefront/products/types"
import { toast } from "sonner"
import { useState } from "react"

interface ProductDetailAddToCartSectionProps {
  product: Product
}

export default function ProductDetailAddToCartSection({ product }: ProductDetailAddToCartSectionProps) {
  const addItem = useCartStore((s) => s.addItem)
  const mlVariants = product.mlVariants ?? []
  const [selectedMl, setSelectedMl] = useState<number | null>(mlVariants.length > 0 ? mlVariants[0].ml : null)

  const selectedVariant = mlVariants.find((v) => v.ml === selectedMl)

  const handleAddToCart = () => {
    if (selectedMl === null || !selectedVariant) return
    addItem({
      productId: product.id,
      name: product.name,
      imageUrl: "",
      ml: selectedMl,
      price: selectedVariant.price,
    })
    toast.success("Added to cart", {
      description: `${product.name} (${selectedMl}mL)`,
    })
  }

  return (
    <>
      <div className="mt-6">
        <VariantSelector variants={mlVariants.length > 0 ? mlVariants : undefined} selectedMl={selectedMl} onMlChange={setSelectedMl} />
      </div>

      <div className="mt-6 flex w-full gap-2">
        <Button variant={"outline"} size={"lg"} className="flex-1 text-lg" onClick={handleAddToCart}>
          <ShoppingBagIcon className="size-5" /> Add to Cart
        </Button>
        <Button size={"lg"} className="flex-1 text-lg">
          Buy Now
        </Button>
        <ProductWishlistButton productId={product.id} productName={product.name} />
      </div>
    </>
  )
}

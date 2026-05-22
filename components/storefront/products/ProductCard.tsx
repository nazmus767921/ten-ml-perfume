"use client"

import ProductBadge from "@/components/storefront/products/ProductBadge"
import StarRating from "@/components/storefront/products/StarRating"
import { Product } from "@/components/storefront/products/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TakaFormatter } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart-store"
import { ShoppingCartIcon } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem)
  const isOutOfStock = product.outOfStock
  const isAddToCartDisabled = isOutOfStock

  const mlVariants = product.mlVariants ?? []
  const [selectedMl, setSelectedMl] = useState<number | null>(
    mlVariants.length > 0 ? mlVariants[0].ml : null,
  )

  const selectedVariant = mlVariants.find((v) => v.ml === selectedMl) ?? null
  const displayPrice = selectedVariant?.price ?? product.price
  const displayOriginalPrice = selectedVariant?.originalPrice ?? product.originalPrice

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
    <article className="w-full">
      {/* image */}
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-square w-full bg-gray-50">
          <Image src={""} width={250} height={250} alt="" className="size-full object-cover" />

          {/* Top-left badge */}
          {product.badge && (
            <div className="absolute -top-1 left-0 z-10">
              <ProductBadge variant={product.badge} />
            </div>
          )}
          {/* Top-right secondary badge */}
          {product.secondaryBadge && (
            <div className="absolute -top-1 right-0 z-10">
              <ProductBadge variant={product.secondaryBadge} />
            </div>
          )}

          {/* Out ofstock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex-center bg-black/40 backdrop-blur-lg">
              <Badge variant={"secondary"} className="w-full bg-destructive px-6 py-4 text-base text-white uppercase">
                Out of stock
              </Badge>
            </div>
          )}
        </div>
      </Link>
      {/* content */}
      <div className="pt-1 pb-4 flex flex-col">
        <div className="px-1">
          <StarRating value={4} />
          <h3 className="mt-1 text-base leading-5 font-bold tracking-tighter md:text-lg line-clamp-2">{product.name}</h3>
        </div>

        {/* ML variant badges — interactive */}
        {mlVariants.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {mlVariants.map((variant) => {
              const isSelected = selectedMl === variant.ml
              return (
                <Badge key={variant.ml} variant={isSelected ? "default" : "outline"} asChild>
                  <button
                    type="button"
                    onClick={() => setSelectedMl(variant.ml)}
                    className={isSelected ? "cursor-pointer" : "cursor-pointer hover:bg-muted hover:text-muted-foreground"}
                  >
                    {variant.ml}ml
                  </button>
                </Badge>
              )
            })}
          </div>
        )}

        {/* price-actions */}
        <div className="mt-2 flex gap-1 border border-border">
          <div className="flex flex-1 flex-col justify-center py-1 pl-2">
            <span className="text-sm font-bold text-foreground/80">{TakaFormatter.format(displayPrice)}</span>
            {displayOriginalPrice && (
              <span className="text-xs leading-none text-muted-foreground/60 line-through">{TakaFormatter.format(displayOriginalPrice)}</span>
            )}
          </div>

          <div className="shrink-0">
            <Button className="aspect-square size-full min-h-12 lg:aspect-auto lg:min-h-13" disabled={isAddToCartDisabled} onClick={handleAddToCart}>
              <ShoppingCartIcon className="size-5" />
              <span className="hidden pt-1 text-sm tracking-wide uppercase lg:flex">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

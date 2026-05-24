"use client"

import ProductBadge from "@/components/storefront/products/ProductBadge"
import ProductWishlistButton from "@/components/storefront/products/ProductWishlistButton"
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
  const [selectedMl, setSelectedMl] = useState<number | null>(mlVariants.length > 0 ? mlVariants[0].ml : null)

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
    <article className="flex h-full w-full flex-col">
      {/* ADDED `shrink-0` to guarantee the image stays a perfect square and doesn't get squished */}
      <div className="group relative aspect-139/160 w-full shrink-0 overflow-hidden bg-gray-50">
        <Link href={`/shop/${product.id}`} className="block size-full">
          <Image
            src={product.imageUrl || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80"}
            width={250}
            height={250}
            alt={product.name}
            className="size-full object-cover object-center"
          />

          {/* Top-left badge */}
          {product.badge && (
            <div className="absolute -top-1 left-0 z-10">
              <ProductBadge variant={product.badge} />
            </div>
          )}
          {/* Top-right secondary badge */}
          {product.secondaryBadge && (
            <div className="absolute -top-1 right-[44px] z-10">
              <ProductBadge variant={product.secondaryBadge} />
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg">
              <Badge variant={"secondary"} className="w-full bg-destructive px-6 py-4 text-center text-base text-white uppercase">
                Out of stock
              </Badge>
            </div>
          )}
        </Link>

        {/* Floating Wishlist Heart Button */}
        <div className="absolute top-0 right-0 z-20">
          <ProductWishlistButton productId={product.id} productName={product.name} variant="floating" />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col border-x border-border px-2 py-2">
          <div>
            <StarRating value={4} />
            <h3 className="mt-1 line-clamp-2 text-base leading-5 font-bold tracking-tighter md:text-lg">{product.name}</h3>
          </div>
          {/* ML variant badges */}
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
        </div>

        {/* price-actions */}
        <div className="flex gap-1 border border-border">
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

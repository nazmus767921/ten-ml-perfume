import ProductBadge  from "@/components/storefront/products/ProductBadge"
import StarRating from "@/components/storefront/products/StarRating"
import { Product } from "@/components/storefront/products/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TakaFormatter } from "@/lib/utils"
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/ssr"
import { nanoid } from "nanoid"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product, qty: number, colorIndex: number) => void
  onNotifyMe?: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart, onNotifyMe }: ProductCardProps) => {
  const isOutOfStock = product.outOfStock
  const isAddToCartDisabled = isOutOfStock

  return (
    <article key={nanoid()} className="w-full">
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

         <div className="mt-2 flex flex-wrap gap-1">
            <Badge className="text-xs" variant={"outline"}>
              3ml
            </Badge>
            <Badge className="text-xs" variant={"outline"}>
              5ml
            </Badge>
            <Badge className="text-xs" variant={"outline"}>
              10ml
            </Badge>
            <Badge className="text-xs" variant={"outline"}>
              15ml
            </Badge>
            <Badge className="text-xs" variant={"outline"}>
              30ml
            </Badge>
          </div>

        {/* price-actions */}
        <div className="mt-2 flex gap-1 border border-border">
          <div className="flex flex-1 flex-col justify-center py-1 pl-2">
            <span className="text-sm font-bold text-foreground/80">{TakaFormatter.format(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs leading-none text-muted-foreground/60 line-through">{TakaFormatter.format(product.originalPrice)}</span>
            )}
          </div>

          <div className="shrink-0">
            <Button className="aspect-square size-full min-h-12 lg:aspect-auto lg:min-h-13" disabled={isAddToCartDisabled}>
              <ShoppingCartIcon className="size-5" />
              <span className="hidden pt-1 text-sm tracking-wide uppercase lg:flex">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

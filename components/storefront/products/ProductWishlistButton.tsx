"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeartIcon } from "@phosphor-icons/react"
import { useUserStore } from "@/lib/stores/user-store"
import { toast } from "sonner"

interface ProductWishlistButtonProps {
  productId: string | number
  productName?: string
  variant?: "detail" | "floating"
  className?: string
}

export default function ProductWishlistButton({ productId, productName = "Product", variant = "detail", className }: ProductWishlistButtonProps) {
  const wishlist = useUserStore((s) => s.wishlist)
  const toggleWishlist = useUserStore((s) => s.toggleWishlist)

  const isActive = wishlist.includes(productId)

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(productId)
    if (isActive) {
      toast.success("Removed from wishlist", {
        description: `${productName} removed.`,
      })
    } else {
      toast.success("Added to wishlist", {
        description: `${productName} added.`,
      })
    }
  }

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={handleAddToWishlist}
        className={cn(
          "flex size-10 items-center justify-center rounded-bl-[10px] border-b border-l border-border/20 bg-background/40 text-muted-foreground backdrop-blur-2xl transition-all duration-200 hover:bg-background hover:text-foreground active:bg-muted",
          {
            "text-red-500 hover:text-red-600": isActive,
          },
          className
        )}
        aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon className="size-5 transition-transform duration-200" weight={isActive ? "fill" : "regular"} />
      </button>
    )
  }

  return (
    <Button
      variant={"outline"}
      size={"icon-lg"}
      className={cn("shrink-0 transition-all duration-300", className, {
        "border-red-200/50 text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20": isActive,
      })}
      onClick={handleAddToWishlist}
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
    >
      <HeartIcon
        className={cn("size-5", {
          "fill-current": isActive,
        })}
        weight={isActive ? "fill" : "regular"}
      />
    </Button>
  )
}

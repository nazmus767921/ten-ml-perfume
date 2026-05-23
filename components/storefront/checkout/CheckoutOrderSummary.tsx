"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { TakaFormatter } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart-store"

const FREE_SHIPPING_THRESHOLD = 2000
const STANDARD_SHIPPING = 200

interface CheckoutOrderSummaryProps {
  isSubmitting?: boolean
}

export function CheckoutOrderSummary({ isSubmitting = false }: CheckoutOrderSummaryProps) {
  const items = useCartStore((s) => s.items)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
  const total = subtotal + shipping
  const freeShippingProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1)
  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  return (
    <Card className="bg-background/80 backdrop-blur-2xl lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)]">
      <CardHeader>
        <CardTitle className="text-sm font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.compositeKey} className="flex items-center gap-3">
              <div className="relative size-8 shrink-0 overflow-hidden ring-1 ring-foreground/10">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="32px" />
                ) : (
                  <div className="flex size-full items-center justify-center bg-muted text-[10px] text-muted-foreground">{item.name.charAt(0)}</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{item.name}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                    {item.ml}mL
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">&times;{item.quantity}</span>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium">{TakaFormatter.format(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{TakaFormatter.format(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 dark:text-green-400">Free</span> : TakaFormatter.format(shipping)}</span>
        </div>

        {shipping > 0 && (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-ios-smooth"
                style={{ width: `${freeShippingProgress * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground/60">Add {TakaFormatter.format(remainingForFree)} more for free shipping</p>
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">
            Total
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              ({totalItems} item{totalItems !== 1 ? "s" : ""})
            </span>
          </span>
          <span className="text-sm font-bold">{TakaFormatter.format(total)}</span>
        </div>

        <Button type="submit" size="sm" className="w-full text-base" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

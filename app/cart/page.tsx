"use client"

import CartItem from "@/components/storefront/cart/CartItem"
import CartPageSkeleton from "@/components/storefront/cart/CartPageSkeleton"
import PageTitle from "@/components/storefront/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/stores/cart-store"
import { TakaFormatter } from "@/lib/utils"
import { ArrowRightIcon, CaretDownIcon, Lock, ShoppingCartIcon, ShoppingCartSimpleIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const SUMMARY_STORAGE_KEY = "cart-summary-collapsed"
const STORAGE_OPEN = "open"
const STORAGE_COLLAPSED = "collapsed"
const FREE_SHIPPING_THRESHOLD = 2000
const STANDARD_SHIPPING = 200

const SummaryItem = ({ title, value }: { title: string; value: string }) => (
  <Item size={"xs"} className="py-0.5">
    <ItemContent>
      <ItemTitle className="text-sm text-muted-foreground/80 capitalize">{title}</ItemTitle>
    </ItemContent>
    <ItemActions>
      <span className="text-sm">{value}</span>
    </ItemActions>
  </Item>
)

function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(SUMMARY_STORAGE_KEY) === STORAGE_OPEN
    }
    return false
  })

  const items = useCartStore((s) => s.items)
  const cartSubtotalTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const shipping = cartSubtotalTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
  const cartTotal = cartSubtotalTotal + shipping
  const freeShippingProgress = Math.min(cartSubtotalTotal / FREE_SHIPPING_THRESHOLD, 1)
  const remainingForFree = Math.max(FREE_SHIPPING_THRESHOLD - cartSubtotalTotal, 0)
  const uniqueProducts = new Set(items.map((i) => i.productId)).size

  const prevItemsRef = useRef(items)
  const autoExpandTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  function handleToggle(open: boolean) {
    setSummaryOpen(open)
    localStorage.setItem(SUMMARY_STORAGE_KEY, open ? STORAGE_OPEN : STORAGE_COLLAPSED)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && items.length > 0 && prevItemsRef.current !== items) {
      setSummaryOpen(true)
      clearTimeout(autoExpandTimerRef.current)
      autoExpandTimerRef.current = setTimeout(() => {
        setSummaryOpen(false)
        localStorage.setItem(SUMMARY_STORAGE_KEY, STORAGE_COLLAPSED)
      }, 3500)
      prevItemsRef.current = items
    }
    return () => clearTimeout(autoExpandTimerRef.current)
  }, [items, mounted])

  if (!mounted) {
    return <CartPageSkeleton />
  }

  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      <div className="px-3">
        <PageTitle icon={<ShoppingCartIcon />} title="Cart" subtitle="Thank you for choosing our service" />
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <ShoppingCartSimpleIcon className="size-8" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>Looks like you haven&apos;t added anything to your cart yet.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size={"sm"} asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-1 flex-col justify-between gap-8 lg:flex-row lg:gap-16">
          <ItemGroup className="max-w-xl gap-0 divide-y divide-border">
            {items.map((item) => (
              <div key={item.compositeKey}>
                <CartItem item={item} />
              </div>
            ))}
          </ItemGroup>
          <div className="min-h-64 w-full lg:hidden" />
          <div className="relative w-full">
            <div className="fixed bottom-4 mt-auto w-full px-3 lg:sticky lg:top-[calc(var(--navbar-height)+5rem)] lg:bottom-auto lg:my-0 lg:px-0">
              <Collapsible open={summaryOpen} onOpenChange={handleToggle} className="w-full max-w-xl">
                <Card className="bg-background/80 backdrop-blur-2xl">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer select-none">
                      <CardTitle className="flex items-center justify-between text-lg font-bold">
                        <span className="flex flex-col items-start gap-0.5">
                          <span>Order Summary</span>
                          {!summaryOpen && (
                            <motion.span
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs font-normal text-muted-foreground/70"
                            >
                              {TakaFormatter.format(cartTotal)} Total
                              {shipping === 0 ? " \u2022 Free Shipping" : ` \u2022 +${TakaFormatter.format(shipping)} shipping`}
                            </motion.span>
                          )}
                        </span>
                        <motion.div animate={{ rotate: summaryOpen ? -180 : 0 }} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
                          <CaretDownIcon className="size-4 text-muted-foreground/70" />
                        </motion.div>
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <AnimatePresence initial={false}>
                    {summaryOpen && (
                      <motion.div
                        key="summary-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <CardContent>
                          <div className="-mt-1 mb-3 flex justify-center lg:hidden">
                            <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
                          </div>
                          <ItemGroup className="gap-0">
                            <SummaryItem title="Subtotal" value={TakaFormatter.format(cartSubtotalTotal)} />
                            <SummaryItem title="Shipping" value={shipping === 0 ? "Free" : TakaFormatter.format(shipping)} />
                          </ItemGroup>
                          {shipping > 0 && (
                            <div className="mt-3 mb-2">
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
                                <motion.div
                                  className="h-full rounded-full bg-primary"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${freeShippingProgress * 100}%` }}
                                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                />
                              </div>
                              <p className="mt-1 text-[10px] text-muted-foreground/60">
                                Add {TakaFormatter.format(remainingForFree)} more for free shipping
                              </p>
                            </div>
                          )}
                          <Separator className="my-2" />
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <CardContent>
                    <Item size={"xs"} className="py-1 lg:py-2">
                      <ItemContent>
                        <ItemTitle className="flex flex-col items-start">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-xs font-normal text-muted-foreground/70">
                            {totalItems} item{totalItems !== 1 ? "s" : ""}
                            {uniqueProducts > 1 && ` from ${uniqueProducts} products`}
                          </span>
                        </ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <span className="text-lg font-bold">{TakaFormatter.format(cartTotal)}</span>
                      </ItemActions>
                    </Item>
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/50">
                      <Lock className="size-3" />
                      <span>Secure checkout</span>
                    </div>
                    <Button className="mt-2 w-full text-base" size={"sm"} asChild>
                      <Link href={"/checkout"}>
                        Proceed to Checkout <ArrowRightIcon className="size-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Collapsible>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPage

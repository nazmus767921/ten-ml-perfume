"use client"

import { useEffect, useState } from "react"
import { CheckoutForm } from "@/components/storefront/checkout/CheckoutForm"
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react"
import Link from "next/link"

function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((s) => s.items)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (items.length === 0) {
    return (
      <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center justify-center px-3 py-12">
        <Empty>
          <EmptyMedia>
            <ShoppingCartSimpleIcon className="size-8" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Your cart is empty</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-3 py-6 lg:py-10">
      <CheckoutForm />
    </section>
  )
}

export default CheckoutPage

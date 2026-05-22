"use client"

import CartItem from "@/components/storefront/cart/CartItem"
import PageTitle from "@/components/storefront/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { TakaFormatter } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart-store"
import {
  ArrowRightIcon,
  ShoppingCartIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react"
import Link from "next/link"

const SummaryItem = ({ title, value }: { title: string; value: string }) => (
  <Item size={"xs"} className="py-0.5">
    <ItemContent>
      <ItemTitle className="text-sm text-muted-foreground/80 capitalize">
        {title}
      </ItemTitle>
    </ItemContent>
    <ItemActions>
      <span className="text-sm">{value}</span>
    </ItemActions>
  </Item>
)

function CartPage() {
  const items = useCartStore((s) => s.items)
  const cartSubtotalTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const shipping = items.length > 0 ? 200 : 0
  const cartTotal = cartSubtotalTotal + shipping

  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      <div className="px-3">
        <PageTitle
          icon={<ShoppingCartIcon />}
          title="Cart"
          subtitle="Thank you for choosing our service"
        />
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <ShoppingCartSimpleIcon className="size-8" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>
              Looks like you haven&apos;t added anything to your cart yet.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
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
              <Card className="w-full max-w-xl bg-background/80 backdrop-blur-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ItemGroup className="gap-0">
                    <SummaryItem
                      title="Subtotal"
                      value={TakaFormatter.format(cartSubtotalTotal)}
                    />
                    <SummaryItem
                      title="Shipping"
                      value={
                        shipping === 0
                          ? "Free"
                          : TakaFormatter.format(shipping)
                      }
                    />
                  </ItemGroup>
                  <Separator className="my-2" />
                  <Item size={"xs"} className="py-1 lg:py-2">
                    <ItemContent>
                      <ItemTitle className="text-lg font-bold">
                        Total {totalItems} Items
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <span className="text-lg font-bold">
                        {TakaFormatter.format(cartTotal)}
                      </span>
                    </ItemActions>
                  </Item>
                  <Button className="mt-3 w-full text-base" size={"sm"} asChild>
                    <Link href={"/checkout"}>
                      Proceed to Checkout <ArrowRightIcon className="size-5" />
                    </Link>
                  </Button>
                  <Button
                    className="mt-1 w-full text-sm text-muted-foreground/80"
                    variant={"ghost"}
                    size={"sm"}
                    asChild
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPage

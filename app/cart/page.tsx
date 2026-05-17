import CartItem from "@/components/storefront/cart/CartItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { cn, TakaFormatter } from "@/lib/utils"
import { Icon } from "@phosphor-icons/react"
import { ArrowRightIcon, ShoppingBagIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { ReactNode } from "react"

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

const PageTitle = ({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string
  subtitle?:string
  icon?: ReactNode
  className?: string
}) => (
  <div className="flex flex-col">
      <span
        className={cn(
          "mt-3 mb-3 flex items-center text-3xl font-bold uppercase",
          className
        )}
      >
        {icon && <span className="mr-1">{icon}</span>} {title}
      </span>
     {subtitle ? <span className="text-muted-foreground/80 text-xs">{subtitle}</span>: null}
  </div>
)

function CartPage() {
  const cartSubtotalTotal = 12000
  const totalItems = 2
  const shipping = 200
  const cartTotal = 12200

  return (
    <section className="container mx-auto flex min-h-(--nav-safe-vh) flex-col pb-4 lg:pt-4 lg:pb-8">
      <div className="px-3">
        <PageTitle icon={<ShoppingBagIcon />} title="Cart" subtitle="Thank you for choosing our service"/>
      </div>

      {/* Cart Items */}
      <div className="flex flex-1 flex-col justify-between gap-8 lg:flex-row lg:gap-16">
        <ItemGroup className="max-w-xl gap-0 divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <CartItem />
            </div>
          ))}

          <CartItem price={2400} title="Latafa Hawas" description="10mL" />
        </ItemGroup>
        {/* FOOTER */}
        <div className="min-h-64 w-full lg:hidden" /> {/* Spacer */}
        <div className="relative w-full">
          <div className="fixed bottom-4 mt-auto w-full px-3 lg:sticky lg:top-[calc(var(--navbar-height)+1rem)] lg:bottom-auto lg:my-0 lg:px-0">
            <Card className="w-full max-w-xl bg-background/80 backdrop-blur-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Cart Summary */}
                <ItemGroup className="gap-0">
                  <SummaryItem
                    title="Subtotal"
                    value={TakaFormatter.format(cartSubtotalTotal)}
                  />
                  <SummaryItem
                    title="Shipping"
                    value={
                      shipping === null
                        ? "Free"
                        : TakaFormatter.format(shipping)
                    }
                  />
                </ItemGroup>
                <Separator className="my-2" />
                {/* Cart Total */}
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
                {/* Cart Buttons */}
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
                 <Link href='/shop'>Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPage

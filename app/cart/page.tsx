import CartItem from "@/components/storefront/cart/CartItem"
import { ItemGroup } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"

function CartPage() {
  return (
    <section className="min-h-(--nav-safe-vh) flex flex-col">
      <div className="max-w-xl flex flex-col justify-between flex-1">
          <ItemGroup className=" gap-0 divide-y divide-border">
            <div>
              <CartItem />
            </div>
            <CartItem price={2400} title="Latafa Hawas" description="10mL" />
          </ItemGroup>
          <div className="mt-auto">
            <Separator />
            <span>TOTAL: </span>
          </div>
      </div>
    </section>
  )
}

export default CartPage

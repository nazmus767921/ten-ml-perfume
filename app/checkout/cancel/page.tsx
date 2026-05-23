import Link from "next/link"
import { XCircle } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center justify-center px-3 py-12">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <XCircle className="size-16 text-muted-foreground/50" weight="fill" />

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-sm text-muted-foreground/80">Your payment was cancelled. No charges were made.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <Link href="/checkout">Try Again</Link>
          </Button>
          <Button asChild>
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

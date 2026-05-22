"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, SpinnerGap, XCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TakaFormatter } from "@/lib/utils"
import type { Order, PaymentMethod } from "@/lib/types/order"

type PageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; order: Order }
  | { status: "pending_payment"; order: Order; attempts: number }

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const valId = searchParams.get("val_id")
  const [pageState, setPageState] = useState<PageState>({ status: "loading" })

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setPageState({ status: "error", message: "No order ID provided." })
      return
    }

    try {
      let order: Order

      if (valId) {
        const res = await fetch("/api/orders/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, valId }),
        })
        const data = await res.json()
        if (!data.success) {
          setPageState({ status: "error", message: data.error || "Payment validation failed." })
          return
        }
        order = data.order as Order
      } else {
        const res = await fetch(`/api/orders/${orderId}`)
        const data = await res.json()
        if (!data.success) {
          setPageState({ status: "error", message: data.error || "Order not found." })
          return
        }
        order = data.order as Order
        if (order.paymentStatus === "paid") {
          setPageState({ status: "success", order })
          return
        } else {
          setPageState({ status: "pending_payment", order, attempts: 0 })
          return
        }
      }

      setPageState({ status: "success", order })
    } catch {
      setPageState({ status: "error", message: "Something went wrong. Please try again." })
    }
  }, [orderId, valId])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  useEffect(() => {
    if (pageState.status !== "loading") return

    const timeout = setTimeout(() => {
      setPageState({
        status: "error",
        message: "We're still verifying your payment, but it's taking a while. Your order has been received and we'll confirm it shortly. Please check back later or contact support.",
      })
    }, 15000)

    return () => clearTimeout(timeout)
  }, [pageState.status])

  const pollPaymentStatus = useCallback(async () => {
    if (!orderId) return false

    try {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      if (data.success && data.order.paymentStatus === "paid") {
        setPageState({ status: "success", order: data.order as Order })
        return true
      }
      return false
    } catch {
      return false
    }
  }, [orderId])

  useEffect(() => {
    if (pageState.status !== "pending_payment") return

    const interval = setInterval(async () => {
      const paid = await pollPaymentStatus()
      if (paid) return

      setPageState(prev => {
        if (prev.status !== "pending_payment") return prev
        const nextAttempts = prev.attempts + 1
        if (nextAttempts >= 12) {
          return {
            status: "error",
            message: "Payment confirmation is taking longer than expected. Your order has been received and we'll verify the payment manually. Please contact support if you have any concerns.",
          }
        }
        return { ...prev, attempts: nextAttempts }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [pageState.status, pollPaymentStatus])

  if (pageState.status === "loading") {
    return (
      <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center justify-center px-3 py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />
          <p className="text-sm text-muted-foreground/80">Verifying your order...</p>
        </div>
      </section>
    )
  }

  if (pageState.status === "error") {
    const isTimeout = pageState.message.startsWith("Payment confirmation is taking longer")
    const isLoadingTimeout = pageState.message.startsWith("We're still verifying your payment")
    return (
      <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center justify-center px-3 py-12">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <XCircle className="size-16 text-destructive/60" weight="fill" />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground/80">{pageState.message}</p>
          </div>

          <Button variant="outline" asChild>
            <Link href={isTimeout || isLoadingTimeout ? "/" : "/checkout"}>
              {isTimeout || isLoadingTimeout ? "Go Home" : "Try Again"}
            </Link>
          </Button>
        </div>
      </section>
    )
  }

  if (pageState.status === "pending_payment") {
    const { order } = pageState
    const paymentLabel: Record<PaymentMethod, string> = {
      sslcommerz: "Online Payment (SSLCommerz)",
      cod: "Cash on Delivery",
    }

    return (
      <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center px-3 py-12">
        <div className="flex w-full max-w-lg flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <SpinnerGap className="size-16 text-amber-500 animate-spin" weight="fill" />

            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Payment Confirming...</h1>
              <p className="text-sm text-muted-foreground/80">
                We're waiting for payment confirmation. This should take just a moment.
              </p>
            </div>

            <Badge variant="secondary" className="h-6 gap-1.5 px-3 text-xs">
              Order #{order.tranId}
            </Badge>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground/80">Total Paid</span>
                <span className="font-semibold">
                  {TakaFormatter.format(order.total, { displayType: "symbol" })}
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground/80">Payment Method</span>
                <p className="text-sm">{paymentLabel[order.paymentMethod]}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground/80">Shipping to</span>
                <div className="text-sm leading-relaxed">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.streetAddress}</p>
                  <p>
                    {order.shippingAddress.area}, {order.shippingAddress.district}
                  </p>
                  <p>{order.shippingAddress.phoneNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const { order } = pageState
  const isOnline = order.paymentMethod !== "cod"
  const paymentLabel: Record<PaymentMethod, string> = {
    sslcommerz: "Online Payment (SSLCommerz)",
    cod: "Cash on Delivery",
  }

  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center px-3 py-12">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="size-16 text-emerald-500" weight="fill" />

          <div className="space-y-1">
            <h1 className="text-2xl font-bold">
              {isOnline ? "Payment Successful!" : "Order Placed!"}
            </h1>
            <p className="text-sm text-muted-foreground/80">
              {isOnline
                ? "Your payment has been confirmed. We'll process your order shortly."
                : "You'll pay when you receive your order."}
            </p>
          </div>

          <Badge variant="secondary" className="h-6 gap-1.5 px-3 text-xs">
            Order #{order.tranId}
          </Badge>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground/80">Total Paid</span>
              <span className="font-semibold">
                {TakaFormatter.format(order.total, { displayType: "symbol" })}
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <span className="text-xs text-muted-foreground/80">Payment Method</span>
              <p className="text-sm">{paymentLabel[order.paymentMethod]}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <span className="text-xs text-muted-foreground/80">Shipping to</span>
              <div className="text-sm leading-relaxed">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.streetAddress}</p>
                <p>
                  {order.shippingAddress.area}, {order.shippingAddress.district}
                </p>
                <p>{order.shippingAddress.phoneNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="container mx-auto flex min-h-(--page-height-safe) flex-col items-center justify-center px-3 py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="size-10 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />
            <p className="text-sm text-muted-foreground/80">Loading...</p>
          </div>
        </section>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

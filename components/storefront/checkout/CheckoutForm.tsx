"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { ShippingAddressForm } from "./ShippingAddressForm"
import { PaymentMethodSelector } from "./PaymentMethodSelector"
import { CheckoutOrderSummary } from "./CheckoutOrderSummary"
import type { ShippingAddress, PaymentMethod, CreateOrderResponse } from "@/lib/types/order"
import type { CartItem } from "@/lib/stores/cart-store"

const INITIAL_ADDRESS: ShippingAddress = {
  fullName: "",
  phoneNumber: "",
  email: "",
  district: "",
  area: "",
  streetAddress: "",
  orderNotes: "",
}

function validatePhone(phone: string): boolean {
  return /^01\d{9}$/.test(phone)
}

function validateEmail(email: string): boolean {
  return email.includes("@") && email.length > 0
}

function validateAddress(
  address: ShippingAddress,
): Partial<Record<keyof ShippingAddress, string>> {
  const errors: Partial<Record<keyof ShippingAddress, string>> = {}

  if (!address.fullName.trim()) {
    errors.fullName = "Full name is required"
  }

  if (!address.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required"
  } else if (!validatePhone(address.phoneNumber)) {
    errors.phoneNumber = "Enter a valid BD number (01XXXXXXXXX)"
  }

  if (!address.email.trim()) {
    errors.email = "Email is required"
  } else if (!validateEmail(address.email)) {
    errors.email = "Enter a valid email address"
  }

  if (!address.district) {
    errors.district = "Select a district"
  }

  if (!address.area) {
    errors.area = "Select an area"
  }

  if (!address.streetAddress.trim()) {
    errors.streetAddress = "Street address is required"
  }

  return errors
}

export function CheckoutForm() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress>(INITIAL_ADDRESS)
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("sslcommerz")
  const [addressErrors, setAddressErrors] = useState<
    Partial<Record<keyof ShippingAddress, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const saErrors = validateAddress(shippingAddress)
      const hasErrors = Object.keys(saErrors).length > 0

      if (hasErrors) {
        setAddressErrors(saErrors)
        toast.error("Please fix the errors in the form")
        return
      }

      setAddressErrors({})
      setIsSubmitting(true)

      try {
        const orderItems = items.map((item: CartItem) => ({
          productId: item.productId,
          name: item.name,
          imageUrl: item.imageUrl,
          ml: item.ml,
          price: item.price,
          quantity: item.quantity,
        }))

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod,
            shippingAddress,
            items: orderItems,
          }),
        })

        const data: CreateOrderResponse = await res.json()

        if (!data.success) {
          toast.error(data.error ?? "Something went wrong. Please try again.")
          setIsSubmitting(false)
          return
        }

        clearCart()

        if (paymentMethod === "cod") {
          router.push(`/checkout/success?order_id=${data.orderId}`)
        } else {
          if (data.gatewayUrl) {
            window.location.href = data.gatewayUrl
          } else {
            toast.error("Payment gateway URL not found")
            setIsSubmitting(false)
          }
        }
      } catch {
        toast.error(
          "Network error. Please check your connection and try again.",
        )
        setIsSubmitting(false)
      }
    },
    [shippingAddress, paymentMethod, items, clearCart, router],
  )

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">Your cart is empty</p>
        <Button asChild className="mt-4" variant="outline">
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingAddressForm
                value={shippingAddress}
                onChange={setShippingAddress}
                errors={addressErrors}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:block">
          <CheckoutOrderSummary isSubmitting={isSubmitting} />
        </div>
      </div>
    </form>
  )
}

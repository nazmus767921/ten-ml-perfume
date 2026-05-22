import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
} from "@/lib/types/order"
import { saveOrder, updateOrder } from "@/lib/orders/storage"
import { initiateSSLSession } from "@/lib/sslcommerz/client"

const FREE_SHIPPING_THRESHOLD = 2000
const STANDARD_SHIPPING = 200

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest & { items?: Order["items"] } =
      await request.json()

    const { paymentMethod, shippingAddress, items } = body

    // ── Validation ─────────────────────────────────────────────
    if (!paymentMethod || !["sslcommerz", "cod"].includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: "Invalid payment method" },
        { status: 400 },
      )
    }

    if (!shippingAddress?.fullName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 },
      )
    }

    if (!shippingAddress?.phoneNumber?.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 },
      )
    }

    if (!shippingAddress?.email?.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 },
      )
    }

    if (
      !shippingAddress?.district?.trim() ||
      !shippingAddress?.area?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "District and area are required" },
        { status: 400 },
      )
    }

    if (!shippingAddress?.streetAddress?.trim()) {
      return NextResponse.json(
        { success: false, error: "Street address is required" },
        { status: 400 },
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 },
      )
    }

    // ── Create Order ───────────────────────────────────────────
    const orderId = nanoid(12)
    const tranId = `TENML-${Date.now()}-${nanoid(8)}`
    const now = new Date().toISOString()

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
    const total = subtotal + shipping

    const order: Order = {
      id: orderId,
      tranId,
      status: "pending",
      paymentMethod,
      paymentStatus: "pending",
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      createdAt: now,
      updatedAt: now,
    }

    await saveOrder(order)

    // ── Handle COD ─────────────────────────────────────────────
    if (paymentMethod === "cod") {
      return NextResponse.json({
        success: true,
        orderId,
      } satisfies CreateOrderResponse)
    }

    // ── Handle SSLCommerz ──────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const sslResult = await initiateSSLSession({
      totalAmount: total,
      tranId,
      cusName: shippingAddress.fullName,
      cusPhone: shippingAddress.phoneNumber,
      cusEmail: shippingAddress.email,
      cusAddress: shippingAddress.streetAddress,
      cusCity: shippingAddress.district,
      productName: `Perfume Order #${orderId}`,
      productCategory: "Fragrance",
      successUrl: `${appUrl}/checkout/success?order_id=${orderId}`,
      failUrl: `${appUrl}/checkout/cancel?order_id=${orderId}`,
      cancelUrl: `${appUrl}/checkout/cancel?order_id=${orderId}`,
      ipnUrl: `${appUrl}/api/orders/ipn`,
    })

    if (sslResult.status !== "SUCCESS" || !sslResult.GatewayPageURL) {
      await updateOrder(orderId, { status: "failed" })
      return NextResponse.json(
        {
          success: false,
          error: sslResult.failedreason || "Payment initialization failed",
        },
        { status: 502 },
      )
    }

    await updateOrder(orderId, { sslczSessionKey: sslResult.sessionkey })

    return NextResponse.json({
      success: true,
      orderId,
      gatewayUrl: sslResult.GatewayPageURL,
    } satisfies CreateOrderResponse)
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}

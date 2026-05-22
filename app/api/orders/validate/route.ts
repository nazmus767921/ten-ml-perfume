import { NextRequest, NextResponse } from "next/server"
import { getOrder, updateOrder } from "@/lib/orders/storage"
import { validateSSLTransaction } from "@/lib/sslcommerz/client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, valId } = body

    if (!orderId || !valId) {
      return NextResponse.json(
        { success: false, error: "orderId and valId are required" },
        { status: 400 },
      )
    }

    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 },
      )
    }

    const validation = await validateSSLTransaction(valId)

    if (validation.status !== "VALID" && validation.status !== "VALIDATED") {
      return NextResponse.json(
        {
          success: false,
          error: "Transaction validation failed",
        },
        { status: 400 },
      )
    }

    const validatedAmount = parseFloat(validation.amount || "0")
    const amountDiff = Math.abs(validatedAmount - order.total)
    if (amountDiff > 1) {
      return NextResponse.json(
        {
          success: false,
          error: `Amount mismatch: expected ${order.total}, got ${validatedAmount}`,
        },
        { status: 400 },
      )
    }
    if (amountDiff > 0 && amountDiff <= 1) {
      console.warn(
        `[SSLCommerz] Amount mismatch tolerated: expected=${order.total}, got=${validatedAmount}, diff=${amountDiff}`,
      )
    }

    const updated = await updateOrder(orderId, {
      status: "completed",
      paymentStatus: "paid",
      sslczValId: valId,
      sslczTransactionId: validation.tran_id,
    })

    return NextResponse.json({ success: true, order: updated })
  } catch (error) {
    console.error("Validate error:", error)
    return NextResponse.json(
      { success: false, error: "Validation failed" },
      { status: 500 },
    )
  }
}

import { NextRequest, NextResponse } from "next/server"
import { updateOrder, listOrders } from "@/lib/orders/storage"
import { validateSSLTransaction } from "@/lib/sslcommerz/client"

export async function POST(request: NextRequest) {
  let tranId: string | undefined
  let valId: string | undefined
  try {
    const formData = await request.formData()
    valId = formData.get("val_id") as string
    tranId = formData.get("tran_id") as string

    if (!valId || !tranId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const validation = await validateSSLTransaction(valId)

    if (validation.status === "VALID" || validation.status === "VALIDATED") {
      const orders = await listOrders()
      const order = orders.find((o) => o.tranId === tranId)

      if (order) {
        await updateOrder(order.id, {
          status: "completed",
          paymentStatus: "paid",
          sslczValId: valId,
          sslczTransactionId: validation.tran_id,
        })
        console.info(`[SSLCommerz IPN] Order ${order.id} updated: paymentStatus=paid`)
      } else {
        console.warn(`[SSLCommerz IPN] Order not found for tranId=${tranId}`)
      }
    } else {
      console.warn(`[SSLCommerz IPN] Validation failed for tranId=${tranId}: status=${validation.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`[SSLCommerz IPN] Error processing tranId=${tranId}, valId=${valId}:`, error)
    return NextResponse.json({ success: false }, { status: 200 })
  }
}

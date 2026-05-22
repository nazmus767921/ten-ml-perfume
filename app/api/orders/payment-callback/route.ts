import { NextRequest } from "next/server"
import { updateOrder } from "@/lib/orders/storage"

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get("order_id")
    const status = searchParams.get("status") as "success" | "fail" | "cancel" | null

    if (!orderId || !status) {
      return redirectTo("/checkout/cancel")
    }

    const formData = await request.formData()
    const valId = formData.get("val_id") as string | null
    const tranId = formData.get("tran_id") as string | null

    if (status === "fail" || status === "cancel") {
      const orderStatus = status === "cancel" ? "cancelled" : "failed"
      await updateOrder(orderId, { status: orderStatus, paymentStatus: "failed" }).catch(() => {})
      return redirectTo(`/checkout/cancel?order_id=${orderId}`)
    }

    // status === "success"
    if (valId) {
      await updateOrder(orderId, {
        sslczValId: valId,
        sslczTransactionId: tranId || undefined,
      }).catch(() => {})
    }

    const successUrl = new URL(`/checkout/success`, request.url)
    successUrl.searchParams.set("order_id", orderId)
    if (valId) successUrl.searchParams.set("val_id", valId)

    return new Response(null, {
      status: 303,
      headers: { Location: successUrl.toString() },
    })
  } catch {
    return redirectTo("/checkout/cancel")
  }
}

function redirectTo(path: string): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: path },
  })
}

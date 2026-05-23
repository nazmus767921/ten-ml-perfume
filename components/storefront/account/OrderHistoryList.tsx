"use client"

import { MOCK_ORDERS } from "@/lib/mock/orders"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TakaFormatter } from "@/lib/utils"
import type { OrderStatus, PaymentStatus } from "@/lib/types/order"

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const PAYMENT_COLORS: Record<PaymentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  refunded: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function OrderHistoryList() {
  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20">
        <p className="text-sm text-muted-foreground">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
      {MOCK_ORDERS.map((order) => (
        <Card key={order.id} size="sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={STATUS_COLORS[order.status]}>
                  {order.status}
                </Badge>
                <Badge variant="outline" className={PAYMENT_COLORS[order.paymentStatus]}>
                  {order.paymentStatus}
                </Badge>
                <Badge variant="outline">
                  {order.paymentMethod === "sslcommerz" ? "Card" : "COD"}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.ml}`} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} ({item.ml}ml) &times; {item.quantity}
                    </span>
                    <span className="font-medium">{TakaFormatter.format(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2 text-sm font-bold">
                <span>Total</span>
                <span>{TakaFormatter.format(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

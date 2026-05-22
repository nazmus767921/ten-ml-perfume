export type OrderStatus = "pending" | "processing" | "completed" | "failed" | "cancelled"

export type PaymentMethod = "sslcommerz" | "cod"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

export interface ShippingAddress {
  fullName: string
  phoneNumber: string
  email: string
  district: string
  area: string
  streetAddress: string
  orderNotes?: string
}

export interface OrderItem {
  productId: string | number
  name: string
  imageUrl: string
  ml: number
  price: number
  quantity: number
}

export interface Order {
  id: string
  tranId: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  shippingAddress: ShippingAddress
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  sslczSessionKey?: string
  sslczValId?: string
  sslczTransactionId?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  paymentMethod: PaymentMethod
  shippingAddress: ShippingAddress
  items: OrderItem[]
}

export interface CreateOrderResponse {
  success: boolean
  orderId?: string
  gatewayUrl?: string
  error?: string
}

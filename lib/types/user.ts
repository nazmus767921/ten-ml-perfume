import type { ShippingAddress } from "@/lib/types/order"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  shippingAddress: ShippingAddress
}

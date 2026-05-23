"use client"

import { create } from "zustand"
import type { UserProfile } from "@/lib/types/user"
import type { ShippingAddress } from "@/lib/types/order"

interface UserStore {
  user: UserProfile | null
  isAuthenticated: boolean
  wishlist: (string | number)[]
  login: () => void
  logout: () => void
  updateProfile: (data: Partial<Pick<UserProfile, "name" | "email" | "phone">>) => void
  updateAddress: (address: ShippingAddress) => void
  toggleWishlist: (productId: string | number) => void
}

const MOCK_USER: UserProfile = {
  id: "user_1",
  name: "Sarah Chen",
  email: "sarah@example.com",
  phone: "+880 1700 000000",
  shippingAddress: {
    fullName: "Sarah Chen",
    phoneNumber: "+880 1700 000000",
    email: "sarah@example.com",
    district: "Dhaka",
    area: "Gulshan",
    streetAddress: "123 Fragrance Lane, Apt 4B",
  },
}

export const useUserStore = create<UserStore>()((set, get) => ({
  user: MOCK_USER,
  isAuthenticated: true,
  wishlist: [1, 3],
  login: () => {
    set({ user: MOCK_USER, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, wishlist: [] })
  },
  updateProfile: (data) => {
    const current = get().user
    if (!current) return
    set({ user: { ...current, ...data } })
  },
  updateAddress: (address) => {
    const current = get().user
    if (!current) return
    set({ user: { ...current, shippingAddress: address } })
  },
  toggleWishlist: (productId) => {
    const current = get().wishlist
    if (current.includes(productId)) {
      set({ wishlist: current.filter((id) => id !== productId) })
    } else {
      set({ wishlist: [...current, productId] })
    }
  },
}))

"use client"

import { create } from "zustand"

export interface CartItem {
  compositeKey: string
  productId: string | number
  name: string
  imageUrl: string
  ml: number
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "compositeKey" | "quantity">) => void
  removeItem: (compositeKey: string) => void
  updateQuantity: (compositeKey: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  addItem: (item) => {
    const compositeKey = `${String(item.productId)}-${item.ml}`
    const existing = get().items.find((i) => i.compositeKey === compositeKey)
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.compositeKey === compositeKey ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      })
    } else {
      set({ items: [...get().items, { ...item, compositeKey, quantity: 1 }] })
    }
  },
  removeItem: (compositeKey) => {
    set({ items: get().items.filter((i) => i.compositeKey !== compositeKey) })
  },
  updateQuantity: (compositeKey, quantity) => {
    if (quantity < 1) return
    set({
      items: get().items.map((i) =>
        i.compositeKey === compositeKey ? { ...i, quantity } : i,
      ),
    })
  },
  clearCart: () => set({ items: [] }),
}))

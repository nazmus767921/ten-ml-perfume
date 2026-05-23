"use client"

import { QuantityInput } from "@/components/form/QuantityInput"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { TakaFormatter } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart-store"
import { TrashIcon } from "@phosphor-icons/react"
import Image from "next/image"
import type { CartItem as CartItemType } from "@/lib/stores/cart-store"

type Props = {
  item: CartItemType
}

export default function CartItem({ item }: Props) {
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const handleQuantityChange = (value: number) => {
    updateQuantity(item.compositeKey, value)
  }

  const handleRemove = () => {
    removeItem(item.compositeKey)
  }

  return (
    <Item className="py-6">
      <ItemMedia>
        <Image
          src={
            item.imageUrl ||
            "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=120&q=120"
          }
          width={120}
          height={120}
          className="size-20 object-cover"
          alt={item.name}
        />
      </ItemMedia>
      <ItemContent>
        <div className="flex justify-between gap-2">
          <div>
            <ItemTitle className="text-base leading-4.5 tracking-tight">{item.name}</ItemTitle>
            <div className="mt-1 flex gap-1">
              <Badge className="bg-primary p-0.5 px-2 text-primary-foreground">{item.ml}mL</Badge>
              <Badge variant={"secondary"} className="p-0.5 px-2">
                {TakaFormatter.format(item.price)}
              </Badge>
            </div>
            <ItemTitle className="mt-3 text-base">{TakaFormatter.format(item.price * item.quantity)}</ItemTitle>
          </div>

          <div className="flex flex-col">
            <ItemActions>
              <div className="flex flex-col items-end justify-between gap-4">
                <Button variant={"ghost"} size={"icon-lg"} className="text-destructive" onClick={handleRemove}>
                  <TrashIcon className="size-5 lg:size-4" />
                </Button>
                <QuantityInput value={item.quantity} onChange={handleQuantityChange} />
              </div>
            </ItemActions>
          </div>
        </div>
      </ItemContent>
    </Item>
  )
}

"use client"

import { QuantityInput } from "@/components/form/QuantityInput"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { TakaFormatter } from "@/lib/utils"
import { TrashIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { useState } from "react"

type Props = {
  price: number
  title: string
  description: string
}

export default function CartItem({
  price = 12000,
  title = "Dior Sauvage Elixir something loogn",
  description = "100mL",
}: Props) {
  const [quantity, setQuantity] = useState(1)



  return (
    <Item className="py-6">
      <ItemMedia>
        <Image
          src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=120&q=120"
          width={120}
          height={120}
          className="size-20 object-cover"
          alt="product Image"
        />
      </ItemMedia>
      <ItemContent>
        <div className="flex justify-between gap-2">
          <div>
            <ItemTitle className="text-base tracking-tight leading-4.5">{title}</ItemTitle>
            <div className="flex gap-1 mt-1">
              <Badge className="bg-primary p-0.5 px-2 text-primary-foreground">
                {description}
              </Badge>
              <Badge
                variant={"secondary"}
                className="p-0.5 px-2"
              >
                 {TakaFormatter.format(price)}
              </Badge>
            </div>
            <ItemTitle className="mt-3 text-base">
               {TakaFormatter.format(quantity * price)}
            </ItemTitle>
          </div>

          <div className="flex flex-col">
            <ItemActions>
              <div className="flex flex-col items-end justify-between gap-4">
                <Button
                  variant={"ghost"}
                  size={"icon-lg"}
                  className="text-destructive"
                >
                  <TrashIcon className="size-5 lg:size-4" />
                </Button>
                <QuantityInput value={quantity} onChange={setQuantity} />
              </div>
            </ItemActions>
          </div>
        </div>
      </ItemContent>
    </Item>
  )
}

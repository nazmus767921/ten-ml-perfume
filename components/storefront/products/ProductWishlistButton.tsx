"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeartIcon } from "@phosphor-icons/react"
import { IconSwap, IconSwapItem } from "@/components/ui/icon-swap"
import { useState } from "react"

type Props = {}

export default function ProductWishlistButton({}: Props) {
  const [isActive, setIsActive] = useState(false)

  const handleAddToWishlist = () => {
    setIsActive((prev) => !prev)
  }

  return (
    <Button variant={"outline"} size={"icon-lg"} className="shrink-0" onClick={handleAddToWishlist}>
      <HeartIcon
        className={cn("size-5", {
          "fill-red-400": isActive,
        })}
        weight={isActive ? "fill" : "regular"}
      />
    </Button>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function VariantSelector() {
  const [selectedVariant, setSelectedVariant] = useState("3ml")
  type Variant = string
  const variants: Variant[] = ["3ml", "5ml", "6ml", "10ml", "15ml", "30ml"]

  const handleSelect = (variant: Variant) => {
    setSelectedVariant(variant)
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg">Sizes</span>

      <div className="grid w-full max-w-full grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-2">
        {variants.map((variant, index) => {
          const isSelected =
            selectedVariant.toLowerCase() === variant.toLowerCase()
          return (
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleSelect(variant)}
              size={"lg"}
            >
              <span className="text-sm">{variant}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

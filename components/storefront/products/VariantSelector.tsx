"use client"

import { Button } from "@/components/ui/button"
import type { MlVariant } from "@/components/storefront/products/types"
import { useState } from "react"

interface VariantSelectorProps {
  variants?: MlVariant[]
  selectedMl?: number | null
  onMlChange?: (ml: number) => void
}

const FALLBACK_VARIANTS = [3, 5, 6, 10, 15, 30]

export default function VariantSelector({
  variants,
  selectedMl: controlledMl,
  onMlChange,
}: VariantSelectorProps) {
  const isControlled = controlledMl !== undefined && onMlChange !== undefined

  const [internalMl, setInternalMl] = useState<number | null>(
    variants?.[0]?.ml ?? FALLBACK_VARIANTS[0],
  )

  const selectedMl = isControlled ? controlledMl : internalMl

  const handleSelect = (ml: number) => {
    if (isControlled) {
      onMlChange(ml)
    } else {
      setInternalMl(ml)
    }
  }

  const variantLabels = variants
    ? variants.map((v) => v.ml)
    : FALLBACK_VARIANTS

  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg">Sizes</span>

      <div className="grid w-full max-w-full grid-cols-[repeat(auto-fit,minmax(76px,1fr))] gap-2">
        {variantLabels.map((ml) => {
          const isSelected = selectedMl === ml
          return (
            <Button
              key={ml}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleSelect(ml)}
              size={"lg"}
            >
              <span className="text-sm">{ml}ml</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

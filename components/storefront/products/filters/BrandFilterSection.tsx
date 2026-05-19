"use client"

import FilterSectionWrapper from "@/components/storefront/products/filters/FilterSectionWrapper"
import { Button } from "@/components/ui/button"
import { useUrlFilter } from "@/hooks/useFiltersHook"
import { EraserIcon } from "@phosphor-icons/react"
import { parseAsArrayOf, parseAsString } from "nuqs"

type Brand = string

interface BrandFilterSectionProps {
  brands: Brand[]
}

export default function BrandFilterSection({ brands }: BrandFilterSectionProps) {
  const {
    clearFilter,
    setFilter,
    value: selectedBrands,
  } = useUrlFilter({
    key: "brands",
    defaultValue: [] as string[],
    parser: parseAsArrayOf(parseAsString),
  })

  const activeBrands = selectedBrands ?? []

  const handleSelectBrand = async (brand: Brand) => {
    let updatedBrands: string[]

    if (activeBrands.includes(brand)) {
      updatedBrands = activeBrands.filter((b) => b !== brand)
    } else {
      updatedBrands = [...activeBrands, brand]
    }

    await setFilter(updatedBrands)
  }


   const ClearFilter = () => {
      return (
        <Button size={"icon-sm"} variant={"ghost"} onClick={clearFilter} className="w-full">
          <EraserIcon className="size-4 mr-1" />
          Clear brands
        </Button>
      )
    }
  

  return (
    <FilterSectionWrapper
      title="Brands"
      collapsible
      // If you want to render the clear button dynamically:
      action={
        activeBrands.length > 0 && (
         <ClearFilter/>
        )
      }
    >
      <div className="mt-2 flex flex-wrap gap-1">
        {brands.map((brand) => {
          const isSelected = activeBrands.includes(brand)

          return (
            <Button key={brand} variant={isSelected ? "default" : "outline"} size="sm" onClick={() => handleSelectBrand(brand)}>
              {brand}
            </Button>
          )
        })}
      </div>
    </FilterSectionWrapper>
  )
}

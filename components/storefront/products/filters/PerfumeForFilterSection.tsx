"use client"

import FilterSectionWrapper from "@/components/storefront/products/filters/FilterSectionWrapper"
import { Button } from "@/components/ui/button"
import { useUrlFilter } from "@/hooks/useFiltersHook"
import { EraserIcon } from "@phosphor-icons/react"
import { parseAsString, useQueryState } from "nuqs"

type Category = string

interface PerfumeForFilterSectionProps {
  categories: Category[]
}

export default function PerfumeForFilterSection({ categories }: PerfumeForFilterSectionProps) {
  const {
    clearFilter,
    setFilter,
    value: category,
  } = useUrlFilter({
    key: "for",
    defaultValue: "",
    parser: parseAsString,
  })

  const ClearFilter = () => {
    return (
      <Button size={"icon-sm"} variant={"ghost"} onClick={clearFilter}>
        <EraserIcon className="size-4" />{" "}
      </Button>
    )
  }

  return (
    <FilterSectionWrapper title="For" action={<ClearFilter />}>
      <div className="grid grid-cols-3 gap-1">
        {categories.map((cat) => {
          const isActive = category === cat
          return (
            <Button key={cat} variant={isActive ? "default" : "secondary"} size={"lg"} onClick={() => setFilter(cat)}>
              {cat}
            </Button>
          )
        })}
      </div>
    </FilterSectionWrapper>
  )
}

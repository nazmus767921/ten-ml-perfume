"use client"

interface MobileProductsFiltersProps {}

import ProductsFiltersBase, { FindScentButton } from "@/components/storefront/products/filters/ProductsFiltersBase"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CommandIcon, SlidersHorizontalIcon } from "@phosphor-icons/react"

export default function MobileProductsFilters({}: MobileProductsFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"default"} size={"lg"} className="w-full">
          <CommandIcon className="size-5 animate-spin" />
          <span className="text-sm ml-2">Find Your Scent</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="no-scrollbar overflow-y-auto pt-(--safe-space) pb-20">
        <div className="relative">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold tracking-tighter uppercase">Find Your Perfect Scent</SheetTitle>
            <SheetDescription className="leading-tight tracking-wide">
              Select your preferences and our system will find the best suitable perfume for you.
            </SheetDescription>
          </SheetHeader>
          <ProductsFiltersBase />
          <div className="fixed right-0 bottom-0 w-5/6 sm:w-sm">
            <FindScentButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

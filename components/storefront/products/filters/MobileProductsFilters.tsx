"use client"

import { AnimatePresence, motion } from "motion/react"
import ProductsFiltersBase, { FindScentButton } from "@/components/storefront/products/filters/ProductsFiltersBase"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CommandIcon, SlidersHorizontalIcon } from "@phosphor-icons/react"

interface MobileProductsFiltersProps {}

export default function MobileProductsFilters({}: MobileProductsFiltersProps) {
  return (
    <AnimatePresence>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"default"} size={"lg"} className="w-full">
            <CommandIcon className="size-5 animate-spin" />
            <span className="ml-2 text-xl">Find Your Scent</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="no-scrollbar overflow-y-auto pt-(--safe-space) pb-20">
          <div className="relative">
            {/* <SheetHeader>
              <SheetTitle className="text-2xl font-bold tracking-tighter uppercase">Find Your Perfect Scent</SheetTitle>
              <SheetDescription className="leading-tight tracking-wide">
                Select your preferences and our system will find the best suitable perfume for you.
              </SheetDescription>
            </SheetHeader> */}
            <ProductsFiltersBase />

            <motion.div
              initial={{
                bottom: "-100%",
              }}
              animate={{
                bottom: "0%",
              }}
              className="fixed w-5/6 sm:w-sm"
            >
              <FindScentButton />
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </AnimatePresence>
  )
}

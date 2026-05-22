"use client"

import type { Variants } from "motion/react"
import { motion } from "motion/react"
import ProductsFiltersBase, { FindScentButton } from "@/components/storefront/products/filters/ProductsFiltersBase"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CommandIcon } from "@phosphor-icons/react"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.35,
    },
  },
}

export default function MobileProductsFilters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"default"}
          size={"lg"}
          className="w-full group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          <CommandIcon className="size-5 transition-all duration-500 ease-ios-spring group-hover:rotate-12 group-hover:scale-110" />
          <span className="ml-2 text-xl">Find Your Scent</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="flex flex-col pt-16 z-200">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <ProductsFiltersBase />
            </motion.div>
          </motion.div>
          <div className="h-4" />
        </div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-t from-popover via-popover to-popover/95 pt-6 pb-4 px-4 border-t border-border/40"
        >
          <FindScentButton />
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

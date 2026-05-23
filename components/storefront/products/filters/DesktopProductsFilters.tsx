import { Suspense } from "react"
import ProductsFiltersBase, { FindScentButton } from "@/components/storefront/products/filters/ProductsFiltersBase"
import { CommandIcon } from "@phosphor-icons/react/dist/ssr"

export default function DesktopProductsFilters() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-col bg-primary px-3 pt-3 pb-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          <CommandIcon className="size-6 animate-spin" />
          <h5 className="pt-1 text-xl font-bold tracking-tighter uppercase">Find Your Perfect Scent</h5>
        </div>
        <h6 className="pl-8 text-sm leading-tight tracking-wide">
          Select your preferences and our system will find the best suitable perfume for you.
        </h6>
      </div>

      <div className="mt-2 flex flex-col">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-muted" />}>
          <ProductsFiltersBase />
        </Suspense>
        <div className="mt-6">
          <FindScentButton />
        </div>
      </div>
    </div>
  )
}

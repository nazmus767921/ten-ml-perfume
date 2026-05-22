import { Suspense } from "react"
import ProductsFiltersBase, { FindScentButton } from "@/components/storefront/products/filters/ProductsFiltersBase"
import { CommandIcon } from "@phosphor-icons/react/dist/ssr"

export default function DesktopProductsFilters() {
  return (
    <div className="flex w-full flex-1 flex-col ">
      <div className="flex flex-col px-3 pt-3 pb-4 bg-primary text-primary-foreground">
        <div className="flex gap-2 items-center">
            <CommandIcon className="size-6 animate-spin"/>
            <h5 className="pt-1 text-xl font-bold tracking-tighter uppercase">Find Your Perfect Scent</h5>
        </div>
        <h6 className="leading-tight tracking-wide text-sm pl-8">Select your preferences and our system will find the best suitable perfume for you.</h6>
      </div>

      <div className="flex flex-col mt-2">
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

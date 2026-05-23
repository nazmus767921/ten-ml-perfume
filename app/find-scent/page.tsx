import { Suspense } from "react"
import DesktopProductsFilters from "@/components/storefront/products/filters/DesktopProductsFilters"
import PageTitle from "@/components/storefront/ui/PageHeader"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

export default function FindScentPage() {
  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      <div className="px-3">
        <PageTitle
          icon={<MagnifyingGlassIcon />}
          title="Find Your Scent"
          subtitle="Select your preferences and our system will find the best suitable perfume for you."
        />
      </div>

      <div className="mt-4 flex w-full flex-1 items-start justify-center px-3">
        <div className="w-full max-w-xl">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-muted" />}>
            <DesktopProductsFilters includeTitle={false} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

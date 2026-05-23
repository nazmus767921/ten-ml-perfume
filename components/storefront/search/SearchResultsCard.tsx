"use client"

import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { TakaFormatter } from "@/lib/utils"
import type { SearchResult } from "./search-service"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"

interface SearchResultsCardProps {
  results: SearchResult[]
  total: number
  isLoading: boolean
  query: string
  limit: number
  onClose: () => void
}

export function SearchResultsCard({ results, total, isLoading, query, limit, onClose }: SearchResultsCardProps) {
  const router = useRouter()

  const handleProductClick = (productId: string | number) => {
    router.push(`/shop/${productId}`)
    onClose()
  }

  const handleViewAll = () => {
    router.push(`/shop?q=${encodeURIComponent(query)}`)
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3">
          {[0, 1, 2].map((i) => (
            <div key={`skeleton-${i}`} className="flex items-center gap-3 py-2">
              <div className="size-12 animate-pulse bg-muted" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 animate-pulse bg-muted" />
                <div className="h-2.5 w-1/2 animate-pulse bg-muted" />
              </div>
            </div>
          ))}
        </motion.div>
      ) : results.length === 0 && query.trim() ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Empty>
            <EmptyMedia>
              <MagnifyingGlassIcon className="size-6" />
            </EmptyMedia>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try a different search term</EmptyDescription>
          </Empty>
        </motion.div>
      ) : results.length > 0 ? (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-2">
          <div className="space-y-1">
            {results.map((result) => (
              <button
                key={result.product.id}
                type="button"
                onClick={() => handleProductClick(result.product.id)}
                className="flex w-full items-center gap-3 p-2 text-left transition-colors hover:bg-muted"
              >
                <div className="size-12 shrink-0 bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{result.product.name}</p>
                  <p className="text-xs text-muted-foreground">{result.product.brand}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold">{TakaFormatter.format(result.product.price)}</span>
              </button>
            ))}
          </div>

          {total > limit && (
            <>
              <div className="my-1 border-t border-border" />
              <button
                type="button"
                onClick={handleViewAll}
                className="flex w-full items-center justify-center py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
              >
                View all {total} results
              </button>
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

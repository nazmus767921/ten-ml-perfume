"use client"

import { useSearch } from "./useSearch"
import { SearchResultsCard } from "./SearchResultsCard"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"
import { TapButton } from "@/components/storefront/ui/TapButton"

export function SearchModal() {
  const { query, setQuery, results, total, isLoading, isOpen, open, close, limit } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(id)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  return (
    <>
      <TapButton aria-label="Search products" onClick={open}>
        <MagnifyingGlassIcon className="size-5" />
      </TapButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={close}
          />
        )}
        {isOpen && (
          <motion.div
            key="search-panel"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: "100vh", opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden bg-background shadow-2xl"
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                <MagnifyingGlassIcon className="size-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products or brands..."
                  aria-label="Search products or brands"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                />
                <button type="button" onClick={close} aria-label="Close search">
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="mt-3">
                <SearchResultsCard results={results} total={total} isLoading={isLoading} query={query} limit={limit} onClose={close} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { useState, useDeferredValue, useEffect, useCallback } from "react"
import { searchProducts, SEARCH_RESULT_LIMIT, type SearchResult } from "./search-service"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const hasQuery = query.trim().length > 0
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    if (!deferredQuery.trim()) {
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    searchProducts(deferredQuery)
      .then((res) => {
        if (cancelled) return
        setResults(res.results)
        setTotal(res.total)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))

    return () => {
      cancelled = true
    }
  }, [deferredQuery])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setResults([])
    setTotal(0)
  }, [])

  const handleSetQuery = useCallback((q: string) => {
    setQuery(q)
  }, [])

  return {
    query,
    setQuery: handleSetQuery,
    results: hasQuery ? results : [],
    total: hasQuery ? total : 0,
    isLoading,
    isOpen,
    open,
    close,
    limit: SEARCH_RESULT_LIMIT,
  }
}

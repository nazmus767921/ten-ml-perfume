// hooks/useFiltersHook.ts

import { useQueryState, Options } from "nuqs"

type AllowedUrlTypes = string | number | boolean | string[] | number[] | null

interface UseUrlFilterOptions<T extends AllowedUrlTypes> {
  key: string
  defaultValue: T
  parser?: any
}

export function useUrlFilter<T extends AllowedUrlTypes>({ key, defaultValue, parser }: UseUrlFilterOptions<T>) {
  const [queryState, setQueryState] = useQueryState<T>(key, {
    clearOnDefault: true,
    defaultValue,
    ...(parser ? { parse: parser.parse, serialize: parser.serialize } : {}),
  } as any)

  const nuqsOptions: Options = { shallow: true }

  const setFilter = async (value: T) => {
    // 👇 SENIOR FIX: If value is an empty array, pass null to clear it from the URL
    if (Array.isArray(value) && value.length === 0) {
      await setQueryState(null as any, nuqsOptions)
    } else {
      await setQueryState(value as any, nuqsOptions)
    }
  }

  const clearFilter = async () => {
    await setQueryState(null as any, nuqsOptions) // Directly pass null on clear too
  }

  const isFilterActive = (value: T) => {
    if (Array.isArray(queryState) && Array.isArray(value)) {
      return queryState.length === value.length && queryState.every((v, i) => v === value[i])
    }
    return queryState === value
  }

  return {
    value: queryState,
    setFilter,
    clearFilter,
    isFilterActive,
    hasActiveFilter: queryState !== null && queryState !== defaultValue,
  }
}

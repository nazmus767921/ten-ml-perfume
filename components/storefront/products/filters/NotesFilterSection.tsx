"use client"

import FilterSectionWrapper from "@/components/storefront/products/filters/FilterSectionWrapper"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { useUrlFilter } from "@/hooks/useFiltersHook"
import { EraserIcon } from "@phosphor-icons/react"
import { parseAsArrayOf, parseAsString } from "nuqs"

interface FragranceNotes {
  top: string[]
  heart: string[]
  base: string[]
}

type Props = {
  notes: FragranceNotes
  emptyMessage?: string
}

export default function NotesFilterSection({ notes, emptyMessage = "No content" }: Props) {
  // 1. Initialize custom hooks for each individual fragrance tier
  const {
    value: selectedTop,
    setFilter: setTopFilter,
    clearFilter: clearTopFilters,
  } = useUrlFilter({
    key: "top",
    defaultValue: [] as string[],
    parser: parseAsArrayOf(parseAsString),
  })

  const {
    value: selectedMiddle,
    setFilter: setMiddleFilter,
    clearFilter: clearMiddleFilters,
  } = useUrlFilter({
    key: "middle",
    defaultValue: [] as string[],
    parser: parseAsArrayOf(parseAsString),
  })

  const {
    value: selectedBase,
    setFilter: setBaseFilter,
    clearFilter: clearBaseFilters,
  } = useUrlFilter({
    key: "base",
    defaultValue: [] as string[],
    parser: parseAsArrayOf(parseAsString),
  })

  // Safe fallback to empty arrays
  const activeTop = selectedTop ?? []
  const activeMiddle = selectedMiddle ?? []
  const activeBase = selectedBase ?? []

  const handleToggleNote = async (note: string, activeTierList: string[], setTierFilter: (val: string[]) => Promise<void>) => {
    const serializedNote = note.toLowerCase()
    let updatedTierList: string[]

    if (activeTierList.includes(serializedNote)) {
      updatedTierList = activeTierList.filter((n) => n !== serializedNote)
    } else {
      updatedTierList = [...activeTierList, serializedNote]
    }

    await setTierFilter(updatedTierList)
  }

  const hasNoNotes = !notes.top?.length && !notes.heart?.length && !notes.base?.length

  type _NoteGroup = "top" | "middle" | "base"
  const handleClear = (noteGroup: _NoteGroup) => {
    switch (noteGroup) {
      case "top":
        clearTopFilters()
        break
      case "middle":
        clearMiddleFilters()
        break
      case "base":
        clearBaseFilters()
        break

      default:
        break
    }
  }

  const ClearFilter = ({ noteGroup }: { noteGroup: _NoteGroup }) => {
    return (
      <Button size={"icon-sm"} variant={"ghost"} onClick={() => handleClear(noteGroup)}>
        <EraserIcon className="size-4" />
      </Button>
    )
  }

  if (hasNoNotes) {
    return (
      <FilterSectionWrapper title="Notes" collapsible>
        <Empty className="mt-2">
          <EmptyHeader>
            <EmptyTitle>{emptyMessage}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </FilterSectionWrapper>
    )
  }

  const renderNoteTier = (group: _NoteGroup, noteList: string[], activeTierList: string[], setTierFilter: (val: string[]) => Promise<void>) => {
    if (!noteList || noteList.length === 0) return null

    const getLabel = (group: _NoteGroup) => {
      let label = ""

      switch (group) {
        case "top":
          label = "Top"
          break
        case "middle":
          label = "Heart / Middle"
          break
        case "base":
          label = "Base"
          break

        default:
          break
      }

      return label
    }

    const label = getLabel(group)

    return (
      <div className="mb-4 last:mb-0">
        <div className="flex w-full">
          <h4 className="mb-2 flex-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{label} Notes</h4>
          <ClearFilter noteGroup={group} />
        </div>
        <div className="flex flex-wrap gap-1">
          {noteList.map((note) => {
            const isSelected = activeTierList.includes(note.toLowerCase())
            return (
              <Button
                key={note}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleToggleNote(note, activeTierList, setTierFilter)}
              >
                {note}
              </Button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <FilterSectionWrapper title="Notes" collapsible>
      <div className="mt-3 flex flex-col gap-1">
        {renderNoteTier("top", notes.top, activeTop, setTopFilter)}
        {renderNoteTier("middle", notes.heart, activeMiddle, setMiddleFilter)}
        {renderNoteTier("base", notes.base, activeBase, setBaseFilter)}
      </div>
    </FilterSectionWrapper>
  )
}

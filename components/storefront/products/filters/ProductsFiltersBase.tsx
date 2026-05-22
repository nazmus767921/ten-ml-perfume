"use client"

import BrandFilterSection from "@/components/storefront/products/filters/BrandFilterSection"
import NotesFilterSection from "@/components/storefront/products/filters/NotesFilterSection"
import PerfumeForFilterSection from "@/components/storefront/products/filters/PerfumeForFilterSection"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

export default function ProductsFiltersBase() {
  const FRAG_NOTES = {
    top: ["Bergamot", "Lemon", "Mandarin Orange", "Lavender", "Mint", "Pink Pepper"],
    heart: ["Jasmine", "Rose", "Geranium", "Patchouli", "Nutmeg", "Cinnamon"],
    base: ["Vanilla", "Amber", "Sandalwood", "Cedar", "Musk", "Vetiver", "Tonka Bean"],
  }
  const BRANDS = ["Dior", "chanel", "Latafa", "Dunhill", "Mont Black"]
  const FOR_CAT = ["Men", "Women", "Unisex"]

  return (
    <div className="flex flex-col">
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <PerfumeForFilterSection categories={FOR_CAT} />
        <NotesFilterSection notes={FRAG_NOTES} emptyMessage="No notes fetched" />
        <BrandFilterSection brands={BRANDS} />
      </div>
    </div>
  )
}

export const FindScentButton = () => {
  return (
    <Button type="submit" size={"lg"} className="w-full text-lg">
      <MagnifyingGlassIcon className="size-5"/> Find
    </Button>
  )
}

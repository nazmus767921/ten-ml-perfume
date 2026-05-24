"use client"

import { Product } from "@/components/storefront/products/types"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { motion } from "motion/react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/getImageUrl"

const NEW_ARRIVALS: Product[] = [
  {
    id: "na-1",
    imageUrl:
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    name: "Sauvage Elixir",
    brand: "Dior",
    price: 450,
    badge: "new",
    mlVariants: [{ ml: 10, price: 450 }],
  },
  {
    id: "na-2",
    imageUrl: getImageUrl(),
    name: "Aventus",
    brand: "Creed",
    price: 550,
    badge: "new",
    mlVariants: [{ ml: 10, price: 550 }],
  },
  {
    id: "na-3",
    name: "Baccarat Rouge 540",
    imageUrl: getImageUrl(),
    brand: "Maison Francis Kurkdjian",
    price: 650,
    badge: "new",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "na-4",
    name: "Oud Wood",
    imageUrl: getImageUrl(),
    brand: "Tom Ford",
    price: 480,
    badge: "new",
    mlVariants: [{ ml: 10, price: 480 }],
  },
  {
    id: "na-5",
    name: "Angels' Share",
    imageUrl: getImageUrl(),
    brand: "Kilian",
    price: 500,
    badge: "new",
    mlVariants: [{ ml: 10, price: 500 }],
  },
  {
    id: "na-6",
    name: "Jazz Club",
    brand: "Maison Margiela",
    imageUrl: getImageUrl(),
    price: 320,
    badge: "new",
    mlVariants: [{ ml: 10, price: 320 }],
  },
]

export default function NewArrivalsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress})`
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    onScroll()
    emblaApi.on("select", onSelect)
    emblaApi.on("scroll", onScroll)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("reInit", onScroll)
  }, [emblaApi, onSelect, onScroll])

  return (
    <section className="bg-muted/30 py-20 md:py-32 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="NEW ARRIVALS"
          subtitle="Discover the latest additions to our collection."
          cta={{ text: "View All", href: "/shop?badge=new" }}
        />

        <div className="relative mx-auto mt-12 w-full">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {NEW_ARRIVALS.map((product, idx) => (
                <div
                  key={product.id}
                  className={cn(
                    "min-w-0 shrink-0 grow-0 basis-[55%] md:basis-[40%] lg:basis-[30%]",
                    idx === 0 ? "pl-3 md:pl-10" : "pl-3"
                    // idx === NEW_ARRIVALS.length - 1 && "pr-3 md:pr-10"
                  )}
                >
                  <ProductCard product={product} />
                </div>
              ))}
              <div className="min-w-0 shrink-0 grow-0 basis-3 md:basis-10"></div>
            </motion.div>
          </div>

          {/* Cinematic Progress & Controls */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-black/10 px-6 pt-6 md:flex-row md:gap-0 md:px-10 dark:border-white/10">
            {/* Slide Counter */}
            <div className="font-mono text-xl font-black tracking-tighter text-black md:w-24 dark:text-white">
              {(selectedIndex + 1).toString().padStart(2, "0")}
              <span className="mx-2 text-black/30 dark:text-white/30">/</span>
              {NEW_ARRIVALS.length.toString().padStart(2, "0")}
            </div>

            {/* Thin Progress Bar */}
            <div className="relative h-px w-full bg-black/10 md:max-w-md dark:bg-white/10">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full origin-left bg-black dark:bg-white"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* Sharp Square Navigation */}
            <div className="flex items-center gap-3 md:w-24 md:justify-end">
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-none border-2 border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={scrollPrev}
                aria-label="Previous slide"
              >
                <ArrowLeftIcon className="size-5" weight="bold" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-none border-2 border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={scrollNext}
                aria-label="Next slide"
              >
                <ArrowRightIcon className="size-5" weight="bold" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Product } from "@/components/storefront/products/types"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { motion } from "motion/react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

const NEW_ARRIVALS: Product[] = [
  {
    id: "na-1",
    name: "Sauvage Elixir",
    brand: "Dior",
    price: 450,
    badge: "new",
    mlVariants: [{ ml: 10, price: 450 }],
  },
  {
    id: "na-2",
    name: "Aventus",
    brand: "Creed",
    price: 550,
    badge: "new",
    mlVariants: [{ ml: 10, price: 550 }],
  },
  {
    id: "na-3",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 650,
    badge: "new",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "na-4",
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 480,
    badge: "new",
    mlVariants: [{ ml: 10, price: 480 }],
  },
  {
    id: "na-5",
    name: "Angels' Share",
    brand: "Kilian",
    price: 500,
    badge: "new",
    mlVariants: [{ ml: 10, price: 500 }],
  },
  {
    id: "na-6",
    name: "Jazz Club",
    brand: "Maison Margiela",
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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const containerVariants: import("motion/react").Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: import("motion/react").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section className="py-16 md:py-24">
      <SectionHeader 
        label="NEW ARRIVALS" 
        cta={{ text: "View All", href: "/shop?badge=new" }} 
      />

      <div className="relative mx-auto w-full px-6 md:px-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <motion.div 
            className="flex -ml-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {NEW_ARRIVALS.map((product) => (
              <motion.div 
                key={product.id} 
                className="min-w-0 shrink-0 grow-0 basis-[75%] pl-4 md:basis-[25%]"
                variants={itemVariants}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-end gap-2">
          <Button variant="outline" size="icon" className="" onClick={scrollPrev} aria-label="Previous slide">
            <ArrowLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" className="" onClick={scrollNext} aria-label="Next slide">
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

const BRANDS_SPOTLIGHT = [
  { id: "lattafa", name: "Lattafa", slug: "lattafa", previewImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80" },
  { id: "afnan", name: "Afnan", slug: "afnan", previewImage: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80" },
  { id: "dior", name: "Dior", slug: "dior", previewImage: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80" },
  { id: "tom-ford", name: "Tom Ford", slug: "tom-ford", previewImage: "https://images.unsplash.com/photo-1595425970377-c9703bc48baf?w=600&q=80" },
  { id: "maison-margiela", name: "Maison Margiela", slug: "maison-margiela", previewImage: "https://images.unsplash.com/photo-1615486171448-42f06742a783?w=600&q=80" },
  { id: "chanel", name: "Chanel", slug: "chanel", previewImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80" },
  { id: "ysl", name: "YSL", slug: "ysl", previewImage: "https://images.unsplash.com/photo-1605663718042-430c5e3240ea?w=600&q=80" },
  { id: "decant", name: "Decant", slug: "decant", previewImage: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&q=80" },
]

export default function BrandSpotlightSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#F9F9F7] py-20 overflow-hidden dark:bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex w-full items-end justify-between px-4 pb-12 md:px-12">
        <h3 className="text-2xl font-black uppercase tracking-widest text-black dark:text-white md:text-4xl">
          Brand Spotlight
        </h3>
        <p className="hidden max-w-sm text-right text-sm font-bold uppercase tracking-wider text-black/60 dark:text-white/60 md:block md:text-base">
          Explore our curated collection of world-class perfumery.
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col border-t border-black dark:border-white">
        {BRANDS_SPOTLIGHT.map((brand, idx) => (
          <Link
            key={brand.id}
            href={`/shop?brands=${brand.slug}`}
            className="group relative flex w-full items-center justify-between border-b border-black px-4 py-6 transition-colors dark:border-white md:px-12 md:py-10"
            onMouseEnter={() => setHoveredIndex(idx)}
          >
            <h2 className="relative z-10 m-0 text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-black transition-all duration-300 group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_black] dark:text-white dark:group-hover:[-webkit-text-stroke:2px_white] md:text-[9vw] lg:text-[8vw]">
              {brand.name}
            </h2>
            
            <span className="relative z-10 hidden text-xl font-black uppercase tracking-widest text-black opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-white md:block md:text-3xl">
              Explore
            </span>
          </Link>
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[450px] w-[350px] md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.4, ease: "easeOut" }, scale: { duration: 0.4, ease: "easeOut" } }}
      >
        {BRANDS_SPOTLIGHT.map((brand, idx) => (
          <div 
            key={brand.id} 
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-out",
              hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <Image
              src={brand.previewImage}
              alt={brand.name}
              fill
              className="object-cover"
              sizes="350px"
              priority={idx < 4}
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

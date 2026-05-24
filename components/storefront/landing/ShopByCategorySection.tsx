"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { ArrowUpRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    id: "men",
    label: "For Him",
    tag: "Masculine",
    count: "120+ Scents",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    href: "/shop?for=men",
  },
  {
    id: "women",
    label: "For Her",
    tag: "Feminine",
    count: "95+ Scents",
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80",
    href: "/shop?for=women",
  },
  {
    id: "unisex",
    label: "Unisex",
    tag: "Universal",
    count: "60+ Scents",
    image: "https://images.unsplash.com/photo-1615486171448-42f06742a783?w=800&q=80",
    href: "/shop?for=unisex",
  },
]

const containerVariants: import("motion/react").Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: import("motion/react").Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export default function ShopByCategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label="Shop By Category" subtitle="Find the perfect scent tailored to your style." />

        <motion.div
          className="mt-10 grid grid-cols-2 grid-rows-2 gap-3 px-3 sm:gap-4 md:mt-12 md:grid-cols-3 md:grid-rows-1 md:gap-6 md:px-6 lg:gap-8 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={cn(
                "h-full w-full",
                index === 0 ? "col-span-1 row-span-2 md:row-span-1" : "col-span-1 row-span-1"
              )}
            >
              <Link
                href={category.href}
                className={cn(
                  "group relative flex h-full w-full items-end overflow-hidden bg-black",
                  index === 0 ? "min-h-[280px] md:min-h-[500px]" : "min-h-[134px] md:min-h-[500px]"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    className="object-cover opacity-70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-90"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* Gradient overlay — heavier at bottom for text contrast */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Hover reveal: top-right arrow icon */}
                <div className="absolute top-3 right-3 z-30 flex size-8 items-center justify-center border border-white/0 bg-white/0 text-white/0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/40 group-hover:bg-white group-hover:text-black md:top-5 md:right-5 md:size-12">
                  <ArrowUpRight className="size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:size-5" weight="bold" />
                </div>

                {/* Content layer */}
                <div className="relative z-20 flex w-full flex-col gap-1 p-4 md:gap-3 md:p-8">
                  {/* Tag pill */}
                  <span className="w-fit border border-white/20 px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.2em] uppercase text-white/60 transition-colors duration-300 group-hover:border-white/40 group-hover:text-white/90 md:px-3 md:py-1 md:text-[0.65rem]">
                    {category.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-black uppercase leading-[0.9] tracking-tighter text-white transition-all duration-500",
                      index === 0
                        ? "text-3xl md:text-5xl lg:text-6xl"
                        : "text-xl md:text-5xl lg:text-6xl"
                    )}
                  >
                    {category.label}
                  </h3>

                  {/* Scent count — slides up on hover */}
                  <span className="translate-y-4 text-[0.6rem] font-semibold tracking-widest uppercase text-white/0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:text-white/60 md:text-xs">
                    {category.count}
                  </span>
                </div>

                {/* Bottom border accent — expands on hover */}
                <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] w-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

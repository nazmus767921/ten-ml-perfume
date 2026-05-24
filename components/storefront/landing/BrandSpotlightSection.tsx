"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "motion/react"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export default function BrandSpotlightSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F9F9F7] dark:bg-[#0a0a0a] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader 
          label="Brand Spotlight" 
          subtitle="Explore our curated collection of world-class perfumery."
          cta={{ text: "All Brands", href: "/shop" }}
        />

        <motion.div 
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {BRANDS_SPOTLIGHT.map((brand) => (
            <motion.div key={brand.id} variants={itemVariants} className="relative z-10 hover:z-50 group">
              <Link 
                href={`/shop?brands=${brand.slug}`}
                className="block rounded-full border border-black/5 bg-white/80 px-6 py-3 md:px-10 md:py-5 text-center text-lg md:text-2xl font-bold tracking-widest uppercase text-black/80 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black hover:shadow-xl dark:border-white/5 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {brand.name}
              </Link>

              {/* Floating Image Preview on Hover */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-6 h-56 w-44 -translate-x-1/2 -translate-y-4 scale-90 opacity-0 shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-100 group-hover:opacity-100 rounded-2xl overflow-hidden hidden md:block">
                <Image 
                  src={brand.previewImage} 
                  alt={`${brand.name} featured product`}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
                <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

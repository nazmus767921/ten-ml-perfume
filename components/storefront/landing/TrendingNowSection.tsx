"use client"

import { Product } from "@/components/storefront/products/types"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { motion } from "motion/react"
import { Flame } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const TRENDING_PRODUCTS: (Product & { rank: number })[] = [
  {
    id: "tr-1",
    rank: 1,
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 650,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "tr-2",
    rank: 2,
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 650,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "tr-3",
    rank: 3,
    name: "Aventus",
    brand: "Creed",
    price: 550,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 550 }],
  },
  {
    id: "tr-4",
    rank: 4,
    name: "Sauvage Elixir",
    brand: "Dior",
    price: 450,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 450 }],
  },
  {
    id: "tr-5",
    rank: 5,
    name: "Angels' Share",
    brand: "Kilian",
    price: 500,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 500 }],
  },
  {
    id: "tr-6",
    rank: 6,
    name: "Ombre Leather",
    brand: "Tom Ford",
    price: 420,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 420 }],
  },
  {
    id: "tr-7",
    rank: 7,
    name: "Jazz Club",
    brand: "Maison Margiela",
    price: 320,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 320 }],
  },
  {
    id: "tr-8",
    rank: 8,
    name: "Layton",
    brand: "Parfums de Marly",
    price: 480,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 480 }],
  },
]

export default function TrendingNowSection() {
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
        label={
          <span className="flex items-center gap-2">
            TRENDING NOW
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Flame className="size-6 text-orange-500 md:size-8" weight="fill" />
            </motion.div>
          </span>
        }
      />

      <motion.div 
        className="mx-auto grid w-full grid-cols-2 gap-x-4 gap-y-8 px-6 md:grid-cols-4 md:gap-x-6 md:gap-y-12 md:px-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {TRENDING_PRODUCTS.map((product) => (
          <motion.div key={product.id} variants={itemVariants} className="relative">
            <div className="absolute top-2 left-2 z-20 flex size-8 items-center justify-center rounded-full bg-white border-2 border-black font-black text-black shadow-lg md:size-10 md:text-lg">
              #{product.rank}
            </div>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

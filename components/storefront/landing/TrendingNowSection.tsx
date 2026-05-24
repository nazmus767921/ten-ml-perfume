"use client"

import { Product } from "@/components/storefront/products/types"
import { ProductCard } from "@/components/storefront/products/ProductCard"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { motion } from "motion/react"
import { Flame } from "@phosphor-icons/react"
import { getImageUrl } from "@/lib/getImageUrl"

const TRENDING_PRODUCTS: Product[] = [
  {
    id: "tr-1",
    name: "Oud Wood",
    brand: "Tom Ford",
    imageUrl: getImageUrl(),
    price: 650,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "tr-2",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    imageUrl: getImageUrl(),
    price: 650,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 650 }],
  },
  {
    id: "tr-3",
    name: "Aventus",
    brand: "Creed",
    imageUrl: getImageUrl(),
    price: 550,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 550 }],
  },
  {
    id: "tr-4",
    name: "Sauvage Elixir",
    brand: "Dior",
    imageUrl: getImageUrl(),
    price: 450,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 450 }],
  },
  {
    id: "tr-5",
    name: "Angels' Share",
    brand: "Kilian",
    imageUrl: getImageUrl(),
    price: 500,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 500 }],
  },
  {
    id: "tr-6",
    name: "Ombre Leather",
    brand: "Tom Ford",
    imageUrl: getImageUrl(),
    price: 420,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 420 }],
  },
  {
    id: "tr-7",
    name: "Jazz Club",
    brand: "Maison Margiela",
    imageUrl: getImageUrl(),
    price: 320,
    badge: "sales",
    mlVariants: [{ ml: 10, price: 320 }],
  },
  {
    id: "tr-8",
    name: "Layton",
    brand: "Parfums de Marly",
    imageUrl: getImageUrl(),
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  // Marquee string duplicated to ensure smooth looping
  const marqueeText = Array(10).fill("TRENDING • HOT • BESTSELLER •").join(" ")

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32 dark:bg-black/80">
      {/* Massive Background Marquee */}
      <div className="pointer-events-none absolute top-32 left-0 z-0 flex w-[200%] md:top-48">
        <div className="flex w-max" style={{ animation: "marquee 120s linear infinite" }}>
          <span className="font-sans text-[12rem] leading-none font-black tracking-tighter text-black/5 select-none md:text-[20rem] dark:text-white/5">
            {marqueeText}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          label={
            <span className="flex items-center gap-4">
              TRENDING NOW
              <Flame className="size-10 text-orange-500 md:size-16" weight="duotone" />
            </span>
          }
        />

        <motion.div
          className="mx-auto mt-12 grid w-full grid-cols-2 gap-x-2 gap-y-12 px-2 md:mt-16 md:grid-cols-4 md:gap-x-4 md:gap-y-16 md:px-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRENDING_PRODUCTS.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="group relative">
              {/* Subtle hover background for the grid item to feel editorial */}
              <div className="absolute -inset-2 -z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 md:-inset-4 dark:group-hover:bg-white/5" />
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { BUNDLES, Bundle } from "@/lib/data/bundles"
import { useCartStore } from "@/lib/stores/cart-store"
import { TakaFormatter } from "@/lib/utils"
import { ShoppingBagIcon } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { toast } from "sonner"

function BundleCard({ bundle, index }: { bundle: Bundle; index: number }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddBundle = () => {
    bundle.items.forEach((item) => {
      const variant = item.mlVariants?.[0]
      if (variant) {
        addItem({
          productId: item.id,
          name: item.name,
          imageUrl: bundle.coverImages[0],
          ml: variant.ml,
          price: variant.price,
        })
      }
    })
    toast.success(`${bundle.name} added to cart!`)
  }

  // Calculate savings
  const savings = Math.round(((bundle.totalOriginalPrice - bundle.bundlePrice) / bundle.totalOriginalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex w-[85vw] shrink-0 flex-col overflow-hidden bg-black text-white md:w-[450px]"
    >
      <div className="relative h-72 w-full overflow-hidden bg-zinc-950 p-6 md:h-80">
        {/* Save Tag */}
        <div className="absolute top-6 left-6 z-20 border border-white/20 bg-black/50 px-3 py-1 text-[0.65rem] font-black tracking-[0.2em] uppercase backdrop-blur-md">
          Save {savings}%
        </div>

        {/* Stacked Images Effect */}
        <div className="relative flex h-full w-full items-center justify-center">
          {bundle.coverImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ rotate: 0, x: 0 }}
              whileInView={{ rotate: idx === 0 ? -8 : 8, x: idx === 0 ? -15 : 15 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute aspect-3/4 w-[60%] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              style={{ zIndex: 10 - idx }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="Bundle item"
                className="h-full w-full border border-border/10 object-cover object-center transition-opacity duration-500 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="text-2xl font-black tracking-tighter uppercase md:text-3xl">{bundle.name}</h3>
        <p className="mt-2 text-sm font-medium tracking-wide text-white/50">{bundle.tagline}</p>

        <div className="my-8 flex-1 space-y-3">
          <p className="text-xs font-black tracking-widest text-white/40 uppercase">Includes</p>
          <ul className="space-y-2">
            {bundle.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                <span className="size-1 bg-white/40" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-white/20 pt-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-white/40 uppercase line-through">
              {TakaFormatter.format(bundle.totalOriginalPrice)}
            </span>
            <span className="text-xl font-black md:text-2xl">{TakaFormatter.format(bundle.bundlePrice)}</span>
          </div>
          <button
            onClick={handleAddBundle}
            className="group/btn flex items-center gap-2 border border-white bg-transparent px-5 py-3 text-xs font-black tracking-widest uppercase transition-all hover:bg-white hover:text-black"
          >
            <ShoppingBagIcon className="size-4" weight="bold" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function GiftBundlesSection() {
  return (
    <section className="border-t border-black py-16 md:py-24 dark:border-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-8">
        {/* Left Side: Header & CTA */}
        <SectionHeader
          label="Gift Sets"
          subtitle="Curated collections for the perfect present."
          cta={{ text: "Shop All", href: "/shop?category=bundles" }}
        />

        {/* Right Side: Horizontal Scroll */}
        <div className="w-full lg:w-2/3">
          <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:gap-8 md:px-10 lg:pl-0">
            {BUNDLES.map((bundle, idx) => (
              <div key={bundle.id} className="snap-center">
                <BundleCard bundle={bundle} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { BUNDLES, Bundle } from "@/lib/data/bundles"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { useCartStore } from "@/lib/stores/cart-store"
import { Button } from "@/components/ui/button"
import { ShoppingBagIcon } from "@phosphor-icons/react"
import { toast } from "sonner"
import { TakaFormatter } from "@/lib/utils"
import * as motion from "motion/react-client"

function BundleCard({ bundle }: { bundle: Bundle }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddBundle = () => {
    bundle.items.forEach((item) => {
      // Find the first available mlVariant or default to 10ml
      const variant = item.mlVariants?.[0]
      if (variant) {
        addItem({
          productId: item.id,
          name: item.name,
          imageUrl: bundle.coverImages[0], // using bundle image as fallback since item might not have one here
          ml: variant.ml,
          price: variant.price, // in a real app, this would be the discounted bundle price per item
        })
      }
    })
    toast.success(`${bundle.name} added to cart!`)
  }

  return (
    <div className="flex w-[85vw] flex-shrink-0 flex-col overflow-hidden bg-zinc-950 text-white md:w-[400px]">
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 p-6">
        {/* Stacked Images Effect */}
        <div className="relative h-full w-full">
          {bundle.coverImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ rotate: 0, x: 0 }}
              whileInView={{ rotate: idx === 0 ? -6 : 6, x: idx === 0 ? -10 : 10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute inset-0 mx-auto aspect-[4/5] w-3/4 overflow-hidden border border-white/10 shadow-xl"
              style={{ zIndex: 10 - idx }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="Bundle item" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-wide">{bundle.name}</h3>
        <p className="mt-1 text-sm text-white/50">{bundle.tagline}</p>

        <div className="my-6 flex-1 space-y-2">
          <p className="text-xs font-semibold tracking-widest text-white/40 uppercase">Includes:</p>
          <ul className="space-y-1">
            {bundle.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                <span className="size-1 bg-white/20" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-xs text-white/40 line-through">{TakaFormatter.format(bundle.totalOriginalPrice)}</p>
            <p className="text-lg font-bold">{TakaFormatter.format(bundle.bundlePrice)}</p>
          </div>
          <Button onClick={handleAddBundle} className="bg-white text-black hover:bg-white/90">
            <ShoppingBagIcon className="mr-2 size-4" />
            Add Bundle
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GiftBundlesSection() {
  return (
    <section className="py-16 md:py-24">
      <SectionHeader label="GIFT SETS & BUNDLES" subtitle="The Perfect Gift" />

      <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:px-10">
        {BUNDLES.map((bundle, idx) => (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="snap-center"
          >
            <BundleCard bundle={bundle} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

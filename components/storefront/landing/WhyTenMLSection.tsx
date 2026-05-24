"use client"

import { motion } from "motion/react"
import { ShieldCheck, Truck, ArrowCounterClockwise, Star } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Authentic Decants",
    description: "100% genuine, sourced directly",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Ships within 24 hours",
  },
  {
    icon: ArrowCounterClockwise,
    title: "Easy Returns",
    description: "Hassle-free 7-day returns",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Only top-rated fragrances",
  },
]

export default function WhyTenMLSection() {
  return (
    <section className="bg-foreground py-16 text-background md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group flex flex-col items-center text-center",
                  "md:border-background/10 md:border-r md:px-6 md:last:border-r-0"
                )}
              >
                <div className="mb-6 flex size-16 items-center justify-center bg-background/5 text-background transition-transform duration-500 ease-out group-hover:scale-110 group-hover:bg-background/10">
                  <Icon weight="duotone" className="size-8" />
                </div>
                <h3 className="mb-3 text-sm font-bold tracking-wider text-background uppercase">{pillar.title}</h3>
                <p className="mx-auto max-w-[200px] text-sm leading-relaxed text-background/60">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "motion/react"
import { ShieldCheckIcon, TruckIcon, ArrowCounterClockwiseIcon, StarIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const PILLARS = [
  {
    num: "01",
    icon: ShieldCheckIcon,
    title: "Authentic Decants",
    description: "100% genuine juice, sourced directly from original manufacturer bottles.",
  },
  {
    num: "02",
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Orders process within 24 hours. Delivered securely nationwide.",
  },
  {
    num: "03",
    icon: ArrowCounterClockwiseIcon,
    title: "Easy Returns",
    description: "Hassle-free 7-day returns if your item arrives damaged or incorrect.",
  },
  {
    num: "04",
    icon: StarIcon,
    title: "Premium Quality",
    description: "Curated selection of only the highest-rated designer and niche fragrances.",
  },
]

export default function WhyTenMLSection() {
  return (
    <section className="bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Brand Manifesto Header */}
        <div className="mb-20 flex flex-col items-start gap-4 md:mb-32">
          <h2 className="text-[clamp(3rem,8vw,6rem)] leading-[0.8] font-black tracking-tighter uppercase">
            The
            <br />
            Standard
          </h2>
          <p className="max-w-md text-sm font-medium tracking-widest text-background/60 uppercase">
            We don't compromise on quality. Every decant is guaranteed authentic, extracted with clinical precision.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="flex flex-col md:flex-row md:border-y md:border-background/20">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative flex flex-col justify-between py-12 md:flex-1 md:px-8 md:py-16 lg:px-12",
                  // Mobile horizontal dividers
                  "border-b border-background/20 last:border-b-0 md:border-b-0",
                  // Desktop vertical dividers
                  "md:border-r md:last:border-r-0"
                )}
              >
                {/* Massive Number Watermark */}
                <div className="absolute top-4 left-4 font-sans text-[8rem] leading-none font-black tracking-tighter text-background/[0.03] transition-colors duration-700 select-none group-hover:text-background/10 md:left-8 lg:text-[10rem]">
                  {pillar.num}
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Icon */}
                  <div className="flex size-12 items-center justify-center bg-background/5 text-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:bg-background/10 md:size-16">
                    <Icon weight="duotone" className="size-6 md:size-8" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-black tracking-widest text-background uppercase md:text-2xl">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed font-medium text-background/60">{pillar.description}</p>
                  </div>
                </div>

                {/* Animated Bottom Line on Hover */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-background transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

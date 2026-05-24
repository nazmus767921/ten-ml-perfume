"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import SectionHeader from "@/components/storefront/landing/SectionHeader"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { 
    id: "men",    
    label: "For Him",    
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80", 
    href: "/shop?for=men" 
  },
  { 
    id: "women",  
    label: "For Her",    
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80", 
    href: "/shop?for=women" 
  },
  { 
    id: "unisex", 
    label: "Unisex",     
    image: "https://images.unsplash.com/photo-1615486171448-42f06742a783?w=800&q=80", 
    href: "/shop?for=unisex" 
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
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // ease-ios-smooth equivalent
    },
  },
}

export default function ShopByCategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeader 
          label="Shop By Category" 
          subtitle="Find the perfect scent tailored to your style."
        />

        <motion.div 
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10 mt-10 md:mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants} className="h-full">
              <Link 
                href={category.href} 
                className="group relative flex h-[400px] md:h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl bg-black/5"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                {/* Dark gradient overlay (bottom-up) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />
                
                <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end p-8 text-center text-white">
                  <h3 className="mb-4 text-3xl font-bold tracking-wider uppercase drop-shadow-md">
                    {category.label}
                  </h3>
                  
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="translate-y-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 font-medium tracking-wide uppercase text-sm">
                      Shop Now
                    </span>
                    <ArrowRightIcon 
                      className="size-4 translate-y-8 translate-x-[-10px] opacity-0 transition-all duration-500 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" 
                      weight="bold"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

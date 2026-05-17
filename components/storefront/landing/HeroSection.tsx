

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { useState, useEffect, useCallback, useRef } from "react"

// ==========================================
// STATIC DATA CONFIGURATIONS
// ==========================================
const BRANDS = [
  { id: "01", name: "Lattafa" },
  { id: "02", name: "Afnan" },
  { id: "03", name: "Decant" },
  { id: "04", name: "Dior" },
  { id: "05", name: "Show All" },
]

const SLIDES = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb:
      "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=120&q=60",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=120&q=60",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb:
      "https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=120&q=60",
  },
]

const AUTOPLAY_DURATION = 4000

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function HeroSection() {
  const [active, setActive] = useState(0)
  const [activeBrand, setActiveBrand] = useState(0)
  // A "tick" counter that increments every time a slide becomes active.
  // Used as the key for the progress bar so it always remounts fresh.
  const [progressTick, setProgressTick] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Advance to the next slide
  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length)
  }, [])

  // Manual slide selection — jump to a specific index
  const selectSlide = useCallback((index: number) => {
    setActive(index)
  }, [])

  // Whenever `active` changes (autoplay OR manual), reset the timer and bump
  // the progress bar tick so the CSS animation restarts from zero.
  useEffect(() => {
    // Bump tick so SliderProgressBar remounts with a fresh animation
    setProgressTick((t) => t + 1)

    // Clear any pending autoplay timeout and schedule the next one
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(next, AUTOPLAY_DURATION)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [active, next])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="flex min-h-full w-full flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="relative z-10 flex w-full flex-col justify-between bg-white px-6 pt-8 pb-0 md:w-[42%] md:px-10">
          <HeroLogoHeader />

          <BrandList
            brands={BRANDS}
            activeBrand={activeBrand}
            onBrandSelect={setActiveBrand}
          />

          <MarqueeBar brands={BRANDS} />

          {/* progressTick is the key — forces a full remount on every slide change */}
          <SliderProgressBar progressTick={progressTick} duration={AUTOPLAY_DURATION} />
        </div>

        {/* RIGHT PANEL */}
        <ImageSlider
          slides={SLIDES}
          activeIndex={active}
          onSlideSelect={selectSlide}
        />
      </div>
    </section>
  )
}

// ==========================================
// ISOLATED SUBCOMPONENTS
// ==========================================

function HeroLogoHeader() {
  return (
    <div>
      <h1
        className="text-[clamp(4rem,10vw,7rem)] leading-none font-black tracking-tighter select-none"
        style={{ letterSpacing: "-0.03em" }}
      >
        10ML PERFUME
      </h1>
      <p className="mx-auto mt-3 max-w-55 text-center text-[0.6rem] leading-relaxed tracking-widest text-black/70 uppercase md:text-[0.65rem]">
        Premium international scents,
        <br />
        bottled locally
        <br />
        for everyday elegance
      </p>
    </div>
  )
}

interface BrandListProps {
  brands: typeof BRANDS
  activeBrand: number
  onBrandSelect: (index: number) => void
}

function BrandList({ brands, activeBrand, onBrandSelect }: BrandListProps) {
  return (
    <div className="mt-10 flex flex-1 flex-col justify-center md:mt-0">
      {brands.map((b, i) => (
        <button
          key={b.id}
          onMouseEnter={() => onBrandSelect(i)}
          onClick={() => onBrandSelect(i)}
          className="group relative flex w-full cursor-pointer items-center justify-between border-t border-black/10 py-4 text-left transition-all duration-200"
        >
          <span
            className={`text-sm font-semibold tracking-wider transition-colors duration-200 md:text-base ${
              activeBrand === i ? "text-black" : "text-black/60"
            }`}
          >
            {b.name}
          </span>
          <span className="text-[0.6rem] font-light text-black/40">{b.id}</span>
          <span
            className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ${
              activeBrand === i ? "w-full" : "w-0"
            }`}
          />
        </button>
      ))}
      <Button size={'lg'} className="py-6 uppercase text-lg lg:text-xl mt-6 hover:bg-primary/80">Find your perfect scent <ArrowRightIcon className="size-6 ms-4 animate-bounce" /></Button>
    </div>
  )
}

function MarqueeBar({ brands }: { brands: typeof BRANDS }) {
  // Create a duplicated array so the track has enough content to loop seamlessly
  const actualBrands = brands.slice(0, brands.length -1)
  const duplicatedBrands = [...actualBrands, ...actualBrands];

  return (
    <div className="relative -mx-6 mt-6 overflow-hidden bg-black py-3 md:-mx-10">
      <div
        className="flex gap-16 text-xs font-bold tracking-widest whitespace-nowrap text-white md:text-sm"
        style={{
          animation: "marquee 14s linear infinite",
          width: "max-content",
        }}
      >
        {duplicatedBrands.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-16">
            <span>{b.name}</span>
            <span className="text-white/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}


interface SliderProgressBarProps {
  progressTick: number
  duration: number
}

function SliderProgressBar({ progressTick, duration }: SliderProgressBarProps) {
  return (
    <div className="-mx-6 h-0.5 bg-black/10 md:-mx-10">
      {/*
        `key={progressTick}` forces React to unmount + remount this div on
        every slide change, restarting the CSS animation from 0% every time.
        `duration` drives the animation length so it always matches AUTOPLAY_DURATION.
      */}
      <div
        key={progressTick}
        className="h-full bg-black"
        style={{
          animation: `progress ${duration}ms linear forwards`,
        }}
      />
    </div>
  )
}

interface ImageSliderProps {
  slides: typeof SLIDES
  activeIndex: number
  onSlideSelect: (index: number) => void
}

function ImageSlider({ slides, activeIndex, onSlideSelect }: ImageSliderProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className="group/slider relative min-h-[60vw] flex-1 overflow-hidden bg-[#d9b8a7] md:min-h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isHovered ? "none" : "default" }}
    >
      {/* SLIDES */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: activeIndex === i ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={`slide ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* THUMBNAILS */}
      <div className="absolute right-4 bottom-6 z-20 flex gap-2 md:right-6">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSlideSelect(i)}
            style={{ cursor: "pointer" }}
            className={`h-10 w-10 overflow-hidden rounded-sm transition-all duration-300 md:h-12 md:w-12 ${
              activeIndex === i
                ? "opacity-100 ring-2 ring-black ring-offset-1"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.thumb} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* DYNAMIC CURSOR */}
      <div
        className="pointer-events-none absolute z-30 rounded-full transition-all duration-300 ease-out will-change-transform"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: isHovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
          boxShadow:
            "0 0 20px 6px rgba(255, 255, 255, 0.15), 0 0 40px 12px rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          className="h-6 w-6 rounded-full bg-white opacity-80 backdrop-blur-[1px]"
          style={{ mixBlendMode: "difference" }}
        />
      </div>
    </div>
  )
}

import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import React from "react"
import { Button } from "@/components/ui/button"

interface SectionHeaderProps {
  label: React.ReactNode
  subtitle?: React.ReactNode
  cta?: {
    text: string
    href: string
  }
}

export default function SectionHeader({ label, subtitle, cta }: SectionHeaderProps) {
  return (
    <div className="group relative mb-2 flex flex-col justify-between gap-6 border-b-[6px] border-current px-3 pb-6 md:mb-8 md:flex-row md:items-end md:px-6">
      <div className="absolute bottom-0 left-0 h-[6px] w-0 bg-current transition-all duration-700 ease-in-out group-hover:w-full" />
      <div className="relative z-10 flex flex-col gap-1 md:gap-2">
        <h2 className="leading-[0.9] font-black tracking-tighter uppercase" style={{ fontSize: "clamp(2.5rem, 6vw + 1rem, 6rem)" }}>
          {label}
        </h2>
        {subtitle && (
          <p className="mt-2 pl-1.5 text-[0.6rem] leading-relaxed tracking-widest text-black/70 uppercase md:text-[0.65rem]">{subtitle}</p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group mt-0 inline-flex w-fit items-center gap-4 border-2 border-black px-6 py-3 text-xs font-black tracking-widest uppercase transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
        >
          {cta.text}
          <ArrowRightIcon className="size-5 transition-transform group-hover/cta:translate-x-2" />
        </Link>
      )}
    </div>
  )
}

import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import React from "react"

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
    <div className="mb-10 flex flex-col items-center justify-between gap-4 md:mb-12 md:flex-row md:items-end px-6 md:px-10">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h2 className="text-2xl font-black tracking-widest uppercase md:text-3xl">{label}</h2>
        {subtitle && <p className="text-sm text-black/60">{subtitle}</p>}
      </div>
      {cta && (
        <Link 
          href={cta.href}
          className="group flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-colors hover:text-black/70"
        >
          {cta.text}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

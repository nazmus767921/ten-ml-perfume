"use client"

import { usePathname } from "next/navigation"
import AnnouncementBanner from "@/components/storefront/ui/AnnouncementBanner"
import type { BannerItem } from "@/components/storefront/ui/AnnouncementBanner"

type Props = {
  items: BannerItem[]
}

export default function CheckoutAwareBanner({ items }: Props) {
  const pathname = usePathname()
  if (pathname.startsWith("/checkout")) return null
  return <AnnouncementBanner items={items} speed={30} pauseOnHover={true} />
}

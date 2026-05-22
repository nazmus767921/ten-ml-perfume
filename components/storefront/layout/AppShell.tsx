import ConditionalFooter from "@/components/storefront/layout/ConditionalFooter"
import NavBar from "@/components/storefront/layout/NavBar"
import CheckoutAwareBanner from "@/components/storefront/layout/CheckoutAwareBanner"
import { ReactNode } from "react"
import type { BannerItem } from "@/components/storefront/ui/AnnouncementBanner"

// Mock function representing your backend API fetch
async function getBannerData(): Promise<BannerItem[]> {
  return [
    {
      id: 1,
      badge: "New",
      text: "Next.js 16 Support is officially live! Check out the deployment logs.",
      link: "/blog/nextjs-16",
    },
    {
      id: 2,
      badge: "Event",
      text: "Join our global developer keynote on June 24th. Reserve your virtual seat.",
      link: "/events/keynote-2026",
    },
    {
      id: 3,
      badge: "Update",
      text: "v2.4.0 brings 10x faster bundle compilation speeds.",
      link: "/docs/changelog",
    },
  ]
}

type Props = {
  children?: ReactNode
}

export default async function AppShell({ children }: Props) {
  const bannerItems = await getBannerData()

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-99">
        <CheckoutAwareBanner items={bannerItems} />
        <NavBar />
      </div>
      {/* Spacer */}
      <div className="h-[calc(var(--navbar-height)+var(--announcement-banner-height))] w-full" />
      {children}
      <ConditionalFooter />
    </>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { HouseIcon, ShoppingBagIcon, HeartIcon, GearSixIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SIDEBAR_ITEMS = [
  { icon: <HouseIcon className="size-5" />, label: "Overview", href: "/account" },
  { icon: <ShoppingBagIcon className="size-5" />, label: "Orders", href: "/account/orders" },
  { icon: <HeartIcon className="size-5" />, label: "Wishlist", href: "/account/wishlist" },
  { icon: <GearSixIcon className="size-5" />, label: "Settings", href: "/account/settings" },
]

const isItemActive = (href: string, pathname: string) => (href === "/account" ? pathname === "/account" : pathname.startsWith(href))

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav aria-label="Account navigation" className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
        <h2 className="mb-4 px-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">My Account</h2>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = isItemActive(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-none px-3 py-2.5 text-sm transition-colors duration-200",
                isActive ? "bg-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile nav */}
      <nav aria-label="Account pages" className="no-scrollbar flex overflow-x-auto border-b border-border lg:hidden">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = isItemActive(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-colors duration-200",
                isActive ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

"use client"

import { TapButton } from "@/components/storefront/ui/TapButton"
import { cn } from "@/lib/utils"
import {
  ListIcon,
  MagnifyingGlassIcon,
  ShoppingCartSimpleIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

const NAV_ACTION_BUTTONS = [
  {
    icon: <MagnifyingGlassIcon />,
    href: "#",
  },
  {
    icon: <UserIcon />,
    href: "#",
  },
  {
    icon: <ShoppingCartSimpleIcon />,
    href: "#",
  },
]

const MENU_LINK_ITEMS = [
  {
    text: "home",
    href: "/",
  },
  {
    text: "shop all",
    href: "/shop",
  },
  {
    text: "Men",
    href: "/men",
  },
  {
    text: "women",
    href: "/women",
  },
  {
    text: "Trending",
    href: "/shop?trend='trending'",
  },
]

const MenuOverlay = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <section
      className={cn(
        "fixed inset-0 bg-primary",
        open ? "visible flex" : "invisible hidden"
      )}
    >
      {/* Close Button */}
      <TapButton
        className="fixed top-6 right-4 z-100 text-primary-foreground lg:right-7"
        onClick={onClose}
      >
        <XIcon strokeWidth={2} className="size-8" />
      </TapButton>

      {/* Menu Links */}
      <section className="flex w-full flex-1 flex-col items-center justify-center pt-12 lg:pt-20">
        {MENU_LINK_ITEMS.map((item) => {
          return (
            <TapButton
              className="w-full py-10 text-2xl text-primary-foreground uppercase"
              size={"lg"}
              asChild
            >
              <Link href={item.href}>{item.text}</Link>
            </TapButton>
          )
        })}
      </section>
    </section>
  )
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <TapButton onClick={handleOpen}>
        <ListIcon />
      </TapButton>

      <MenuOverlay open={isOpen} onClose={handleClose} />
    </>
  )
}

export default function NavBar() {
  return (
    <div>
      <nav className="fixed z-99 inset-x-0 top-0 w-full border-b border-border bg-background">
        <div className="flex h-(--navbar-height) w-full flex-1 items-center px-3 lg:px-8">
          <div className="flex flex-1 items-center justify-start">
            <Menu />
          </div>
          <div className="">10ML</div>
          <div className="flex flex-1 items-center justify-end">
            {NAV_ACTION_BUTTONS.map((item) => (
              <TapButton>{item.icon}</TapButton>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-(--navbar-height) w-full" />
    </div>
  )
}

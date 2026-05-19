"use client"

import Logo from "@/components/storefront/ui/Logo"
import { TapButton } from "@/components/storefront/ui/TapButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  HandSoapIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PhosphorLogoIcon,
  ShoppingCartSimpleIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

const NAV_ACTION_BUTTONS = [
  {
    icon: <MagnifyingGlassIcon className="size-5" />,
    href: "#",
  },
  {
    icon: <UserIcon className="size-5" />,
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
  onTap,
}: {
  open: boolean
  onTap?: () => void
  onClose?: () => void
}) => {
  return (
    <section
      className={cn(
        "fixed z-10 inset-0 min-h-[calc(100svh+3.5rem)] bg-primary",
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
              onClick={onTap}
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

      <MenuOverlay open={isOpen} onClose={handleClose} onTap={handleClose} />
    </>
  )
}

const CartButton = () => {
  const totalItems = 20

  return (
    <Link href={"/cart"}>
      <div className="relative z-1">
        <Badge className="absolute z-1 top-1 right-1 aspect-square rounded-full text-[0.6rem] ring-2 ring-primary outline outline-background">
          {totalItems}
        </Badge>
        <TapButton>
          <ShoppingCartSimpleIcon className="size-5" />
        </TapButton>
      </div>
    </Link>
  )
}

export default function NavBar() {
  return (
    <div>
      <nav className="w-full border-b border-border bg-background">
        <div className="flex h-(--navbar-height) w-full flex-1 items-center px-3 lg:px-8">
          <div className="flex flex-1 items-center justify-start">
            <Menu />
          </div>
          <Button variant={"none"} asChild>
            <Link href={"/"}>
              <Logo />
            </Link>
          </Button>
          <div className="flex flex-1 items-center justify-end">
            {NAV_ACTION_BUTTONS.map((item) => (
              <TapButton asChild>
                <Link href={item.href}>{item.icon}</Link>
              </TapButton>
            ))}
            <CartButton />
          </div>
        </div>
      </nav>

     
    </div>
  )
}

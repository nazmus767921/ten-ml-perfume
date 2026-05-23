"use client"

import Logo from "@/components/storefront/ui/Logo"
import { TapButton } from "@/components/storefront/ui/TapButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cart-store"
import { SearchModal } from "@/components/storefront/search/SearchModal"
import { ListIcon, ShoppingCartSimpleIcon, UserIcon, XIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

const NAV_ACTION_BUTTONS = [
  {
    icon: <UserIcon className="size-5" />,
    href: "/account",
    ariaLabel: "Account",
  },
]

const MENU_LINK_ITEMS = [
  { text: "home", href: "/" },
  { text: "shop all", href: "/shop" },
  { text: "Men", href: "/men" },
  { text: "women", href: "/women" },
  { text: "Trending", href: "/shop?trend='trending'" },
]

const MenuOverlay = ({ open, onClose, onTap, pathname }: { open: boolean; onTap?: () => void; onClose?: () => void; pathname?: string }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          key="menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col bg-primary"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape" && onClose) {
              onClose()
            }
          }}
          tabIndex={-1}
        >
          <motion.div
            className="fixed top-6 right-4 z-100 text-primary-foreground lg:right-7"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <TapButton aria-label="Close menu" onClick={onClose} autoFocus>
              <XIcon strokeWidth={2} className="size-8" />
            </TapButton>
          </motion.div>

          <motion.section
            className="flex w-full flex-1 flex-col items-center justify-center pt-12 lg:pt-20"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {MENU_LINK_ITEMS.map((item) => {
              const linkPath = item.href.split("?")[0]
              const isActive = linkPath === "/" ? pathname === "/" : pathname?.startsWith(linkPath)

              return (
                <motion.div
                  key={item.text}
                  className="w-full"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TapButton
                    className={cn(
                      "w-full py-10 text-2xl text-primary-foreground uppercase md:py-16",
                      isActive && "underline decoration-2 underline-offset-8"
                    )}
                    size="lg"
                    asChild
                    onClick={onTap}
                  >
                    <Link href={item.href}>{item.text}</Link>
                  </TapButton>
                </motion.div>
              )
            })}
          </motion.section>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

const Menu = ({ pathname }: { pathname?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <TapButton aria-label="Open menu" aria-expanded={isOpen} onClick={handleOpen}>
        <ListIcon />
      </TapButton>

      <MenuOverlay open={isOpen} onClose={handleClose} onTap={handleClose} pathname={pathname} />
    </>
  )
}

const CartButton = () => {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <Link href="/cart">
      <div className="relative z-1">
        <Badge className="absolute top-1 right-1 z-1 aspect-square rounded-full text-[0.6rem] ring-2 ring-primary outline outline-background">
          {totalItems}
        </Badge>
        <TapButton aria-label={`View cart, ${totalItems} items`}>
          <ShoppingCartSimpleIcon className="size-5" />
        </TapButton>
      </div>
    </Link>
  )
}

const BottomNavBar = () => {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollUp = currentScrollY < lastScrollY.current

      if (scrollUp) {
        setIsVisible(true)
      } else if (currentScrollY > 50) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/account")) return null

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 120 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 shadow-lg shadow-black/20">
        <SearchModal />
        <TapButton key="account" asChild aria-label="Account" className="text-primary-foreground">
          <Link href="/account">
            <UserIcon className="size-5" />
          </Link>
        </TapButton>
        <div className="h-5 w-px bg-primary-foreground/20" />
        <Link href="/cart">
          <div className="relative">
            {totalItems > 0 && (
              <Badge className="absolute top-2 right-1 z-1 flex aspect-square h-4.5 min-w-[18px] items-center justify-center rounded-full bg-primary-foreground px-1 text-[0.55rem] text-primary ring-3">
                {totalItems}
              </Badge>
            )}
            <TapButton aria-label={`View cart, ${totalItems} items`} className="text-primary-foreground">
              <ShoppingCartSimpleIcon className="size-5" />
            </TapButton>
          </div>
        </Link>
      </div>
    </motion.nav>
  )
}

export default function NavBar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "grid h-(--navbar-height) w-full grid-cols-[1fr_auto_1fr] items-center border-b border-border bg-background px-3 transition-shadow duration-300 lg:px-8",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="flex items-center justify-self-start">
          <Menu pathname={pathname} />
        </div>

        <Link href="/" className="flex items-center justify-center" aria-label="Home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 justify-self-end lg:flex">
          <SearchModal />
          {NAV_ACTION_BUTTONS.map((item) => (
            <TapButton key={item.ariaLabel} asChild aria-label={item.ariaLabel}>
              <Link href={item.href}>{item.icon}</Link>
            </TapButton>
          ))}
          <CartButton />
        </div>
      </nav>
      <BottomNavBar />
    </>
  )
}

import Logo from "@/components/storefront/ui/Logo"
import Link from "next/link"
import { FacebookLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react/dist/ssr"

const SOCIAL_LINKS = [
  { icon: <FacebookLogoIcon size={24} />, href: "#", label: "Facebook" },
  { icon: <InstagramLogoIcon size={24} />, href: "#", label: "Instagram" },
  { icon: <TwitterLogoIcon size={24} />, href: "#", label: "Twitter" },
]

const TERMS_LINKS = [
  { text: "Privacy Policy", href: "/privacy" },
  { text: "Terms of Service", href: "/terms" },
  { text: "Shipping & Returns", href: "/shipping" },
  { text: "Contact", href: "/contact" },
  { text: "My Account", href: "/account" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="px-3 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium fragrance decants — explore iconic scents without the commitment. Every bottle, a new discovery.
            </p>
            <p className="text-xs text-muted-foreground">123 Fragrance Lane, Dhaka 1205, Bangladesh</p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h3 className="text-xs font-semibold tracking-widest text-foreground uppercase">Connect</h3>
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  aria-label={label}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h3 className="text-xs font-semibold tracking-widest text-foreground uppercase">Legal</h3>
            <ul className="flex flex-col items-center gap-2 lg:items-start">
              {TERMS_LINKS.map(({ text, href }) => (
                <li key={text}>
                  <Link href={href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-3 py-4 lg:px-8">
        <p className="text-center text-xs text-muted-foreground lg:text-left">&copy; {currentYear} 10ML Perfume. All rights reserved.</p>
      </div>
    </footer>
  )
}

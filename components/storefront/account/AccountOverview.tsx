"use client"

import { useUserStore } from "@/lib/stores/user-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBagIcon, HeartIcon } from "@phosphor-icons/react"
import Link from "next/link"

export default function AccountOverview() {
  const user = useUserStore((s) => s.user)
  const wishlist = useUserStore((s) => s.wishlist)

  if (!user) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/account/orders">
          <Card className="transition-colors duration-200 hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBagIcon className="size-4" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">View order history</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="transition-colors duration-200 hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="size-4" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{wishlist.length}</p>
              <p className="text-xs text-muted-foreground">Saved items</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Separator />

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-widest uppercase text-muted-foreground">Profile</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-20 text-muted-foreground">Phone</span>
            <span className="font-medium">{user.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/stores/user-store"

export default function LoginPage() {
  const login = useUserStore((s) => s.login)
  const router = useRouter()

  useEffect(() => {
    login()
    router.push("/account")
  }, [login, router])

  return (
    <div className="flex min-h-(--page-height-safe) items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing in...</p>
    </div>
  )
}

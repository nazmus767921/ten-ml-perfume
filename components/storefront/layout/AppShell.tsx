import NavBar from "@/components/storefront/layout/NavBar"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}

export default function AppShell({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

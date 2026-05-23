import AccountSidebar from "@/components/storefront/account/AccountSidebar"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-(--page-height-safe) w-full max-w-7xl flex-col gap-6 px-3 py-6 lg:flex-row lg:px-8 lg:py-10">
      <AccountSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </section>
  )
}

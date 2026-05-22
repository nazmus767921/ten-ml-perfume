"use client"

import PageTitle from "@/components/storefront/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCartIcon } from "@phosphor-icons/react"

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-muted-foreground/10 ${className ?? ""}`}
    />
  )
}

export default function CartPageSkeleton() {
  return (
    <section className="container mx-auto flex min-h-(--page-height-safe) flex-col pb-4 lg:pt-4 lg:pb-8">
      <div className="px-3">
        <PageTitle
          icon={<ShoppingCartIcon />}
          title="Cart"
          subtitle="Thank you for choosing our service"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-8 lg:flex-row lg:gap-16">
        <div className="flex w-full max-w-xl flex-col gap-4 px-3 lg:px-0">
            {[0, 1, 2].map((n) => (
            <div key={`sk-item-${n}`} className="flex items-center gap-4 py-4">
              <Pulse className="size-20 shrink-0" />
              <div className="flex flex-1 flex-col gap-2">
                <Pulse className="h-4 w-3/5" />
                <Pulse className="h-3 w-1/4" />
                <Pulse className="h-3 w-1/6" />
              </div>
              <Pulse className="h-8 w-20" />
            </div>
          ))}
        </div>
        <div className="w-full px-3 lg:w-auto lg:px-0">
          <Card className="w-full max-w-xl bg-background/80 backdrop-blur-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-bold">
                <Pulse className="h-5 w-32" />
                <Pulse className="size-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Pulse className="h-3 w-full" />
                <Pulse className="h-3 w-3/4" />
                <Pulse className="h-1.5 w-full" />
                <Pulse className="my-1 h-px w-full" />
                <Pulse className="h-5 w-2/3" />
                <Pulse className="mx-auto h-3 w-28" />
                <Pulse className="h-10 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

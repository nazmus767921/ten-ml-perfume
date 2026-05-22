"use client"

import { CreditCard, Money } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/lib/types/order"

interface PaymentMethodSelectorProps {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

const METHODS: {
  value: PaymentMethod
  label: string
  icon: typeof CreditCard
  subtitle: string
}[] = [
  {
    value: "sslcommerz",
    label: "Pay Online",
    icon: CreditCard,
    subtitle: "Visa, Mastercard, bKash, Nagad",
  },
  {
    value: "cod",
    label: "Cash on Delivery",
    icon: Money,
    subtitle: "Pay when you receive",
  },
]

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {METHODS.map((method) => {
        const selected = value === method.value
        const Icon = method.icon

        return (
          <button
            key={method.value}
            type="button"
            onClick={() => onChange(method.value)}
            className={cn(
              "flex items-start gap-3 rounded-none border p-4 text-left transition-all",
              selected
                ? "border-primary bg-primary/5"
                : "border-input hover:border-ring",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 size-5 shrink-0",
                selected ? "text-primary" : "text-muted-foreground",
              )}
            />
            <div>
              <span
                className={cn(
                  "block text-sm font-medium",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {method.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {method.subtitle}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

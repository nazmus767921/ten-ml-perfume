import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface TakaFormatOptions {
  /** Specify whether to use the symbol (৳) or currency code (BDT). Default: 'symbol' */
  displayType?: "symbol" | "code"
  /** Include paisa/decimals. Default: false */
  decimals?: boolean
  /** Number of spaces to put after the prefix. Default: 0 */
  symbolPadding?: number
  /** Compact notation for large numbers (e.g., BDT10L or ৳1Cr). Default: false */
  compact?: boolean
}

export const TakaFormatter = {
  format(amount: number, options: TakaFormatOptions = {}): string {
    const { displayType = "code", decimals = false, symbolPadding = 1, compact = false } = options

    if (isNaN(amount) || amount === null) {
      return displayType === "symbol" ? "৳0" : "BDT0"
    }

    const formatter = new Intl.NumberFormat("en-BD", {
      notation: compact ? "compact" : "standard",
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0,
    })

    const formattedNumber = formatter.format(Math.abs(amount))
    const prefixToken = displayType === "code" ? "BDT" : "৳"

    const padding = " ".repeat(symbolPadding)
    const prefix = `${prefixToken}${padding}`
    const sign = amount < 0 ? "-" : ""

    return `${sign}${prefix}${formattedNumber}`
  },
  parse(takaString: string): number {
    // Strips out BDT, ৳, commas, and whitespace
    const cleaned = takaString.replace(/(BDT|৳|,\s*|\s+)/g, "")
    return parseFloat(cleaned) || 0
  },
}

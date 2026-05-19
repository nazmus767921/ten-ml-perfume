import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function PageTitle({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string
  subtitle?: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col">
      <span
        className={cn(
          "mt-3 flex items-center text-3xl font-bold uppercase",
          className
        )}
      >
        {icon && <span className="mr-1">{icon}</span>} {title}
      </span>
      {subtitle ? (
        <span className="text-xs text-muted-foreground/80">{subtitle}</span>
      ) : null}
    </div>
  )
}

import { PropsWithChildren, ReactNode } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

type FilterSectionWrapperProps = PropsWithChildren<{
  title: string
  collapsible?: boolean
  action?: ReactNode
}>

export default function FilterSectionWrapper({
  title,
  collapsible = false,
  action,
  children,
}: FilterSectionWrapperProps) {
  if (!collapsible) {
    return (
      <div className="w-full">
        <div className="flex flex-1 w-full items-center">
            <h4 className="flex-1 text-base font-bold tracking-wide">{title}</h4>
            {action && action}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Collapsible className="group flex w-full flex-col gap-2" defaultOpen>
        <CollapsibleTrigger asChild>
          <div className="flex w-full cursor-pointer items-center select-none">
            <h4 className="flex-1 text-base font-bold tracking-wide">
              {title}
            </h4>
            <CaretDownIcon className="size-4 shrink-0 transition-transform duration-200 ease-ios-spring group-data-[state=open]:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2">
          <div>{children}</div>
          {action && <div className="w-full">
            {action}
          </div>}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

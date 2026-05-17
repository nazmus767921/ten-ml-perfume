import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

export const TapButton = ({ children, size, ...props }: ComponentProps<typeof Button>) => {
  return (
    <Button variant={"ghost"} size={ size ? size: "icon-lg"} {...props}>
      {children}
    </Button>
  )
}
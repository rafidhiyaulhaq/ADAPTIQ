import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef(({ className, variant = "primary", ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#1428A0] to-[#0075C9] text-white hover:opacity-90",
    secondary: "bg-white border-2 border-[#1428A0] text-[#1428A0] hover:bg-[#1428A0]/5",
    ghost: "hover:bg-gray-100 text-gray-600"
  }

  return (
    <button
      ref={ref}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
      ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
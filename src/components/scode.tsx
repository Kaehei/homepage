import React from "react"
import { cn } from "@/lib/utils"

type ScodeType = "warning" | "info" | "success" | "destructive"
type ScodeSize = "sm" | "md" | "lg"

interface ScodeProps {
  children: React.ReactNode
  type?: ScodeType
  size?: ScodeSize
}

const typeStyles: Record<ScodeType, string> = {
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-900 dark:text-yellow-200",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-900 dark:text-blue-200",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-900 dark:text-green-200",
  destructive: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-900 dark:text-red-200"
}

const sizeStyles: Record<ScodeSize, string> = {
  sm: "text-sm py-2 px-3",
  md: "text-base py-3 px-4",
  lg: "text-lg py-4 px-5"
}

export default function Scode({ children, type = "info", size = "md" }: ScodeProps) {
  return (
    <div className={cn(
      "rounded-lg border my-4",
      typeStyles[type],
      sizeStyles[size]
    )}>
      {children}
    </div>
  )
} 
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all duration-400 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-0 left-0 h-full w-64 z-50 flex flex-col bg-background shadow-2xl transition-all duration-400 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left md:hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between p-4">
        <span className="font-bold text-lg"></span>
        <DrawerClose asChild>
          <button
            className="rounded-md p-2 hover:bg-accent focus:outline-none focus:ring-2 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </DrawerClose>
      </div>
      <div className="flex-1 flex flex-col px-6 py-8 space-y-6">{children}</div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DrawerContent.displayName = "DrawerContent"

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent } 
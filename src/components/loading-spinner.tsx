'use client'

import { RollingText } from '@/components/ui/rolling-text'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-48 text-center">
        <RollingText
          texts={["Loading...", "Initializing...", "Thinking...", "Rendering...", "Just a moment..."]}
          className="text-lg font-medium text-muted-foreground font-mono"
          duration={1.2}
        />
      </div>
    </div>
  )
} 
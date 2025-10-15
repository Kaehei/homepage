'use client'

import { motion } from 'framer-motion'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export default function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-lg border bg-card ${className}`}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
    >
      {children}
    </motion.div>
  )
} 
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.button
      className="fixed bottom-6 right-6 w-8 h-8 bg-background border flex items-center justify-center hover:bg-muted transition-colors text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: showScrollTop ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </motion.button>
  )
} 
'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Hero from '@/components/hero'
import { StarsBackground } from "@/components/ui/stars-background"
import { motion } from "framer-motion"
import Footer from '@/components/footer'

const smoothEase = [0.25, 0.1, 0.25, 1.0] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    }
  }
};

// Button animation variants
const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    }
  }
};

export default function Home() {
  return (
    <StarsBackground className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        <Hero />
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={buttonVariants}>
            <Link href="/photo">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: smoothEase }}
              >
                <Button variant="outline" className="px-6 text-base">Gallery</Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Link href="/blog">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: smoothEase }}
              >
                <Button variant="outline" className="px-6 text-base">Blog</Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </StarsBackground>
  )
}


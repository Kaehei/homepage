'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Hero from '@/components/hero'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* 背景动效 */}
      <div className="absolute inset-0 -z-10">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />

        {/* 浮动几何图形 */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 dark:bg-purple-800/20 rounded-lg blur-xl rotate-45"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-pink-200/30 dark:bg-pink-800/20 rounded-full blur-lg"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-8 h-8 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-lg"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <motion.div
          className="absolute bottom-20 right-10 w-14 h-14 bg-yellow-200/30 dark:bg-yellow-800/20 rounded-lg blur-xl"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* 微妙的粒子效果 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        <Hero />
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/photo">
            <Button variant="outline" className="px-6 text-base">Gallery</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="px-6 text-base">Blog</Button>
          </Link>
        </div>
      </main>
      <footer className="py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Kaehei"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Yang
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/Kaehei/homepage"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}

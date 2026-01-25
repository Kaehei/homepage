'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Hero from '@/components/hero'
import { StarsBackground } from "@/components/ui/stars-background"

export default function Home() {
  return (
    <StarsBackground className="flex min-h-screen flex-col">
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
      <footer className="py-6 md:py-0 relative z-10">
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
    </StarsBackground>
  )
}

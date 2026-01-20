'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from './ui/animate/scroll-reveal'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Calendar, User, Clock } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image?: string | null
  author?: string
  readTime?: number
  slug?: string
  tags?: { name: string }[]
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      {posts.map((post, index) => (
        <ScrollReveal key={post.id} delay={index * 0.05} width="full">
          <Link href={`/blog/${post.id}`} className="group block">
            <motion.article
              className="flex flex-col gap-2 md:gap-3 relative py-5 md:py-6 border-b border-border/40 transition-all duration-500 hover:opacity-80"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-2 md:gap-3 items-center text-[10px] md:text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.15em] mb-1 md:mb-2 font-mono">
                <span className="flex items-center gap-1.5">
                  {post.date}
                </span>
                {post.readTime && (
                  <>
                    <span className="opacity-30">/</span>
                    <span className="flex items-center gap-1.5">
                      {post.readTime} MIN READ
                    </span>
                  </>
                )}
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="opacity-30">/</span>
                    <span className="text-primary/60 group-hover:text-primary transition-colors duration-300">{post.tags[0].name}</span>
                  </>
                )}
              </div>

              <h2 className="text-xl md:text-3xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300 leading-tight">
                {post.title}
              </h2>

              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 font-light">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-primary pt-1 md:pt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                <span>Read Story</span>
                <span className="text-lg leading-none">→</span>
              </div>
            </motion.article>


          </Link>
        </ScrollReveal>
      ))}
    </div>
  )
}
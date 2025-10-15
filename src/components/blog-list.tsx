'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-6"
    >
      {posts.map((post) => (
        <motion.article
          key={post.id}
          variants={itemVariants}
          className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
          <time className="text-sm text-gray-500">{post.date}</time>
        </motion.article>
      ))}
    </motion.div>
  )
} 
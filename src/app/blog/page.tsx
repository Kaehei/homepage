'use client'
import { useEffect, useState, useRef } from 'react'
import BlogList from '@/components/blog-list'
import { motion } from 'framer-motion'
import LoadingSpinner from "@/components/loading-spinner"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Post {
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

const PAGE_SIZE = 10

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 假设后端返回总数（如 data.total），否则可用 hasMore 逻辑估算最大页数
  const [total, setTotal] = useState(0)

  // 计算阅读时长
  const getReadTime = (text: string) => {
    const words = text.replace(/<[^>]+>/g, '').length
    return Math.max(1, Math.round(words / 300))
  }

  useEffect(() => {
    setLoading(true)
    fetch(`https://blog.kaeshi.top/api/posts?page=${page}&pageSize=${PAGE_SIZE}`)
      .then(res => res.json())
      .then(data => {
        const newPosts = (data.data || []).map((item: any) => {
          const plainText = item.text.replace(/<[^>]+>/g, '')
          return {
            id: String(item.cid),
            title: item.title,
            // Extract first image from thumb array if available
            image: item.thumb?.[0]?.str_value || null,
            excerpt: plainText.slice(0, 140) + '...',
            date: new Date(Number(item.created) * 1000).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            author: item.author?.[0]?.screenName || 'Yang',
            readTime: getReadTime(item.text),
            tags: item.tag,
            slug: item.slug
          }
        })
        setPosts(newPosts)
        setHasMore(newPosts.length === PAGE_SIZE)
        setLoading(false)
        if (typeof data.total === 'number') setTotal(data.total)
      })
  }, [page])

  // 计算最大页数
  const maxPage = total ? Math.ceil(total / PAGE_SIZE) : (hasMore ? page + 1 : page)

  // 页码渲染（最多显示5个页码，前后省略号）
  const renderPagination = () => {
    if (maxPage <= 1) return null
    let pages: (number | string)[] = []
    if (maxPage <= 5) {
      pages = Array.from({ length: maxPage }, (_, i) => i + 1)
    } else {
      if (page <= 3) {
        pages = [1, 2, 3, 4, '...', maxPage]
      } else if (page >= maxPage - 2) {
        pages = [1, '...', maxPage - 3, maxPage - 2, maxPage - 1, maxPage]
      } else {
        pages = [1, '...', page - 1, page, page + 1, '...', maxPage]
      }
    }
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          {pages.map((p, i) =>
            typeof p === 'number' ? (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => setPage(p)}
                  isActive={p === page}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(p => p + 1)}
              className={(page === maxPage || !hasMore) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container max-w-4xl mx-auto py-12 md:py-20 px-4">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-xl font-light">
              我的一些碎碎念...
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <BlogList posts={posts} />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            {renderPagination()}
          </motion.div>
        </section>
      </main>
      <motion.footer
        className="py-6 md:py-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
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
      </motion.footer>
    </div>
  )
}
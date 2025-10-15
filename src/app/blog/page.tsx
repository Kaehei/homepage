'use client'
  import { useEffect, useState, useRef } from 'react'
  import Link from 'next/link'
  import { Navbar } from "@/components/navbar"
  import { motion, useInView } from 'framer-motion'
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
    cid: number
    title: string
    text: string
    created: number
    author: { screenName: string }
    tag?: { name: string }[]
    directory?: string
  }

  const PAGE_SIZE = 10

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 }
  }

  export default function BlogListPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })

    // 假设后端返回总数（如 data.total），否则可用 hasMore 逻辑估算最大页数
    const [total, setTotal] = useState(0)
    useEffect(() => {
      setLoading(true)
      fetch(`https://blog.kaeshi.top/api/posts?page=${page}&pageSize=${PAGE_SIZE}`)
        .then(res => res.json())
        .then(data => {
          const newPosts = (data.data || []).map((item: any) => ({
            ...item,
            created: Number(item.created),
            author: { screenName: item.author?.[0]?.screenName || '' },
          }))
          setPosts(newPosts)
          setHasMore(newPosts.length === PAGE_SIZE)
          setLoading(false)
          // 如果后端有 total 字段
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

    // 计算阅读时长
    const getReadTime = (text: string) => {
      const words = text.replace(/<[^>]+>/g, '').length
      return Math.max(1, Math.round(words / 300))
    }

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="container max-w-2xl mx-auto py-12 md:py-20">
            <motion.div 
              className="mx-auto flex flex-col items-center space-y-4 text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl md:text-6xl font-bold">Blog</h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                我的一些碎碎念...
              </p>
            </motion.div>
            <motion.div 
              ref={containerRef} 
              className="flex flex-col gap-6"
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoadingSpinner />
                </motion.div>
              ) : (
                posts.map((post, idx) => (
                  <motion.div
                    key={post.cid}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
                    className="group bg-card rounded-lg border shadow-sm px-6 py-5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tag && post.tag.map((t, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.cid}`}>
                      <h2 
                        className="text-xl font-bold mb-1 group-hover:text-primary group-hover:underline transition-colors"
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
                      <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>by {post.author.screenName}</span>
                      <span>·</span>
                    <span>{post.directory}</span>
                    <span>·</span>
                    <span>{getReadTime(post.text)} 分钟阅读</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.text.replace(/<[^>]+>/g, '').slice(0, 80)}...
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
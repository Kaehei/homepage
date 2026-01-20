"use client"

import { useEffect, useState } from "react"
/* removed import */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import LoadingSpinner from "@/components/loading-spinner"

interface Post {
  cid: number
  title: string
  text: string
  created: number
  author: { screenName: string }
  tag?: { name: string }[]
  directory?: string
}

type GroupedPosts = {
  [key: string]: Post[]
}

const groupByTimeline = (posts: Post[]): GroupedPosts => {
  const groups: GroupedPosts = {}
  posts.forEach(post => {
    const date = new Date(post.created * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const key = `${year} 年 ${month} 月`
    if (!groups[key]) groups[key] = []
    groups[key].push(post)
  })
  // 按时间倒序
  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  )
}

const groupByDirectory = (posts: Post[]): GroupedPosts => {
  const groups: GroupedPosts = {}
  posts.forEach(post => {
    const dir = post.directory || "未分区"
    if (!groups[dir]) groups[dir] = []
    groups[dir].push(post)
  })
  return groups
}

export default function ArchivesPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'timeline' | 'directory'>('timeline')

  useEffect(() => {
    setLoading(true)
    fetch('https://blog.kaeshi.top/api/posts?page=1&pageSize=999')
      .then(res => res.json())
      .then(data => {
        const newPosts = (data.data || []).map((item: any) => ({
          ...item,
          created: Number(item.created),
          author: { screenName: item.author?.[0]?.screenName || '' },
        }))
        setPosts(newPosts)
        setLoading(false)
      })
  }, [])

  const grouped = mode === 'timeline' ? groupByTimeline(posts) : groupByDirectory(posts)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container max-w-2xl mx-auto py-12 md:py-20">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold">Archives</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              📦文章的归档页面
            </p>
            <Tabs defaultValue="timeline" className="w-full mt-2">
              <TabsList className="mx-auto">
                <TabsTrigger value="timeline">时间线</TabsTrigger>
                <TabsTrigger value="directory">分区</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline" className="border-none bg-transparent p-0 mt-0">
                <motion.div
                  className="flex flex-col gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
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
                    Object.entries(groupByTimeline(posts)).map(([group, items]) => (
                      <div key={group}>
                        <h2 className="text-2xl font-bold mb-4 mt-6 text-left">{group}</h2>
                        <div className="flex flex-col gap-3">
                          {items.map(post => {
                            const date = new Date(post.created * 1000)
                            const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                            return (
                              <a
                                key={post.cid}
                                href={`/blog/${post.cid}`}
                                className="block group"
                              >
                                <Card className="border-0 shadow-none bg-transparent transition-colors cursor-pointer group-hover:bg-accent/40">
                                  <CardHeader className="flex-row items-center space-y-0 gap-4 p-4">
                                    <span className="text-muted-foreground w-16 text-right tabular-nums shrink-0">{mmdd}</span>
                                    <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                                      {post.title}
                                    </CardTitle>
                                  </CardHeader>
                                </Card>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
              <TabsContent value="directory" className="border-none bg-transparent p-0 mt-0">
                <motion.div
                  className="flex flex-col gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
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
                    Object.entries(groupByDirectory(posts)).map(([group, items]) => (
                      <div key={group}>
                        <h2 className="text-2xl font-bold mb-4 mt-6 text-left">{group}</h2>
                        <div className="flex flex-col gap-3">
                          {items.map(post => {
                            const date = new Date(post.created * 1000)
                            const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                            return (
                              <a
                                key={post.cid}
                                href={`/blog/${post.cid}`}
                                className="block group"
                              >
                                <Card className="border-0 shadow-none bg-transparent transition-colors cursor-pointer group-hover:bg-accent/40">
                                  <CardHeader className="flex-row items-center space-y-0 gap-4 p-4">
                                    <span className="text-muted-foreground w-16 text-right tabular-nums shrink-0">{mmdd}</span>
                                    <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                                      {post.title}
                                    </CardTitle>
                                  </CardHeader>
                                </Card>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
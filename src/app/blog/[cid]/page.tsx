'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ClickFeedback from '@/components/click-feedback'
import dynamic from "next/dynamic"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/github-dark.css"
import LoadingSpinner from '@/components/loading-spinner'
import { toast } from "sonner"
import { Skeleton } from '@/components/ui/skeleton'

interface Post {
  cid: number
  title: string
  text: string
  created: number
  author: { screenName: string }
  tag?: { name: string }[]
  directory?: string
}

interface Comment {
  coid: number
  cid: number
  created: number
  author: string
  authorId: string
  ownerId: string
  mail: string
  url: string | null
  ip: string
  agent: string
  text: string
  type: string
  status: string
  parent: string
  stars: string
}

interface CommentTree extends Comment {
  children: CommentTree[]
}

const MarkdownRender = dynamic(() => import('@/components/MarkdownRender'), { ssr: false })

// 获取所有后代评论（递归收集，平铺）
function getAllDescendants(comments: Comment[], parentId: string): Comment[] {
  const result: Comment[] = [];
  function findChildren(pid: string) {
    comments.forEach(c => {
      if (c.parent === pid) {
        result.push(c);
        findChildren(c.coid.toString());
      }
    });
  }
  findChildren(parentId);
  return result;
}

// 表情配置
const owoConfig = {
  type: "usr",
  name: "furry",
  displayName: "福瑞",
  suffix: ".png",
  retinaSuffix: ".png",
  imgClass: "middle",
  container: [
    { icon: "1", text: "羞羞" },
    { icon: "2", text: "打招呼" },
    { icon: "3", text: "盯" },
    { icon: "4", text: "开心" },
    { icon: "5", text: "举中指" },
    { icon: "6", text: "惊讶" },
    { icon: "7", text: "比心" },
    { icon: "8", text: "微笑" },
    { icon: "9", text: "叹气" },
    { icon: "10", text: "擦汗" },
    { icon: "11", text: "睡觉" },
    { icon: "12", text: "抱尾巴" },
    { icon: "13", text: "胡思乱想" },
    { icon: "14", text: "惊醒" },
    { icon: "15", text: "吃瓜" },
    { icon: "16", text: "bang" },
    { icon: "17", text: "偷笑" },
    { icon: "18", text: "笑" },
    { icon: "19", text: "欢乐" },
    { icon: "20", text: "摸头" },
    { icon: "21", text: "点赞" },
    { icon: "22", text: "酒杯" },
    { icon: "23", text: "抱抱" },
    { icon: "24", text: "点赞2" },
    { icon: "25", text: "想哭" },
    { icon: "26", text: "冒头" }
  ]
}

// 表情选择器组件
const EmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  // 点击外部关闭选择器
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.emoji-picker')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative emoji-picker">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        表情
      </button>
      {/* 遮罩层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 bg-black/50 z-40 sm:hidden
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      {/* 桌面版选择器 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={`absolute bottom-[calc(100%+0.5rem)] right-0 p-3 bg-card border rounded-lg shadow-lg z-50
          w-[400px] hidden sm:block
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="grid grid-cols-6 gap-3">
          {owoConfig.container.map(item => (
            <motion.button
              key={item.icon}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(`::furry:${item.icon}::`)
                setIsOpen(false)
              }}
              className="w-14 h-14 flex items-center justify-center hover:bg-primary/10 rounded transition-colors"
              title={item.text}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`https://blog.kaeshi.top/usr/themes/Mirages/usr/biaoqing/furry/${item.icon}.png`}
                alt={item.text}
                className="w-12 h-12"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
      {/* 手机版底部抽屉 */}
      <motion.div
        initial={{ y: '100%' }}
        animate={isOpen ? { y: 0 } : { y: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`fixed bottom-0 left-0 right-0 bg-card border-t rounded-t-xl shadow-lg z-50 p-4 sm:hidden
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">选择表情</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-6 gap-3 max-h-[60vh] overflow-y-auto pb-safe">
          {owoConfig.container.map(item => (
            <motion.button
              key={item.icon}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(`::furry:${item.icon}::`)
                setIsOpen(false)
              }}
              className="w-14 h-14 flex items-center justify-center hover:bg-primary/10 rounded transition-colors"
              title={item.text}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`https://blog.kaeshi.top/usr/themes/Mirages/usr/biaoqing/furry/${item.icon}.png`}
                alt={item.text}
                className="w-12 h-12"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const CommentItem = ({
  comment,
  allComments,
  onReply,
}: {
  comment: Comment
  allComments: Comment[]
  onReply: (author: string, parentId: string) => void
}) => {
  const descendants = getAllDescendants(allComments, comment.coid.toString())

  const parseEmoji = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    const regex = /::furry:(\d+)::/g
    let match

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <img
          key={`emoji-${match.index}`}
          src={`https://blog.kaeshi.top/usr/themes/Mirages/usr/biaoqing/furry/${match[1]}.png`}
          alt={`furry:${match[1]}`}
          className="inline-block w-12 h-12 align-middle"
        />
      )
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : [text]
  }

  return (
    <div className="space-y-3">
      {/* 父评论 */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm font-medium">
              {comment.author.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium truncate">{comment.author}</span>
            <span className="text-muted-foreground text-xs">
              {new Date(comment.created * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap">
            {parseEmoji(comment.text)}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => onReply(comment.author, comment.coid.toString())}
            >
              回复
            </button>
            {descendants.length > 0 && (
              <span className="text-xs text-muted-foreground">{descendants.length} 条回复</span>
            )}
          </div>
        </div>
      </div>
      {/* 所有后代评论平铺显示 */}
      {descendants.length > 0 && (
        <div className="space-y-3 pl-11">
          {descendants.map(child => (
            <div key={child.coid} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm font-medium">
                    {child.author.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium truncate">{child.author}</span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(child.created * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap">
                  {parseEmoji(child.text)}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => onReply(child.author, child.coid.toString())}
                  >
                    回复
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const CommentSection = ({ comments, cid, onCommentsChange }: {
  comments: Comment[],
  cid: string,
  onCommentsChange: (comments: Comment[]) => void
}) => {
  const [commentForm, setCommentForm] = useState({ author: '', mail: '', text: '', parent: '0' })
  const [submitting, setSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const text = commentForm.text
      const newText = text.substring(0, start) + emoji + text.substring(end)
      setCommentForm(prev => ({ ...prev, text: newText }))
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + emoji.length
          textareaRef.current.selectionEnd = start + emoji.length
          textareaRef.current.focus()
        }
      }, 0)
    }
  }

  const handleReply = (author: string, parentId: string) => {
    setReplyTo(author)
    setCommentForm(prev => ({ ...prev, parent: parentId }))
    // Smooth scroll to form
    document.querySelector('.comment-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const formItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Comments ({comments.length})</h2>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </div>

      {/* 评论表单 */}
      <div className="comment-form">
        <motion.form
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.1 } }
          }}
          onSubmit={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            try {
              await fetch('https://blog.kaeshi.top/api-comment.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  cid,
                  author: commentForm.author,
                  mail: commentForm.mail,
                  text: commentForm.text,
                  parent: commentForm.parent
                })
              })
              setCommentForm({ author: '', mail: '', text: '', parent: '0' })
              setReplyTo(null)
              const res = await fetch(`https://blog.kaeshi.top/api/commentsByCid?cid=${cid}`)
              const data = await res.json()
              const newComments = (data.data || []).map((c: any) => ({
                ...c,
                created: Number(c.created)
              }))
              onCommentsChange(newComments)
              toast.success('评论发送成功！')
            } catch (error) {
              toast.error('评论发送失败，请稍后重试')
            } finally {
              setSubmitting(false)
            }
          }}
          className="space-y-6"
        >
          {replyTo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg"
            >
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <span>回复</span>
              <span className="font-semibold text-foreground">{replyTo}</span>
              <button
                type="button"
                onClick={() => {
                  setReplyTo(null)
                  setCommentForm(prev => ({ ...prev, parent: '0' }))
                }}
                className="text-xs ml-auto border border-border/50 px-2 py-0.5 rounded-full hover:bg-background transition-colors"
              >
                取消
              </button>
            </motion.div>
          )}

          <motion.div variants={formItem} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">昵称</label>
              <div className="relative group">
                <input
                  required
                  className="w-full bg-muted/50 border-transparent focus:bg-background transition-all duration-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  placeholder="怎么称呼你？"
                  value={commentForm.author}
                  onChange={e => setCommentForm(f => ({ ...f, author: e.target.value }))}
                  onFocus={() => setFocusedField('author')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'author' ? 'w-full' : 'w-0'}`} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">邮箱</label>
              <div className="relative group">
                <input
                  required
                  type="email"
                  className="w-full bg-muted/50 border-transparent focus:bg-background transition-all duration-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  placeholder="用来接收回复通知"
                  value={commentForm.mail}
                  onChange={e => setCommentForm(f => ({ ...f, mail: e.target.value }))}
                  onFocus={() => setFocusedField('mail')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'mail' ? 'w-full' : 'w-0'}`} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={formItem} className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground ml-1">留言</label>
            <div className="relative group">
              <textarea
                ref={textareaRef}
                className="w-full bg-muted/50 border-transparent focus:bg-background transition-all duration-300 rounded-xl px-4 py-3 text-sm min-h-[120px] resize-none outline-none leading-relaxed"
                required
                placeholder="写下你的想法..."
                value={commentForm.text}
                onChange={e => setCommentForm(f => ({ ...f, text: e.target.value }))}
                onFocus={() => setFocusedField('text')}
                onBlur={() => setFocusedField(null)}
              />
              <div className={`absolute bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === 'text' ? 'w-full' : 'w-0'}`} />
              <div className="absolute right-3 bottom-3 opacity-60 hover:opacity-100 transition-opacity">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={formItem} className="flex justify-end">
            <ClickFeedback>
              <Button type="submit" disabled={submitting} className="rounded-xl px-6">
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <span>Biu~</span>
                  </div>
                ) : '发布评论'}
              </Button>
            </ClickFeedback>
          </motion.div>
        </motion.form>
      </div>

      <div className="h-px bg-border/40" />

      {/* 评论列表 */}
      <div className="space-y-10">
        {comments.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground/50 font-light">
            暂无评论，来坐沙发？
          </div>
        ) : (
          comments
            .filter(comment => comment.parent === '0')
            .map(comment => (
              <CommentItem
                key={comment.coid}
                comment={comment}
                allComments={comments}
                onReply={handleReply}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default function BlogDetailPage() {
  const { cid } = useParams() as { cid: string }
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch(`https://blog.kaeshi.top/api/post?cid=${cid}`).then(res => res.json()),
      fetch(`https://blog.kaeshi.top/api/commentsByCid?cid=${cid}`).then(res => res.json())
    ]).then(([postData, commentsData]) => {
      const postRaw = postData.data
      const post = postRaw
        ? {
          ...postRaw,
          created: Number(postRaw.created),
          author: { screenName: postRaw.author?.[0]?.screenName || '' }
        }
        : null
      const commentList = Array.isArray(commentsData.data) ? commentsData.data : []
      setPost(post)
      setComments(commentList.map((c: any) => ({
        ...c,
        created: Number(c.created)
      })))
      setLoading(false)
    })
  }, [cid])

  const getReadTime = (text: string) => {
    const words = text.replace(/<[^>]+>/g, '').length
    return Math.max(1, Math.round(words / 300))
  }

  if (loading) return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-8 md:py-12">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="w-12 h-5 rounded bg-primary/10" />
              ))}
            </div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="mb-10 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <section className="mt-12">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 mb-2" />
              {/* 评论表单骨架 */}
              <div className="rounded-lg border bg-card p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-9 w-32" />
              </div>
              {/* 评论列表骨架 */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <footer className="py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <Skeleton className="h-4 w-64" />
        </div>
      </footer>
    </div>
  )
  if (!post) return <div className="text-center py-10">文章不存在或数据结构不符</div>

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-8 md:py-12">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tag && post.tag.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">{t.name}</span>
              ))}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight break-words tracking-tight">{post.title}</h1>
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
              <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
              <span>·</span>
              <span>by Yang</span>
              <span>·</span>
              <span>{post.directory}</span>
              <span>·</span>
              <span>{getReadTime(post.text)} 分钟阅读</span>
            </div>
          </motion.div>
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MarkdownRender content={post.text} />
          </motion.div>
          <section className="mt-12">
            <CommentSection
              comments={comments}
              cid={cid}
              onCommentsChange={setComments}
            />
          </section>
        </article>
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
'use client'
import { useEffect, useState, useRef } from 'react'
/* removed import */
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ClickFeedback from '@/components/click-feedback'
import { toast } from "sonner"

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

  // 解析表情为 React 节点
  const parseEmoji = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    const regex = /::furry:(\d+)::/g
    let match

    while ((match = regex.exec(text)) !== null) {
      // 添加表情前的文本
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      // 添加表情图片节点
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

    // 添加剩余文本
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : [text]
  }

  return (
    <div className="space-y-4 py-2">
      {/* 父评论 */}
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-1">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border/50">
            <span className="text-foreground/70 text-sm font-medium">
              {comment.author.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold text-sm text-foreground">{comment.author}</span>
            <span className="text-muted-foreground/40 text-[10px] font-mono uppercase tracking-wider">
              {new Date(comment.created * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="text-sm text-muted-foreground/90 leading-relaxed font-light break-words whitespace-pre-wrap">
            {parseEmoji(comment.text)}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <button
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => onReply(comment.author, comment.coid.toString())}
            >
              回复
            </button>
          </div>
        </div>
      </div>
      {/* 所有后代评论平铺显示 */}
      {descendants.length > 0 && (
        <div className="space-y-4 pl-14 pt-2">
          {descendants.map(child => (
            <div key={child.coid} className="flex gap-4">
              <div className="flex-shrink-0 pt-1">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border/50">
                  <span className="text-foreground/70 text-xs font-medium">
                    {child.author.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-sm text-foreground">{child.author}</span>
                  <span className="text-muted-foreground/40 text-[10px] font-mono uppercase tracking-wider">
                    {new Date(child.created * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground/90 leading-relaxed font-light break-words whitespace-pre-wrap">
                  {parseEmoji(child.text)}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const text = commentForm.text
      const newText = text.substring(0, start) + emoji + text.substring(end)
      setCommentForm(prev => ({ ...prev, text: newText }))
      // 保持光标位置
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + emoji.length
          textareaRef.current.selectionEnd = start + emoji.length
          textareaRef.current.focus()
        }
      }, 0)
    }
  }

  // 构建评论树
  const buildCommentTree = (comments: Comment[]): CommentTree[] => {
    const commentMap = new Map<string, CommentTree>()
    const roots: CommentTree[] = []

    // 首先将所有评论转换为树节点
    comments.forEach(comment => {
      commentMap.set(comment.coid.toString(), { ...comment, children: [] })
    })

    // 构建树结构
    comments.forEach(comment => {
      const node = commentMap.get(comment.coid.toString())!
      if (comment.parent === '0') {
        roots.push(node)
      } else {
        const parent = commentMap.get(comment.parent)
        if (parent) {
          parent.children.push(node)
        } else {
          // 如果找不到父评论，将其作为根评论
          roots.push(node)
        }
      }
    })

    // 对每个节点的子评论按时间排序
    const sortComments = (comments: CommentTree[]) => {
      comments.forEach(comment => {
        comment.children.sort((a, b) => a.created - b.created)
        sortComments(comment.children)
      })
    }
    sortComments(roots)

    // 对根评论也按时间排序
    roots.sort((a, b) => a.created - b.created)

    return roots
  }

  const commentTree = buildCommentTree(comments)

  const handleReply = (author: string, parentId: string) => {
    setReplyTo(author)
    setCommentForm(prev => ({ ...prev, parent: parentId }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">评论 <span className="text-muted-foreground ml-2 text-lg font-normal">({comments.length})</span></h2>

      {/* 评论表单 */}
      <div className="bg-background">
        <div className="py-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
                // 重新加载评论
                const res = await fetch(`https://blog.kaeshi.top/api/commentsByCid?cid=3`)
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
            className="space-y-3"
          >
            {replyTo && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>回复</span>
                <span className="font-medium">{replyTo}</span>
                <button
                  type="button"
                  onClick={() => {
                    setReplyTo(null)
                    setCommentForm(prev => ({ ...prev, parent: '0' }))
                  }}
                  className="text-primary hover:underline"
                >
                  取消
                </button>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                required
                placeholder="昵称"
                value={commentForm.author}
                onChange={e => setCommentForm(f => ({ ...f, author: e.target.value }))}
              />
              <input
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                required
                type="email"
                placeholder="Email (不会被公开)"
                value={commentForm.mail}
                onChange={e => setCommentForm(f => ({ ...f, mail: e.target.value }))}
              />
            </div>
            <div className="relative">
              <textarea
                ref={textareaRef}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 text-sm min-h-[120px] resize-none"
                required
                placeholder="留言..."
                value={commentForm.text}
                onChange={e => setCommentForm(f => ({ ...f, text: e.target.value }))}
              />
              <div className="absolute right-3 bottom-3">
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            </div>
            <ClickFeedback>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto rounded-xl px-8 py-6 text-sm font-medium">
                {submitting ? '发送中...' : '发送评论'}
              </Button>
            </ClickFeedback>
          </motion.form>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments
          .filter(comment => comment.parent === '0')
          .map(comment => (
            <CommentItem
              key={comment.coid}
              comment={comment}
              allComments={comments}
              onReply={handleReply}
            />
          ))}
      </div>
    </div>
  )
}

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

export default function FriendsAddPage() {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    // 加载评论
    fetch('https://blog.kaeshi.top/api/commentsByCid?cid=3')
      .then(res => res.json())
      .then(data => {
        const commentList = Array.isArray(data.data) ? data.data : []
        setComments(commentList.map((c: any) => ({
          ...c,
          created: Number(c.created)
        })))
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container max-w-3xl mx-auto px-4 py-12 md:py-24">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">添加友链</h1>
            <p className="text-xl text-muted-foreground/80 font-light max-w-xl leading-relaxed">
              博客已重新建立，欢迎大家添加友链qwq
            </p>
          </motion.div>

          {/* Info Sections - Clean Layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* 申请方法 */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">How to Apply</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>添加本站后，请在下方留言，格式如下：</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>博客名</li>
                    <li>网址 (HTTPS only)</li>
                    <li>简短描述</li>
                    <li>Logo / 头像图片</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">注意</h3>
                <p className="text-muted-foreground text-sm">
                  只接受个人 Blog 交换，优先添加有原创内容的技术/生活类博客。
                </p>
              </div>
            </motion.div>

            {/* 本站信息 */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="space-y-6 md:pl-8 md:border-l border-border/40"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">My Info</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">Name</span>
                    <span className="text-foreground font-medium">Yang's Blog</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">URL</span>
                    <span className="text-foreground font-medium select-all">https://kaeshi.top</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">Description</span>
                    <span className="text-foreground font-medium">Make a dent in the universe.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">Avatar</span>
                    <span className="text-foreground text-sm break-all font-mono">http://q.qlogo.cn/headimg_dl?dst_uin=2958445350&spec=640&img_type=jpg</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  添加友链可以发送邮件至 <a href="mailto:beitqwq@icloud.com" className="text-primary hover:underline font-medium">beitqwq@icloud.com</a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* 失联友链 */}
          <div className="mb-20 max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="lost-contact" className="border-border/40">
                <AccordionTrigger className="text-muted-foreground hover:text-foreground hover:no-underline text-sm">
                  失联友链
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 text-muted-foreground text-sm leading-loose">
                    <p>以下友链暂时无法访问或已移除本站链接。如果您是站长并已恢复，请联系我恢复友链。</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-muted-foreground/80">
                      <li>无法访问 (https://puddingkc.com) - PuddingKC's Blog</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* 评论区 */}
          <section className="border-t border-border/40 pt-16">
            <div className="max-w-2xl mx-auto">
              <CommentSection
                comments={comments}
                cid="3"
                onCommentsChange={setComments}
              />
            </div>
          </section>
        </section>
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
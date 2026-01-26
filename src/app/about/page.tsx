'use client'
/* removed import */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import LoadingSpinner from '@/components/loading-spinner'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import ClickFeedback from '@/components/click-feedback'
/* removed import */
import MessageForm from '@/components/MessageForm'
import MessagesMarquee from '@/components/MessagesMarquee'
import Footer from '@/components/footer'

interface Photo {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  created?: number;
}

interface Comment {
  coid: number;
  cid: number;
  created: number;
  author: string;
  authorId: string;
  ownerId: string;
  mail: string;
  url: string | null;
  ip: string;
  agent: string;
  text: string;
  type: string;
  status: string;
  parent: string;
  stars: string;
}

export default function AboutPage() {
  // 定义动画变体
  // 定义动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.2, 0, 0, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <motion.div
          className="container max-w-3xl mx-auto px-4 py-12 md:py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header / Intro */}
          <motion.div
            className="mb-16 space-y-6"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <img
                src="/avatar.jpg"
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-background shadow-lg"
              />
              <div className="space-y-2">
                <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter">Yang</h1>
                <p className="text-xl text-muted-foreground font-light">
                  Make a dent in the universe.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Student", "Boy", "20岁", "INFP-T", "广东人", "🏝️ 摆烂中"].map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert text-muted-foreground/90 leading-relaxed font-light mt-8">
              <p>
                Hi~ 我是 Yang，一名正在探索前端开发的大学生。<br />
                喜欢折腾各种技术项目，热爱 Coding 和新挑战。
              </p>
            </div>
          </motion.div>

          <div className="space-y-20">
            {/* Skills */}
            <motion.section
              variants={itemVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b border-border/40 pb-2">我的技能 / Skills</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">代码</h3>
                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-normal px-3 py-1 text-sm bg-muted/50 hover:bg-muted">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">其它</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Premiere Pro", "Photoshop", "Illustrator", "Lightroom", "AutoCAD", "Revit"].map((skill) => (
                      <Badge key={skill} variant="outline" className="font-normal px-3 py-1 text-sm border-border/60">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Devices */}
            <motion.section
              variants={itemVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b border-border/40 pb-2">我的设备 / Gear</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'MacBook Air M4', desc: 'Main Driver' },
                  { name: 'iPhone 17', desc: 'Mobile' },
                  { name: 'Apple Watch Series 9', desc: 'Wearable' },
                  { name: 'AirPods Pro 2', desc: 'Audio' }
                ].map((item) => (
                  <li key={item.name} className="flex flex-col p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-border/60 transition-colors">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Todo / Goals */}
            <motion.section
              variants={itemVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h2 className="text-2xl font-bold tracking-tight">我的目标 / Todo</h2>
              </div>

              <Link href="/todo" className="block group">
                <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20 p-8 transition-all hover:bg-muted/30 hover:border-border/60">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3 w-3 rounded-full bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                      <h3 className="text-lg font-medium text-foreground">当前目标</h3>
                    </div>
                    <p className="text-muted-foreground font-light leading-relaxed max-w-xl">
                      记录一些想要完成的小目标，努力实现它们。
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      查看我的目标清单 <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>

            {/* Message Board */}
            <motion.section
              variants={itemVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h2 className="text-2xl font-bold tracking-tight">留言板 / Messages</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full px-4">留言</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>留言</DialogTitle>
                      <DialogDescription>
                        留下你的想法或只是说声 hi!
                      </DialogDescription>
                    </DialogHeader>
                    <MessageForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border/50 bg-background p-6">
                <MessagesMarquee />
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              variants={itemVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b border-border/40 pb-2">联系我 / Connect</h2>
              <div className="flex flex-wrap gap-6">
                <a
                  href="https://github.com/Kaehei"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
                <a
                  href="mailto:beitqwq@icloud.com"
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

// 留言跑马灯组件
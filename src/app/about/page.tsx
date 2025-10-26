'use client'
import { Navbar } from '@/components/navbar'
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
import LatestPhotoCard from '@/components/LatestPhotoCard'
import MessageForm from '@/components/MessageForm'
import MessagesMarquee from '@/components/MessagesMarquee'

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
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* 第一行：个人信息、位置、技术栈 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 个人信息 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-start space-x-4">
                <img 
                  src="/avatar.jpg" 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-background shadow-sm"
                />
                <div>
                  <h2 className="text-xl font-bold">Yang</h2>
                  <p className="text-sm text-muted-foreground">A Student.</p>
                  <p className="mt-2 text-sm text-foreground">
                    Hi~ 我是 Yang，一名正在探索前端开发的大学生。<br/>
                    喜欢折腾各种技术项目，热爱 Coding 和新挑战。
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">Boy</Badge>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-xs">19岁</Badge>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-xs">广东人</Badge>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs">INFP-T</Badge>
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs">🏝️ 摆烂中</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 留言板 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm relative"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">留言板 / Messages</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="text-xs">发布留言</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>发布留言</DialogTitle>
                      <DialogDescription>
                        请输入您的留言信息。
                      </DialogDescription>
                    </DialogHeader>
                    <MessageForm />
                  </DialogContent>
                </Dialog>
              </div>
              <MessagesMarquee />
            </motion.div>

            {/* 技术栈 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4">我的技能 / Skills</h3>
              
              <div className="mb-3">
                <h4 className="font-medium text-sm mb-2">代码</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs">HTML</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">CSS</Badge>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-xs">JavaScript</Badge>
                  <Badge className="bg-blue-500 text-white hover:bg-blue-600 text-xs">TypeScript</Badge>
                  <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 text-xs">React</Badge>
                  <Badge className="bg-black text-white hover:bg-gray-800 text-xs">Next.js</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">其它</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs">Premiere Pro</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">Photoshop</Badge>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200 text-xs">Illustrator</Badge>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-xs">Lightroom</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">AutoCAD</Badge>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200 text-xs">Revit</Badge>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 第二行：我的设备、摄影笔记、技术项目 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 我的设备 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                我的设备 / Devices
              </h3>
              <p className="text-muted-foreground mb-4">
                一些我正在使用的设备。
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  { name: 'MacBook Air M4', icon: '' },
                  { name: 'iPhone 17', icon: '' },
                  { name: 'Apple Watch Series 9', icon: '' },
                  { name: 'AirPods Pro 2', icon: '' }
                ].map((device) => (
                  <motion.li 
                    key={device.name} 
                    className="flex items-center space-x-2 text-foreground"
                    variants={itemVariants}
                  >
                    <span className="text-xl">{device.icon}</span>
                    <span>{device.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 摄影 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <LatestPhotoCard />
            </motion.div>

            {/* 我的目标 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                我的目标 / Todo
              </h3>
              <p className="text-muted-foreground mb-4">
                记录一些想要完成的小目标，努力实现它们。
              </p>
              <Link 
                href="/todo" 
                className="inline-flex items-center text-primary hover:underline text-sm"
              >
                查看我的目标清单 →
              </Link>
            </motion.div>
          </div>

          {/* 第三行：联系我 */}
          <div className="grid grid-cols-1 gap-6">
            {/* 联系我 */}
            <motion.div 
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                联系我 / Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.a 
                  href="https://github.com/Kaehei" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-4 bg-muted rounded-md hover:bg-accent transition-colors"
                  variants={itemVariants}
                >
                  <div className="p-2 bg-foreground text-background rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Kaehei</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  href="mailto:beitqwq@icloud.com" 
                  className="flex items-center space-x-3 p-4 bg-muted rounded-md hover:bg-accent transition-colors"
                  variants={itemVariants}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">beitqwq@icloud.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by {" "}
            <a
              href="https://github.com/Kaehei"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Yang
            </a>
            . The source code is available on {" "}
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

// 留言跑马灯组件
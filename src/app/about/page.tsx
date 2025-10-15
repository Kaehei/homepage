'use client'
import { Navbar } from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Link from 'next/link'

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

const badgeVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

export default function AboutPage() {
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
            <h1 className="font-heading text-4xl md:text-6xl font-bold">About</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Life is never perfect, but if you keep your face toward the sunshine, the shadows will fall behind you.
            </p>
          </motion.div>

          {/* 我是谁 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我是谁 / Who</h2>
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={badgeVariants}><Badge variant="default">Boy</Badge></motion.div>
                <motion.div variants={badgeVariants}><Badge variant="secondary">19岁</Badge></motion.div>
                <motion.div variants={badgeVariants}><Badge variant="info">广东人</Badge></motion.div>
                <motion.div variants={badgeVariants}><Badge variant="success">INFP-T</Badge></motion.div>
                <motion.div variants={badgeVariants}><Badge variant="outline">🏝️ 摆烂中</Badge></motion.div>
              </motion.div>
              <motion.p 
                className="text-base text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hi~ 我是 Yang，一名正在探索前端开发的大学生。<br />
                喜欢折腾各种技术项目，热爱 Coding 和新挑战。
              </motion.p>
            </div>
          </motion.div>

          {/* 我的技能 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我的技能 / Skills</h2>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="font-semibold mb-1">代码</h3>
                  <ul className="list-disc list-inside text-muted-foreground text-base space-y-1">
                    <li>HTML / CSS / JavaScript</li>
                    <li>TypeScript, React, Next.js ...</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="font-semibold mb-1">其它</h3>
                  <ul className="list-disc list-inside text-muted-foreground text-base space-y-1">
                    <li>Premiere Pro, Photoshop, Illustrator, Lightroom</li>
                    <li>AutoCAD / Revit ...</li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Todo 链接 */}
          <motion.div
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我的目标 / Todo</h2>
              <motion.p 
                className="text-base text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                记录一些想要完成的小目标，努力实现它们。
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  href="/todo" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  查看我的目标清单 →
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* 我的设备 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">我的设备 / Devices</h2>
              <motion.ul 
                className="list-disc list-inside text-muted-foreground text-base space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li variants={fadeInUp}>MacBook Air M4</motion.li>
                <motion.li variants={fadeInUp}>iPhone 14 Pro</motion.li>
                <motion.li variants={fadeInUp}>Apple Watch Series 9</motion.li>
                <motion.li variants={fadeInUp}>AirPods Pro 2</motion.li>
              </motion.ul>
            </div>
          </motion.div>

          {/* 联系我 */}
          <motion.div 
            className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <h2 className="text-2xl font-bold mb-2">联系我 / Contact</h2>
              <motion.ul 
                className="text-base text-muted-foreground space-y-1"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li variants={fadeInUp}>
                  GitHub: <a href="https://github.com/Kaehei" className="text-primary hover:underline" target="_blank" rel="noreferrer">Kaehei</a>
                </motion.li>
                <motion.li variants={fadeInUp}>
                  Email: <a href="mailto:beitqwq@icloud.com" className="text-primary hover:underline">beitqwq@icloud.com</a>
                </motion.li>
              </motion.ul>
            </div>
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
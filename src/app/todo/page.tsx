'use client'
import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { Navbar } from "@/components/navbar"
import LoadingSpinner from "@/components/loading-spinner"

interface Plan {
  id: number
  title: string
  description: string
  category: 'career' | 'life' | 'learning' | 'health'
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  start_date: string
  target_date: string
  created: number
  modified: number
}

// 分类配置
const categories: Record<Plan['category'], { label: string; emoji: string }> = {
  career: { label: '职业发展', emoji: '💼' },
  life: { label: '生活目标', emoji: '🎯' },
  learning: { label: '学习计划', emoji: '📚' },
  health: { label: '健康计划', emoji: '🏃' }
}

// 状态配置
const statuses: Record<Plan['status'], { label: string; emoji: string }> = {
  'not-started': { label: '未开始', emoji: '⏳' },
  'in-progress': { label: '进行中', emoji: '🚀' },
  'completed': { label: '已完成', emoji: '✅' }
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

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
}

export default function TodoPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://blog.kaeshi.top/plans.json')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data)
        const formattedPlans = data.map((plan: any) => ({
          ...plan,
          id: Number(plan.id),
          progress: Number(plan.progress),
          created: Number(plan.created),
          modified: Number(plan.modified)
        }))
        setPlans(formattedPlans)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching plans:', error)
        setError('加载计划失败')
        setLoading(false)
      })
  }, [])

  // 计算总体进度
  const totalProgress = plans.length > 0
    ? Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)
    : 0

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
            <h1 className="font-heading text-4xl md:text-6xl font-bold">TODO</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              一些小目标
            </p>
          </motion.div>

          <motion.div 
            className="bg-card rounded-lg border shadow-sm p-6 mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">总体进度</h2>
              <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </motion.div>

          <motion.div 
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <LoadingSpinner />
              </motion.div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : plans.length === 0 ? (
              <div className="text-center text-muted-foreground">暂无计划</div>
            ) : (
              plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
                  className="group bg-card rounded-lg border shadow-sm px-6 py-5 transition-all duration-200"
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                      {categories[plan.category].emoji} {categories[plan.category].label}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">
                      {statuses[plan.status].emoji} {statuses[plan.status].label}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
                    <span>{plan.start_date}</span>
                    <span>-</span>
                    <span>{plan.target_date}</span>
                    <span>·</span>
                    <span className="font-medium text-primary">{plan.progress}%</span>
                  </div>
                  
                  <Progress value={plan.progress} className="h-1" />
                </motion.div>
              ))
            )}
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
'use client'
import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { motion } from 'framer-motion'
import LoadingSpinner from "@/components/loading-spinner"
import { cn } from "@/lib/utils"
import Footer from '@/components/footer'

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

// Category Configuration (Color Dots)
const categories: Record<Plan['category'], { label: string; color: string }> = {
  career: { label: '职业发展', color: 'bg-blue-500' },
  life: { label: '生活目标', color: 'bg-orange-500' },
  learning: { label: '学习计划', color: 'bg-emerald-500' },
  health: { label: '健康计划', color: 'bg-rose-500' }
}

// Status Configuration (Text & Style)
const statuses: Record<Plan['status'], { label: string; color: string }> = {
  'not-started': { label: '未开始', color: 'text-muted-foreground' },
  'in-progress': { label: '进行中', color: 'text-primary' },
  'completed': { label: '已完成', color: 'text-green-600' }
}

export default function TodoPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://blog.kaeshi.top/plans.json')
      .then(res => res.json())
      .then(data => {
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

  // Calculate total progress
  const totalProgress = plans.length > 0
    ? Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)
    : 0

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container max-w-3xl mx-auto py-12 md:py-24 px-4">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Plans</h1>
            <p className="text-xl text-muted-foreground/80 font-light max-w-xl leading-relaxed">
              Tracking goals and progress.
            </p>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Progress</span>
              <span className="text-2xl font-bold font-mono text-primary">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-1" />
          </motion.div>

          <div className="space-y-2">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : plans.length === 0 ? (
              <div className="text-center text-muted-foreground py-20">暂无计划</div>
            ) : (
              plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                  className="group relative flex flex-col md:flex-row md:items-center py-6 border-b border-border/40 last:border-0 hover:bg-muted/30 -mx-4 px-4 rounded-xl transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                      <span className={cn("flex items-center gap-1.5", statuses[plan.status].color)}>
                        {plan.status === 'in-progress' && <span className="relative flex h-2 w-2 mr-0.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span>}
                        {statuses[plan.status].label}
                      </span>
                      <span className="text-muted-foreground/30">•</span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className={cn("h-1.5 w-1.5 rounded-full", categories[plan.category].color)} />
                        {categories[plan.category].label}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                      {plan.title}
                    </h3>
                    <p className="text-base text-muted-foreground/80 font-light line-clamp-2 md:w-3/4">
                      {plan.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground/60 font-mono">
                      <span>{plan.start_date} — {plan.target_date}</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-8 md:w-32 flex flex-col justify-center gap-2">
                    <div className="flex justify-between md:justify-end items-center text-xs font-mono font-medium text-foreground/70">
                      <span className="md:hidden">Progress</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-1 md:h-1.5" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 
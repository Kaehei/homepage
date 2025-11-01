'use client'

import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import React, { useState } from "react"

interface Friend {
  name: string
  url: string
  description: string
  avatar?: string
  color: string
}

const friends: Friend[] = [
  {
    name: "9527's Blog",
    url: "https://9527dhx.top/",
    description: "永远相信美好的事情即将发生",
    avatar: "https://q.qlogo.cn/g?b=qq&nk=2548635484&s=100",
    color: "#346c9c"
  },
  {
    name: "布丁の小窝",
    url: "https://www.furryowo.top/",
    description: "一个有梦想的咸鱼",
    avatar: "https://dn-qiniu-avatar.qbox.me/avatar/7da7e82f04de94c795db0301c3397bb6?",
    color: "#fcc307"
  },
  {
    name: "Tianiel's Blog",
    url: "https://tianiel.top",
    description: "For Super Earth!",
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=615207910&s=640",
    color: "#1772b4"
  },
  {
    name: "小丁的屋舍",
    url: "https://xding.top/",
    description: "谈笑有鸿儒，往来无白丁",
    avatar: "https://xding.top/face.png",
    color: "#009688"
  },
  {
    name: "fly6022",
    url: "https://kuri.ink/",
    description: "Salvation lies within.",
    avatar: "https://imageurl.kuri.ink/images/logo.png",
    color: "#8bbdec"
  },
  {
    name: "GoodBoyboy's Blog",
    url: "https://blog.goodboyboy.top/",
    description: "惬意小屋 - 点滴记忆",
    avatar: "https://gravatar.goodboyboy.top/avatar/9da9d1d515d273d4794015f2321f6e04?s=96&d=monsterid&r=g",
    color: "#66c18c"
  },
  {
    name: "Nero978 的日记",
    url: "https://nero978.top/",
    description: "Brave yourself, brave the world.",
    avatar: "https://nero978.top/wp-content/uploads/2023/07/logo.jpg",
    color: "#4280ff"
  },
  {
    name: "深海小涛",
    url: "https://xtao.de",
    description: "又一个垃圾技术博客",
    avatar: "https://blog.xtao.de/img/avatar.jpg",
    color: "#2775B6"
    },
  {
    name: "酷丁的主页",
    url: "https://coldin.top",
    description: "一个羞涩的小朋友的自我介绍页面",
    avatar: "https://coldin.top/avatar.png",
    color: "#28a745"
  },
  {
    name: "XenWayne's Blog",
    url: "https://xenwayne.top",
    description: "寸进具欢喜，万物皆可爱。",
    avatar: "https://gcore.jsdelivr.net/gh/XenWayne/sitefile@master/img/avatar_square.png",
    color: "#4280ff"
  },
  {
    name: "PuddingKC's Blog",
    url: "https://puddingkc.com/",
    description: "愿你所热爱的依旧不减当年。",
    avatar: "https://www.puddingkc.com/api/v2/objects/avatar/2cfgqfbuk0clj9t0md.webp",
    color: "#FFB3A7"
  },
{
  "name": "苦小怕",
  "url": "https://doc.kulipai.top",
  "description": "A stduent.",
  "avatar": "https://doc.kulipai.top/avator.png",
  "color": "#5bae23"
},
  {
    "name": "自留地 - GES233's Blog",
    "url": "https://ges233.github.io",
    "description": "得以存在便是一个奇迹，能够思考就是一件乐事。",
    "avatar": "https://avatars.githubusercontent.com/u/30802664?v=4",
    "color": "#FFB11B"
  },
    {
    "name": "MaxQi的说说",
    "url": "https://maxqi.top",
    "description": "一名高中生的技术与成长记录",
    "avatar": "https://p.maxqi.top/img/2025/10/01/68dce7326320a.png ",
    "color": "#5bae23"
  },
  {
    name: "添加友链",
    url: "/friends/add",
    description: "点我添加友链",
    avatar: "https://q.qlogo.cn/g?b=qq&nk=2958445350&s=100",
    color: "#f0a1a8"
  }
]

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

export default function FriendsPage() {
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
            <h1 className="font-heading text-4xl md:text-6xl font-bold">Friends</h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              这里有一些志同道合的朋友们
            </p>
          </motion.div>
          <motion.div 
            className="mx-auto flex flex-col gap-6 md:max-w-2xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {friends.map((friend, index) => (
              <motion.a
                key={friend.url}
                href={friend.url}
                target="_blank"
                rel="noreferrer"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block focus:outline-none"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="flex items-center p-4 md:p-6 rounded-xl border transition-all"
                  style={{
                    background: `${friend.color}20`,
                    borderColor: friend.color,
                  }}
                >
                  <AvatarWithFallback friend={friend} />
                  <div className="ml-4 flex-1">
                    <motion.div 
                      className="font-bold text-lg"
                      style={{ color: friend.color }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {friend.name}
                    </motion.div>
                    <motion.div 
                      className="text-muted-foreground text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {friend.description}
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
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

function AvatarWithFallback({ friend }: { friend: Friend }) {
  const [error, setError] = useState(false)
  const firstChar = friend.name.charAt(0)
  if (error) {
    return (
      <motion.div
        className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 select-none"
        style={{ background: friend.color + '33', color: friend.color, borderColor: friend.color }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {firstChar}
      </motion.div>
    )
  }
  return (
    <motion.img
      src={friend.avatar}
      alt={friend.name}
      className="h-16 w-16 rounded-full border-2 object-cover"
      style={{ borderColor: friend.color }}
      onError={() => setError(true)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    />
  )
} 
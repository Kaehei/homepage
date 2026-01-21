'use client'

import { motion } from "framer-motion"
import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"

interface Friend {
  name: string
  url: string
  description: string
  avatar?: string
  color: string
  tag?: string
}

const friends: Friend[] = [
  {
    name: "9527's Blog",
    url: "https://9527dhx.top/",
    description: "永远相信美好的事情即将发生",
    avatar: "https://q.qlogo.cn/g?b=qq&nk=2548635484&s=100",
    color: "#346c9c",
    tag: "FRIEND"
  },
  {
    name: "布丁の小窝",
    url: "https://www.furryowo.top/",
    description: "一个有梦想的咸鱼",
    avatar: "https://dn-qiniu-avatar.qbox.me/avatar/7da7e82f04de94c795db0301c3397bb6?",
    color: "#fcc307",
    tag: "FRIEND"
  },
  {
    name: "Tianiel's Blog",
    url: "https://tianiel.top",
    description: "For Super Earth!",
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=615207910&s=640",
    color: "#1772b4",
    tag: "FRIEND"
  },
  {
    "name": "BobLiu",
    "url": "https://bobliu.tech",
    "description": "Always sleepy",
    "avatar": "https://avatars.githubusercontent.com/u/24805093?v=4",
    "color": "#5bae23",
    tag: "FRIEND"
  },
  {
    name: "小丁的屋舍",
    url: "https://xding.top/",
    description: "谈笑有鸿儒，往来无白丁",
    avatar: "https://xding.top/face.png",
    color: "#009688",
    tag: "TECH"
  },
  {
    name: "fly6022",
    url: "https://kuri.ink/",
    description: "Salvation lies within.",
    avatar: "https://imageurl.kuri.ink/images/logo.png",
    color: "#8bbdec",
    tag: "FRIEND"
  },
  {
    name: "GoodBoyboy's Blog",
    url: "https://blog.goodboyboy.top/",
    description: "惬意小屋 - 点滴记忆",
    avatar: "https://gravatar.goodboyboy.top/avatar/9da9d1d515d273d4794015f2321f6e04?s=96&d=monsterid&r=g",
    color: "#66c18c",
    tag: "DEV"
  },
  {
    name: "欧の魔法屋",
    url: "https://ohmyga.dev",
    description: "咕咕咕",
    avatar: "https://ohmyga.dev/avatar.png",
    color: "#ff7043",
    tag: "MAGIC"
  },
  {
    name: "Nero978 的日记",
    url: "https://nero978.top/",
    description: "Brave yourself, brave the world.",
    avatar: "https://nero978.top/wp-content/uploads/2023/07/logo.jpg",
    color: "#4280ff",
    tag: "DIARY"
  },
  {
    name: "深海小涛",
    url: "https://xtao.de",
    description: "又一个垃圾技术博客",
    avatar: "https://blog.xtao.de/img/avatar.jpg",
    color: "#2775B6",
    tag: "DEV"
  },
  {
    name: "酷丁的主页",
    url: "https://cold04.com",
    description: "一个羞涩的小朋友的自我介绍页面",
    avatar: "https://cold04.com/avatar.png",
    color: "#28a745",
    tag: "DEV"
  },
  {
    name: "XenWayne's Blog",
    url: "https://xenwayne.top",
    description: "寸进具欢喜，万物皆可爱。",
    avatar: "https://gcore.jsdelivr.net/gh/XenWayne/sitefile@master/img/avatar_square.png",
    color: "#4280ff",
    tag: "DEV"
  },
  {
    "name": "苦小怕",
    "url": "https://doc.kulipai.top",
    "description": "A stduent.",
    "avatar": "https://doc.kulipai.top/avator.png",
    "color": "#5bae23",
    tag: "MINECRAFT"
  },
  {
    "name": "自留地 - GES233's Blog",
    "url": "https://ges233.github.io",
    "description": "得以存在便是一个奇迹，能够思考就是一件乐事。",
    "avatar": "https://avatars.githubusercontent.com/u/30802664?v=4",
    "color": "#FFB11B",
    tag: "DEV"
  },
  {
    name: "添加友链",
    url: "/friends/add",
    description: "点我添加友链",
    avatar: "",
    color: "#f0a1a8",
    tag: "添加友链"
  }
]

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

export default function FriendsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container max-w-6xl mx-auto px-4 py-12 md:py-24">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Friends</h1>
            <p className="text-xl text-muted-foreground/80 max-w-xl font-light leading-relaxed">
              这里有一些志同道合的朋友们
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {friends.map((friend, index) => (
              <FriendCard key={friend.url + index} friend={friend} />
            ))}
          </motion.div>
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

function FriendCard({ friend }: { friend: Friend }) {
  const [isHovered, setIsHovered] = useState(false)
  const isAddLink = friend.url === "/friends/add"
  const displayTag = friend.tag || "FRIEND"

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <a
        href={friend.url}
        target={isAddLink ? "_self" : "_blank"}
        rel="noreferrer"
        className="group relative flex flex-col items-center text-center space-y-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar Container */}
        <div className="relative">
          <AvatarWithFallback friend={friend} isAdd={isAddLink} />
          {/* Status Dot */}
          <span
            className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-background"
            style={{ backgroundColor: friend.color }}
          />
        </div>

        {/* Content */}
        <div className="space-y-2 w-full">
          <div className="flex justify-center relative">
            <div className="relative flex items-center">
              <h3 className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
                {friend.name}
              </h3>
              <ArrowUpRight className={`absolute left-full ml-1 w-4 h-4 text-muted-foreground/50 transition-all duration-300 ${isHovered ? 'opacity-100 -translate-y-0.5' : 'opacity-0 translate-y-1'}`} />
            </div>
          </div>

          <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed px-2 font-light">
            {friend.description}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-mono uppercase tracking-wider bg-muted text-muted-foreground/70">
              {displayTag}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

function AvatarWithFallback({ friend, isAdd }: { friend: Friend, isAdd: boolean }) {
  const [error, setError] = useState(false)
  const firstChar = friend.name.charAt(0).toUpperCase()

  if (isAdd) {
    return (
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
        <span className="text-2xl text-muted-foreground/50">+</span>
      </div>
    )
  }

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-500 ease-out shadow-sm">
      {error || !friend.avatar ? (
        <div
          className="flex h-full w-full items-center justify-center bg-muted text-2xl font-medium"
          style={{ color: friend.color }}
        >
          {firstChar}
        </div>
      ) : (
        <img
          src={friend.avatar}
          alt={friend.name}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
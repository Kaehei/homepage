"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { motion, useInView } from "framer-motion";
import { Camera, Calendar, Tag, Eye, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";

interface Photo {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  created?: number;
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

export default function PhotoPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    fetch("https://blog.kaeshi.top/photo.json")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch photos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container max-w-4xl mx-auto py-12 md:py-20">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-heading text-4xl md:text-6xl font-bold">Photo</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              一些记录，每一张照片都承载着独特的记忆和故事。
            </p>
          </motion.div>

          <motion.div 
            ref={containerRef} 
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <LoadingSpinner />
              </div>
            ) : (
              photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
                  className="group bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <Link href={`/photo/${photo.id}`} className="block">
                    <div className="flex flex-col lg:flex-row">
                      {/* 图片区域 */}
                      <div className="relative lg:w-2/5 h-64 lg:h-48 overflow-hidden">
                        <img
                          src={`https://blog.kaeshi.top${photo.thumbnail_url}`}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* 渐变遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        

                        
                        {/* 标签覆盖层 */}
                        {photo.tags && photo.tags.length > 0 && (
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                            {photo.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm text-gray-700 border-0">
                                {tag}
                              </Badge>
                            ))}
                            {photo.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm text-gray-700 border-0">
                                +{photo.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* 内容区域 */}
                      <div className="flex-1 p-6 lg:p-8">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {photo.title}
                            </h2>
                            
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                              {photo.description || "这张照片承载着美好的回忆，记录着生活中的精彩瞬间..."}
                            </p>
                          </div>
                          
                          {/* 箭头图标 */}
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        
                        {/* 底部信息 */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {photo.created 
                                ? new Date(parseInt(photo.created.toString()) * 1000).toLocaleDateString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })
                                : "未知时间"
                              }
                            </span>
                          </div>
                          
                          <span className="text-xs text-primary font-medium group-hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            查看详情
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
          
          {!loading && photos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">暂无照片</h3>
              <p className="text-muted-foreground">还没有上传任何照片</p>
            </motion.div>
          )}
        </section>
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
  );
}
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Camera } from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";

interface Photo {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  created?: number;
}

export default function PhotoPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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
      <main className="flex-1">
        <section className="container max-w-6xl mx-auto py-12 md:py-24 px-4">
          <motion.div
            className="mx-auto flex flex-col items-center space-y-4 text-center mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Gallery</h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl font-light leading-relaxed">
              Moments frozen in time.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <Link href={`/photo/${photo.id}`} className="block space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/20">
                      <img
                        src={`https://blog.kaeshi.top${photo.thumbnail_url}`}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.25,0.46,0.45,0.94] group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                          {photo.title}
                        </h2>
                        {photo.created && (
                          <span className="text-xs font-medium text-muted-foreground/50 font-mono tracking-wider tabular-nums">
                            {new Date(parseInt(photo.created.toString()) * 1000).getFullYear()}
                          </span>
                        )}
                      </div>

                      {photo.tags && photo.tags.length > 0 && (
                        <div className="text-sm text-muted-foreground/70">
                          {photo.tags[0]}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && photos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <Camera className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">暂无照片</p>
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
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/animate/scroll-reveal';
import { HoverScale } from './ui/animate/hover-scale';
import Link from 'next/link';
import { Badge } from './ui/badge';
import LoadingSpinner from './loading-spinner';
import { Calendar } from 'lucide-react';

interface Photo {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  tags: string[];
  created?: number;
}

export default function LatestPhotoCard() {
  const [latestPhoto, setLatestPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPhoto() {
      try {
        const res = await fetch('https://blog.kaeshi.top/photo.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // 按创建时间排序（降序）
          const sorted = [...data].sort((a: Photo, b: Photo) => {
            const dateA = Number(a.created || 0);
            const dateB = Number(b.created || 0);
            return dateB - dateA;
          });
          if (!cancelled) setLatestPhoto(sorted[0]);
        }
      } catch (error) {
        console.error('Failed to fetch latest photo:', error);
        if (!cancelled) setLatestPhoto(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPhoto();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!latestPhoto) {
    return (
      <ScrollReveal width="full">
        <HoverScale>
          <Link href="/photo" className="block">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">摄影 / Photography</h3>
              <div className="flex space-x-1">
                <Badge variant="secondary" className="text-xs">Side</Badge>
                <Badge variant="secondary" className="text-xs">Project</Badge>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">暂无照片</p>
            </div>
          </Link>
        </HoverScale>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal width="full">
      <HoverScale scale={1.01}>
        <Link href={`/photo/${latestPhoto.id}`} className="block group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold tracking-tight">摄影 / Photography</h3>
            <div className="flex items-center text-xs font-medium text-muted-foreground/80 bg-secondary/50 px-2 py-1 rounded-full">
              <Calendar className="w-3 h-3 mr-1.5" />
              <span>
                {latestPhoto.created
                  ? new Date(latestPhoto.created * 1000).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                  : '未知时间'}
              </span>
            </div>
          </div>

          <div className="relative mb-5 overflow-hidden rounded-xl border border-border/40 shadow-sm group-hover:shadow-md transition-all duration-300">
            <img
              src={`https://blog.kaeshi.top${latestPhoto.thumbnail_url}`}
              alt={latestPhoto.title}
              className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* 标签层 */}
            {latestPhoto.tags?.length > 0 && (
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {latestPhoto.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-white/90 dark:bg-black/60 backdrop-blur-md text-foreground border-0 shadow-sm"
                  >
                    {tag}
                  </Badge>
                ))}
                {latestPhoto.tags.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-white/90 dark:bg-black/60 backdrop-blur-md text-foreground border-0 shadow-sm"
                  >
                    +{latestPhoto.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
              {latestPhoto.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {latestPhoto.description || '这张照片承载着美好的回忆...'}
            </p>
          </div>
        </Link>
      </HoverScale>
    </ScrollReveal>
  );
}

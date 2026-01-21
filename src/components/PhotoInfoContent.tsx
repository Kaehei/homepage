import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import LoadingSpinner from '@/components/loading-spinner';
import Link from 'next/link';

interface PhotoData {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  exif: Record<string, string>;
  tags: string[];
  created_at: string;
}



export default function PhotoInfoContent() {
  const params = useParams();
  const id = (params.id as string) || '1';
  const [photo, setPhoto] = useState<PhotoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://blog.kaeshi.top/photo.json?id=${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`获取照片信息失败: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const rawData = Array.isArray(data) ? data[0] : data;
        if (rawData && rawData.id) {
          const photoData = {
            id: rawData.id,
            title: rawData.title,
            description: rawData.description,
            image_url: `https://blog.kaeshi.top${rawData.original_url}`,
            thumbnail_url: `https://blog.kaeshi.top${rawData.thumbnail_url}`,
            exif: rawData.exif || {},
            tags: rawData.tags || [],
            created_at: new Date(parseInt(rawData.created) * 1000).toISOString()
          };
          setPhoto(photoData);
        } else {
          throw new Error(data.error || '获取照片信息失败');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取照片信息失败');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPhoto();
    }
  }, [id]);

  useEffect(() => {
    if (photo) {
      Fancybox.bind('[data-fancybox]');
      return () => {
        Fancybox.destroy();
      };
    }
  }, [photo]);

  const handleImageClick = () => {
    if (photo) {
      Fancybox.show([{
        src: photo.image_url,
        caption: photo.title,
        type: 'image'
      }]);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  if (error || !photo) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Photo not found</h2>
          <Link href="/photo">
            <Button variant="outline">Back to Gallery</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="container max-w-7xl mx-auto py-8 md:py-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Link */}
          <Link href="/photo" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <span className="mr-2">←</span> Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-12 items-start">
            {/* Main Image Column */}
            <div className="space-y-6 md:space-y-8">
              <div
                className="relative rounded-2xl overflow-hidden bg-muted/20 cursor-zoom-in group"
                onClick={handleImageClick}
              >
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className={`w-full h-auto object-contain max-h-[70vh] md:max-h-[85vh] transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" /> View Fullscreen
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 px-1">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">{photo.title}</h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light text-pretty">
                  {photo.description}
                </p>
              </div>
            </div>

            {/* Sidebar / Info Rail */}
            <div className="space-y-8 md:space-y-10 lg:sticky lg:top-32">

              {/* Date & Tags */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Date Taken</div>
                  <div className="font-mono text-sm">
                    {new Date(photo.created_at).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {photo.tags && photo.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag) => (
                        <span key={tag} className="text-sm text-foreground/80 bg-secondary/50 px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-px bg-border/40" />

              {/* EXIF Data */}
              {photo.exif && Object.keys(photo.exif).length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">EXIF Data</div>
                  <div className="grid grid-cols-1 gap-3 md:gap-4 text-sm">
                    {Object.entries(photo.exif).map(([key, value]) => {
                      let displayValue = value;

                      // Handle missing or empty values
                      if (!displayValue || (typeof displayValue === 'string' && displayValue.trim() === '')) {
                        displayValue = 'N/A';
                      }

                      // Fix double f/ in aperture (e.g. "f/f/2.8" -> "f/2.8")
                      if (displayValue !== 'N/A' && (key.includes('光圈') || key.toLowerCase().includes('aperture')) && displayValue.startsWith('f/f/')) {
                        displayValue = displayValue.replace('f/f/', 'f/');
                      }

                      return (
                        <div key={key} className="flex justify-between items-center py-1 border-b border-border/20 last:border-0">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-mono text-foreground/90 text-right truncate max-w-[180px]">{displayValue}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
"use client";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">正在加载照片信息...</p>
        </div>
      </main>
    );
  }

  if (error || !photo) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">加载失败</h2>
          <p className="text-muted-foreground mb-6">{error || '照片不存在'}</p>
          <Link href="/photo">
            <Button>返回图库</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="container max-w-4xl mx-auto py-12 md:py-20">
        <motion.div 
          className="mx-auto flex flex-col items-center space-y-4 text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/photo" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← 返回图库
          </Link>
          <h1 className="font-heading text-4xl md:text-6xl font-bold">{photo.title}</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            {photo.description}
          </p>
        </motion.div>
        <motion.div 
          className="space-y-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* 照片展示 */}
          <Card className="relative overflow-hidden rounded-xl border bg-background shadow-lg">
            <CardContent className="p-0">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className={`w-full h-auto object-cover transition-all duration-500 ${isImageLoaded ? 'scale-100' : 'scale-105'}`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* 操作按钮 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      onClick={handleImageClick}
                      className="bg-white/90 text-black hover:bg-white shadow-lg"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      查看大图
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* 照片信息卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 标签 */}
            <Card className="relative overflow-hidden rounded-xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {photo.tags && photo.tags.length > 0 ? (
                    photo.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">暂无标签</p>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* 快速信息 */}
            <Card className="relative overflow-hidden rounded-xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  快速信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">上传时间</span>
                    <span className="font-medium">{new Date(photo.created_at).toLocaleDateString('zh-CN')}</span>
                  </div>
                  {photo.exif && Object.keys(photo.exif).length > 0 && (
                    <>
                      {photo.exif['分辨率'] && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">分辨率</span>
                          <span className="font-medium">{photo.exif['分辨率']}</span>
                        </div>
                      )}
                      {photo.exif['文件大小'] && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">文件大小</span>
                          <span className="font-medium">{photo.exif['文件大小']}</span>
                        </div>
                      )}
                      {photo.exif['拍摄时间'] && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">拍摄时间</span>
                          <span className="font-medium">{photo.exif['拍摄时间']}</span>
                        </div>
                      )}
                      {photo.exif['地点'] && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">拍摄地点</span>
                          <span className="font-medium">{photo.exif['地点']}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* EXIF 信息 */}
          {photo.exif && Object.keys(photo.exif).length > 0 && (
            <Card className="relative overflow-hidden rounded-xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  EXIF 信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3 font-medium">参数</TableHead>
                      <TableHead className="font-medium">数值</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(photo.exif).map(([key, value]) => (
                      <TableRow key={key} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{key}</TableCell>
                        <TableCell className="text-muted-foreground">{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </section>
    </main>
  );
}
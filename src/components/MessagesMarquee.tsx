import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './loading-spinner';

interface Comment {
  coid: number;
  cid: number;
  created: number;
  author: string;
  authorId: string;
  ownerId: string;
  mail: string;
  url: string | null;
  ip: string;
  agent: string;
  text: string;
  type: string;
  status: string;
  parent: string;
  stars: string;
}

export default function MessagesMarquee() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      try {
        const res = await fetch('https://blog.kaeshi.top/api/commentsByCid?cid=2');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const list = Array.isArray(data) ? data : data.data || [];
        const validComments = list
          .map((c: any) => ({
            ...c,
            created: Number(c.created || c.date || Date.now() / 1000),
          }))
          .filter((c: any) => c.author && c.text);

        if (!cancelled) setComments(validComments);
      } catch (err) {
        console.error('加载评论失败：', err);
        if (!cancelled) setComments([]); // 不显示假数据
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadComments();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <LoadingSpinner />;

  if (comments.length === 0) {
    return (
      <div className="py-2 text-center text-muted-foreground text-sm">
        暂无留言，来发布第一条留言吧！
      </div>
    );
  }

  const marqueeComments = [...comments, ...comments];

  return (
    <div className="relative overflow-hidden h-32 my-4">
      <motion.div
        className="absolute w-full"
        initial={{ y: 0 }}
        animate={{ y: -100 * comments.length }}
        transition={{
          duration: comments.length * 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {marqueeComments.map((comment, index) => (
          <motion.div
            key={`${comment.coid}-${index}`}
            className="py-2 px-4 border-b border-border flex items-start space-x-2"
            variants={itemVariants}
            initial="initial"
            animate="animate"
          >
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{comment.author}</p>
              <p className="text-xs text-muted-foreground mt-1">{comment.text}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {new Date(comment.created * 1000).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

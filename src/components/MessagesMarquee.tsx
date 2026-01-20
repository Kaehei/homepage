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
            // Ensure created is a valid timestamp number
            created: Number(c.created || c.date || Date.now() / 1000),
            // Parse emoji if needed, but for marquee simple text is safer or use parsing function if available. 
            // For now simple text truncation.
          }))
          .filter((c: any) => c.author && c.text);

        if (!cancelled) setComments(validComments);
      } catch (err) {
        console.error('Failed to load comments:', err);
        if (!cancelled) setComments([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadComments();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return (
    <div className="h-40 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  if (comments.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground font-light">
        No messages yet. Be the first to say hi!
      </div>
    );
  }

  // Duplicate for smooth infinite scroll
  const marqueeComments = [...comments, ...comments, ...comments];

  return (
    <div className="relative overflow-hidden py-8 mask-linear-fade">
      {/* 
         mask-linear-fade helps fade edges if supported, 
         otherwise relying on container overflow 
      */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        initial={{ x: 0 }}
        animate={{ x: "-33.33%" }}
        transition={{
          duration: Math.max(comments.length * 5, 20), // Adjust speed based on content
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {marqueeComments.map((comment, index) => (
          <div
            key={`${comment.coid}-${index}`}
            className="w-[280px] flex-shrink-0 p-5 rounded-2xl bg-muted/30 border border-border/40 backdrop-blur-sm transition-colors hover:bg-muted/50 hover:border-border/60"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-xs font-bold text-foreground border border-border/50 shadow-sm shrink-0">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold truncate text-foreground">{comment.author}</p>
                  <span className="text-[10px] text-muted-foreground/60 font-mono tracking-wider shrink-0">
                    {new Date(comment.created * 1000).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground/80 leading-relaxed font-light line-clamp-2">
                  {parseEmoji(comment.text)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Simple text processor to clean up emoji tags for marquee preview if needed, 
// or basic rendering. Since the original component in page.tsx had complex parsing, 
// here we might just strip the tags or simpler render. 
// Copied parseEmoji logic or simplified for the marquee card.
const parseEmoji = (text: string) => {
  // Simplified for preview: remove ::furry:123:: tags or replace with [sticker]
  return text.replace(/::furry:\d+::/g, '[Sticker]');
}

'use client'

import { MorphingText } from '@/components/ui/morphing-text';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Optimized easing for silky smooth animations
const smoothEase = [0.25, 0.1, 0.25, 1.0] as const; // Custom cubic-bezier for buttery smooth transitions
const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8
};


export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: smoothEase,
          delay: 0.1,
        }}
        className="mb-6"
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          className="relative w-32 h-32 rounded-full shadow-lg ring-4 ring-primary/60 overflow-hidden"
        >
          <Image
            src="/avatar.jpg"
            alt="头像"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.25,
          ease: smoothEase,
        }}
        className="mb-3"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          你好,我是 <span className="text-primary">Yang</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: smoothEase,
        }}
        className="text-lg md:text-xl text-muted-foreground h-10 mb-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <MorphingText
          texts={[
            'Make a dent in the universe.',
            '料青山略输我峥嵘.',
            'A Web <Developer /> .'
          ]}
          className="text-lg md:text-xl font-medium tracking-tight"
        />
      </motion.div>
    </section>
  );
}

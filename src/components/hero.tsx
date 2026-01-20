'use client'

import { MorphingText } from '@/components/ui/morphing-text';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="mb-6"
      >
        <div className="relative w-32 h-32 rounded-full shadow-lg ring-4 ring-primary/60 overflow-hidden">
          <Image
            src="/avatar.jpg"
            alt="头像"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="mb-3"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          你好，我是 <span className="text-primary">Yang</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="text-lg md:text-xl text-muted-foreground h-10 mb-4"
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

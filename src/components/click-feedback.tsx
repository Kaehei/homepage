'use client'

import { motion } from 'framer-motion';

interface ClickFeedbackProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ClickFeedback({ 
  children, 
  onClick,
  className = ''
}: ClickFeedbackProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0.1,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
} 
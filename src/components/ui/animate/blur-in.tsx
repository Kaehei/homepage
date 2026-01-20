"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurInProps extends HTMLMotionProps<"div"> {
    word?: string; // Optional single word mode
    duration?: number;
    delay?: number;
    className?: string;
    variant?: {
        hidden: { filter: string; opacity: number };
        visible: { filter: string; opacity: number };
    };
}

export function BlurIn({
    children,
    word,
    className,
    variant,
    duration = 1,
    delay = 0,
    ...props
}: BlurInProps) {
    const defaultVariants = {
        hidden: { filter: "blur(10px)", opacity: 0 },
        visible: { filter: "blur(0px)", opacity: 1 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out-quint
            variants={variant || defaultVariants}
            className={cn(className)}
            {...props}
        >
            {word || children}
        </motion.div>
    );
}

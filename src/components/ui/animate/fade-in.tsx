"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
    delay?: number;
    duration?: number;
    className?: string;
    variant?: Variants;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    className,
    variant,
    ...props
}: FadeInProps) {
    const defaultVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variant || defaultVariants}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // smooth fluid ease
            }}
            className={cn("w-full", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideInProps extends HTMLMotionProps<"div"> {
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    className?: string;
}

export function SlideIn({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 50,
    className,
    ...props
}: SlideInProps) {
    const getOutput = () => {
        switch (direction) {
            case "up":
                return { y: distance };
            case "down":
                return { y: -distance };
            case "left":
                return { x: distance };
            case "right":
                return { x: -distance };
            default:
                return { y: distance };
        }
    };

    const variants: Variants = {
        hidden: { opacity: 0, ...getOutput() },
        visible: { opacity: 1, x: 0, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={cn("w-full", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

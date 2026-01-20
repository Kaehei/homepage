"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverScaleProps extends HTMLMotionProps<"div"> {
    scale?: number;
    duration?: number;
}

export function HoverScale({
    children,
    className,
    scale = 1.05,
    duration = 0.2,
    ...props
}: HoverScaleProps) {
    return (
        <motion.div
            whileHover={{ scale: scale }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
            }}
            className={cn("cursor-pointer", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

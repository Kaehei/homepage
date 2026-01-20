"use client";

import { motion, useInView, UseInViewOptions, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
    options?: UseInViewOptions;
    delay?: number;
    duration?: number;
    width?: "fit-content" | "full";
}

export function ScrollReveal({
    children,
    className,
    options,
    delay = 0,
    duration = 0.5,
    width = "full",
    ...props
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px", ...options });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={cn(className, width === "full" ? "w-full" : "w-fit")}
            {...props}
        >
            {children}
        </motion.div>
    );
}

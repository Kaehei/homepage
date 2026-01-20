"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RollingTextProps {
    texts: string[];
    className?: string;
    duration?: number;
}

export function RollingText({
    texts,
    className,
    duration = 1.5,
}: RollingTextProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, duration * 1000);
        return () => clearInterval(interval);
    }, [texts.length, duration]);

    // Ensure we have a valid index even if texts changes
    const safeIndex = index % texts.length;
    const currentText = texts[safeIndex];

    return (
        <div className={cn("relative overflow-hidden inline-flex flex-col items-center justify-center h-[1.5em] w-full", className)}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={`${safeIndex}-${currentText}`}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 0.8
                    }}
                    className="absolute inset-0 flex items-center justify-center text-center w-full truncate"
                >
                    {currentText}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

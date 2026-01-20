"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface MorphingTextProps {
    texts: string[];
    className?: string;
    delay?: number; // Delay before starting the loop
    holdDelay?: number; // How long to hold each text
}

export function MorphingText({
    texts,
    className,
    delay = 0,
    holdDelay = 3500,
}: MorphingTextProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Initial delay before starting the loop logic
        const initialTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % texts.length);
            }, holdDelay);
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(initialTimeout);
    }, [texts.length, holdDelay, delay]);

    const currentText = texts[index];

    return (
        <div
            className={cn(
                "relative flex items-center justify-center text-center",
                className
            )}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                        initial: { transition: { staggerChildren: 0.03 } },
                        animate: { transition: { staggerChildren: 0.03 } },
                        exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } }
                    }}
                    className="flex flex-wrap items-center justify-center"
                >
                    {/* Character splitting with handling for spaces to prevent collapse */}
                    {currentText.split("").map((char, i) => (
                        <motion.span
                            key={`${index}-${i}`} // Refresh keys per text to ensure correct animation
                            variants={charVariants}
                            className="inline-block whitespace-pre"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

const charVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        y: 10,
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        y: -10,
        transition: {
            duration: 0.2
        }
    },
};

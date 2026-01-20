"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MarkdownContainer({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

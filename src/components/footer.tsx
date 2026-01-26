'use client'

import { motion } from "framer-motion"

const smoothEase = [0.25, 0.1, 0.25, 1.0] as const;

export default function Footer() {
    return (
        <motion.footer
            className="py-6 md:py-0 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.8,
                ease: smoothEase,
            }}
        >
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href="https://github.com/Kaehei"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                        Yang
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="https://github.com/Kaehei/homepage"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </motion.footer>
    )
}

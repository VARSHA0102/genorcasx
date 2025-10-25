"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    isDark = true,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    isDark?: boolean;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px]",
                        isDark 
                            ? "border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
                            : "border-2 border-black/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        isDark 
                            ? "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                            : "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "GenOrcasX",
    title1 = "Next-Gen AI",
    title2 = "Solutions",
    description = "Unlock the power of artificial intelligence with GenOrcasX's comprehensive suite of AI tools and enterprise solutions. Transform your business with cutting-edge technology.",
    isDark = true,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    isDark?: boolean;
}) {
    const [, setLocation] = useLocation();
    
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className={cn(
            "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
            isDark ? "bg-[#030303]" : "bg-gray-50"
        )}>
            <div className={cn(
                "absolute inset-0 blur-3xl",
                isDark 
                    ? "bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]"
                    : "bg-gradient-to-br from-indigo-300/[0.15] via-transparent to-rose-300/[0.15]"
            )} />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient={isDark ? "from-indigo-500/[0.15]" : "from-indigo-400/[0.25]"}
                    isDark={isDark}
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient={isDark ? "from-rose-500/[0.15]" : "from-rose-400/[0.25]"}
                    isDark={isDark}
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient={isDark ? "from-violet-500/[0.15]" : "from-violet-400/[0.25]"}
                    isDark={isDark}
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient={isDark ? "from-amber-500/[0.15]" : "from-amber-400/[0.25]"}
                    isDark={isDark}
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient={isDark ? "from-cyan-500/[0.15]" : "from-cyan-400/[0.25]"}
                    isDark={isDark}
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 md:mb-12",
                            isDark 
                                ? "bg-white/[0.03] border-white/[0.08]"
                                : "bg-black/[0.03] border-black/[0.08]"
                        )}
                    >
                        <Circle className="h-2 w-2 fill-primary" />
                        <span className={cn(
                            "text-sm tracking-wide",
                            isDark ? "text-white/60" : "text-black/60"
                        )}>
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight font-display">
                            <span className={cn(
                                "bg-clip-text text-transparent",
                                isDark 
                                    ? "bg-gradient-to-b from-white to-white/80"
                                    : "bg-gradient-to-b from-black to-black/80"
                            )}>
                                {title1}
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-blue-500">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className={cn(
                            "text-base sm:text-lg md:text-xl mb-8 leading-relaxed font-light tracking-wide max-w-3xl mx-auto px-4",
                            isDark ? "text-white/60" : "text-black/60"
                        )}>
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>  window.open('/tools', '_blank')}
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            data-testid="button-explore-tools-hero"
                        >
                            Explore AI Tools
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLocation('/contact')}
                            className={cn(
                                "px-8 py-4 rounded-lg font-medium text-lg border backdrop-blur-sm transition-all duration-300",
                                isDark
                                    ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                                    : "bg-black/5 border-black/20 text-black hover:bg-black/10"
                            )}
                            data-testid="button-watch-demo-hero"
                        >
                            Connect
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            <div className={cn(
                "absolute inset-0 pointer-events-none",
                isDark 
                    ? "bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80"
                    : "bg-gradient-to-t from-gray-50 via-transparent to-gray-50/80"
            )} />
        </div>
    );
}

export { HeroGeometric };
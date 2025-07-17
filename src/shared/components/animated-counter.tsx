"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useSpring, useMotionValue, useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    className?: string;
    label?: string;
    index?: number;
}

export function AnimatedCounter({
    target,
    duration = 2,
    className,
    label,
    index = 0,
}: AnimatedCounterProps) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 });
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const startDelay = index * 500; // milissegundos

            const timeout = setTimeout(() => {
                const animation = animate(motionValue, target, {
                    duration,
                    onUpdate: (latest) => {
                        setProgress((latest / target) * 100);
                    },
                });
                setHasAnimated(true);
                return () => animation.stop();
            }, startDelay);

            return () => clearTimeout(timeout);
        }
    }, [isInView, target, duration, motionValue, index, hasAnimated]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setCount(Math.floor(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col items-center my-30 ${className}`}
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.5,
                ease: "easeOut",
            }}
        >
            <div className="relative w-52 h-52">
                <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="url(#grad)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="grad" x1="0" x2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#312785" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute top-2.5 left-2.5 w-[calc(100%-20px)] h-[calc(100%-20px)] rounded-full flex items-center justify-center text-4xl font-bold text-white">
                    {count.toLocaleString()}
                </div>
            </div>

            {label && (
                <div className="mt-4 text-xl font-semibold text-white text-center">
                    {label}
                </div>
            )}
        </motion.div>
    );
}

import React, { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "../utils/ui";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    const addAnimation = useCallback(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            if (containerRef.current) {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    direction === "left" ? "forwards" : "reverse"
                );

                let duration = "40s";
                if (speed === "fast") duration = "20s";
                else if (speed === "slow") duration = "80s";

                containerRef.current.style.setProperty("--animation-duration", duration);
            }

            setStart(true);
        }
    }, [direction, speed]);

    useEffect(() => {
        addAnimation();
    }, [addAnimation]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className,
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {items.map((item) => (
                    <li
                        className="relative w-[350px] max-w-full shrink-0 rounded-2xl px-8 py-6 md:w-[450px] bg-black"
                        key={item.name}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-2xl blur-xs opacity-70 bg-gradient-to-br from-blue-500 via-violet-500 to-[#312785] -z-10"
                        />

                        <blockquote className="relative z-20">
                            <span className="text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-100">
                                {item.quote}
                            </span>
                            <div className="mt-6 flex flex-row items-center">
                                <span className="flex flex-col gap-1">
                                    <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                                        {item.name}
                                    </span>
                                    <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                                        {item.title}
                                    </span>
                                </span>
                            </div>
                        </blockquote>
                    </li>



                ))}
            </ul>
        </div >
    );
};

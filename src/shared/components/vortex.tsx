/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "motion/react";
import { cn } from "../utils/ui";
import { HeroSectionOne } from "./hero";
import { ParallaxSections } from "./parallax-section";
import { AnimatedCounter } from "./animated-counter";
import { TimelineDapp } from "./timeline-dapp";
import { TokenForm } from "./forms";
import { InfiniteMovingCardsTestimonials } from "./testimonials";
import { FaqSection } from "./faq-section";
import { Footer } from "./footer";

interface VortexProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    particleCount?: number;
    rangeY?: number;
    baseHue?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef(null);
    const animationFrameId = useRef<number>(0);
    const particleCount = props.particleCount || 700;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = props.rangeY || 100;
    const baseTTL = 50;
    const rangeTTL = 150;
    const baseSpeed = props.baseSpeed || 0.0;
    const rangeSpeed = props.rangeSpeed || 1.5;
    const baseRadius = props.baseRadius || 1;
    const rangeRadius = props.rangeRadius || 2;
    const baseHue = props.baseHue || 220;
    const rangeHue = 100;
    const noiseSteps = 3;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    const backgroundColor = props.backgroundColor || "#000000";
    let tick = 0;
    const noise3D = createNoise3D();
    let particleProps = new Float32Array(particlePropsLength);
    const center: [number, number] = [0, 0];

    const HALF_PI: number = 0.5 * Math.PI;
    const TAU: number = 2 * Math.PI;
    const TO_RAD: number = Math.PI / 180;
    const rand = (n: number): number => n * Math.random();
    const randRange = (n: number): number => n - rand(2 * n);
    const fadeInOut = (t: number, m: number): number => {
        const hm = 0.5 * m;
        return Math.abs(((t + hm) % m) - hm) / hm;
    };
    const lerp = (n1: number, n2: number, speed: number): number =>
        (1 - speed) * n1 + speed * n2;

    const setup = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (canvas && container) {
            const ctx = canvas.getContext("2d");

            if (ctx) {
                resize(canvas, ctx);
                initParticles();
                draw(canvas, ctx);
            }
        }
    };

    const initParticles = () => {
        tick = 0;
        // simplex = new SimplexNoise();
        particleProps = new Float32Array(particlePropsLength);

        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
            initParticle(i);
        }
    };
    const initParticle = (i: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const x = rand(canvas.width);
        const y = center[1] + randRange(rangeY);
        const vx = 0;
        const vy = 0;
        const life = 0;
        const ttl = baseTTL + rand(rangeTTL);
        const speed = baseSpeed + rand(rangeSpeed);
        const radius = baseRadius + rand(rangeRadius);
        const hue = baseHue + rand(rangeHue);

        particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };


    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        tick++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawParticles(ctx);
        renderGlow(canvas, ctx);
        renderToScreen(canvas, ctx);

        animationFrameId.current = window.requestAnimationFrame(() =>
            draw(canvas, ctx),
        );
    };

    const drawParticles = (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
            updateParticle(i, ctx);
        }
    };

    const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const i2 = 1 + i;
        const i3 = 2 + i;
        const i4 = 3 + i;
        const i5 = 4 + i;
        const i6 = 5 + i;
        const i7 = 6 + i;
        const i8 = 7 + i;
        const i9 = 8 + i;

        const x = particleProps[i];
        const y = particleProps[i2];
        const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
        const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
        const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
        let life = particleProps[i5];
        const ttl = particleProps[i6];
        const speed = particleProps[i7];
        const x2 = x + vx * speed;
        const y2 = y + vy * speed;
        const radius = particleProps[i8];
        const hue = particleProps[i9];

        drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

        life++;

        particleProps[i] = x2;
        particleProps[i2] = y2;
        particleProps[i3] = vx;
        particleProps[i4] = vy;
        particleProps[i5] = life;

        (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
    };


    const drawParticle = (
        x: number,
        y: number,
        x2: number,
        y2: number,
        life: number,
        ttl: number,
        radius: number,
        hue: number,
        ctx: CanvasRenderingContext2D,
    ) => {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = radius;
        ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };

    const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement) => {
        return x > canvas.width || x < 0 || y > canvas.height || y < 0;
    };

    const resize = (
        canvas: HTMLCanvasElement,
        ctx?: CanvasRenderingContext2D,
    ) => {
        const { innerWidth, innerHeight } = window;

        canvas.width = innerWidth;
        canvas.height = innerHeight;

        center[0] = 0.5 * canvas.width;
        center[1] = 0.5 * canvas.height;
    };

    const renderGlow = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) => {
        ctx.save();
        ctx.filter = "blur(8px) brightness(200%)";
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();

        ctx.save();
        ctx.filter = "blur(4px) brightness(200%)";
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    };

    const renderToScreen = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) => {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            resize(canvas, ctx);
        }
    };

    useEffect(() => {
        setup();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <>

            <div className={cn(" w-full  max-w-screen-2xl mx-auto inset-0 ", props.containerClassName)}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    ref={containerRef}
                    className="absolute inset-0 z-0 flex h-screen w-full items-center justify-center bg-transparent"
                >
                    <canvas ref={canvasRef} className="block h-full w-full" />
                </motion.div>

                <div className={cn("relative max-w-screen-2xl justify-center  items-center mx-auto z-10 h-screen w-full", props.className)}>
                    <HeroSectionOne />
                    <ParallaxSections />
                    <TimelineDapp />
                    <div className="flex flex-col md:flex-row md:gap-4 md:justify-evenly items-center">
                        <AnimatedCounter index={0} target={17056} duration={3.5} label="Tokens Criados" />
                        <AnimatedCounter index={1} target={3000} duration={4.5} label="Usuários Ativos" />
                        <AnimatedCounter index={2} target={987} duration={5.2} label="Transações Hoje" />

                    </div>
                    <TokenForm />
                    <InfiniteMovingCardsTestimonials />
                    <FaqSection />
                    <Footer />

                </div>
            </div>
        </>

    );
};

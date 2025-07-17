"use client";

import React from "react";

import { motion } from "motion/react";

import Image from "next/image";
import { Navbar } from "./navbar";


export const HeroSectionOne: React.FC = () => {
    const firstLine = "Crie seu Próprio Token".split(" ");
    const secondLine = "em segundos".split(" ");

    return (<>
        <Navbar />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center mt-20 md:my-60 ">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-20">
                <Image
                    src="/assets/oberidium2.png"
                    height={200}
                    width={200}
                    className="scale-x-[-1] brightness-125 saturate-150 contrast-125"
                    alt="Oberidium"
                />
            </motion.div>

            <div className="w-full px-4 py-10 md:py-20 text-center">
                {/* Primeira linha do título */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mx-auto mb-2 max-w-4xl text-3xl font-bold text-white md:text-5xl lg:text-6xl"
                >
                    {firstLine.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeInOut",
                            }}
                            className="mr-2 inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Segunda linha com gradiente */}
                <span className="block">
                    {secondLine.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: firstLine.length * 0.1 + index * 0.1,
                                ease: "easeInOut",
                            }}
                            className=" relative z-10 mx-auto mb-2 max-w-2xl text-3xl font-bold  md:text-5xl lg:text-6xl mr-2 inline-block bg-gradient-to-r from-blue-500 via-violet-500
                            to-[#312785]  bg-clip-text text-transparent"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>


                {/* Parágrafo */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="relative z-10 mx-auto max-w-2xl py-6 text-base font-normal text-gray-100 md:text-xl"
                >
                    Com a <span className="font-bold bg-gradient-to-br from-blue-500 via-violet-500
                            to-[#312785] bg-clip-text text-transparent">Token Forge</span>, você pode lançar seu token em minutos! <br /> Configure nome, supply, blockchain e comece sua jornada Web3 agora.
                </motion.p>
            </div>



        </div>
    </>

    );
};



"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";



const steps = [
    {
        title: "Conecte sua carteira MetaMask",
        description: "Comece conectando sua carteira para continuar.",
        image: "/assets/metamask.png",
    },
    {
        title: "Preencha os dados do Token",
        description: "Escolha nome, símbolo, supply e outras configurações.",
        image: "/assets/dados.png",
    },
    {
        title: "Faça o deploy do Token",
        description: "Com um clique, seu token será lançado na rede.",
        image: "/assets/deploy.png",
    },
];

export const ParallaxSections: React.FC = () => {
    return (
        <>
            <section className="w-full py-20  bg-black">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    Como Funciona
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto px-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="rounded-2xl  p-1 max-w-sm w-full"
                        >
                            <div className="rounded-2xl w-full h-full bg-black p-6 shadow-xl flex flex-col justify-between">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={400}
                                    height={250}
                                    className="rounded-full mb-6 w-full h-48 object-contain"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-md text-gray-100">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

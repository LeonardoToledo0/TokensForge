"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Divider } from "./divider";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "Como funciona a plataforma?",
        answer: "Nossa plataforma conecta usuários com experiências reais e seguras.",
    },
    {
        question: "Posso cancelar quando quiser?",
        answer: "Sim, você pode cancelar sua conta a qualquer momento sem custo.",
    },
    {
        question: "Os dados são protegidos?",
        answer: "Utilizamos criptografia e padrões de segurança avançados.",
    },
];

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 my-30 flex flex-col md:flex-row gap-10 items-start justify-between">
            {/* Animação do título (começa da esquerda) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Divider title="Perguntas Frequentes" />
            </motion.div>

            {/* Animação do acordeon (entra depois) */}
            <motion.div
                className="flex-1 w-full space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                {faqs.map((item, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-700 pb-4 cursor-pointer"
                        onClick={() => toggle(index)}
                    >
                        <div className="flex items-center gap-3 text-lg font-medium text-white">
                            {openIndex === index ? (
                                <Minus className="w-5 h-5 text-blue-500" />
                            ) : (
                                <Plus className="w-5 h-5 text-violet-500" />
                            )}
                            <span className="flex-1">{item.question}</span>
                        </div>
                        {openIndex === index && (
                            <p className="mt-2 text-sm text-gray-300">{item.answer}</p>
                        )}
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

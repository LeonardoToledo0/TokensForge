"use client";
import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";

export const Footer = () => {
    const footerLinks = [
        {
            title: "Plataforma",
            links: ["Como funciona", "Planos", "Segurança"],
        },
        {
            title: "Empresa",
            links: ["Sobre nós", "Carreiras", "Blog"],
        },
        {
            title: "Suporte",
            links: ["Central de ajuda", "Contato", "Privacidade"],
        },
    ];

    return (
        <footer className="relative  text-white border-t border-gray-800 px-6 py-16 mt-20">
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}


            >
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 text-transparent bg-clip-text">
                        Leonardo Toledo Tech
                    </h2>
                    <p className="text-sm mt-3 text-gray-100">
                        Construindo experiências digitais com inovação, segurança e performance.
                    </p>
                </div>

                {footerLinks.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + idx * 0.2 }}
                        viewport={{ once: false, amount: 0.3 }}

                    >
                        <h3 className="text-lg font-semibold mb-3 text-white">{section.title}</h3>
                        <ul className="space-y-2 text-sm text-gray-4100">
                            {section.links.map((link, i) => (
                                <li
                                    key={i}
                                    className="hover:text-violet-400 transition-colors duration-200 cursor-pointer"
                                >
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <span>&copy; {new Date().getFullYear()} Leonardo Tech. Todos os direitos reservados.</span>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <SiGithub className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.2 }}
                        className=" hover:text-white transition text-transparent bg-clip-text"
                    >
                        <SiLinkedin className="w-5 h-5 text-white" />
                    </motion.a>
                </div>
            </div>
        </footer>
    );
};

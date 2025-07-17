import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type FieldName = "name" | "symbol" | "supply";

export const TokenForm = () => {
    const [formData, setFormData] = useState<Record<FieldName, string>>({
        name: "",
        symbol: "",
        supply: "",
    });
    const [network, setNetwork] = useState("");

    // Estado que controla se o dropdown está visível na viewport
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dropdownRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowDropdown(true);
                    observer.disconnect(); // Para não ficar observando depois de mostrar
                }
            },
            {
                root: null, // viewport
                threshold: 0.1, // 10% visível já conta
            }
        );

        observer.observe(dropdownRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (["name", "symbol", "supply"].includes(name)) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted:", {
            ...formData,
            network,
        });
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden my-30">
            {/* 🔵 Animated border wire */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ transform: "rotate(45deg)" }}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-[#312785] animate-border-x" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-[#312785] animate-border-x" />
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 via-violet-500 to-[#312785] animate-border-y" />
                <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-blue-500 via-violet-500 to-[#312785] animate-border-y" />
            </motion.div>

            {/* 💠 Central Form */}
            <motion.form
                onSubmit={handleSubmit}
                className="z-10 w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-10 sm:py-12 space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h2
                    className="text-white text-2xl sm:text-3xl font-bold text-center tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Criar Token
                </motion.h2>

                {/* Dropdown para selecionar a rede — só renderiza e anima se estiver visível */}
                <div ref={dropdownRef}>
                    {showDropdown && (
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm text-neutral-300">Selecione a rede</label>
                            <select
                                value={network}
                                onChange={(e) => setNetwork(e.target.value)}
                                required
                                className="w-full px-4 py-3 pr-8 rounded-xl text-white bg-[#1a1a3c] border border-transparent
                    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-blue-500 placeholder:text-neutral-400
                    transition-all shadow-md hover:shadow-violet-500/20 appearance-none relative"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 0.75rem center",
                                    backgroundSize: "1em",
                                }}
                            >
                                <option value="" disabled>
                                    Selecione a rede
                                </option>
                                <option value="ethereum">Ethereum</option>
                                <option value="bsc">Binance Smart Chain</option>
                                <option value="polygon">Polygon</option>
                                <option value="avalanche">Avalanche</option>
                            </select>
                        </motion.div>
                    )}
                </div>

                {/* 🔮 Círculos animados em camadas */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className={`absolute rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-500 via-violet-500 to-[#312785]`}
                            style={{
                                width: `${700 + index * 100}px`,
                                height: `${700 + index * 100}px`,
                            }}
                            initial={{ scale: 0 }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 360, 0],
                            }}
                            transition={{
                                duration: 12,
                                delay: index * 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>

                {(["name", "symbol", "supply"] as FieldName[]).map((field, i) => (
                    <motion.div
                        key={field}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    >
                        <label className="block text-sm text-neutral-300 capitalize">
                            {field === "name"
                                ? "Nome do Token"
                                : field === "symbol"
                                    ? "Símbolo"
                                    : "Supply"}
                        </label>
                        <input
                            type={field === "supply" ? "number" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                                field === "name"
                                    ? "ex: My Token"
                                    : field === "symbol"
                                        ? "ex: TKN"
                                        : "ex: 210000000"
                            }
                            className="w-full px-4 py-3 rounded-xl text-white bg-[#1a1a3c] border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-blue-500 placeholder:text-neutral-400 transition-all shadow-md hover:shadow-violet-500/20 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                        />
                    </motion.div>
                ))}

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-[#312785] shadow-xl hover:brightness-110 transition-all"
                >
                    Deploy Token
                </motion.button>
            </motion.form>
        </div>
    );
};

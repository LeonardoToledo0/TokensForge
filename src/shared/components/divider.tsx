import React from "react";

interface DividerProps {
    title: string;
}

export const Divider: React.FC<DividerProps> = ({ title }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center my-16 px-4">
            {/* Título com gradiente dinâmico */}
            <h2 className="w-full max-w-screen-xl text-center text-3xl font-bold md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-500 via-violet-500 to-[#312785] bg-clip-text text-transparent mb-10">
                {title}
            </h2>

            {/* Linha com brilho animado */}
            <div className="relative w-full max-w-2xl mx-auto h-[6px]">
                {/* Linha parada */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent z-10" />

                {/* Brilho animado */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm z-20 shimmer-gradient" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[5px] bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm z-20 shimmer-gradient" />
            </div>
        </div>
    );
};

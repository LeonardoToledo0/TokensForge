"use client";

import React from "react";
import Image from "next/image";


export const Navbar: React.FC = () => {
    return (
        <>
            <nav className="fixed top-4  bg-black left-0 right-0 z-50 mx-auto max-w-screen-xl flex items-center justify-between py-6 px-4 rounded-full  dark:border-neutral-800 shadow-lg">
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/assets/oberidium2.png"
                        height={10}
                        width={40}
                        className="scale-x-[-1] brightness-125 saturate-150 contrast-125"
                        alt="Oberidium"
                    />
                    <h1 className="text-base font-bold md:text-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-[#312785] bg-clip-text text-transparent">
                        Token Forge
                    </h1>
                </div>
                <button className="w-24 transform rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-[#312785] py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 md:w-32 text-center">
                    Conectar
                </button>
            </nav>

        </>
    );
};

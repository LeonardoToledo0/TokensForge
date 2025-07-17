"use client";

import React from "react";
import Image from "next/image";
import { Timeline } from "./timeline";


export const TimelineDapp = () => {
    const data = [
        {
            title: "1 passo",
            content: (
                <div className="flex flex-col-reverse md:flex-row judstify-center items-center bg-black">
                    <div className="w-full">
                        <p className=" text-sm text-gray-100 md:text-lg w-full justify-center items-center text-startl">
                            O primeiro passo é conectar sua carteira MetaMask. Isso permite que nosso sistema reconheça sua identidade digital na blockchain, garantindo segurança e autenticidade em cada certificação emitida.
                        </p>

                    </div>

                    <div className="w-full">
                        <Image
                            src="/assets/conectar.png"
                            alt="startup template"
                            width={300}
                            height={300}
                            className="w-90 h-90 object-contain"

                        />

                    </div>
                </div>
            ),
        },
        {
            title: "2 passo",
            content: (
                <div className="flex flex-col-reverse md:flex-row judstify-center items-center">
                    <div className="w-full" >
                        <p className=" text-sm text-gray-100 md:text-lg w-full justify-center items-center text-start">
                            Agora que sua carteira está conectada, preencha os dados necessários para criar o seu Token. Esses dados incluem o nome do certificado, um símbolo que o represente (como uma sigla), e a quantidade de unidades que deseja emitir. Essas informações serão utilizadas para gerar o certificado digital na blockchain, garantindo sua identificação única e validade permanente.
                        </p>

                    </div>



                    <div className="w-full">
                        <Image
                            src="/assets/template.png"
                            alt="startup template"
                            width={300}
                            height={300}
                            className="w-90 h-90 object-contain"

                        />
                    </div>
                </div>
            ),
        },
        {
            title: "3 passo",
            content: (
                <div className="flex flex-col-reverse text-gray-100 md:flex-row judstify-center items-center">
                    <div className="w-full">
                        <p className="text-sm md:text-lg w-full justify-center items-center text-start">
                            Com os dados preenchidos, é hora de realizar o deploy do Token. Isso significa registrar o seu certificado digital na blockchain. Ao confirmar essa ação, sua carteira (como a MetaMask) solicitará a autorização da transação. Após a aprovação, o Token será criado e ficará disponível publicamente na rede, assegurando sua autenticidade, integridade e validade permanente.
                        </p>

                    </div>
                    <div className="w-full">
                        <Image
                            src="/assets/rede.png"
                            alt="startup template"
                            width={300}
                            height={300}
                            className="w-90 h-90 object-contain"

                        />
                    </div>




                </div>
            ),
        },
        {
            title: "4 passo",
            content: (
                <div className="flex flex-col-reverse text-gray-100 md:flex-row judstify-center items-center">
                    <div className="w-full">
                        <p className=" text-sm md:text-lg w-full justify-center items-center text-start ">
                            Parabéns! O certificado digital foi emitido com sucesso e registrado na blockchain. Agora ele está disponível de forma pública, segura e imutável, podendo ser verificado a qualquer momento por meio do endereço do Token ou hash da transação. Você pode compartilhar esse certificado com empregadores, instituições ou colegas com total confiança na sua autenticidade.
                        </p>
                    </div>
                    <div className="w-full">
                        <Image
                            src="/assets/finalizar.png"
                            alt="Token emitido"
                            width={300}
                            height={300}
                            className="w-90 h-90 object-contain"
                        />
                    </div>

                </div>
            ),
        }

    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}

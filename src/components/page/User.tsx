"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { GET_user } from "@/server-actions";
import type { UserData } from "@/types/server-response";
import { UserType } from "@/types/forms";

import ErrorComponent from "../ui/Error";

import { IMAGE_DEFAULT } from "@/utils/global-vars";

export default function User({ userId }: { userId: string }) {
    const [loadinData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await GET_user(userId);

                if (response.usuario) {
                    console.log(response.usuario);
                    setUserData(response.usuario);
                    setLoadingData(false);
                } else {
                    throw new Error('No se pudo obtener la información del usuario');
                }
            } catch (error) {
                console.log(error);

                setUserData(null);
                setLoadingData(false);
            }
        }

        //getUser();

        if (userId === "999") {
            setUserData({
                id_usuarios: "999",
                nombre: "nombre de prueba",
                correo: "test@correo.com",
                telefono: "989898",
                tipos_usuario_id: 0,
                imagen: null
            })

            setLoadingData(false);
        } else {
            getUser();
        }
    }, [userId])

    if (loadinData) return (
        <div className="w-content">
            <div className="my-12">
                <div className="sm:flex items-center gap-6 flex-row">
                    <div className="relative h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-full mb-5 object-cover">
                        <div className="skeleton-circle w-full h-full"></div>
                    </div>

                    <div>
                        <div className="skeleton w-full sm:w-96 h-7 lg:h-12 mb-2"></div>
                        <div className="skeleton w-8/12 h-4 lg:h-6"></div>
                    </div>
                </div>

                <div className="mt-7 text-sm lg:text-lg lg:flex items-center justify-start">
                    <div className="mb-3 lg:mb-0 lg:mr-5 skeleton w-12 h-4 lg:h-6"></div>
                    <div className="inline-block skeleton h-7 lg:h-12 w-24 lg:w-28 mr-3"></div>
                    <div className="inline-block skeleton h-7 lg:h-12 w-24 lg:w-28"></div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <main>
                <div className="w-content">
                    {userData ? (
                        <div className="my-12">
                            <div className="sm:flex items-center gap-6 flex-row">
                                <div className="relative h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-full mb-5 object-cover">
                                    <Image
                                        src={userData.imagen ?? IMAGE_DEFAULT}
                                        alt="profile-img"
                                        fill
                                        sizes="50vw, (min-width: 1024px) 100vw"
                                        className="rounded-full object-cover"
                                        priority
                                    />
                                </div>

                                <div>
                                    <h3 className="text-color2 font-semibold text-3xl lg:text-5xl">{userData.nombre} <span className="text-sm lg:text-lg text-color8 rounded-full">{`(${userData.tipos_usuario_id === 1 ? UserType.empresa : UserType.particular})`}</span></h3>
                                    <h4 className="text-color2 lg:text-xl">{userData.correo}</h4>
                                </div>
                            </div>

                            <div className="mt-7 text-sm lg:text-lg lg:flex items-center justify-start">
                                <p className="text-color2 mb-3 lg:mb-0 text-xl lg:mr-5">Roles: </p>
                                <p className="bg-col text-color5 rounded-full py-1 px-4 inline-block font-semibold border-2 border-solid border-color5 mr-3">CLIENTE</p>
                                <p className="bg-col text-color5 rounded-full py-1 px-4 inline-block font-semibold border-2 border-solid border-color5">PROVEEDOR</p>
                            </div>
                        </div>
                    ) : (
                        <ErrorComponent title="Usuario no encontrado" message="Vuelve al inicio para encontrar a otros usuarios" />
                    )}
                </div>
            </main>

            {userData && (
                <section className="my-20">
                    <div className="w-content">
                        <h3 className="text-center text-color2 font-bold text-2xl lg:text-4xl">No hay servicios de este usuario para mostrar.</h3>
                    </div>
                </section>
            )}
        </>
    )
}

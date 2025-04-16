"use client";

import { useEffect } from "react";
import Image from "next/image";

import { GET_user } from "@/server-actions";
import type { UserData } from "@/types/server-response";

import ErrorComponent from "../ui/Error";

import useGetData from "@/hooks/useGetData";

const SkeletonUser = () => {
    return (
        <div className="w-content" data-testid="skeleton-user">
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
}

export default function User({ userId }: { userId: string }) {
    const {setFetchData, fetchData, loadingData, setLoadingData} = useGetData<UserData>();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await GET_user(userId);

                console.log(response);

                if (response.usuario) {
                    setFetchData(response.usuario);
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }

            setLoadingData(false);
        }

        getUser();
    }, [userId, setFetchData, setLoadingData])

    if (loadingData) return <SkeletonUser />;

    return (
        <>
            <main>
                <div className="w-content">
                    {fetchData ? (
                        <div className="my-12" data-testid="user-data-container">
                            <div className="sm:flex items-center gap-6 flex-row">
                                <div className="relative h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-full mb-5 object-cover">
                                    <Image
                                        src={fetchData.imagen}
                                        alt="profile-img"
                                        fill
                                        sizes="50vw, (min-width: 1024px) 100vw"
                                        className="rounded-full object-cover"
                                        priority
                                    />
                                </div>

                                <div>
                                    <h3 className="text-color2 font-semibold text-3xl lg:text-5xl">{fetchData.nombre} <span className="text-sm lg:text-lg text-color8 rounded-full">{`(${fetchData.tipo_usuario.tipo})`}</span></h3>
                                    <h4 className="text-color2 lg:text-xl">{fetchData.correo}</h4>
                                </div>
                            </div>

                            <div className="mt-7 text-sm lg:text-lg lg:flex items-center justify-start">
                                <p className="text-color2 mb-3 lg:mb-0 text-xl lg:mr-5">Roles: </p>

                                {fetchData.roles.map((role) => (
                                    <p key={role.id_roles} className="bg-col text-color5 rounded-full py-1 px-4 inline-block font-semibold border-2 border-solid border-color5 mr-3">{role.tipo}</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ErrorComponent title="Usuario no encontrado" message="Vuelve al inicio para encontrar a otros usuarios" />
                    )}
                </div>
            </main>
        </>
    )
}

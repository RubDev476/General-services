"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GET_services } from "@/server-actions";
import type { Service } from "@/types/server-response";
import ErrorComponent from "../ui/Error";

import useGetData from "@/hooks/useGetData";

const SkeletonService = () => {
    return (
        <main className="my-7" data-testid="skeleton-service">
            <div className="w-content">
                <article className="sm:flex gap-4 overflow-hidden sm:max-h-[300px]">
                    <div className="w-auto sm:w-full sm:max-w-[400px] h-[200px] lg:h-[300px] relative">
                        <div className="skeleton h-full w-full"></div>
                    </div>

                    <div className="py-4 w-full">
                        <div className="skeleton w-full h-10 mb-4"></div>
                        <div className="skeleton w-full h-6 mb-4"></div>
                        <div className="skeleton w-full h-6 mb-4"></div>
                    </div>
                </article>

                <div className="flex flex-col gap-6 mt-10 sm:flex-row-reverse">
                    <div className="basis-2/3 skeleton h-20"></div>

                    <div className="basis-1/3 min-w-[200px] ">
                        <div className="w-full skeleton h-20"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default function Page({ idService }: { idService: string }) {
    const {loadingData, setFetchData, fetchData, setLoadingData} = useGetData<Service>();

    useEffect(() => {
        const getService = async () => {
            try {
                const res = await GET_services("/servicios/" + idService);

                console.log(res);

                if(res.servicio) {
                    setFetchData(res.servicio);
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }
            
            setLoadingData(false);
        }

        getService();
    }, [idService, setFetchData, setLoadingData])

    if(loadingData) return <SkeletonService />;

    if(!fetchData && !loadingData) return <ErrorComponent title="Servicio no encontrado" message="Vuelva al inicio para explorar otros servicios" />;

    if(fetchData && !loadingData) return (
        <>
            <main className="my-7">
                <div className="w-content">
                    <article className="sm:flex gap-4 overflow-hidden sm:max-h-[300px]">
                        <div className="w-auto sm:w-full sm:max-w-[400px] h-[200px] lg:h-[300px] relative">
                            <Image src={fetchData.imagen} alt="service-img" fill priority className="object-cover" sizes="30vw" />
                        </div>

                        <div className="py-4 w-full">
                            <h4 className="text-color2 font-semibold text-xl lg:text-3xl">{fetchData.nombre} <span className="text-color8 text-sm lg:text-lg">{`(${fetchData.disponibilidad_servicio.estado})`}</span></h4>

                            <hr className="text-color8 mb-4" />

                            <p className="text-color6 font-bold mb-2 text-xl lg:text-2xl">{`$${fetchData.precio}`}</p>

                            <p className="text-color8 text-sm"><FontAwesomeIcon icon={faLocationDot} className="text-sm lg:text-lg" /> {fetchData.ubicacion}</p>
                        </div>
                    </article>

                    <div className="flex flex-col gap-6 mt-10 sm:flex-row-reverse">
                        <div className="basis-2/3">
                            <h4 className="text-color2 text-sm mb-4 lg:text-lg">Descripcion: </h4>

                            <p className="text-color2">{fetchData.descripcion}</p>
                        </div>

                        <div className="basis-1/3 min-w-[200px] ">
                            <p className="text-color2  text-sm lg:text-lg">Publicado por: <Link href={`/user/${fetchData.usuarios_proveedores.id_usuarios}`} className="text-md underline font-medium">{fetchData.usuarios_proveedores.nombre}</Link></p>

                            <button className="btn-1 mt-4">Reservar</button>
                        </div>
                    </div>

                    <hr className="text-color8 my-6" />
                </div>
            </main>

            <div className="mb-7">
                <div className="w-content">
                    <h4 className="text-color2 font-medium text-xl">Comentarios (0)</h4>
                </div>
            </div>
        </>
    )
}
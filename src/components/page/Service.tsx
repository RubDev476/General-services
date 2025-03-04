"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GET_services, GET_user } from "@/server-actions";
import type { Service } from "@/types/server-response";
import ErrorComponent from "../ui/Error";

const dispo = ["DISPONIBLE", "AGOTADO", "PROXIMAMENTE"];

const SkeletonService = () => {
    return (
        <main className="my-7">
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
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState<Service | null>(null);
    const [creatorData, setCreatorData] = useState<{id: "", name: ""} | null>(null);

    useEffect(() => {
        const getService = async () => {
            try {
                const res = await GET_services("/servicios/" + idService);

                console.log(res);

                if(res.servicio) {
                    setService(res.servicio);

                    const user = await GET_user(res.servicio.usuarios_proveedores_id);

                    console.log(user);

                    if(user.usuario) {
                        setCreatorData({id: user.usuario.id_usuarios.toString(), name: user.usuario.nombre});
                    } else {
                        throw new Error("No user");
                    }
                }

                setLoading(false);
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }

                setLoading(false);
            }
        }

        getService();
    }, []) // eslint-disable-line

    if(loading) return <SkeletonService />;

    if((!service || !creatorData) && !loading) return <ErrorComponent title="Servicio no encontrado" message="Vuelva al inicio para explorar otros servicios" />;

    if((service && creatorData) && !loading) return (
        <>
            <main className="my-7">
                <div className="w-content">
                    <article className="sm:flex gap-4 overflow-hidden sm:max-h-[300px]">
                        <div className="w-auto sm:w-full sm:max-w-[400px] h-[200px] lg:h-[300px] relative">
                            <Image src={service.imagen} alt="service-img" fill priority className="object-cover" sizes="30vw" />
                        </div>

                        <div className="py-4 w-full">
                            <h4 className="text-color2 font-semibold text-xl lg:text-3xl">{service.nombre} <span className="text-color8 text-sm lg:text-lg">{`(${dispo[service.disponibilidad_servicio_id - 1]})`}</span></h4>

                            <hr className="text-color8 mb-4" />

                            <p className="text-color6 font-bold mb-2 text-xl lg:text-2xl">{`$${service.precio}`}</p>

                            <p className="text-color8 text-sm"><FontAwesomeIcon icon={faLocationDot} className="text-sm lg:text-lg" /> {service.ubicacion}</p>
                        </div>
                    </article>

                    <div className="flex flex-col gap-6 mt-10 sm:flex-row-reverse">
                        <div className="basis-2/3">
                            <h4 className="text-color2 text-sm mb-4 lg:text-lg">Descripcion: </h4>

                            <p className="text-color2">{service.descripcion}</p>
                        </div>

                        <div className="basis-1/3 min-w-[200px] ">
                            <p className="text-color2  text-sm lg:text-lg">Publicado por: <Link href={`/user/${creatorData.id}`} className="text-md underline font-medium">{creatorData.name}</Link></p>

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
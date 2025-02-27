"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { GET_services } from "@/server-actions";
import type { Service } from "@/types/server-response";

import ErrorComponent from "@/components/ui/Error";

const SkeletonServiceCard = () => {
    return (
        <div className="rounded-md shadow-service cursor-pointer sm:flex overflow-hidden sm:max-h-[200px]">
            <div className="skeleton w-auto sm:w-full sm:max-w-[300px] h-[200px] relative rounded-md sm:rounded-t-none  sm:rounded-l-md"></div>

            <div className="py-4 px-4 w-full">
                <div className="skeleton w-full h-6 mb-6"></div>

                <div className="skeleton w-24 h-4 mb-3"></div>
                <div className="skeleton w-24 h-4 mb-3"></div>
            </div>
        </div>
    )
}

const ServiceCard = ({ imagen, id_servicios, nombre, ubicacion, precio }: Pick<Service, "imagen" | "id_servicios" | "nombre" | "ubicacion" | "precio">) => {
    return (
        <Link href={`/service/${id_servicios}`}>
            <div className="rounded-md shadow-service cursor-pointer sm:flex overflow-hidden sm:max-h-[200px]">
                <div className="w-auto sm:w-full sm:max-w-[300px] h-[200px] relative rounded-md sm:rounded-t-none  sm:rounded-l-md">
                    <Image src={imagen} alt="service-img" fill priority className="rounded-t-md sm:rounded-t-none sm:rounded-l-lg object-cover" sizes="20vw" />
                </div>

                <div className="py-4 px-4 w-full">
                    <h4 className="text-color2 font-semibold text-xl">{nombre}</h4>

                    <hr className="text-color8 mb-4" />

                    <p className="text-color6 font-bold mb-2 text-xl">{`$ ${precio}`}</p>

                    <p className="text-color2 text-sm"><FontAwesomeIcon icon={faLocationDot} className="text-sm" /> {ubicacion}</p>
                </div>
            </div>
        </Link>
    )
}

export default function Page() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await GET_services();

                if (res.length > 0) {
                    setServices(res);
                }

                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                }

                setLoading(false);
            }
        }

        getServices();
    }, []) // eslint-disable-line

    return (
        <>
            <main>
                <div className="w-content py-7">
                    {loading && (
                        <div className="grid gap-y-8 gap-x-4 md:grid-cols-2 md:grid-rows-[200px]">
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                        </div>
                    )}

                    {(!loading && services.length > 0) && (
                        <div className="grid gap-y-8 gap-x-4 md:grid-cols-2 md:grid-rows-[200px]">
                            {services.map((service) => {
                                if (service.imagen) return <ServiceCard key={service.id_servicios} imagen={service.imagen} ubicacion={service.ubicacion} nombre={service.nombre} precio={service.precio} id_servicios={service.id_servicios} />
                            })}
                        </div>
                    )}

                    {(!loading && services.length <= 0) && (
                        <ErrorComponent title="No hay servicios para mostrar" message="Vuelve al inicio para ver otras opciones" />
                    )}
                </div>
            </main>
        </>
    )
}

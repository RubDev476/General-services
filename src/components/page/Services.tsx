"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFilter, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { GET_services } from "@/server-actions";
import type { Service } from "@/types/server-response";
import type { FilterServices } from "@/types/forms";

import ErrorComponent from "@/components/ui/Error";

import { useForm, SubmitHandler } from "react-hook-form";

import { AvailabilityService, CategoriesService, Roles, UserType } from "@/types/forms";

import useGetData from "@/hooks/useGetData";

import { MOCK_SERVICES } from "@/mockDB";

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

const ServiceCard = ({service}: {service: Service}) => {
    return (
        <Link href={`/service/${service.id_servicios}`} className="block group">
            <article className="bg-color3 rounded-xl border border-color8/20 shadow-md group-hover:shadow-xl group-hover:border-color5/40 transition-all duration-300 cursor-pointer sm:flex overflow-hidden sm:min-h-[190px]">
                <div className="w-auto sm:w-[260px] sm:min-w-[260px] h-[210px] sm:h-auto relative overflow-hidden bg-color1">
                    <Image src={service.imagen} alt="service-img" fill priority className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 260px" />
                    <span className="absolute top-2 left-2 bg-color1/80 backdrop-blur-md text-color3 text-xs font-semibold px-2.5 py-1 rounded-md border border-color3/20 shadow">
                        {service.disponibilidad_servicio?.estado || "DISPONIBLE"}
                    </span>
                </div>

                <div className="p-5 w-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs uppercase tracking-wider font-semibold text-color5 bg-color9 px-2 py-0.5 rounded">
                                {service.tipos_servicio?.tipo || "HARDWARE"}
                            </span>
                            <span className="text-xs text-color8">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-color6" /> {service.ubicacion}
                            </span>
                        </div>
                        <h4 className="text-color2 font-bold text-lg lg:text-xl group-hover:text-color5 transition-colors line-clamp-2">
                            {service.nombre}
                        </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-color8/20 flex items-center justify-between">
                        <div>
                            <span className="text-xs text-color10 block">Precio</span>
                            <p className="text-color6 font-extrabold text-2xl leading-none">{`$${service.precio}`}</p>
                        </div>
                        <span className="text-xs font-semibold text-color5 group-hover:text-color6 transition-colors flex items-center gap-1">
                            Ver detalles &rarr;
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default function Services() {
    const [modalFilters, setModalFilters] = useState(false);

    const { register, handleSubmit, watch, /*reset*/ } = useForm<FilterServices>();

    const router = useRouter();
    const searchParams = useSearchParams();

    const {loadingData, setLoadingData, fetchData, setFetchData, errorMessage, setErrorMessage} = useGetData<Service[]>();

    useEffect(() => {
        const getServices = async (params: string) => {
            setLoadingData(true);

            try {
                /*const res = await GET_services(params.length > 0 ? "/servicios?" + params.toString() : "/servicios");

                if (res.length > 0) {
                    setFetchData(res);
                }

                if (res.message && !res.error) {
                    setFetchData(null);
                    setErrorMessage({ title: res.message, message: "Intenta reajustar los filtros para tener exito" });
                }

                if (res.error) {
                    throw new Error("Error inesperado");
                }*/

                    setFetchData(MOCK_SERVICES);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                }

                setErrorMessage({ title: "Error inesperado", message: "Vuelva al inicio o intentelo mas tarde" });
                setFetchData(null);
            }

            setLoadingData(false);
        }

        getServices(searchParams.toString());
    }, [searchParams, setFetchData, setLoadingData, setErrorMessage])

    const onSubmit: SubmitHandler<FilterServices> = async (dataForm) => {
        //const currentParams = new URLSearchParams(searchParams.toString());
        const newParams = new URLSearchParams();

        const { busqueda, categoria, precio_max, precio_min } = dataForm;

        if (busqueda.trim().length > 0) newParams.set("busqueda", busqueda.trim());
        if (categoria.trim().length > 0) newParams.set("categoria", categoria.trim());
        if (parseInt(precio_min) > 0 && (parseInt(precio_min) < parseInt(precio_max) || precio_max === "")) newParams.set("precio_min", precio_min);
        if (parseInt(precio_max) > 0 && (parseInt(precio_min) < parseInt(precio_max) || precio_min === "")) newParams.set("precio_max", precio_max);

        setModalFilters(false);
        //reset();
        router.push('/services?' + newParams.toString(), { scroll: true });
    }

    return (
        <>
            <div className="mt-6">
                <div className="w-content flex items-center justify-between">
                    <div className="flex gap-3">
                        <button className="bg-color5 hover:bg-color6 g-transition text-color3 py-1.5 px-4 rounded-lg font-medium text-sm flex items-center gap-2 shadow" onClick={() => setModalFilters(true)}>
                            <FontAwesomeIcon icon={faFilter} /> Filtros
                        </button>

                        <Link href={"/services"} className="bg-color9 hover:bg-color8/20 text-color2 g-transition py-1.5 px-4 rounded-lg font-medium text-sm border border-color8/30">
                            Limpiar filtros
                        </Link>
                    </div>

                    <Link href={"/create-service"} className="hidden sm:inline-flex bg-color6 hover:bg-color5 g-transition text-color3 py-1.5 px-4 rounded-lg font-semibold text-sm shadow">
                        + Vender artículo
                    </Link>
                </div>

                <div className="text-center mt-6 mb-8 w-content">
                    <span className="text-xs uppercase tracking-widest font-semibold text-color6 bg-color6/10 px-3 py-1 rounded-full border border-color6/20 inline-block mb-3">
                        Catálogo de Hardware & Gaming
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-color2">
                        Explorar Componentes & Setups
                    </h1>
                    <p className="text-color10 text-sm sm:text-base lg:text-lg mt-2 max-w-2xl mx-auto">
                        Tarjetas gráficas, procesadores, PCs armadas y periféricos nuevos y seminuevos con trato directo.
                    </p>
                </div>
            </div>

            {modalFilters && (
                <div data-testid="modal-filters-container">
                    <div className="w-full h-screen z-[200] fixed top-0 modal-container all-center">
                        <div className="w-full max-w-[700px] px-7">
                            <form
                                className={"w-full bg-color3 all-center flex-col py-7 px-4 relative"}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <button className="bg-color6 text-color3 absolute right-2 top-2 rounded-full h-10 w-10 all-center" onClick={() => setModalFilters(false)}><FontAwesomeIcon icon={faClose} className="text-xl" /></button>

                                <h2 className="text-color2 text-2xl font-semibold mb-7">Filtros: </h2>

                                <input
                                    className={"input mb-5"}
                                    placeholder={"Buscar por nombre"}
                                    type={"text"}
                                    autoComplete={"off"}
                                    {...register("busqueda")}
                                />

                                <select className="input mb-5" {...register("categoria")} role="combobox">
                                    <option value="">Selecciona categoria:</option>
                                    <option value={CategoriesService.TARJETAS_GRAFICAS}>{CategoriesService.TARJETAS_GRAFICAS}</option>
                                    <option value={CategoriesService.PROCESADORES_Y_CPUS}>{CategoriesService.PROCESADORES_Y_CPUS}</option>
                                    <option value={CategoriesService.PCS_GAMING_COMPLETAS}>{CategoriesService.PCS_GAMING_COMPLETAS}</option>
                                    <option value={CategoriesService.MONITORES_Y_PANTALLAS}>{CategoriesService.MONITORES_Y_PANTALLAS}</option>
                                    <option value={CategoriesService.PERIFERICOS_Y_ACCESORIOS}>{CategoriesService.PERIFERICOS_Y_ACCESORIOS}</option>
                                    <option value={CategoriesService.CONSOLAS_Y_VIDEOJUEGOS}>{CategoriesService.CONSOLAS_Y_VIDEOJUEGOS}</option>
                                    <option value={CategoriesService.COMPONENTES_Y_ALMACENAMIENTO}>{CategoriesService.COMPONENTES_Y_ALMACENAMIENTO}</option>
                                    <option value={CategoriesService.OTROS}>{CategoriesService.OTROS}</option>
                                </select>

                                <div className="lg:flex items-center justify-center gap-6 my-6">
                                    <h3 className="text-center mb-4 text-color2 text-xl font-medium">Precio: </h3>

                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="minPrice" className="mb-2 text-color2">Min. </label>
                                            <input
                                                type="number"
                                                id="minPrice"
                                                value={watch(["precio_min"])}
                                                className="input-styles rounded p-2 max-w-20"
                                                {...register("precio_min")}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label htmlFor="maxPrice" className="mb-2 text-color2">Max. </label>
                                            <input
                                                type="number"
                                                id="maxPrice"
                                                value={watch(["precio_max"])}
                                                className="input-styles rounded p-2 max-w-20"
                                                {...register("precio_max")}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-2 mt-4">Buscar</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <main>
                <div className="w-content py-7">
                    {loadingData && (
                        <div className="grid gap-y-8 gap-x-4 md:grid-cols-2 md:grid-rows-[200px]" data-testid="skeletons-service">
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                        </div>
                    )}

                    {(!loadingData && fetchData) && (
                        <div className="grid gap-y-8 gap-x-4 md:grid-cols-2 md:grid-rows-[200px]" data-testid="services-container">
                            {fetchData.map((service) => <ServiceCard key={service.id_servicios} service={service} />)}
                        </div>
                    )}

                    {(!loadingData && !fetchData) && (
                        <ErrorComponent title={errorMessage.title} message={errorMessage.message} />
                    )}
                </div>
            </main>
        </>
    )
}
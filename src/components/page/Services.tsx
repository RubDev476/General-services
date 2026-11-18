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
        <div className="bg-color3 rounded-2xl border border-color8/20 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="skeleton w-full h-52 relative"></div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="skeleton w-24 h-4 rounded"></div>
                        <div className="skeleton w-20 h-4 rounded"></div>
                    </div>
                    <div className="skeleton w-full h-5 mb-2 rounded"></div>
                    <div className="skeleton w-3/4 h-5 rounded"></div>
                </div>

                <div className="mt-5 pt-3 border-t border-color8/20 flex items-center justify-between">
                    <div>
                        <div className="skeleton w-12 h-3 mb-1 rounded"></div>
                        <div className="skeleton w-20 h-6 rounded"></div>
                    </div>
                    <div className="skeleton w-24 h-8 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

const ServiceCard = ({service}: {service: Service}) => {
    return (
        <Link href={`/service/${service.id_servicios}`} className="block group h-full">
            <article className="bg-color3 rounded-2xl border border-color8/20 shadow-sm group-hover:shadow-xl group-hover:border-color5/40 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden">
                {/* Contenedor de imagen con altura fija y controlada (nunca se deforma ni se agranda) */}
                <div className="w-full h-52 relative overflow-hidden bg-color1 shrink-0">
                    <Image
                        src={service.imagen}
                        alt="service-img"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-color1/80 backdrop-blur-md text-color3 text-xs font-bold px-2.5 py-1 rounded-md border border-color3/20 shadow">
                        {service.disponibilidad_servicio?.estado || "DISPONIBLE"}
                    </span>
                </div>

                {/* Contenedor de contenido elástico y protegido contra desbordes */}
                <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-color5 bg-color9 px-2 py-0.5 rounded truncate max-w-[55%]">
                                {service.tipos_servicio?.tipo || "HARDWARE"}
                            </span>
                            <span className="text-xs text-color8 truncate max-w-[45%] text-right" title={service.ubicacion}>
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-color6 shrink-0" />
                                <span>{service.ubicacion}</span>
                            </span>
                        </div>

                        {/* Título adaptable con altura mínima reservada (se adapta a textos cortos o largos sin romper las cards vecinas) */}
                        <h4
                            className="text-color2 font-bold text-base sm:text-lg group-hover:text-color5 transition-colors line-clamp-2 min-h-[2.8rem] leading-snug break-words"
                            title={service.nombre}
                        >
                            {service.nombre}
                        </h4>
                    </div>

                    {/* Footer de la card */}
                    <div className="mt-4 pt-3 border-t border-color8/20 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold text-color10 block">Precio</span>
                            <p className="text-color6 font-extrabold text-2xl leading-none truncate">{`$ ${service.precio}`}</p>
                        </div>
                        <span className="text-xs font-bold text-color5 group-hover:text-color6 transition-colors flex items-center gap-1 shrink-0 bg-color9/80 px-3 py-1.5 rounded-full border border-color8/20">
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
                    <div className="w-full h-screen z-[200] fixed top-0 left-0 bg-color1/80 backdrop-blur-md all-center p-4">
                        <div className="w-full max-w-[560px] bg-color3 rounded-3xl border border-color8/25 shadow-2xl relative overflow-hidden">
                            {/* Glow decorativo de fondo */}
                            <div className="absolute top-0 right-0 w-44 h-44 bg-color5/15 blur-[60px] rounded-full pointer-events-none"></div>

                            <form
                                className="w-full p-6 sm:p-8 relative z-10 flex flex-col"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* Header del modal */}
                                <div className="flex items-start justify-between mb-6 pb-4 border-b border-color8/20">
                                    <div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-color6 bg-color6/10 px-2.5 py-0.5 rounded-full border border-color6/20 inline-block mb-1.5">
                                            Búsqueda avanzada
                                        </span>
                                        <h2 className="text-color2 text-2xl font-extrabold tracking-tight">Filtros:</h2>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-9 h-9 rounded-full bg-color9 hover:bg-color6 text-color2 hover:text-color3 all-center transition-colors border border-color8/20 cursor-pointer"
                                        onClick={() => setModalFilters(false)}
                                        title="Cerrar filtros"
                                    >
                                        <FontAwesomeIcon icon={faClose} className="text-base" />
                                    </button>
                                </div>

                                {/* Campo: Nombre / Modelo */}
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                                        Palabra clave o modelo:
                                    </label>
                                    <input
                                        className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                        placeholder="Buscar por nombre"
                                        type="text"
                                        autoComplete="off"
                                        {...register("busqueda")}
                                    />
                                </div>

                                {/* Campo: Categoría */}
                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                                        Categoría de hardware:
                                    </label>
                                    <select
                                        className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all cursor-pointer"
                                        {...register("categoria")}
                                        role="combobox"
                                    >
                                        <option value="">Todas las categorías</option>
                                        <option value={CategoriesService.TARJETAS_GRAFICAS}>{CategoriesService.TARJETAS_GRAFICAS}</option>
                                        <option value={CategoriesService.PROCESADORES_Y_CPUS}>{CategoriesService.PROCESADORES_Y_CPUS}</option>
                                        <option value={CategoriesService.PCS_GAMING_COMPLETAS}>{CategoriesService.PCS_GAMING_COMPLETAS}</option>
                                        <option value={CategoriesService.MONITORES_Y_PANTALLAS}>{CategoriesService.MONITORES_Y_PANTALLAS}</option>
                                        <option value={CategoriesService.PERIFERICOS_Y_ACCESORIOS}>{CategoriesService.PERIFERICOS_Y_ACCESORIOS}</option>
                                        <option value={CategoriesService.CONSOLAS_Y_VIDEOJUEGOS}>{CategoriesService.CONSOLAS_Y_VIDEOJUEGOS}</option>
                                        <option value={CategoriesService.COMPONENTES_Y_ALMACENAMIENTO}>{CategoriesService.COMPONENTES_Y_ALMACENAMIENTO}</option>
                                        <option value={CategoriesService.OTROS}>{CategoriesService.OTROS}</option>
                                    </select>
                                </div>

                                {/* Rango de precios */}
                                <div className="bg-color9/70 p-4 rounded-2xl border border-color8/20 mb-6">
                                    <h3 className="text-xs font-bold text-color2 uppercase tracking-wider mb-3">
                                        Rango de Precio ($ USD):
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="minPrice" className="block text-xs font-semibold text-color10 mb-1">
                                                Precio Mínimo
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 text-color8 text-sm font-bold">$</span>
                                                <input
                                                    type="number"
                                                    id="minPrice"
                                                    placeholder="0"
                                                    value={watch(["precio_min"])}
                                                    className="w-full pl-7 pr-3 py-2 text-sm font-semibold rounded-lg bg-color3 border border-color8/30 text-color2 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                                    {...register("precio_min")}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="maxPrice" className="block text-xs font-semibold text-color10 mb-1">
                                                Precio Máximo
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 text-color8 text-sm font-bold">$</span>
                                                <input
                                                    type="number"
                                                    id="maxPrice"
                                                    placeholder="5000"
                                                    value={watch(["precio_max"])}
                                                    className="w-full pl-7 pr-3 py-2 text-sm font-semibold rounded-lg bg-color3 border border-color8/30 text-color2 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                                    {...register("precio_max")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón Buscar */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-color5 via-color6 to-color7 hover:opacity-95 text-color3 font-bold py-3 rounded-full shadow-lg shadow-color5/25 transition-all text-base text-center cursor-pointer"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <main>
                <div className="w-content py-7">
                    {loadingData && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" data-testid="skeletons-service">
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                            <SkeletonServiceCard />
                        </div>
                    )}

                    {(!loadingData && fetchData) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" data-testid="services-container">
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
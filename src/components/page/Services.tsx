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

import { CategoriesService } from "@/types/forms";

import useGetData from "@/hooks/useGetData";

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
        <Link href={`/service/${service.id_servicios}`}>
            <article className="rounded-md shadow-service cursor-pointer sm:flex overflow-hidden sm:max-h-[200px]">
                <div className="w-auto sm:w-full sm:max-w-[300px] h-[200px] relative rounded-md sm:rounded-t-none  sm:rounded-l-md">
                    <Image src={service.imagen} alt="service-img" fill priority className="rounded-t-md sm:rounded-t-none sm:rounded-l-lg object-cover" sizes="20vw" />
                </div>

                <div className="py-4 px-4 w-full">
                    <h4 className="text-color2 font-semibold text-xl">{service.nombre}</h4>

                    <hr className="text-color8 mb-4" />

                    <p className="text-color6 font-bold mb-2 text-xl">{`$ ${service.precio}`}</p>

                    <p className="text-color2 text-sm"><FontAwesomeIcon icon={faLocationDot} className="text-sm" /> {service.ubicacion}</p>
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
                const res = await GET_services(params.length > 0 ? "/servicios?" + params.toString() : "/servicios");

                if (res.length > 0) {
                    setFetchData(res);
                }

                if (res.message && !res.error) {
                    setFetchData(null);
                    setErrorMessage({ title: res.message, message: "Intenta reajustar los filtros para tener exito" });
                }

                if (res.error) {
                    throw new Error("Error inesperado");
                }
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
                <div className="w-content flex">
                    <button className="bg-color5 text-color3 py-1 px-3 overflow-hidden max-h-[32px]" onClick={() => setModalFilters(true)}><FontAwesomeIcon icon={faFilter} /> Filtros</button>

                    <Link href={"/services"} className="ml-4 bg-color5 text-color3 py-1 px-3">Limpiar filtros</Link>
                </div>

                <h1 className="text-center text-4xl lg:text-7xl font-bold text-color2 mt-7">Servicios</h1>
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
                                    <option value={CategoriesService.ALQUILER_DE_VEHICULOS}>{CategoriesService.ALQUILER_DE_VEHICULOS}</option>
                                    <option value={CategoriesService.CINES_Y_TEATROS}>{CategoriesService.CINES_Y_TEATROS}</option>
                                    <option value={CategoriesService.GIMNASIOS_Y_ENTRENAMIENTOS}>{CategoriesService.GIMNASIOS_Y_ENTRENAMIENTOS}</option>
                                    <option value={CategoriesService.HOTELES_Y_HOSPEDAJES}>{CategoriesService.HOTELES_Y_HOSPEDAJES}</option>
                                    <option value={CategoriesService.RESTAURANTES_Y_BARES}>{CategoriesService.RESTAURANTES_Y_BARES}</option>
                                    <option value={CategoriesService.SALONES_DE_EVENTOS}>{CategoriesService.SALONES_DE_EVENTOS}</option>
                                    <option value={CategoriesService.SPA_Y_MASAJES}>{CategoriesService.SPA_Y_MASAJES}</option>
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
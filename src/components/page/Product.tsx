"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GET_products } from "@/server-actions";
import type { Product as ProductType } from "@/types/server-response";
import ErrorComponent from "../ui/Error";

import useGetData from "@/hooks/useGetData";
import { MOCK_PRODUCTS } from "@/mockDB";

const SkeletonProduct = () => {
    return (
        <main className="my-7" data-testid="skeleton-product">
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

export default function Product({ idProduct }: { idProduct: string }) {
    const {loadingData, setFetchData, fetchData, setLoadingData} = useGetData<ProductType>();

    useEffect(() => {
        const getProduct = async () => {
            try {
                /*const res = await GET_products("/productos/" + idProduct);

                console.log(res);

                if(res.producto) {
                    setFetchData(res.producto);
                }*/

                const producto = MOCK_PRODUCTS.find(product => product.id_productos.toString() === idProduct);

                if(producto) {
                    setFetchData(producto);
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }
            
            setLoadingData(false);
        }

        getProduct();
    }, [idProduct, setFetchData, setLoadingData])

    if(loadingData) return <SkeletonProduct />;

    if(!fetchData && !loadingData) return <ErrorComponent title="Producto no encontrado" message="Vuelva al inicio para explorar otros productos" />;

    if(fetchData && !loadingData) return (
        <>
            <main className="my-8">
                <div className="w-content">
                    {/* Breadcrumb / Category Tag */}
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-color8">
                        <Link href="/marketplace" className="hover:text-color6 g-transition">Marketplace</Link>
                        <span>/</span>
                        <span className="text-color5">{fetchData.tipos_producto?.tipo || "HARDWARE"}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Imagen del producto */}
                        <div className="lg:col-span-7 bg-color1 rounded-2xl overflow-hidden border border-color8/20 shadow-xl relative min-h-[300px] sm:min-h-[420px]">
                            <Image
                                src={fetchData.imagen}
                                alt={fetchData.nombre}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                        </div>

                        {/* Detalles de compra y vendedor */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="bg-color3 p-6 sm:p-8 rounded-2xl border border-color8/20 shadow-lg">
                                <span className="text-xs font-bold text-color8 uppercase tracking-widest block mb-1">
                                    {`(${fetchData.disponibilidad_producto.estado})`}
                                </span>

                                <h1 className="text-color2 font-extrabold text-2xl sm:text-3xl leading-snug mb-3">
                                    {fetchData.nombre}
                                </h1>

                                <div className="flex items-center gap-2 text-color8 text-sm mb-4">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-color6 text-base" />
                                    <span>{fetchData.ubicacion}</span>
                                </div>

                                <div className="bg-color9 p-4 rounded-xl mb-6 flex items-baseline justify-between border border-color8/10">
                                    <span className="text-xs uppercase font-bold text-color10">Precio del artículo</span>
                                    <p className="text-color6 font-extrabold text-3xl sm:text-4xl">{`$${fetchData.precio}`}</p>
                                </div>

                                {/* Vendedor */}
                                <div className="p-4 rounded-xl border border-color8/20 bg-color3 mb-6">
                                    <span className="text-xs font-medium text-color10 block mb-1">Publicado por</span>
                                    <Link
                                        href={`/user/${fetchData.usuarios_proveedores.id_usuarios}`}
                                        className="text-color2 font-bold text-base hover:text-color6 g-transition flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-color5 text-color3 all-center text-xs font-bold uppercase">
                                            {fetchData.usuarios_proveedores.nombre.charAt(0)}
                                        </div>
                                        <span>{fetchData.usuarios_proveedores.nombre}</span>
                                    </Link>
                                    <p className="text-xs text-color8 mt-1">Vendedor verificado en la comunidad</p>
                                </div>

                                <button className="btn-1 w-full text-center py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                    Reservar
                                </button>
                                <p className="text-center text-xs text-color10 mt-2">Trato directo y seguro con el vendedor</p>
                            </div>
                        </div>
                    </div>

                    {/* Descripción y Especificaciones */}
                    <div className="mt-10 bg-color3 p-6 sm:p-8 rounded-2xl border border-color8/20 shadow-md">
                        <h2 className="text-color2 text-xl font-bold mb-4 flex items-center gap-2">
                            <span>Descripción del producto y estado:</span>
                        </h2>
                        <div className="text-color2 text-base leading-relaxed whitespace-pre-line bg-color9 p-5 rounded-xl border border-color8/10">
                            {fetchData.descripcion}
                        </div>
                    </div>

                    <hr className="text-color8/30 my-8" />
                </div>
            </main>

            <div className="mb-12">
                <div className="w-content">
                    <div className="bg-color3 p-6 rounded-2xl border border-color8/20 shadow-sm">
                        <h4 className="text-color2 font-bold text-xl mb-2">Comentarios y Preguntas (0)</h4>
                        <p className="text-color10 text-sm">Sé el primero en hacer una pregunta sobre este artículo al vendedor.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
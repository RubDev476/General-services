"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faLocationDot, 
    faEnvelope, 
    faPhone, 
    faShieldHalved, 
    faStar, 
    faCheck, 
    faBolt, 
    faDesktop, 
    faComments,
    faTag
} from "@fortawesome/free-solid-svg-icons";

import type { UserData, Service } from "@/types/server-response";
import ErrorComponent from "../ui/Error";
import useGetData from "@/hooks/useGetData";
import { MOCK_USERS, MOCK_SERVICES } from "@/mockDB";

const SkeletonUser = () => {
    return (
        <div className="w-content py-8" data-testid="skeleton-user">
            {/* Banner skeleton */}
            <div className="w-full h-40 sm:h-52 skeleton rounded-3xl mb-8"></div>

            <div className="bg-color3 p-6 sm:p-8 rounded-3xl border border-color8/20 shadow-lg -mt-20 sm:-mt-24 relative z-10">
                <div className="sm:flex items-end gap-6 flex-row">
                    <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl mb-4 sm:mb-0 skeleton-circle border-4 border-color3"></div>
                    <div className="flex-1">
                        <div className="skeleton w-48 sm:w-80 h-8 mb-2"></div>
                        <div className="skeleton w-36 sm:w-60 h-5"></div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-color8/20 flex gap-4">
                    <div className="skeleton w-24 h-8 rounded-full"></div>
                    <div className="skeleton w-24 h-8 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default function User({ userId }: { userId: string }) {
    const { setFetchData, fetchData, loadingData, setLoadingData } = useGetData<UserData>();

    useEffect(() => {
        const getUser = async () => {
            try {
                const usuario = MOCK_USERS.find(user => user.id_usuarios.toString() === userId);
                if (usuario) {
                    setFetchData(usuario);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                }
            }
            setLoadingData(false);
        };

        getUser();
    }, [userId, setFetchData, setLoadingData]);

    if (loadingData) return <SkeletonUser />;

    if (!fetchData) {
        return (
            <div className="w-content py-12">
                <ErrorComponent 
                    title="Usuario no encontrado" 
                    message="Vuelve al inicio para encontrar a otros usuarios" 
                />
            </div>
        );
    }

    // Artículos publicados por este usuario en el marketplace
    const userServices: Service[] = MOCK_SERVICES.filter(
        service => service.usuarios_proveedores?.id_usuarios?.toString() === userId
    );

    return (
        <main className="py-8 bg-color9/40">
            <div className="w-content" data-testid="user-data-container">
                {/* BANNER DE PERFIL GAMER */}
                <div className="relative w-full h-44 sm:h-56 rounded-3xl overflow-hidden bg-gradient-to-r from-color1 via-color2 to-color5 shadow-lg border border-color8/20">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-color6/20 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 bg-color1/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-color3/20 text-xs font-semibold text-color7">
                        <FontAwesomeIcon icon={faShieldHalved} />
                        <span>Perfil Verificado en Next Loot</span>
                    </div>
                </div>

                {/* TARJETA PRINCIPAL DEL VENDEDOR */}
                <div className="bg-color3 p-6 sm:p-10 rounded-3xl border border-color8/20 shadow-xl -mt-16 sm:-mt-20 relative z-10 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-color8/20">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-7">
                            {/* Avatar con borde gamer */}
                            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl overflow-hidden border-4 border-color3 shadow-2xl bg-color1 ring-2 ring-color5/30">
                                <Image
                                    src={fetchData.imagen}
                                    alt={fetchData.nombre}
                                    fill
                                    sizes="150px"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                                    <h1 className="text-color2 font-extrabold text-2xl sm:text-4xl tracking-tight">
                                        {fetchData.nombre}
                                    </h1>
                                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-color6 bg-color6/10 px-3 py-0.5 rounded-full border border-color6/20">
                                        {`(${fetchData.tipo_usuario.tipo})`}
                                    </span>
                                </div>

                                <p className="text-color8 font-medium text-sm sm:text-base flex items-center gap-2 mb-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-color5 text-xs" />
                                    <span>{fetchData.correo}</span>
                                </p>

                                {fetchData.telefono && (
                                    <p className="text-color10 font-medium text-xs sm:text-sm flex items-center gap-2">
                                        <FontAwesomeIcon icon={faPhone} className="text-color7 text-xs" />
                                        <span>Teléfono de contacto: {fetchData.telefono}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Botón de contacto directo */}
                        <div className="flex sm:flex-col gap-2.5">
                            <a
                                href={`mailto:${fetchData.correo}`}
                                className="btn-1 text-center text-sm py-2.5 px-6 shadow-md flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faEnvelope} /> Contactar vendedor
                            </a>
                        </div>
                    </div>

                    {/* BLOQUE DE ROLES */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <p className="text-color2 text-sm sm:text-base font-bold mr-2">Roles: </p>
                        {fetchData.roles.map((role) => (
                            <span
                                key={role.id_roles}
                                className="bg-color5/10 text-color5 rounded-full py-1 px-4 text-xs sm:text-sm font-bold border border-color5/30 inline-flex items-center gap-1.5 shadow-sm"
                            >
                                <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                                <span>{role.tipo}</span>
                            </span>
                        ))}
                    </div>

                    {/* MÉTRICAS DE REPUTACIÓN Y ACTIVIDAD */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-color8/15">
                        <div className="bg-color9/60 p-4 rounded-2xl border border-color8/20">
                            <span className="text-xs text-color10 font-bold block mb-1">Reputación</span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xl sm:text-2xl font-extrabold text-color2">4.9</span>
                                <div className="text-amber-500 text-xs flex">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            </div>
                            <span className="text-[11px] text-color8">100% calificaciones positivas</span>
                        </div>

                        <div className="bg-color9/60 p-4 rounded-2xl border border-color8/20">
                            <span className="text-xs text-color10 font-bold block mb-1">Tiempo de Respuesta</span>
                            <p className="text-xl sm:text-2xl font-extrabold text-color5 flex items-center gap-1">
                                <FontAwesomeIcon icon={faBolt} className="text-sm text-color6" /> &lt; 1 hora
                            </p>
                            <span className="text-[11px] text-color8">Muy activo en la plataforma</span>
                        </div>

                        <div className="bg-color9/60 p-4 rounded-2xl border border-color8/20">
                            <span className="text-xs text-color10 font-bold block mb-1">Tratos en Mano</span>
                            <p className="text-xl sm:text-2xl font-extrabold text-color7">Disponible</p>
                            <span className="text-[11px] text-color8">Acepta pruebas de estrés</span>
                        </div>

                        <div className="bg-color9/60 p-4 rounded-2xl border border-color8/20">
                            <span className="text-xs text-color10 font-bold block mb-1">Publicaciones</span>
                            <p className="text-xl sm:text-2xl font-extrabold text-color6">{userServices.length} activas</p>
                            <span className="text-[11px] text-color8">Hardware gamer en venta</span>
                        </div>
                    </div>
                </div>

                {/* ARTÍCULOS EN VENTA DE ESTE USUARIO */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="text-xs uppercase font-extrabold tracking-widest text-color5 bg-color5/10 px-3 py-1 rounded-full border border-color5/20 inline-block mb-1">
                                Catálogo del usuario
                            </span>
                            <h2 className="text-color2 text-2xl sm:text-3xl font-extrabold">
                                Artículos publicados ({userServices.length})
                            </h2>
                        </div>
                        <Link href="/marketplace" className="text-sm font-semibold text-color5 hover:text-color6 transition-colors">
                            Ver todo el marketplace &rarr;
                        </Link>
                    </div>

                    {userServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userServices.map((service) => (
                                <Link 
                                    key={service.id_servicios} 
                                    href={`/product/${service.id_servicios}`}
                                    className="group"
                                >
                                    <article className="bg-color3 rounded-2xl border border-color8/20 overflow-hidden shadow-md group-hover:shadow-xl group-hover:border-color5/40 transition-all flex flex-col h-full">
                                        <div className="relative h-48 w-full bg-color1 overflow-hidden">
                                            <Image
                                                src={service.imagen}
                                                alt={service.nombre}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <span className="absolute top-3 left-3 bg-color1/80 backdrop-blur-md text-color3 text-xs font-bold px-2.5 py-1 rounded-md border border-color3/20 shadow">
                                                {service.disponibilidad_servicio.estado}
                                            </span>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-color5 bg-color9 px-2 py-0.5 rounded inline-block mb-2">
                                                    {service.tipos_servicio?.tipo || "HARDWARE"}
                                                </span>
                                                <h3 className="text-color2 font-bold text-base sm:text-lg group-hover:text-color5 transition-colors line-clamp-2">
                                                    {service.nombre}
                                                </h3>
                                                <p className="text-xs text-color8 mt-2 flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faLocationDot} className="text-color6" />
                                                    <span>{service.ubicacion}</span>
                                                </p>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-color8/20 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] uppercase text-color10 block">Precio</span>
                                                    <p className="text-color6 font-extrabold text-xl">{`$${service.precio}`}</p>
                                                </div>
                                                <span className="text-xs font-bold text-color5 group-hover:text-color6 transition-colors">
                                                    Ver artículo &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-color3 p-8 rounded-3xl border border-color8/20 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-color9 text-color8 all-center mx-auto mb-3 text-2xl">
                                <FontAwesomeIcon icon={faDesktop} />
                            </div>
                            <h3 className="text-color2 font-bold text-lg">Sin publicaciones activas por el momento</h3>
                            <p className="text-color10 text-sm mt-1 max-w-sm mx-auto">
                                Este usuario no tiene artículos en venta actualmente. Explora las publicaciones de otros miembros en el catálogo.
                            </p>
                            <Link href="/marketplace" className="btn-2 inline-block text-sm py-2 px-6 mt-4">
                                Explorar Hardware
                            </Link>
                        </div>
                    )}
                </div>

                {/* GARANTÍAS Y OPINIONES RECIENTES */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {/* Tarjeta de Garantías del Vendedor */}
                    <div className="bg-color3 p-6 sm:p-8 rounded-3xl border border-color8/20 shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-xl bg-color7/20 all-center text-color7 text-sm">
                                <FontAwesomeIcon icon={faShieldHalved} />
                            </span>
                            <h3 className="text-color2 font-bold text-lg sm:text-xl">
                                Compromisos de trato seguro
                            </h3>
                        </div>
                        <ul className="flex flex-col gap-3 text-sm text-color2">
                            <li className="flex items-start gap-2.5">
                                <span className="text-color5 font-bold mt-0.5">✓</span>
                                <span><strong>Pruebas presenciales:</strong> Permite probar componentes (benchmarks, temperaturas) antes de concretar la compra.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="text-color5 font-bold mt-0.5">✓</span>
                                <span><strong>Fotos reales y caja original:</strong> Todos los artículos cuentan con fotos del estado actual y accesorios incluidos.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="text-color5 font-bold mt-0.5">✓</span>
                                <span><strong>Puntos de entrega seguros:</strong> Preferencia por plazas comerciales y zonas públicas concurrida.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Reseñas de la Comunidad */}
                    <div className="bg-color3 p-6 sm:p-8 rounded-3xl border border-color8/20 shadow-md">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-xl bg-color5/20 all-center text-color5 text-sm">
                                <FontAwesomeIcon icon={faComments} />
                            </span>
                            <h3 className="text-color2 font-bold text-lg sm:text-xl">
                                Opiniones recientes de compradores
                            </h3>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <div className="p-3.5 rounded-2xl bg-color9/60 border border-color8/20">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-xs text-color2">Gamer_CDMX</span>
                                    <div className="text-amber-500 text-xs flex">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                                <p className="text-xs text-color8 leading-relaxed">
                                    &ldquo;Excelente vendedor. El hardware venía impecable, bien empacado y con su pasta térmica perfecta. Recomendado al 100%.&rdquo;
                                </p>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-color9/60 border border-color8/20">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-xs text-color2">Rodrigo_P</span>
                                    <div className="text-amber-500 text-xs flex">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                                <p className="text-xs text-color8 leading-relaxed">
                                    &ldquo;Trato directo y rápido. Nos encontramos en un punto medio y probamos la tarjeta antes de pagar. Todo perfecto.&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { GET_user_services, DELETE_user_service } from "@/server-actions";
import type { Service } from "@/types/server-response";
import type { TableServicesProps } from "@/types/props";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

const TableServices = ({services, setDeleteService}: TableServicesProps) => {
    return (
        <div className="my-8 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-color2">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3 px-3 text-left text-md font-bold text-color2">
                                    Numero
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-md font-bold text-color2">
                                    Servicio
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-md font-bold text-color2">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-color8 text-color2">
                            {services.map((service, index) => (
                                <tr key={service.id_servicios}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">{`${index + 1}`}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm font-semibold"><Link href={`/service/${service.id_servicios}`} className="hover:underline">{service.nombre}</Link></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">
                                        <Link href={`/edit-service/${service.id_servicios}`} className="mr-4 text-color5 hover:underline">Editar</Link>
                                        <button className="text-color6 hover:underline" onClick={() => setDeleteService(service)} >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<Service[]>([]);
    const [deleteService, setDeleteService] = useState<Service | null>(null);
    const [deleteStatus, setDeleteStatus] = useState({loader: false, message: "", error: false});

    const {token, userData, authLoading} = useAuthSelectors();

    const router = useRouter();

    useEffect(() => {
        const getUserServices = async (token: string, idUser: string) => {
            try {
                const res = await GET_user_services(idUser, token);

                console.log(res);

                if(res.length > 0) setServices(res);
                setLoading(false);
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }

                setLoading(false);
            }
        }

        if(token && userData) {
            getUserServices(token, userData.id_usuarios.toString());
        } else if((!token && !userData) && !authLoading) {
            router.push("/login");
        }
    }, [token, userData, authLoading, router])

    const deleteServiceAction = async (service: Service) => {
        if(!token) return setDeleteService(null);

        setDeleteStatus({loader: true, message: "", error: false});

        try {
            const res = await DELETE_user_service({token, idUser: service.usuarios_proveedores.id_usuarios.toString(), idService: service.id_servicios.toString()});

            console.log(res);

            if(!res.error) {
                const newServices = services.filter((s) => s.id_servicios !== service.id_servicios);

                setDeleteStatus({loader: false, message: "Borrado exitosamente", error: false});
                setServices(newServices);
            } else if(res.error) {
                setDeleteStatus({loader: false, message: res.error, error: true});
            }
        } catch (error) {
            if(error instanceof Error) {
                console.log(error);
            }

            setDeleteStatus({loader: false, message: "Ha ocurrido un error inesperado, intentelo mas tarde", error: true});
        }

        setTimeout(() => {
            setDeleteService(null);
            setDeleteStatus({loader: false, message: "", error: false});
        }, 5000)
    }

    return (
        <>
            <main>
                <div className="w-content">
                    <h2 className="text-color2 text-center text-4xl lg:text-7xl mt-20 font-bold">Mis servicios</h2>

                    {loading && (
                        <div className="w-full all-center my-6 h-[50vh]">
                            <div className="loader"></div>
                        </div>
                    )}

                    {services.length > 0 && <TableServices services={services} setDeleteService={setDeleteService} />}

                    {(!loading && services.length === 0) && (
                        <div className="w-full all-center my-6 h-[50vh]">
                            <h5 className="text-color2 font-medium text-xl lg:text-3xl text-center">No tienes servicios aún</h5>
                        </div>
                    )}
                </div>
            </main>

            {deleteService && (
                <div className="fixed z-[200] top-0 w-full h-screen modal-container all-center">
                    <div className="w-full px-7 max-w-[700px]">
                        <div className="bg-color3 w-full px-7 py-12 text-center all-center flex-col">
                            {(!deleteStatus.loader && deleteStatus.message === "") && (
                                <>
                                    <p className="text-color2 font-medium mb-10">¿Desea eliminar <span className="text-lg font-bold">{`"${deleteService.nombre}"`}</span>?</p>

                                    <div className="all-center w-full gap-4">
                                        <button className="btn-1" onClick={() => setDeleteService(null)}>No</button>
                                        <button className="btn-2" onClick={() => deleteServiceAction(deleteService)} >Si</button>
                                    </div>
                                </>
                            )}

                            {deleteStatus.message !== "" && (
                                <p className={`${deleteStatus.error ? "text-color6" : "text-color7"} font-semibold text-lg`}>{deleteStatus.message}</p>
                            )}

                            {(deleteStatus.loader && deleteStatus.message === "") && (
                                <div className="loader"></div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

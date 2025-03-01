"use client";

import { useEffect } from "react";

import { GET_user_services } from "@/server-actions";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

const products = [
    {_id: 1, name: "service 2 1 33 333 4444 22 Servicio 1 33 333 4444 22", price: 99, category: "gym"},
    {_id: 2, name: "service 1", price: 99, category: "gym"},
    {_id: 3, name: "service 1", price: 99, category: "gym"},
    {_id: 4, name: "service 1", price: 99, category: "gym"}
]

export default function Page() {
    const {token, userData} = useAuthSelectors();

    useEffect(() => {
        const getUserServices = async (token: string, idUser: string) => {
            console.log(idUser)
            console.log(token)

            try {
                const res = await GET_user_services(idUser, token);

                console.log(res);
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }


            }
        }

        if(token && userData) getUserServices(token, userData.id_usuarios.toString());
    }, [token, userData])

    return (
        <>
            <main>
                <div className="w-content">
                    <h2 className="text-color2 text-center text-4xl lg:text-7xl mt-20 font-bold">Mis servicios</h2>

                    <div 
                        //className="px-4 sm:px-6 lg:px-8 mt-20"
                    >
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
                                            {products.map((product) => (
                                                <tr key={product._id}>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">
                                                        {product._id}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 px-3 text-sm font-semibold">
                                                        {product.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">
                                                        <button className="mr-4 text-color5 hover:underline">Editar</button>
                                                        <button className="text-color6 hover:underline">Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

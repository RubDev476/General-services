"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { GET_user_products, DELETE_user_product } from "@/server-actions";
import type { Product } from "@/types/server-response";
import type { TableProductsProps } from "@/types/props";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";
import useGetData from "@/hooks/useGetData";

import LoaderPage from "@/components/ui/LoaderPage";

const TableProducts = ({products, setDeleteProduct}: TableProductsProps) => {
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
                                    Producto
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-md font-bold text-color2">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-color8 text-color2">
                            {products.map((product, index) => (
                                <tr key={product.id_productos}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">{`${index + 1}`}</td>
                                    <td className="whitespace-nowrap py-4 px-3 text-sm font-semibold"><Link href={`/product/${product.id_productos}`} className="hover:underline">{product.nombre}</Link></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold">
                                        <Link href={`/edit-product/${product.id_productos}`} className="mr-4 text-color5 hover:underline">Editar</Link>
                                        <button className="text-color6 hover:underline" onClick={() => setDeleteProduct(product)} >Eliminar</button>
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
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [deleteStatus, setDeleteStatus] = useState({loader: false, message: "", error: false});

    const {loadingData, fetchData, setFetchData, setLoadingData} = useGetData<Product[]>();
    
    const {token, userData, authLoading} = useAuthSelectors();

    const router = useRouter();

    useEffect(() => {
        const getUserProducts = async (token: string, idUser: string) => {
            try {
                const res = await GET_user_products(idUser, token);

                console.log(res);

                if(res.length > 0) setFetchData(res);
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }

            setLoadingData(false);
        }

        if(token && userData) {
            getUserProducts(token, userData.id_usuarios.toString());
        } else if((!token && !userData) && !authLoading) {
            router.push("/login");
        }
    }, [token, userData, authLoading, router, setFetchData, setLoadingData])

    const deleteProductAction = async (product: Product) => {
        if(!token || !fetchData) return setDeleteProduct(null);

        setDeleteStatus({loader: true, message: "", error: false});

        try {
            const res = await DELETE_user_product({token, idUser: product.usuarios_proveedores.id_usuarios.toString(), idProduct: product.id_productos.toString()});

            if(!res.error) {
                const newProducts = fetchData.filter((p) => p.id_productos !== product.id_productos);

                setDeleteStatus({loader: false, message: "Borrado exitosamente", error: false});
                setFetchData(newProducts);
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
            setDeleteProduct(null);
            setDeleteStatus({loader: false, message: "", error: false});
        }, 5000)
    }

    return (
        <>
            <main>
                <div className="w-content">
                    <h2 className="text-color2 text-center text-4xl lg:text-7xl mt-20 font-bold">Mis productos</h2>

                    {loadingData && <LoaderPage />}

                    {fetchData && <TableProducts products={fetchData} setDeleteProduct={setDeleteProduct} />}

                    {(!loadingData && !fetchData) && (
                        <div className="w-full all-center my-6 h-[50vh]">
                            <h5 className="text-color2 font-medium text-xl lg:text-3xl text-center">No tienes productos aún</h5>
                        </div>
                    )}
                </div>
            </main>

            {deleteProduct && (
                <div className="fixed z-[200] top-0 w-full h-screen modal-container all-center">
                    <div className="w-full px-7 max-w-[700px]">
                        <div className="bg-color3 w-full px-7 py-12 text-center all-center flex-col">
                            {(!deleteStatus.loader && deleteStatus.message === "") && (
                                <>
                                    <p className="text-color2 font-medium mb-10">¿Desea eliminar <span className="text-lg font-bold">{`"${deleteProduct.nombre}"`}</span>?</p>

                                    <div className="all-center w-full gap-4">
                                        <button className="btn-1" onClick={() => setDeleteProduct(null)}>No</button>
                                        <button className="btn-2" onClick={() => deleteProductAction(deleteProduct)} >Si</button>
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

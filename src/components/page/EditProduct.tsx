"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";

import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";
import LoaderPage from "../ui/LoaderPage";

import type { CreateProduct } from "@/types/forms";
import { AvailabilityProduct, CategoriesProduct } from "@/types/forms";
import type { Product } from "@/types/server-response";
import { Roles } from "@/types/forms";

import useFormStatus from "@/hooks/useFormStatus";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";
import useGetData from "@/hooks/useGetData";

import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";

import { ERROR_MESSAGE } from "@/utils/error-messages";
import { PUT_img_product, PATCH_edit_product, GET_products } from "@/server-actions";

export default function EditProduct({id}: {id: string}) {
    const [imgFile, setImgFile] = useState<File | string | null>(null);

    const {loaderFetch, setErrorForm, errorForm, setLoaderFetch} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();
    const {loadingData, setLoadingData, fetchData, setFetchData} = useGetData<Product>();

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreateProduct>();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await GET_products("/productos/" + id);

                console.log(res);

                if(res.producto) {
                    setFetchData(res.producto);
                    setImgFile(res.producto.imagen);
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }
            
            setLoadingData(false);
        }

        getProduct();
    }, []) // eslint-disable-line

    useEffect(() => {
        if(!userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
        if(!token || !fetchData) return setErrorForm("Inicie sesion para editar producto");

        setErrorForm("");
        setLoaderFetch(true);

        const {nombre, descripcion, disponibilidad_producto_id, tipos_producto_id, precio, ubicacion} = data;

        let newData = {};

        if(nombre.trim() !== "" && nombre !== fetchData.nombre) newData = {...newData, nombre: nombre.trim()};
        if(descripcion.trim() !== "" && descripcion !== fetchData.descripcion) newData = {...newData, descripcion: descripcion.trim()};
        if(disponibilidad_producto_id !== "" && disponibilidad_producto_id !== fetchData.disponibilidad_producto.estado) newData = {...newData, disponibilidad_producto_id};
        if(tipos_producto_id !== "" && tipos_producto_id !== fetchData.tipos_producto.tipo) newData = {...newData, tipos_producto_id};
        if(precio !== "" && precio !== fetchData.precio.toString()) newData = {...newData, precio};
        if(ubicacion !== "" && ubicacion !== fetchData.ubicacion) newData = {...newData, ubicacion};

        if(Object.keys(newData).length === 0 && typeof imgFile === "string") {
            setLoaderFetch(false);
            setErrorForm("Cambie los datos que desea actualizar");

            return;
        };

        try {
            if(typeof imgFile !== "string" && imgFile) {
                const res = await PUT_img_product(imgFile, token, id);

                if(res.error || !res.message.includes("exitosamente")){
                    setLoaderFetch(false);
                    throw new Error("ui- Error al cambiar imagen, intentelo de nuevo o mas tarde")
                }
            }

            if (Object.keys(newData).length > 0) {
                const response = await PATCH_edit_product(newData, token, id);

                if (response.error || !response.message.includes("exitosamente")) {
                    setLoaderFetch(false);
                    throw new Error("ui- Error al actualizar los datos, intentelo de nuevo o mas tarde")
                }
            }

            router.push(`/product/${id}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

                setLoaderFetch(false);
                setErrorForm(error.message.includes("ui-") ? error.message.split("ui-")[1] : ERROR_MESSAGE.unknown)
            }
        }
    }

    if (loadingData) return <LoaderPage />;

    if(fetchData) return (
        <main>
            <FormLayout nameForm="Editar producto">
                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="label">Nombre: </p>
                    <input
                        className={"input mb-5"}
                        placeholder={"Nombre del producto"}
                        type={"text"}
                        defaultValue={fetchData.nombre}
                        {...register("nombre")}
                        autoComplete={"name"}
                    />

                    <p className="label">Descripcion: </p>
                    <textarea
                        className="textarea mb-5"
                        defaultValue={fetchData.descripcion}
                        {...register("descripcion")}
                        placeholder="Añade una descripcion de tu producto"
                    />

                    <p className="label">Precio: </p>
                    <input
                        className={"input mb-5"}
                        placeholder={"Precio"}
                        type={"number"}
                        defaultValue={fetchData.precio}
                        {...register("precio")}
                        autoComplete={"off"}
                    />

                    <p className="label">Ubicacion: </p>
                    <input
                        className={"input mb-5"}
                        placeholder={"Ubicacion"}
                        defaultValue={fetchData.ubicacion}
                        type={"text"}
                        {...register("ubicacion")}
                        autoComplete={"off"}
                    />

                    <p className="label">Categoria: </p>
                    <select defaultValue={fetchData.tipos_producto.tipo} className="input mb-5" {...register("tipos_producto_id")}>
                        <option value={CategoriesProduct.TARJETAS_GRAFICAS}>{CategoriesProduct.TARJETAS_GRAFICAS}</option>
                        <option value={CategoriesProduct.PROCESADORES_Y_CPUS}>{CategoriesProduct.PROCESADORES_Y_CPUS}</option>
                        <option value={CategoriesProduct.PCS_GAMING_COMPLETAS}>{CategoriesProduct.PCS_GAMING_COMPLETAS}</option>
                        <option value={CategoriesProduct.MONITORES_Y_PANTALLAS}>{CategoriesProduct.MONITORES_Y_PANTALLAS}</option>
                        <option value={CategoriesProduct.PERIFERICOS_Y_ACCESORIOS}>{CategoriesProduct.PERIFERICOS_Y_ACCESORIOS}</option>
                        <option value={CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS}>{CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS}</option>
                        <option value={CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO}>{CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO}</option>
                        <option value={CategoriesProduct.OTROS}>{CategoriesProduct.OTROS}</option>
                    </select>

                    <p className="label">Disponibilidad: </p>
                    <select defaultValue={fetchData.disponibilidad_producto.estado} className="input mb-5" {...register("disponibilidad_producto_id")}>
                        <option value={AvailabilityProduct.DISPONIBLE}>{AvailabilityProduct.DISPONIBLE}</option>
                        <option value={AvailabilityProduct.PROXIMAMENTE}>{AvailabilityProduct.PROXIMAMENTE}</option>
                        <option value={AvailabilityProduct.AGOTADO}>{AvailabilityProduct.AGOTADO}</option>
                    </select>

                    <p className="label">Cambiar imagen: </p>
                    <Dropzone setImg={setImgFile} imgUploaded={typeof imgFile === "string" ? imgFile : undefined} />

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"} disabled={loaderFetch}>Editar producto</button>
                </form>
            </FormLayout>
        </main>
    )
}

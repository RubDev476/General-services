"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";

import type { CreateProduct } from "@/types/forms";
import { Roles } from "@/types/forms";

import useFormStatus from "@/hooks/useFormStatus";

import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";
import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";

import { ERROR_MESSAGE } from "@/utils/error-messages";
import { POST_create_product } from "@/server-actions";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import { AvailabilityProduct, CategoriesProduct } from "@/types/forms";

export default function Page() {
    const [imgFile, setImgFile] = useState<File | string | null>(null);

    const {loaderFetch, setErrorForm, errorForm, setLoaderFetch} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreateProduct>();

    useEffect(() => {
        if(!userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
        if(!token) return setErrorForm("Inicie sesion para crear producto");
        if(!imgFile) return setErrorForm("Porfavor suba una imagen");
        if(typeof imgFile === "string") return;

        setErrorForm("");
        setLoaderFetch(true);

        const newdata = {...data, imagen: imgFile};

        try {
            const response = await POST_create_product(newdata, token);

            if(response.error || !response.message.includes("exitosamente")) {
                throw new Error("ui- Error al crear producto");
            } else if(response.status === "success") {
                router.push("/my-products");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

                setErrorForm(error.message.includes("ui-") ? error.message.split("ui-")[1] : ERROR_MESSAGE.unknown);
            }
        }
    }

    return (
        <main>
            <FormLayout nameForm="Crear producto">
                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        className={"input mb-5"}
                        placeholder={"Nombre del producto"}
                        type={"text"}
                        {...register("nombre")}
                        autoComplete={"name"}
                        required
                    />

                    <textarea
                        className="textarea mb-5"
                        {...register("descripcion")}
                        placeholder="Añade una descripcion de tu producto"
                        required
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Precio"}
                        type={"number"}
                        {...register("precio")}
                        autoComplete={"off"}
                        required
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Ubicacion"}
                        type={"text"}
                        {...register("ubicacion")}
                        autoComplete={"off"}
                        required
                    />

                    <select className="input mb-5" {...register("tipos_producto_id")} required role="combobox" name="categories">
                        <option value="">Selecciona categoria:</option>
                        <option value={CategoriesProduct.TARJETAS_GRAFICAS}>{CategoriesProduct.TARJETAS_GRAFICAS}</option>
                        <option value={CategoriesProduct.PROCESADORES_Y_CPUS}>{CategoriesProduct.PROCESADORES_Y_CPUS}</option>
                        <option value={CategoriesProduct.PCS_GAMING_COMPLETAS}>{CategoriesProduct.PCS_GAMING_COMPLETAS}</option>
                        <option value={CategoriesProduct.MONITORES_Y_PANTALLAS}>{CategoriesProduct.MONITORES_Y_PANTALLAS}</option>
                        <option value={CategoriesProduct.PERIFERICOS_Y_ACCESORIOS}>{CategoriesProduct.PERIFERICOS_Y_ACCESORIOS}</option>
                        <option value={CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS}>{CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS}</option>
                        <option value={CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO}>{CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO}</option>
                        <option value={CategoriesProduct.OTROS}>{CategoriesProduct.OTROS}</option>
                    </select>

                    <select className="input mb-5" {...register("disponibilidad_producto_id")} required name="availability" role="combobox">
                        <option value={AvailabilityProduct.DISPONIBLE}>{AvailabilityProduct.DISPONIBLE}</option>
                        <option value={AvailabilityProduct.PROXIMAMENTE}>{AvailabilityProduct.PROXIMAMENTE}</option>
                        <option value={AvailabilityProduct.AGOTADO}>{AvailabilityProduct.AGOTADO}</option>
                    </select>

                    <Dropzone setImg={setImgFile} />

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"}>Crear producto</button>
                </form>
            </FormLayout>
        </main>
    )
}

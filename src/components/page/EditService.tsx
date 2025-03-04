"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";

import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";

import type { CreateService } from "@/types/forms";
import { Roles } from "@/types/forms";

import useFormStatus from "@/hooks/useFormStatus";

import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";

import { ERROR_MESSAGE } from "@/utils/error-messages";
import { PUT_img_service, PATCH_edit_service } from "@/server-actions";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import { AvailabilityService, CategoriesService } from "@/types/forms";

export default function EditService({id}: {id: string}) {
    const [imgFile, setImgFile] = useState<File | null>(null);

    const {loaderFetch, setErrorForm, errorForm, setLoaderFetch} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreateService>();

    useEffect(() => {
        if(!userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateService> = async (data) => {
        if(!token) return setErrorForm("Inicie sesion para crear servicio");

        setErrorForm("");
        setLoaderFetch(true);

        const {nombre, descripcion, disponibilidad_servicio_id, tipos_servicio_id, precio, ubicacion} = data;

        let newData = {};

        if(nombre.trim() !== "") newData = {...newData, nombre: nombre.trim()};
        if(descripcion.trim() !== "") newData = {...newData, descripcion: descripcion.trim()};
        if(data.disponibilidad_servicio_id !== "") newData = {...newData, disponibilidad_servicio_id};
        if(data.tipos_servicio_id !== "") newData = {...newData, tipos_servicio_id};
        if(data.precio !== "") newData = {...newData, precio};
        if(data.ubicacion !== "") newData = {...newData, ubicacion};

        if(Object.keys(newData).length === 0 && !imgFile) return setErrorForm("LLene los datos que desea actualizar");

        try {
            if(imgFile) {
                const res = await PUT_img_service(imgFile, token, id);

                if(res.error || !res.message.includes("exitosamente")){
                    throw new Error("ui- Error al cambiar imagen, intentelo de nuevo o mas tarde")
                }
            }

            const response = await PATCH_edit_service(newData, token, id);

            console.log(response)

            if(response.error || !response.message.includes("exitosamente")){
                throw new Error("ui- Error al actualizar los datos, intentelo de nuevo o mas tarde")
            }

            router.push(`/service/${id}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

                setErrorForm(error.message.includes("ui-") ? error.message.split("ui-")[1] : ERROR_MESSAGE.unknown)
            }
        }
    }

    return (
        <main>
            <FormLayout nameForm="Editar servicio">
                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        className={"input mb-5"}
                        placeholder={"Nombre del servicio"}
                        type={"text"}
                        {...register("nombre")}
                        autoComplete={"name"}
                    />

                    <textarea
                        className="textarea mb-5"
                        {...register("descripcion")}
                        placeholder="Añade una descripcion de tu servicio"
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Precio"}
                        type={"number"}
                        {...register("precio")}
                        autoComplete={"off"}
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Ubicacion"}
                        type={"text"}
                        {...register("ubicacion")}
                        autoComplete={"off"}
                    />

                    <select className="input mb-5" {...register("tipos_servicio_id")}>
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

                    <select className="input mb-5" {...register("disponibilidad_servicio_id")}>
                        <option value="">Selecciona disponibilidad</option>
                        <option value={AvailabilityService.DISPONIBLE}>{AvailabilityService.DISPONIBLE}</option>
                        <option value={AvailabilityService.PROXIMAMENTE}>{AvailabilityService.PROXIMAMENTE}</option>
                        <option value={AvailabilityService.AGOTADO}>{AvailabilityService.AGOTADO}</option>
                    </select>

                    <p className="text-color2 font-bold text-center mb-4 mt-7">Cambiar imagen: </p>
                    <Dropzone setImg={setImgFile} />

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"}>Editar servicio</button>
                </form>
            </FormLayout>
        </main>
    )
}

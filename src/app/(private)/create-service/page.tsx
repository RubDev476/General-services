"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";

import type { CreateService } from "@/types/forms";
import { Roles } from "@/types/forms";

import useFormStatus from "@/hooks/useFormStatus";

import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";
import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";

import { ERROR_MESSAGE } from "@/utils/error-messages";
import { POST_create_service } from "@/server-actions";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import { AvailabilityService, CategoriesService } from "@/types/forms";
import { console } from "inspector";

export default function Page() {
    const [imgFile, setImgFile] = useState<File | string | null>(null);

    const {loaderFetch, setErrorForm, errorForm, setLoaderFetch} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreateService>();

    useEffect(() => {
        if(!userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateService> = async (data) => {
        if(!token) return setErrorForm("Inicie sesion para crear servicio");
        if(!imgFile) return setErrorForm("Porfavor suba una imagen");
        if(typeof imgFile === "string") return;

        setErrorForm("");
        setLoaderFetch(true);

        const newdata = {...data, imagen: imgFile};

        try {
            const response = await POST_create_service(newdata, token);

            if(response.error || !response.message.includes("exitosamente")) {
                throw new Error("ui- Error al crear servicio");
            } else if(response.status === "success") {
                router.push("/my-services");
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
            <FormLayout nameForm="Crear servicio">
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
                        required
                    />

                    <textarea
                        className="textarea mb-5"
                        {...register("descripcion")}
                        placeholder="Añade una descripcion de tu servicio"
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

                    <select className="input mb-5" {...register("tipos_servicio_id")} required role="combobox" name="categories">
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

                    <select className="input mb-5" {...register("disponibilidad_servicio_id")} required name="availability" role="combobox">
                        <option value={AvailabilityService.DISPONIBLE}>{AvailabilityService.DISPONIBLE}</option>
                        <option value={AvailabilityService.PROXIMAMENTE}>{AvailabilityService.PROXIMAMENTE}</option>
                        <option value={AvailabilityService.AGOTADO}>{AvailabilityService.AGOTADO}</option>
                    </select>

                    <Dropzone setImg={setImgFile} />

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"}>Crear servicio</button>
                </form>
            </FormLayout>
        </main>
    )
}

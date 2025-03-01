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
import { POST_create_service } from "@/server-actions";

import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import { AvailabilityService, CategoriesService } from "@/types/forms";

export default function Page() {
    const [imgFile, setImgFile] = useState<File | null>(null);

    const {loaderFetch, setErrorForm, errorForm} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();

    const router = useRouter();

    const { register, handleSubmit, /*formState: { errors }, watch*/ } = useForm<CreateService>();

    useEffect(() => {   
        //if(!token && !authLoading) router.push("/");
        if(!userData?.roles.includes(Roles.proveedor) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateService> = async (data) => {
        console.log(data);
        console.log(imgFile);

        if(!token) return setErrorForm("Inicie sesion para crear servicio");
        if(!imgFile) return setErrorForm("Porfavor suba una imagen");

        const newdata = {...data, imagen: imgFile};
        //const newdata = data;

        try {
            const response = await POST_create_service(newdata, token);

            console.log(response);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }

            setErrorForm(ERROR_MESSAGE.unknown);
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

                    <select className="input mb-5" {...register("tipos_servicio_id")} required>
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

                    <select className="input mb-5" {...register("disponibilidad_servicio_id")} required>
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

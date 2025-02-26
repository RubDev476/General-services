"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";

import type { CreateService } from "@/types/forms";

export default function Page() {
    const [imgFile, setImgFile] = useState<File | null>(null);

    const { register, handleSubmit, /*formState: { errors }, watch*/ } = useForm<CreateService>();

    const onSubmit: SubmitHandler<CreateService> = (data) => {
        console.log(data);
        console.log(imgFile);
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

                    <input
                        className={"input mb-5"}
                        placeholder={"Tipo de servicio"}
                        type={"text"}
                        {...register("tipos_servicio_id")}
                        autoComplete={"off"}
                        required
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Disponibilidad"}
                        type={"text"}
                        {...register("disponibilidad_servicio_id")}
                        autoComplete={"off"}
                        required
                    />

                    <Dropzone setImg={setImgFile} />

                    {/*(loaderFetch && !errorForm) && <Loader />*/}

                    {/*errorForm && <ErrorForm message={errorForm} />*/}

                    <button className={"btn-3 w-full mt-7"} type={"submit"}>Crear servicio</button>
                </form>
            </FormLayout>
        </main>
    )
}

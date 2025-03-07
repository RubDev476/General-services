"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {useRouter} from "next/navigation";

import FormLayout from "@/components/ui/form/FormLayout";
import Dropzone from "@/components/ui/form/Dropzone";
import LoaderPage from "../ui/LoaderPage";

import type { CreateService } from "@/types/forms";
import {AvailabilityService, CategoriesService} from "@/types/forms";
import type { Service } from "@/types/server-response";
import { Roles } from "@/types/forms";

import useFormStatus from "@/hooks/useFormStatus";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";
import useGetData from "@/hooks/useGetData";

import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";

import { ERROR_MESSAGE } from "@/utils/error-messages";
import { PUT_img_service, PATCH_edit_service, GET_services } from "@/server-actions";

export default function EditService({id}: {id: string}) {
    const [imgFile, setImgFile] = useState<File | string | null>(null);

    const {loaderFetch, setErrorForm, errorForm, setLoaderFetch} = useFormStatus();
    const {token, authLoading, userData} = useAuthSelectors();
    const {loadingData, setLoadingData, fetchData, setFetchData} = useGetData<Service>();

    const router = useRouter();

    const { register, handleSubmit } = useForm<CreateService>();

    useEffect(() => {
        const getService = async () => {
            try {
                const res = await GET_services("/servicios/" + id);

                console.log(res);

                if(res.servicio) {
                    setFetchData(res.servicio);
                    setImgFile(res.servicio.imagen);
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error);
                }
            }
            
            setLoadingData(false);
        }

        getService();
    }, []) // eslint-disable-line

    useEffect(() => {
        if(!userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && !authLoading) router.push("/");
    }, [token, router, authLoading, userData])

    const onSubmit: SubmitHandler<CreateService> = async (data) => {
        if(!token || !fetchData) return setErrorForm("Inicie sesion para crear servicio");

        setErrorForm("");
        setLoaderFetch(true);

        const {nombre, descripcion, disponibilidad_servicio_id, tipos_servicio_id, precio, ubicacion} = data;

        let newData = {};

        if(nombre.trim() !== "" && nombre !== fetchData.nombre) newData = {...newData, nombre: nombre.trim()};
        if(descripcion.trim() !== "" && descripcion !== fetchData.descripcion) newData = {...newData, descripcion: descripcion.trim()};
        if(disponibilidad_servicio_id !== "" && disponibilidad_servicio_id !== fetchData.disponibilidad_servicio.estado) newData = {...newData, disponibilidad_servicio_id};
        if(tipos_servicio_id !== "" && tipos_servicio_id !== fetchData.tipos_servicio.tipo) newData = {...newData, tipos_servicio_id};
        if(precio !== "" && precio !== fetchData.precio.toString()) newData = {...newData, precio};
        if(ubicacion !== "" && ubicacion !== fetchData.ubicacion) newData = {...newData, ubicacion};

        if(Object.keys(newData).length === 0 && typeof imgFile === "string") {
            setLoaderFetch(false);
            setErrorForm("Cambie los datos que desea actualizar");

            return;
        };

        try {
            if(typeof imgFile !== "string" && imgFile) {
                const res = await PUT_img_service(imgFile, token, id);

                if(res.error || !res.message.includes("exitosamente")){
                    setLoaderFetch(false);
                    throw new Error("ui- Error al cambiar imagen, intentelo de nuevo o mas tarde")
                }
            }

            if (Object.keys(newData).length > 0) {
                const response = await PATCH_edit_service(newData, token, id);

                if (response.error || !response.message.includes("exitosamente")) {
                    setLoaderFetch(false);
                    throw new Error("ui- Error al actualizar los datos, intentelo de nuevo o mas tarde")
                }
            }

            router.push(`/service/${id}`);
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
            <FormLayout nameForm="Editar servicio">
                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="label">Nombre: </p>
                    <input
                        className={"input mb-5"}
                        placeholder={"Nombre del servicio"}
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
                        placeholder="Añade una descripcion de tu servicio"
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
                    <select defaultValue={fetchData.tipos_servicio.tipo} className="input mb-5" {...register("tipos_servicio_id")}>
                        <option value={CategoriesService.ALQUILER_DE_VEHICULOS}>{CategoriesService.ALQUILER_DE_VEHICULOS}</option>
                        <option value={CategoriesService.CINES_Y_TEATROS}>{CategoriesService.CINES_Y_TEATROS}</option>
                        <option value={CategoriesService.GIMNASIOS_Y_ENTRENAMIENTOS}>{CategoriesService.GIMNASIOS_Y_ENTRENAMIENTOS}</option>
                        <option value={CategoriesService.HOTELES_Y_HOSPEDAJES}>{CategoriesService.HOTELES_Y_HOSPEDAJES}</option>
                        <option value={CategoriesService.RESTAURANTES_Y_BARES}>{CategoriesService.RESTAURANTES_Y_BARES}</option>
                        <option value={CategoriesService.SALONES_DE_EVENTOS}>{CategoriesService.SALONES_DE_EVENTOS}</option>
                        <option value={CategoriesService.SPA_Y_MASAJES}>{CategoriesService.SPA_Y_MASAJES}</option>
                        <option value={CategoriesService.OTROS}>{CategoriesService.OTROS}</option>
                    </select>

                    <p className="label">Disponibilidad: </p>
                    <select defaultValue={fetchData.disponibilidad_servicio.estado} className="input mb-5" {...register("disponibilidad_servicio_id")}>
                        <option value={AvailabilityService.DISPONIBLE}>{AvailabilityService.DISPONIBLE}</option>
                        <option value={AvailabilityService.PROXIMAMENTE}>{AvailabilityService.PROXIMAMENTE}</option>
                        <option value={AvailabilityService.AGOTADO}>{AvailabilityService.AGOTADO}</option>
                    </select>

                    <p className="label">Cambiar imagen: </p>
                    <Dropzone setImg={setImgFile} imgUploaded={typeof imgFile === "string" ? imgFile : undefined} />

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"} disabled={loaderFetch}>Editar servicio</button>
                </form>
            </FormLayout>
        </main>
    )
}

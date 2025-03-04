"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import type { RegisterForm } from "@/types/forms";
import { UserType, Roles } from "@/types/forms";

import { PATCH_edit_user, PUT_img_profile, GET_user } from "@/server-actions";
import { ERROR_MESSAGE } from "@/utils/error-messages";

import { useAuthActions } from "@/store/hooks/useAuthActions";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import FormLayout from "@/components/ui/form/FormLayout";
import Loader from "@/components/ui/form/Loader";
import ErrorForm from "@/components/ui/form/Error";
import Dropzone from "@/components/ui/form/Dropzone";

import useFormStatus from "@/hooks/useFormStatus";

export default function Page() {
    const [imgFile, setImgFile] = useState<File | null>(null);

    const router = useRouter();

    const { loaderFetch, setLoaderFetch, errorForm, setErrorForm } = useFormStatus();

    const { updateProfileAction } = useAuthActions();
    const { userData, authLoading, token } = useAuthSelectors();

    const { register, handleSubmit } = useForm<RegisterForm>();

    useEffect(() => {
        if (!userData && !authLoading) router.push("/login");
    }, [userData, router, authLoading])

    const onSubmit: SubmitHandler<RegisterForm> = async (dataForm) => {
        if (!userData || !token) return;

        setErrorForm("");
        setLoaderFetch(true);

        const { nombre, correo, telefono, tipos_usuario_id, roles_id, confirmPassword, contrasena } = dataForm;

        let newData = {};

        if (nombre.trim() !== "") newData = {...newData, nombre: nombre.trim()};
        if (dataForm.correo !== "") newData = {...newData, correo};
        if (dataForm.tipos_usuario_id) newData = {...newData, tipos_usuario_id};
        if (dataForm.roles_id) newData = {...newData, roles_id};

        if (telefono.length > 0 && !parseInt(telefono)) {
            return setErrorForm('Agregue solo numeros al telefono');
        } else if (telefono.length > 0 && parseInt(telefono)) {
            newData = {...newData, telefono};
        }

        if ((contrasena.length > 0 && confirmPassword.length > 0) && (contrasena === confirmPassword)) {
            newData = {...newData, contrasena};
        } else if ((contrasena !== confirmPassword)) {
            return setErrorForm('Las contraseñas no coinciden');
        }

        try {
            if (imgFile) {
                const res = await PUT_img_profile(imgFile, token, userData.id_usuarios);

                if (!res.message.includes("exitosamente")) {
                    throw new Error("ui- " + "Error al actualizar la imagen, inténtelo de nuevo o mas tarde");
                } 
            }

            if (Object.keys(newData).length !== 0) {
                const res = await PATCH_edit_user(newData, token, userData.id_usuarios);

                if (res.error || !res.message.includes("exitosamente")) {
                    throw new Error("ui- " + "Error al actualizar datos, verifique los campos o inténtelo mas tarde");
                } 
            } else if (Object.keys(newData).length === 0 && !imgFile) {
                return setErrorForm('Llene el campo que desea actualizar');
            }

            const res = await GET_user(userData.id_usuarios.toString());

            if (res.usuario) {
                const newData = { token, userData: res.usuario };

                localStorage.setItem('gServicesUser', JSON.stringify(newData));

                updateProfileAction(newData);

                router.push(`/user/${userData.id_usuarios}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);

                setErrorForm(error.message.includes('ui-') ? error.message.split("ui-")[1] : ERROR_MESSAGE.unknown);
            }
        }
    }

    return (
        <>
            <FormLayout nameForm={"Editar perfil"}>
                <div className="px-4">
                    <p className="text-color2 font-bold mb-4">Cambiar foto de perfil: </p>
                    <Dropzone setImg={setImgFile} />
                </div>

                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        className={"input mb-5"}
                        placeholder={"E-mail"}
                        type={"email"}
                        {...register("correo", {
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                        autoComplete="off"
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Contraseña"}
                        type={"password"}
                        autoComplete={"off"}
                        {...register("contrasena")}
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Confirmar contraseña"}
                        type={"password"}
                        autoComplete={"off"}
                        {...register("confirmPassword")}
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Nombre"}
                        type={"text"}
                        {...register("nombre")}
                        autoComplete={"name"}
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Teléfono"}
                        type={"tel"}
                        {...register("telefono")}
                        maxLength={15}
                        autoComplete={"off"}
                    />

                    <fieldset className={"fieldset"}>
                        <legend className={"mb-4 font-bold"}>Tipo de rol:</legend>

                        <label className={"all-center gap-2.5 mr-3 lg:mr-6"}>Cliente
                            <input
                                type="checkbox"
                                id="cliente"
                                {...register("roles_id")}
                                value={Roles.cliente}
                                //defaultChecked={true}
                                className={"check"}
                            />
                            <span className={"custom-check"}>
                                <FontAwesomeIcon icon={faCheck} className={"icon-check"} />
                            </span>
                        </label>

                        <label className={"all-center gap-2.5"}>Proveedor
                            <input
                                type="checkbox"
                                id="proveedor"
                                {...register("roles_id")}
                                value={Roles.proveedor}
                                className={"check"}
                            />
                            <span className={"custom-check"}>
                                <FontAwesomeIcon icon={faCheck} className={"icon-check"} />
                            </span>
                        </label>
                    </fieldset>

                    <fieldset className={"fieldset"}>
                        <legend className={"mb-4 font-bold"}>Tipo de usuario:</legend>

                        <label className={"all-center gap-2.5 mr-3 lg:mr-6"}>
                            <input
                                type="radio"
                                {...register("tipos_usuario_id")}
                                value={UserType.particular}
                                className={"ratio"}

                            />
                            Particular
                            <span className={"custom-ratio"}></span>
                        </label>

                        <label className={"all-center gap-2.5"}>
                            <input
                                type="radio"
                                {...register("tipos_usuario_id")}
                                value={UserType.empresa}
                                className={"ratio"}

                            />
                            Empresa
                            <span className={"custom-ratio"}></span>
                        </label>
                    </fieldset>

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}

                    <button className={"btn-3 w-full"} type={"submit"}>Editar perfil</button>
                </form>
            </FormLayout>
        </>
    )
}

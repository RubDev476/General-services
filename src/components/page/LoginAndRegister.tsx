"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCheck} from "@fortawesome/free-solid-svg-icons";

import type {RegisterForm} from "@/types/forms";
import {UserType, Roles} from "@/types/forms";

import {POST_register_login} from "@/server-actions";
import { ERROR_MESSAGE } from "@/utils/error-messages";

import { useAuthActions } from "@/store/hooks/useAuthActions";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import FormLayout from "../ui/form/FormLayout";
import Loader from "../ui/form/Loader";
import ErrorForm from "../ui/form/Error";

import useFormStatus from "@/hooks/useFormStatus";

export default function LoginAndRegister({isRegister}: {isRegister: boolean}) {    
    const nameForm = isRegister ? 'Registrarse' : 'Iniciar sesion';
    
    const router = useRouter();

    const {loaderFetch, setLoaderFetch, errorForm, setErrorForm, disabled, setDisabled} = useFormStatus();

    const {loginSuccessAction} = useAuthActions();
    const {userData} = useAuthSelectors();
    
    const { register, handleSubmit } = useForm<RegisterForm>({defaultValues: {roles_id: [Roles.cliente]}});
    
    useEffect(() => {
        if(userData) router.push(`/user/${userData.id_usuarios}`);
    }, [userData, router])
    
    const onSubmit: SubmitHandler<RegisterForm> = async (dataForm) => {
        setLoaderFetch(true);
        
        if(isRegister) {
            submitRegister(dataForm);
        } else {
            submitLogin(dataForm);
        }
    }
    
    const submitRegister = async (dataForm: RegisterForm) => {
        if(dataForm.contrasena !== dataForm.confirmPassword) return setErrorForm('Las contraseñas no coinciden');
        if(dataForm.roles_id.length === 0) return setErrorForm('Elige un rol');
        if(!dataForm.tipos_usuario_id) return setErrorForm('Elige un tipo de usuario');
        if(!parseInt(dataForm.telefono)) return  setErrorForm('Agregue solo numeros al telefono');
        
        setErrorForm(null);
        setDisabled(true);
        
        //remove "confirmPassword" property
        delete (dataForm as {confirmPassword?: string}).confirmPassword;

        try {
            const response = await POST_register_login(dataForm, "/usuarios");

            if(response.status === "success") {
                router.push("/login");
            } else {
                setErrorForm(response.message ?? ERROR_MESSAGE.unknown);
                setDisabled(false);
            }
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message);
            }
            
            setErrorForm(ERROR_MESSAGE.unknown);
            setDisabled(false);
        }
    }
    
    const submitLogin = async (dataForm: RegisterForm) => {
        setErrorForm(null);
        setDisabled(true);
        
        const {contrasena, correo} = dataForm;
        
        try {
            const response = await POST_register_login({email: correo, password: contrasena}, "/login");

            if(response.token) {
                loginSuccessAction({token: response.token, userData: null});
            } else if(response.error) {
                setDisabled(false);
                throw new Error("Ha ocurrido un error");
            } else {
                setErrorForm(response.message ?? ERROR_MESSAGE.unknown);
                setDisabled(false);
            }
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message);
            }
            
            setErrorForm(ERROR_MESSAGE.unknown);
            setDisabled(false);
        }
    }
    
    return(
        <main>
            <FormLayout nameForm={nameForm}>
                {/* Avatar Badge con estilo gamer */}
                <div className={"bg-gradient-to-tr from-color5 via-color6 to-color7 mx-auto mb-8 rounded-2xl all-center w-16 h-16 sm:w-20 sm:h-20 shadow-lg shadow-color5/30 border border-color3/30"}>
                    <FontAwesomeIcon icon={faUser} className={"text-color3 text-3xl sm:text-4xl"} data-testid="icon-user" />
                </div>

                <form
                    className={"w-full px-2 sm:px-4 mb-7 flex flex-col items-center"}
                    onSubmit={handleSubmit(onSubmit)}
                    role="form"
                >
                    <div className="w-full max-w-[400px] mb-4">
                        <input
                            className={"input w-full border border-color8/20 focus:border-color5 focus:ring-2 focus:ring-color5/20 transition-all"}
                            placeholder={"E-mail"}
                            type={"email"}
                            autoComplete={"email"}
                            required
                            {...register("correo")}
                        />
                    </div>

                    <div className="w-full max-w-[400px] mb-4">
                        <input
                            className={"input w-full border border-color8/20 focus:border-color5 focus:ring-2 focus:ring-color5/20 transition-all"}
                            placeholder={"Contraseña"}
                            type={"password"}
                            autoComplete={"off"}
                            {...register("contrasena")}
                            required
                        />
                    </div>

                    {isRegister && (
                        <>
                            <div className="w-full max-w-[400px] mb-4">
                                <input
                                    className={"input w-full border border-color8/20 focus:border-color5 focus:ring-2 focus:ring-color5/20 transition-all"}
                                    placeholder={"Confirmar contraseña"}
                                    type={"password"}
                                    autoComplete={"off"}
                                    required
                                    {...register("confirmPassword")}
                                />
                            </div>

                            <div className="w-full max-w-[400px] mb-4">
                                <input
                                    className={"input w-full border border-color8/20 focus:border-color5 focus:ring-2 focus:ring-color5/20 transition-all"}
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    {...register("nombre")}
                                    autoComplete={"name"}
                                    required
                                />
                            </div>

                            <div className="w-full max-w-[400px] mb-4">
                                <input
                                    className={"input w-full border border-color8/20 focus:border-color5 focus:ring-2 focus:ring-color5/20 transition-all"}
                                    placeholder={"Teléfono"}
                                    type={"tel"}
                                    {...register("telefono")}
                                    maxLength={15}
                                    autoComplete={"off"}
                                    required
                                />
                            </div>

                            {/* FIELDSET ROLES */}
                            <fieldset className={"fieldset bg-color9/60 border border-color8/20 p-4 rounded-2xl mb-6"} data-testid="fieldset-roles">
                                <legend className={"mb-3 font-bold text-color2 text-xs uppercase tracking-wider px-2"}>Tipo de rol:</legend>

                                <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
                                    <label className={"all-center gap-2 cursor-pointer font-semibold text-color2 text-sm sm:text-base hover:text-color5 transition-colors"}>
                                        Cliente
                                        <input
                                            type="checkbox"
                                            id="cliente"
                                            {...register("roles_id")}
                                            value={Roles.cliente}
                                            className={"check"}
                                            data-testid="check-client"
                                        />
                                        <span className={"custom-check shadow-sm"}>
                                            <FontAwesomeIcon icon={faCheck} className={"icon-check text-xs"} />
                                        </span>
                                    </label>

                                    <label className={"all-center gap-2 cursor-pointer font-semibold text-color2 text-sm sm:text-base hover:text-color5 transition-colors"}>
                                        Proveedor
                                        <input
                                            type="checkbox"
                                            id="proveedor"
                                            {...register("roles_id")}
                                            value={Roles.proveedor}
                                            className={"check"}
                                        />
                                        <span className={"custom-check shadow-sm"}>
                                            <FontAwesomeIcon icon={faCheck} className={"icon-check text-xs"} />
                                        </span>
                                    </label>
                                </div>
                            </fieldset>

                            {/* FIELDSET TIPOS DE USUARIO */}
                            <fieldset className={"fieldset bg-color9/60 border border-color8/20 p-4 rounded-2xl mb-6"} data-testid="fieldset-types">
                                <legend className={"mb-3 font-bold text-color2 text-xs uppercase tracking-wider px-2"}>Tipo de usuario:</legend>

                                <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
                                    <label className={"all-center gap-2 cursor-pointer font-semibold text-color2 text-sm sm:text-base hover:text-color5 transition-colors"}>
                                        <input
                                            type="radio"
                                            {...register("tipos_usuario_id")}
                                            value={UserType.particular}
                                            className={"ratio"}
                                            data-testid="radio-particular"
                                        />
                                        Particular
                                        <span className={"custom-ratio shadow-sm"}></span>
                                    </label>

                                    <label className={"all-center gap-2 cursor-pointer font-semibold text-color2 text-sm sm:text-base hover:text-color5 transition-colors"}>
                                        <input
                                            type="radio"
                                            {...register("tipos_usuario_id")}
                                            value={UserType.empresa}
                                            className={"ratio"}
                                        />
                                        Empresa
                                        <span className={"custom-ratio shadow-sm"}></span>
                                    </label>
                                </div>
                            </fieldset>
                        </>
                    )}

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}
                    
                    <button
                        className={"btn-main input-sizes bg-gradient-to-r from-color5 via-color6 to-color7 hover:opacity-95 text-color3 font-bold py-3 rounded-full shadow-lg shadow-color5/20 transition-all w-full max-w-[400px]"}
                        type={"submit"}
                        disabled={disabled}
                    >
                        {nameForm}
                    </button>
                </form>

                <div className={"all-center text-sm md:text-base flex-col gap-3 pt-4 border-t border-color8/20"}>
                    {isRegister ? (
                        <>
                            <Link href={"/login"} className={"text-link font-medium hover:text-color5 transition-colors"}>
                                ¿Ya tienes una cuenta? Inicia sesion
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/"} className={"text-color8 hover:text-color2 text-xs sm:text-sm font-medium transition-colors"}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <Link href={"/register"} className={"text-link font-semibold text-color5 hover:text-color6 transition-colors"}>
                                ¿No tienes una cuenta? Registrate
                            </Link>
                        </>
                    )}
                </div>
            </FormLayout>
        </main>
    )
}

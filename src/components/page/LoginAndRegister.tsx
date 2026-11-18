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
            <FormLayout nameForm={nameForm} maxWidth={isRegister ? "max-w-xl" : "max-w-md"}>
                {/* Avatar Badge con estilo gamer */}
                <div className={"bg-gradient-to-tr from-color5 via-color6 to-color7 mx-auto mb-6 rounded-2xl all-center w-14 h-14 sm:w-16 sm:h-16 shadow-lg shadow-color5/30 border border-color3/30"}>
                    <FontAwesomeIcon icon={faUser} className={"text-color3 text-2xl sm:text-3xl"} data-testid="icon-user" />
                </div>

                <form
                    className={"w-full px-1 sm:px-2 mb-6 flex flex-col items-center"}
                    onSubmit={handleSubmit(onSubmit)}
                    role="form"
                >
                    {/* Campo: Correo */}
                    <div className="w-full max-w-[420px] mb-4 text-left">
                        <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                            Correo electrónico:
                        </label>
                        <input
                            className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                            placeholder={"E-mail"}
                            type={"email"}
                            autoComplete={"email"}
                            required
                            {...register("correo")}
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="w-full max-w-[420px] mb-4 text-left">
                        <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                            Contraseña:
                        </label>
                        <input
                            className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                            placeholder={"Contraseña"}
                            type={"password"}
                            autoComplete={"off"}
                            {...register("contrasena")}
                            required
                        />
                    </div>

                    {isRegister && (
                        <>
                            {/* Campo: Confirmar Contraseña */}
                            <div className="w-full max-w-[420px] mb-4 text-left">
                                <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                                    Confirmar contraseña:
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                    placeholder={"Confirmar contraseña"}
                                    type={"password"}
                                    autoComplete={"off"}
                                    required
                                    {...register("confirmPassword")}
                                />
                            </div>

                            {/* Campo: Nombre */}
                            <div className="w-full max-w-[420px] mb-4 text-left">
                                <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                                    Nombre de usuario:
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    {...register("nombre")}
                                    autoComplete={"name"}
                                    required
                                />
                            </div>

                            {/* Campo: Teléfono */}
                            <div className="w-full max-w-[420px] mb-4 text-left">
                                <label className="block text-xs font-bold text-color2 uppercase tracking-wider mb-1.5">
                                    Teléfono de contacto:
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 text-sm sm:text-base font-medium rounded-xl bg-color9 border border-color8/30 text-color2 placeholder:text-color10 focus:bg-color3 focus:border-color5 focus:ring-2 focus:ring-color5/20 outline-none transition-all"
                                    placeholder={"Teléfono"}
                                    type={"tel"}
                                    {...register("telefono")}
                                    maxLength={15}
                                    autoComplete={"off"}
                                    required
                                />
                            </div>

                            {/* FIELDSET ROLES */}
                            <fieldset className={"w-full max-w-[420px] bg-color9/70 p-4 sm:p-5 rounded-2xl border border-color8/25 mb-4 text-left"} data-testid="fieldset-roles">
                                <legend className={"mb-3 font-bold text-color2 text-xs uppercase tracking-wider px-1"}>Tipo de rol:</legend>

                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <label htmlFor="cliente" className={"flex items-center justify-between p-3 rounded-xl bg-color3 border border-color8/30 hover:border-color5/50 cursor-pointer font-semibold text-color2 text-sm transition-all shadow-sm group"}>
                                        <span className="group-hover:text-color5 transition-colors">Cliente</span>
                                        <div className="relative all-center">
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
                                        </div>
                                    </label>

                                    <label htmlFor="proveedor" className={"flex items-center justify-between p-3 rounded-xl bg-color3 border border-color8/30 hover:border-color5/50 cursor-pointer font-semibold text-color2 text-sm transition-all shadow-sm group"}>
                                        <span className="group-hover:text-color5 transition-colors">Proveedor</span>
                                        <div className="relative all-center">
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
                                        </div>
                                    </label>
                                </div>
                            </fieldset>

                            {/* FIELDSET TIPOS DE USUARIO */}
                            <fieldset className={"w-full max-w-[420px] bg-color9/70 p-4 sm:p-5 rounded-2xl border border-color8/25 mb-6 text-left"} data-testid="fieldset-types">
                                <legend className={"mb-3 font-bold text-color2 text-xs uppercase tracking-wider px-1"}>Tipo de usuario:</legend>

                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <label className={"flex items-center justify-between p-3 rounded-xl bg-color3 border border-color8/30 hover:border-color5/50 cursor-pointer font-semibold text-color2 text-sm transition-all shadow-sm group"}>
                                        <span className="group-hover:text-color5 transition-colors">Particular</span>
                                        <div className="relative all-center">
                                            <input
                                                type="radio"
                                                {...register("tipos_usuario_id")}
                                                value={UserType.particular}
                                                className={"ratio"}
                                                data-testid="radio-particular"
                                            />
                                            <span className={"custom-ratio shadow-sm"}></span>
                                        </div>
                                    </label>

                                    <label className={"flex items-center justify-between p-3 rounded-xl bg-color3 border border-color8/30 hover:border-color5/50 cursor-pointer font-semibold text-color2 text-sm transition-all shadow-sm group"}>
                                        <span className="group-hover:text-color5 transition-colors">Empresa</span>
                                        <div className="relative all-center">
                                            <input
                                                type="radio"
                                                {...register("tipos_usuario_id")}
                                                value={UserType.empresa}
                                                className={"ratio"}
                                            />
                                            <span className={"custom-ratio shadow-sm"}></span>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>
                        </>
                    )}

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}
                    
                    <button
                        className={"w-full max-w-[420px] bg-gradient-to-r from-color5 via-color6 to-color7 hover:opacity-95 text-color3 font-bold py-3.5 rounded-full shadow-lg shadow-color5/25 hover:shadow-color5/40 hover:scale-[1.01] active:scale-[0.99] transition-all text-base text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"}
                        type={"submit"}
                        disabled={disabled}
                    >
                        {nameForm}
                    </button>
                </form>

                <div className={"all-center text-sm sm:text-base flex-col gap-2.5 pt-5 border-t border-color8/20 w-full max-w-[420px] mx-auto"}>
                    {isRegister ? (
                        <>
                            <Link href={"/login"} className={"text-color2 hover:text-color5 font-semibold text-sm sm:text-base transition-colors"}>
                                ¿Ya tienes una cuenta? <span className="text-color5 underline decoration-color5/40 hover:decoration-color5">Inicia sesion</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/"} className={"text-color10 hover:text-color2 text-xs sm:text-sm font-medium transition-colors"}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                            <Link href={"/register"} className={"text-color2 hover:text-color5 font-semibold text-sm sm:text-base transition-colors"}>
                                ¿No tienes una cuenta? <span className="text-color6 underline decoration-color6/40 hover:decoration-color6">Registrate</span>
                            </Link>
                        </>
                    )}
                </div>
            </FormLayout>
        </main>
    )
}

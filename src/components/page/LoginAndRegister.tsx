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

export default  function LoginAndRegister({isRegister}: {isRegister: boolean}) {    
    const nameForm = isRegister ? 'Registrarse' : 'Iniciar sesion';
    
    const router = useRouter();

    const {loaderFetch, setLoaderFetch, errorForm, setErrorForm, disabled, setDisabled} = useFormStatus();

    const {loginSuccessAction} = useAuthActions();
    const {userData} = useAuthSelectors();
    
    const { register, handleSubmit } = useForm<RegisterForm>();
    
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
                <div className={"bg-color5 mx-auto mb-10 rounded-full all-center w-20 h-20 shadow-[0px_30px_50px_0px_rgba(94,53,177,0.35)]"}>
                    <FontAwesomeIcon icon={faUser} className={"text-color3 text-4xl"} data-testid="icon-user" />
                </div>

                <form
                    className={"w-full px-4 mb-7"}
                    onSubmit={handleSubmit(onSubmit)}
                    role="form"
                >
                    <input
                        className={"input mb-5"}
                        placeholder={"E-mail"}
                        type={"email"}
                        autoComplete={"email"}
                        required
                        {...register("correo")}
                    />

                    <input
                        className={"input mb-5"}
                        placeholder={"Contraseña"}
                        type={"password"}
                        autoComplete={"off"}
                        {...register("contrasena")}
                        required
                    />

                    {isRegister && (
                        <>
                            <input
                                className={"input mb-5"}
                                placeholder={"Confirmar contraseña"}
                                type={"password"}
                                autoComplete={"off"}
                                required
                                {...register("confirmPassword")}
                            />

                            <input
                                className={"input mb-5"}
                                placeholder={"Nombre"}
                                type={"text"}
                                {...register("nombre")}
                                autoComplete={"name"}
                                required
                            />

                            <input
                                className={"input mb-5"}
                                placeholder={"Teléfono"}
                                type={"tel"}
                                {...register("telefono")}
                                maxLength={15}
                                autoComplete={"off"}
                                required
                            />

                            <fieldset className={"fieldset"} data-testid="fieldset-roles">
                                <legend className={"mb-4 font-bold"}>Tipo de rol:</legend>

                                <label className={"all-center gap-2.5 mr-3 lg:mr-6"}>Cliente
                                    <input
                                        type="checkbox"
                                        id="cliente"
                                        {...register("roles_id")}
                                        value={Roles.cliente}
                                        defaultChecked={true}
                                        className={"check"}
                                        data-testid="check-client"
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

                            <fieldset className={"fieldset"} data-testid="fieldset-types">
                                <legend className={"mb-4 font-bold"}>Tipo de usuario:</legend>

                                <label className={"all-center gap-2.5 mr-3 lg:mr-6"}>
                                    <input
                                        type="radio"
                                        {...register("tipos_usuario_id")}
                                        value={UserType.particular}
                                        className={"ratio"}
                                        data-testid="radio-particular"
                                    //required
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
                                    //required
                                    />
                                    Empresa
                                    <span className={"custom-ratio"}></span>
                                </label>
                            </fieldset>
                        </>
                    )}

                    {(loaderFetch && !errorForm) && <Loader />}

                    {errorForm && <ErrorForm message={errorForm} />}
                    
                    <button className={"btn-3 w-full"} type={"submit"} disabled={disabled}>{nameForm}</button>
                </form>

                <div className={"all-center text-sm md:text-lg flex-col gap-5"}>
                    {isRegister ? (
                        <>
                            <Link href={"/login"} className={"text-link font-medium"}>¿Ya tienes una cuenta? Inicia sesion</Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/"} className={"text-link font-medium"}>¿Olvidaste tu contraseña?</Link>
                            <Link href={"/register"} className={"text-link font-medium"}>¿No tienes una cuenta? Registrate</Link>
                        </>
                    )}
                </div>
            </FormLayout>
        </main>
    )
}
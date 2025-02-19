"use client";

import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import type {RegisterForm} from "@/types/forms";
import {UserType, Roles} from "@/types/forms";
import {useRouter} from "next/navigation";

export default  function LoginAndRegister({isRegister}: {isRegister: boolean}) {
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const [loaderFetch, setLoaderFetch] = useState(false);
    
    const nameForm = isRegister ? 'Registrarse' : 'Iniciar sesion';
    
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
    
    const onSubmit: SubmitHandler<RegisterForm> = async (dataForm) => {
        setLoaderFetch(true);
        
        if(dataForm.contrasena !== dataForm.confirmPassword) return setErrorForm('Las contraseñas no coinciden');
        if(dataForm.roles_id.length === 0) return setErrorForm('Elige un rol');
        if(!dataForm.tipos_usuario_id) return setErrorForm('Elige un tipo de usuario');
        if(!parseInt(dataForm.telefono)) return  setErrorForm('Agregue solo numeros al telefono');
        
        setErrorForm(null);
        
        //remove "confirmPassword" property
        const {confirmPassword, ...resData} = dataForm;
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resData),
            })
            
            if(response.status === 400) return setErrorForm('Correo o telefono ya esta en uso');
            if(response.status === 201) {
                router.push("/login");
                
                setLoaderFetch(false);
            }
        } catch (error) {
            //console.log(error.message);
            setErrorForm('Error, intentelo de nuevo o mas tarde');
        }
    }
    
    return(
        <main>
            <div className={"w-content py-20"}>
                <h1 className={"text-color2 text-center text-4xl lg:text-7xl font-bold mb-9"}>{nameForm}</h1>
                
                <div className={"w-full text-center max-w-xl mx-auto mb-5 py-12 shadow-[0px_10px_30px_0px_rgba(28,9,80,0.07)]"}>
                    <div className={"bg-color5 mx-auto mb-10 rounded-full all-center w-20 h-20 shadow-[0px_30px_50px_0px_rgba(94,53,177,0.35)]"}>
                        <FontAwesomeIcon icon={faUser} className={"text-color3 text-4xl"} />
                    </div>
                    
                    <form
                        className={"w-full px-4 mb-7"}
                        onSubmit={handleSubmit(onSubmit)}
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
                                
                                <fieldset className={"fieldset"}>
                                    <legend className={"mb-4 font-bold"}>Tipo de rol:</legend>
                                    
                                    <label className={"all-center gap-2.5 mr-3 lg:mr-6"}>Cliente
                                        <input
                                            type="checkbox"
                                            id="cliente"
                                            {...register("roles_id")}
                                            value={Roles.cliente}
                                            defaultChecked={true}
                                            className={"check"}
                                        />
                                        <span className={"custom-check"}>
                                            <FontAwesomeIcon icon={faCheck} className={"icon-check"}/>
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
                                            <FontAwesomeIcon icon={faCheck} className={"icon-check"}/>
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
                        
                        {(loaderFetch && !errorForm) && (
                            <>
                                <span className="loader m-auto w-full flex"></span>
                                <br/>
                            </>
                        )}
                        
                        {errorForm && (
                            <>
                                <span className={"w-full text-color6 font-medium"}>{errorForm}*</span>
                                <br/>
                            </>
                        )}
                        <button className={"btn-3 w-full"} type={"submit"}>{nameForm}</button>
                    </form>
                    
                    <div className={"all-center text-sm md:text-lg flex-col gap-5"}>
                    {isRegister ? (
                            <>
                                <Link href={"/login"} className={"text-link font-medium"}>¿Ya tienes una cuenta? Inicia sesion</Link>
                            </>
                        ): (
                            <>
                                <Link href={"/"} className={"text-link font-medium"}>¿Olvidaste tu contraseña?</Link>
                                <Link href={"/register"} className={"text-link font-medium"}>¿No tienes una cuenta? Registrate</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
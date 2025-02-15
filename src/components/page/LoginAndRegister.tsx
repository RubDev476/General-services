"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default  function LoginAndRegister({isRegister}: {isRegister: boolean}) {
    const nameForm = isRegister ? 'Registrarse' : 'Iniciar sesion';
    
    return(
        <main>
            <div className={"w-content py-20"}>
                <h1 className={"text-color2 text-center text-4xl lg:text-7xl font-bold mb-9"}>{nameForm}</h1>
                
                <div className={"w-full text-center max-w-xl mx-auto mb-5 py-12 shadow-[0px_10px_30px_0px_rgba(28,9,80,0.07)]"}>
                    <div className={"bg-color5 mx-auto mb-10 rounded-full all-center w-20 h-20 shadow-[0px_30px_50px_0px_rgba(94,53,177,0.35)]"}>
                        <FontAwesomeIcon icon={faUser} className={"text-color3 text-4xl"} />
                    </div>
                    
                    <form className={"w-full px-4 mb-7"}>
                        <input
                            className={"input mb-5"}
                            placeholder={"E-mail"}
                            type={"email"}
                            name={"email"}
                            autoComplete={"email"}
                            required
                        />
                        
                        <input
                            className={"input mb-5"}
                            placeholder={"Contraseña"}
                            type={"password"}
                            autoComplete={"off"}
                            name={"password"}
                            required
                        />
                        
                        {isRegister && (
                            <>
                                <input
                                    className={"input mb-5"}
                                    placeholder={"Confirmar contraseña"}
                                    type={"password"}
                                    name={"confirm-password"}
                                    autoComplete={"off"}
                                    required
                                />
                                
                                <input
                                    className={"input mb-5"}
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    name={"name"}
                                    autoComplete={"name"}
                                    required
                                />
                                
                                <input
                                    className={"input mb-5"}
                                    placeholder={"Teléfono"}
                                    type={"tel"}
                                    name={"phone"}
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
                                            name="cliente"
                                            defaultChecked={true}
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
                                            name="proveedor"
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
                                            name="typeUser"
                                            value="particular"
                                            className={"ratio"}
                                        />
                                        Particular
                                        <span className={"custom-ratio"}></span>
                                    </label>
                                    
                                    <label className={"all-center gap-2.5"}>
                                        <input
                                            type="radio"
                                            name="typeUser"
                                            value="empresa"
                                            className={"ratio"}
                                        />
                                        Empresa
                                        <span className={"custom-ratio"}></span>
                                    </label>
                                </fieldset>
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
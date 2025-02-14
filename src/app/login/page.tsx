import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    return(
        <main>
            <div className={"w-content py-20"}>
                <h1 className={"text-color2 text-center text-4xl lg:text-7xl font-bold mb-9"}>Iniciar sesion</h1>
                
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
                        />
                        
                        <input
                            className={"input mb-5"}
                            placeholder={"Contraseña"}
                            type={"password"}
                            autoComplete={"off"}
                            name={"password"}
                        />
                        
                        <button className={"btn-3 w-full"} type={"submit"}>Iniciar sesion</button>
                    </form>
                    
                    <div className={"all-center text-sm md:text-lg flex-col gap-5"}>
                        <Link href={"/"} className={"text-link font-medium"}>¿Olvidaste tu contraseña?</Link>
                        
                        <Link href={"/"} className={"text-link font-medium"}>¿No tienes una cuenta? Registrate</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

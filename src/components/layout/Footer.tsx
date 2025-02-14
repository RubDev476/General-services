import Link from "next/link";

export default function Footer(){
    return(
        <footer className={"bg-color1"}>
            <div className={"w-content py-12 lg:py-16 grid grid-cols-2 gap-5 md:grid-cols-4"}>
                <div>
                    <p className={"text-color3 text-sm lg:text-lg font-medium uppercase mb-5"}>Mapa del sitio</p>
                    
                    <ul>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Iniciar sesion</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>item 1</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>registro</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Gallery</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className={"text-color3 text-sm lg:text-lg font-medium uppercase mb-5"}>Mapa del sitio</p>
                    
                    <ul>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Iniciar sesion</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>item 1</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>registro</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Gallery</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className={"text-color3 text-sm lg:text-lg font-medium uppercase mb-5"}>Mapa del sitio</p>
                    
                    <ul>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Iniciar sesion</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>item 1</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>registro</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Gallery</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className={"text-color3 text-sm lg:text-lg font-medium uppercase mb-5"}>Mapa del sitio</p>
                    
                    <ul>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Iniciar sesion</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>item 1</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>registro</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link href={"/"} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>Gallery</Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className={"bg-color5 w-full"}>
                <div className={"w-content text-end"}>
                    <p className={"py-7 text-color3"}>{`© ${new Date().getFullYear().toString()} Creado por `} <Link href={"https://github.com/RubDev666"} target={"_blank"} className={"hover:text-color7 font-medium g-transition"}>Rubdeveloper</Link> y <Link href={"https://github.com/martin-alexis"} target={"_blank"} className={"hover:text-color7 font-medium g-transition"}>martin-alexis</Link></p>
                </div>
            </div>
        </footer>
    )
}

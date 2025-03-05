import Link from "next/link";

const LiItems = ({url, name}: Record<"url" | "name", string>) => {
    return (
        <li className={"mb-2"}>
            <Link href={`${url}`} className={"text-color8 hover:text-color3 g-transition text-sm lg:text-lg"}>{name}</Link>
        </li>
    )
}

const UlContainer = ({title, children}: {title: string; children: React.ReactNode}) => {
    return (
        <div>
            <p className={"text-color3 text-sm lg:text-lg font-medium uppercase mb-5"}>{title}</p>

            <ul>
                {children}
            </ul>
        </div>
    )
}

export default function Footer(){
    return(
        <footer className={"bg-color1"}>
            <div className={"w-content py-12 lg:py-16 grid grid-cols-2 gap-5 md:grid-cols-4"}>
                <UlContainer title="Servicios">
                    <LiItems url="/services" name="Todos los servicios" />
                    <LiItems url="/create-service" name="Crear servicio" />
                </UlContainer>

                <UlContainer title="Usuarios">
                    <LiItems url="/my-services" name="Administrar servicios" />
                    <LiItems url="/edit-profile" name="Editar perfil" />
                </UlContainer>
            </div>
            
            <div className={"bg-color5 w-full"}>
                <div className={"w-content text-end"}>
                    <p className={"py-7 text-color3"}>{`© ${new Date().getFullYear().toString()} Creado por `} <Link href={"https://github.com/RubDev666"} target={"_blank"} className={"hover:text-color7 font-medium g-transition"}>Rubdeveloper</Link> y <Link href={"https://github.com/martin-alexis"} target={"_blank"} className={"hover:text-color7 font-medium g-transition"}>martin-alexis</Link></p>
                </div>
            </div>
        </footer>
    )
}

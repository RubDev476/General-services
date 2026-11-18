import Link from "next/link";

const LiItems = ({url, name}: Record<"url" | "name", string>) => {
    return (
        <li className={"mb-2"}>
            <Link href={`${url}`} className={"text-color8 hover:text-color7 g-transition text-sm lg:text-base flex items-center gap-1.5"}>
                <span className="text-color6 text-xs">&rsaquo;</span> {name}
            </Link>
        </li>
    )
}

const UlContainer = ({title, children}: {title: string; children: React.ReactNode}) => {
    return (
        <div>
            <p className={"text-color3 text-sm lg:text-base font-bold uppercase tracking-wider mb-4 border-b border-color8/20 pb-2 inline-block"}>{title}</p>
            <ul>
                {children}
            </ul>
        </div>
    )
}

export default function Footer(){
    return(
        <footer className={"bg-color1 text-color8 border-t border-color8/20"}>
            <div className={"w-content py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-8"}>
                {/* Brand & info */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <span className={'text-color3 bg-gradient-to-tr from-color5 via-color6 to-color7 text-lg px-2.5 py-1 rounded-lg font-black shadow tracking-tight'}>NL</span>
                        <div>
                            <span className="tracking-tight text-xl font-extrabold text-color3 block leading-none">NEXT LOOT</span>
                            <span className="text-[10px] font-bold text-color7 tracking-wider uppercase">Hardware & Gaming Marketplace</span>
                        </div>
                    </div>
                    <p className="text-sm text-color8/80 max-w-sm leading-relaxed mb-4">
                        La plataforma de compra y venta directa para entusiastas del gaming y tecnología. Encuentra tarjetas gráficas, procesadores, PCs custom y consolas al mejor precio.
                    </p>
                    <span className="inline-block text-xs bg-color3/10 text-color7 px-3 py-1 rounded-full border border-color7/30">
                        ⚡ Nuevos & Seminuevos
                    </span>
                </div>

                <UlContainer title="Marketplace">
                    <LiItems url="/marketplace" name="Comprar articulos" />
                    <LiItems url="/create-product" name="Vender articulo" />
                </UlContainer>

                {/*<UlContainer title="Usuarios">
                    <LiItems url="/my-products" name="Administrar productos" />
                    <LiItems url="/edit-profile" name="Editar perfil" />
                </UlContainer>*/}
            </div>
            
            <div className={"bg-color2 border-t border-color8/10 w-full"}>
                <div className={"w-content flex flex-col sm:flex-row items-center justify-between py-6 gap-2 text-xs sm:text-sm text-color8"}>
                    <p>© {new Date().getFullYear().toString()} Next Loot. Todos los derechos reservados.</p>
                    <p className={"text-color3"}>
                        Creado por <Link href={"https://github.com/RubDev476"} target={"_blank"} className={"text-color7 hover:text-color6 font-semibold g-transition"}>Rubdev476</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

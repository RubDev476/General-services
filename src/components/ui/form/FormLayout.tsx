import type { FormLayoutProps } from "@/types/props"

const getFormDescription = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes("iniciar")) {
        return "Bienvenido de vuelta. Ingresa a tu cuenta para gestionar tus artículos, conectar con vendedores y actualizar tu setup gamer.";
    }
    if (lower.includes("registr")) {
        return "Únete a la comunidad de Next Loot. Crea tu cuenta para comprar, vender y encontrar los mejores componentes y hardware con trato directo y seguro.";
    }
    if (lower.includes("crear")) {
        return "Publica tus tarjetas gráficas, procesadores, PCs armadas o periféricos para llegar a compradores gamers de toda la comunidad.";
    }
    if (lower.includes("editar") && lower.includes("producto")) {
        return "Actualiza las especificaciones, precio, fotos o disponibilidad de tu publicación en Next Loot.";
    }
    if (lower.includes("perfil")) {
        return "Personaliza tu información de contacto, ubicación y datos para generar confianza en la comunidad.";
    }
    return "Conéctate con la comunidad de gaming y hardware para comprar, vender y gestionar tus publicaciones.";
};

const getBadgeText = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes("iniciar") || lower.includes("registr")) {
        return "Next Loot • Acceso";
    }
    if (lower.includes("producto")) {
        return "Next Loot • Marketplace";
    }
    return "Next Loot • Comunidad";
};

export default function FormLayout({nameForm, children, maxWidth = "max-w-xl"}: FormLayoutProps) {
    return(
        <div className={"w-content py-8 sm:py-12 lg:py-16 relative"}>
            {/* Glow de fondo decorativo de la página */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] bg-color5/10 blur-[110px] rounded-full pointer-events-none"></div>

            {/* Layout dividido en 2 columnas en pantallas grandes (lg:) */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start relative z-10">
                {/* LADO IZQUIERDO: Título grande y descripción para aprovechar el espacio en pantallas grandes */}
                <div className="w-full text-center lg:text-left mb-8 lg:mb-0 lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-color6 bg-color6/10 px-3.5 py-1.5 rounded-full border border-color6/20 inline-block mb-3 sm:mb-4">
                        {getBadgeText(nameForm)}
                    </span>
                    <h1 className="text-color2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4 lg:mb-6">
                        {nameForm}
                    </h1>
                    <p className="text-color10 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {getFormDescription(nameForm)}
                    </p>

                    {/* Puntos destacados / Garantías visibles en pantallas grandes */}
                    <div className="hidden lg:flex flex-col gap-4 mt-8 pt-6 border-t border-color8/20">
                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-color5/10 text-color5 all-center shrink-0 font-bold text-base border border-color5/20 shadow-sm">
                                ⚡
                            </span>
                            <p className="text-color2 text-sm font-semibold">Trato directo entre compradores y vendedores sin comisiones</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-color6/10 text-color6 all-center shrink-0 font-bold text-base border border-color6/20 shadow-sm">
                                🛡️
                            </span>
                            <p className="text-color2 text-sm font-semibold">Hardware testeado y perfiles con reputación transparente</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-color7/10 text-color7 all-center shrink-0 font-bold text-base border border-color7/20 shadow-sm">
                                🎮
                            </span>
                            <p className="text-color2 text-sm font-semibold">Comunidad enfocada en gaming, componentes y setups</p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: Tarjeta del formulario que queda arriba */}
                <div className={`w-full ${maxWidth} mx-auto lg:mx-0 lg:max-w-none lg:col-span-7 xl:col-span-7`}>
                    <div className="w-full text-center py-7 sm:py-9 px-5 sm:px-8 lg:px-10 bg-color3 rounded-3xl border border-color8/25 shadow-2xl relative overflow-hidden transition-all">
                        {/* Glow decorativo interno idéntico al modal de filtros */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-color5/15 blur-[60px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-44 h-44 bg-color7/10 blur-[60px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

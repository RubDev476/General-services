import type { FormLayoutProps } from "@/types/props"

export default function FormLayout({nameForm, children}: FormLayoutProps) {
    return(
        <div className={"w-content py-12 lg:py-20 relative"}>
            {/* Glow de fondo decorativo */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[300px] bg-color5/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-8 relative z-10">
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-color6 bg-color6/10 px-3.5 py-1 rounded-full border border-color6/20 inline-block mb-3">
                    G-Services • Acceso
                </span>
                <h1 className={"text-color2 text-center text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"}>{nameForm}</h1>
                <p className="text-color10 text-sm sm:text-base mt-2 max-w-md mx-auto">
                    Conéctate con la comunidad de gaming y hardware para comprar, vender y gestionar tus publicaciones.
                </p>
            </div>

            <div className={"w-full text-center max-w-xl mx-auto mb-5 py-10 sm:py-12 px-6 sm:px-10 bg-color3 rounded-3xl border border-color8/20 shadow-[0_20px_50px_rgba(28,9,80,0.08)] relative z-10"}>
                {children}
            </div>
        </div>
    )
}

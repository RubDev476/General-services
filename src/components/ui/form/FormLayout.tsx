import type { FormLayoutProps } from "@/types/props"

export default function FormLayout({nameForm, children}: FormLayoutProps) {
    return(
        <div className={"w-content py-20"}>
            <h1 className={"text-color2 text-center text-4xl lg:text-7xl font-bold mb-9"}>{nameForm}</h1>

            <div className={"w-full text-center max-w-xl mx-auto mb-5 py-12 shadow-[0px_10px_30px_0px_rgba(28,9,80,0.07)]"}>
                {children}
            </div>
        </div>
    )
}

import type { ErrorProps } from "@/types/props";

export default function Error({title, message}: ErrorProps) {
    return (
        <div className="w-content">
            <div className="w-full h-[80vh] text-center all-center flex-col text-color1 gap-6">
                <h2 className="font-bold text-4xl lg:text-7xl">{title}</h2>
                <p className="text-md lg:text-xl">{message}</p>
            </div>
        </div>
    )
}

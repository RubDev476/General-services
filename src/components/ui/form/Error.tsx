import type { ErrorProps } from "@/types/props"

export default function Error({message}: Pick<ErrorProps, | "message">) {
    return (
        <div className={"w-full max-w-[400px] mx-auto all-center mb-5 p-3 rounded-xl bg-color6/10 border border-color6/30"}>
            <span className={"w-full text-color6 text-sm font-semibold text-center"}>{message}*</span>
        </div>
    )
}

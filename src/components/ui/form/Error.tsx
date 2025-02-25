import type { ErrorProps } from "@/types/props"

export default function Error({message}: Pick<ErrorProps, | "message">) {
    return (
        <div className={"w-full all-center mb-3"}>
            <span className={"w-full text-color6 text-sm lg:text-base font-medium"}>{message}*</span>
        </div>
    )
}

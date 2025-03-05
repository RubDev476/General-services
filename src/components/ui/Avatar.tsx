import Image from "next/image";

import type { AvatarProps } from "@/types/props";

export default function Avatar({ urlImg, size, pointer }: AvatarProps) {
    return (
        <div className={`w-${size} h-${size} rounded-full ${pointer ? "cursor-pointer" : ""} relative`}>
            <Image src={urlImg} alt="user-img" fill priority className="rounded-full object-cover" sizes={`${size}vw`} />
        </div>
    )
}

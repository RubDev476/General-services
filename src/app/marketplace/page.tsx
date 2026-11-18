"use client";

import { Suspense } from "react";
import Marketplace from "@/components/page/Marketplace";
export default function Page() {
    return (
        <Suspense>
            <Marketplace />
        </Suspense>
    )
}

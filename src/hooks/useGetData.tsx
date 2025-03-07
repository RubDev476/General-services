"use client";

import { useState } from "react";
import type { ErrorProps } from "@/types/props";

export default function useGetData<T>() {
    const [loadingData, setLoadingData] = useState(true);
    const [fetchData, setFetchData] = useState<T | null>(null);
    const [errorMessage, setErrorMessage] = useState<ErrorProps>({ title: "", message: "" });

    return {
        loadingData, 
        setLoadingData,
        fetchData, 
        setFetchData,
        errorMessage,
        setErrorMessage
    }
}

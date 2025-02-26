"use client";

import { useState } from "react";

export default function useFormStatus() {
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const [loaderFetch, setLoaderFetch] = useState(false);

    return {
        errorForm,
        loaderFetch,
        setErrorForm,
        setLoaderFetch
    }
}

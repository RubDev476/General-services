"use client";

import { useState, useEffect } from "react";

export default function Warning() {
    const [close, setClose] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setClose(false);
        }, 5000);
    },[])

    if(!close) return(
        <div className="z-[200] fixed top-[90px] mx-4 left-0 right-0">
            <div className="bg-color6 max-w-[400px] text-center px-4 py-7 rounded-md mx-auto dropdown-shadow">
                <p className="text-color3">Este sitio web esta hecho para fines practicos y demostrativos, si hay errores en el sitio, espere menos de dos minutos para que los servidores se activen y pueda interactuar y ver todo el contenido del sitio.</p>

                <button className="text-color3 font-bold cursor-pointer text-lg mt-7 underline" onClick={() => setClose(true)}>Cerrar</button>
            </div>
        </div>
    )
}
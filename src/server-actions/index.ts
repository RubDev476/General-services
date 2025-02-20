"use server";

const urlApi = process.env.NEXT_PUBLIC_API;

export const POST_register_login = async <T>(formData: T, keyUrl: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi + keyUrl}`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    return response.json();
}

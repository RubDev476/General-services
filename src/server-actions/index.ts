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

export const GET_user = async (idUser: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser}`).then(res => res.json());

    return response;
}

export const PATCH_edit_user = async <T>(formData: T, token: string, idUser: number) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser.toString()}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });

    return response.json();
}

export const PATCH_edit_product = async <T>(formData: T, token: string, idProduct: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/productos/${idProduct}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
    });

    return response.json();
}

type CreateProductForm = {
    imagen: File;
    nombre: string;
    descripcion: string;
    precio: string;
    ubicacion: string;
    tipos_producto_id: string;
    disponibilidad_producto_id: string;
}

export const POST_create_product = async (formData: CreateProductForm, token: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const formData2 = new FormData();

    formData2.append("imagen", formData.imagen);
    formData2.append("nombre", formData.nombre);
    formData2.append("descripcion", formData.descripcion);
    formData2.append("precio", formData.precio);
    formData2.append("disponibilidad_producto_id", formData.disponibilidad_producto_id);
    formData2.append("tipos_producto_id", formData.tipos_producto_id);
    formData2.append("ubicacion", formData.ubicacion);

    const response = await fetch(`${urlApi}/productos`, {
        method: "POST",
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        //body: JSON.stringify(formData),
        body: formData2
    });

    return response.json();
}

export const PUT_img_profile = async (imgUser: File, token: string, idUser: number) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const formData = new FormData();
    formData.append('imagen', imgUser);

    const response = await fetch(`${urlApi}/usuarios/${idUser}/foto-perfil`, {
        method: "PUT",
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    return response.json();
}

export const PUT_img_product = async (imgUser: File, token: string, idProduct: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const formData = new FormData();
    formData.append('imagen', imgUser);

    const response = await fetch(`${urlApi}/productos/${idProduct}/imagen-producto`, {
        method: "PUT",
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    return response.json();
}

export const GET_products = async (url: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}${url}`).then(res => res.json());

    return response;
}

export const GET_user_products = async (idUser: string, token: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser}/productos`, {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
}

export const DELETE_user_product = async ({idUser, idProduct, token}: Record<"idUser" | "idProduct" | "token", string>) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser}/productos/${idProduct}`, {
        method: "delete",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
}
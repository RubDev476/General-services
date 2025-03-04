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

export const PATCH_edit_service = async <T>(formData: any, token: string, idService: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/servicios/${idService}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
    });

    return response.json();
}

type CreateServiceForm = {
    imagen: File;
    nombre: string;
    descripcion: string;
    precio: string;
    ubicacion: string;
    tipos_servicio_id: string;
    disponibilidad_servicio_id: string;
}

export const POST_create_service = async (formData: CreateServiceForm, token: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const formData2 = new FormData();

    formData2.append("imagen", formData.imagen);
    formData2.append("nombre", formData.nombre);
    formData2.append("descripcion", formData.descripcion);
    formData2.append("precio", formData.precio);
    formData2.append("disponibilidad_servicio_id", formData.disponibilidad_servicio_id);
    formData2.append("tipos_servicio_id", formData.tipos_servicio_id);
    formData2.append("ubicacion", formData.ubicacion);

    const response = await fetch(`${urlApi}/servicios`, {
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

export const PUT_img_service = async (imgUser: File, token: string, idService: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const formData = new FormData();
    formData.append('imagen', imgUser);

    const response = await fetch(`${urlApi}/servicios/${idService}/imagen-servicio`, {
        method: "PUT",
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    return response.json();
}

export const GET_services = async (url: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}${url}`).then(res => res.json());

    return response;
}

export const GET_user_services = async (idUser: string, token: string) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser}/servicios`, {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
}

export const DELETE_user_service = async ({idUser, idService, token}: Record<"idUser" | "idService" | "token", string>) => {
    if (!urlApi) throw new Error('No se pudo conectar a la base de datos');

    const response = await fetch(`${urlApi}/usuarios/${idUser}/servicios/${idService}`, {
        method: "delete",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
    });

    return response.json();
}
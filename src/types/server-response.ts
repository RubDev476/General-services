import type { RegisterForm } from "./forms";

export type UserData = Pick<RegisterForm, "nombre" | "correo" | "telefono"> & {
    id_usuarios: string;
    imagen: string | null;
    tipos_usuario_id: number;
}

export type Service = {
    descripcion: string;
    disponibilidad_servicio_id: number;
    id_servicios: number;
    imagen: string;
    nombre: string;
    precio: number;
    tipos_servicio_id: number;
    ubicacion: string;
    usuarios_proveedores_id: number;
}

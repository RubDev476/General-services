import type { RegisterForm, AvailabilityService, CategoriesService, Roles, UserType } from "./forms";

export type UserData = Pick<RegisterForm, "nombre" | "correo" | "telefono"> & {
    id_usuarios: number;
    imagen: string;
    tipo_usuario: {
        id_tipos_usuarios: number;
        tipo: UserType;
    };
    roles: {
        id_roles: number;
        tipo: Roles;
    }[];
}

export type Service = {
    descripcion: string;
    disponibilidad_servicio: {
        estado: AvailabilityService;
        id_disponibilidad_servicio: number;
    };
    id_servicios: number;
    imagen: string;
    nombre: string;
    precio: number;
    tipos_servicio: {
        id_tipos_servicio: number;
        tipo: CategoriesService;
    };
    ubicacion: string;
    usuarios_proveedores: UserData;
}

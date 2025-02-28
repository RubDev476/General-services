export enum Roles {
    cliente = "CLIENTE",
    proveedor = "PROVEEDOR",
}

export enum UserType {
    empresa = "EMPRESA",
    particular = "PARTICULAR"
}

export interface RegisterForm {
    nombre: string,
    correo: string,
    contrasena: string,
    confirmPassword: string;
    telefono: string,
    tipos_usuario_id: UserType,
    roles_id: Roles[];
}

export type CreateService = Record<"nombre" | "descripcion" | "precio" | "ubicacion" | "tipos_servicio_id" | "disponibilidad_servicio_id", string>;

export type FilterServices = Record<"busqueda" | "categoria" | "precio_max" | "precio_min", string>;
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

export enum CategoriesService {
    GIMNASIOS_Y_ENTRENAMIENTOS = "GIMNASIOS Y ENTRENAMIENTOS",
    ALQUILER_DE_VEHICULOS = "ALQUILER DE VEHICULOS",
    HOTELES_Y_HOSPEDAJES = "HOTELES Y HOSPEDAJES",
    SALONES_DE_EVENTOS = "SALONES DE EVENTOS",
    CINES_Y_TEATROS = "CINES Y TEATROS",
    SPA_Y_MASAJES = "SPA Y MASAJES",
    RESTAURANTES_Y_BARES = "RESTAURANTES Y BARES",
    OTROS = "OTROS"
}

export enum AvailabilityService {
    DISPONIBLE = "DISPONIBLE",
    AGOTADO = "AGOTADO",
    PROXIMAMENTE = "PROXIMAMENTE"
}
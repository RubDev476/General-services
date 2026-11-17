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
    TARJETAS_GRAFICAS = "TARJETAS GRAFICAS",
    PROCESADORES_Y_CPUS = "PROCESADORES Y CPUS",
    PCS_GAMING_COMPLETAS = "PCS GAMING COMPLETAS",
    MONITORES_Y_PANTALLAS = "MONITORES Y PANTALLAS",
    PERIFERICOS_Y_ACCESORIOS = "PERIFERICOS Y ACCESORIOS",
    CONSOLAS_Y_VIDEOJUEGOS = "CONSOLAS Y VIDEOJUEGOS",
    COMPONENTES_Y_ALMACENAMIENTO = "COMPONENTES Y ALMACENAMIENTO",
    OTROS = "OTROS"
}

export enum AvailabilityService {
    DISPONIBLE = "DISPONIBLE",
    AGOTADO = "AGOTADO",
    PROXIMAMENTE = "PROXIMAMENTE"
}
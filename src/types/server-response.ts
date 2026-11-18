import type { RegisterForm, AvailabilityProduct, CategoriesProduct, Roles, UserType } from "./forms";

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

export type Product = {
    descripcion: string;
    disponibilidad_producto: {
        estado: AvailabilityProduct;
        id_disponibilidad_producto: number;
    };
    id_productos: number;
    imagen: string;
    nombre: string;
    precio: number;
    tipos_producto: {
        id_tipos_producto: number;
        tipo: CategoriesProduct;
    };
    ubicacion: string;
    usuarios_proveedores: UserData;
}

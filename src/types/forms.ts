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

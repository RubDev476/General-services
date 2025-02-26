import type { Roles, UserType } from "./forms";

export type UserData = {
    id_usuarios: number;
    nombre: string;
    correo: string;
    tipos_usuario_id: UserType;
    roles: Roles[];
    imagen: string | null;
    telefono: string;
}

export type AuthState = {
    token: string | null;
    userData: UserData | null;
    authLoading: boolean;
}

export type LoginData = Pick<AuthState, "token" | "userData">;
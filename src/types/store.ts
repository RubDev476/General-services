import type { Roles } from "./forms";

export type UserData = {
    id_usuarios: number;
    nombre: string;
    correo: string;
    tipo_usuario: {id_tipos_usuario: number, tipo: 'PARTICULAR' | 'EMPRESA'};
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
import type { Roles, UserType } from "./forms";

export type UserData = {
    id_usuario: number;
    username: string;
    email: string;
    type: UserType;
    roles: Roles[];
    exp: number;
    iat: number;
}

export type AuthState = {
    token: string | null;
    userData: UserData | null;
    authLoading: boolean;
}

export type LoginData = Pick<AuthState, "token" | "userData">;
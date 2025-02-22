import type { Roles, UserType } from "./forms";

export type UserData = {
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

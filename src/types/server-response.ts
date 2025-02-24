import type { RegisterForm } from "./forms";

export type UserData = Pick<RegisterForm, "nombre" | "correo" | "telefono"> & {
    id_usuarios: string;
    imagen: string | null;
    tipos_usuario_id: number;
}

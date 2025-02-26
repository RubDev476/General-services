import type { UserData } from "./store";
import { Dispatch, SetStateAction } from "react";

export type NavItemsInitialProps = {
    mobileSize: boolean;
}

export type NavItemsSessionProps = Pick<UserData, "nombre" | "correo" | "id_usuarios">;

export type ErrorProps = Record<"title" | "message", string>;

export type FormLayoutProps = {
    nameForm: string;
    children: React.ReactNode;
}

export type DropzoneProps = {
    setImg: Dispatch<SetStateAction<File | null>>;
}

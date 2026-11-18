import type { UserData } from "./store";
import type { Product } from "./server-response";
import { Dispatch, SetStateAction } from "react";

export type NavItemsInitialProps = {
    mobileSize: boolean;
}

export type NavItemsSessionProps = NavItemsInitialProps & {
    userData: UserData;
};

export type ErrorProps = Record<"title" | "message", string>;

export type FormLayoutProps = {
    nameForm: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export type DropzoneProps = {
    imgUploaded?: string;
    setImg: Dispatch<SetStateAction<File | string | null>>;
}

export type PreviewImgProps = Pick<DropzoneProps, "setImg"> & {
    img: string;
    setPreviewImg: Dispatch<SetStateAction<string | null>>;
}

export type TableProductsProps = {
    setDeleteProduct: Dispatch<SetStateAction<Product | null>>;
    products: Product[];
}

export type AvatarProps = {
    urlImg: string;
    size: number;
    pointer: boolean;
}

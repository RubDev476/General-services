import { render, screen, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, afterEach } from "vitest";

import { initialTestUser, Roles, UserType } from "../../setup";

import * as useGetData from "@/hooks/useGetData";

import User from "@/components/page/User";

vi.mock("@/hooks/useGetData", () => ({
    default: vi.fn(),
}));

vi.mock("@/server-actions", () => ({
    GET_user: vi.fn(),
}));

vi.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe("User Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    })

    const mockUseGetData = {
        fetchData: null,
        loadingData: false,
        setLoadingData: vi.fn(),
        setFetchData: vi.fn(),
        errorMessage: { title: "", message: "" },
        setErrorMessage: vi.fn(),
    }

    it("renders SkeletonUser while loading", () => {
        vi.spyOn(useGetData, "default").mockReturnValue({...mockUseGetData, loadingData: true });

        render(<User userId="123" />);

        expect(screen.queryByTestId("skeleton-user")).toBeInTheDocument();
    });

    it("renders user data when fetchData is available", () => {
        vi.spyOn(useGetData, "default").mockReturnValue({
            ...mockUseGetData,
            fetchData: {
                nombre: initialTestUser.nombre,
                correo: initialTestUser.correo,
                imagen: initialTestUser.imagen,
                tipo_usuario: { tipo: UserType.particular },
                roles: [
                    { id_roles: 1, tipo: Roles.cliente },
                    { id_roles: 2, tipo: Roles.proveedor },
                ],
            }
        });

        render(<User userId="123" />);

        expect(screen.getByText(initialTestUser.nombre)).toBeInTheDocument();
        expect(screen.getByText(`(${UserType.particular})`)).toBeInTheDocument();
        expect(screen.getByText(initialTestUser.correo)).toBeInTheDocument();
        expect(screen.getByText(Roles.cliente)).toBeInTheDocument();
        expect(screen.getByText(Roles.proveedor)).toBeInTheDocument();
    });

    it("renders ErrorComponent when no user is found", () => {
        vi.spyOn(useGetData, "default").mockReturnValue({
            ...mockUseGetData,
            errorMessage: { title: "Usuario no encontrado", message: "Vuelve al inicio para encontrar a otros usuarios" }
        });

        render(<User userId="123" />);

        expect(screen.queryByTestId("user-data-container")).not.toBeInTheDocument();
        expect(screen.getByText("Usuario no encontrado")).toBeInTheDocument();
        expect(screen.getByText("Vuelve al inicio para encontrar a otros usuarios")).toBeInTheDocument();
    });
});
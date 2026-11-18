import { describe, afterEach, vi, it, expect } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders, initialTestUser, Roles } from "@tests/setup";
import type { AuthState } from "@/types/store";

import { routerPushMock } from "@mocks/next/navigation";

import * as useAuthSelectors from "@/store/hooks/useAuthSelectors";
import Page from "@/app/(private)/create-product/page";

vi.mock('next/navigation');

describe("Create Product Page", () => {
    afterEach(() => {
        vi.clearAllMocks();

        cleanup();
    });

    const renderPage = (mockReturnValue: AuthState) => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockReturnValue(mockReturnValue);

        renderWithProviders(<Page />);
    }

    it("redirects to home if user is not authenticated", () => {
        renderPage({token: null, authLoading: false, userData: null});

        expect(routerPushMock).toHaveBeenCalledWith("/");
    });

    it("redirects to home if user is authenticated but lacks 'proveedor' role", () => {
        renderPage({token: null, authLoading: false, userData: initialTestUser});

        expect(routerPushMock).toHaveBeenCalledWith("/");
    })

    it("renders the form if user is authenticated and has 'proveedor' role", () => {
        renderPage({
            token: null,
            authLoading: false,
            userData: {
                ...initialTestUser,
                roles: [{ tipo: Roles.proveedor, id_roles: 2 }],
            }
        });

        expect(routerPushMock).not.toHaveBeenCalledWith("/");

        expect(screen.getByPlaceholderText("Nombre del producto")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Añade una descripcion de tu producto")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Precio")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ubicacion")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Crear producto/i })).toBeInTheDocument();
    });

    it("shows error message if there is not image", async () => {
        renderPage({
            token: "tokenMock",
            authLoading: false,
            userData: {
                ...initialTestUser,
                roles: [{ tipo: Roles.proveedor, id_roles: 2 }],
            }
        });

        const nameProduct = screen.getByPlaceholderText("Nombre del producto");
        const description = screen.getByPlaceholderText("Añade una descripcion de tu producto");
        const price = screen.getByPlaceholderText("Precio");
        const location = screen.getByPlaceholderText("Ubicacion");
        const category2 = screen.getAllByRole("combobox");
        const button = screen.getByRole("button");

        await userEvent.type(nameProduct, "Test Product");
        await userEvent.type(description, "Test Description");
        await userEvent.type(price, "100");
        await userEvent.type(location, "Test Location");
        await userEvent.selectOptions(category2[0], "TARJETAS GRAFICAS");
        await userEvent.selectOptions(category2[1], "DISPONIBLE");

        await userEvent.click(button);

        expect(screen.getByText(/Porfavor suba una imagen/)).toBeInTheDocument();
    });
});

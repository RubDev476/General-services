import {vi, describe, it, beforeEach, expect} from "vitest";
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as useAuthSelectors from "@/store/hooks/useAuthSelectors";
import * as serverActions from "@/server-actions";

import Page from "@/app/(private)/my-products/page";

import { initialTestUser, renderWithProviders, Roles } from "@tests/setup";

import { routerPushMock } from "@mocks/next/navigation";

vi.mock("next/navigation");

describe("My products page", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        cleanup();
    });

    const deleteProductActions = async () => {
        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText(/Eliminar/i));

        await waitFor(() => {
            expect(screen.getByText(/¿Desea eliminar/i)).toBeInTheDocument();
        })

        await userEvent.click(screen.getByText(/Si/i));
    }

    it("redirects to login if no user is authenticated", () => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockReturnValue({
            token: null,
            userData: null,
            authLoading: false,
        });

        renderWithProviders(<Page />);

        expect(routerPushMock).toHaveBeenCalledWith("/login");
    });

    it("shows a spinner while loading data", () => {
        renderWithProviders(<Page />);

        expect(screen.getByText(/Mis productos/i)).toBeInTheDocument();
        expect(screen.getByTestId("loader-page")).toBeInTheDocument();
    });

    it("displays 'No tienes productos aún' if no products are found", async () => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockImplementation(() => {
            return {
                token: "mockToken",
                userData: {
                    ...initialTestUser,
                    roles: [{ id_roles: 2, tipo: Roles.proveedor }],
                },
                authLoading: false,
            }
        })

        vi.spyOn(serverActions, "GET_user_products").mockResolvedValue([]);

        renderWithProviders(<Page />);

        await waitFor(() => {
            expect(screen.getByText(/No tienes productos aún/)).toBeInTheDocument();
        });
    });

    it("renders the table with products if data is available", async () => {
        const mockProducts = [
            { id_productos: 1, nombre: "Product 1" },
            { id_productos: 2, nombre: "Product 2" },
        ];

        vi.spyOn(serverActions, "GET_user_products").mockResolvedValue(mockProducts);

        renderWithProviders(<Page />);

        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.getByText("Product 2")).toBeInTheDocument();
        });
    });

    it("opens the delete modal and deletes a product", async () => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockImplementation(() => {
            return {
                token: "mockToken",
                userData: {
                    ...initialTestUser,
                    roles: [{ id_roles: 2, tipo: Roles.proveedor }],
                },
                authLoading: false,
            }
        })

        const mockProducts = [
            { id_productos: 1, nombre: "Product 1", usuarios_proveedores: { id_usuarios: 1 } }
        ];

        vi.spyOn(serverActions, "GET_user_products").mockResolvedValue(mockProducts);
        vi.spyOn(serverActions, "DELETE_user_product").mockResolvedValue({});

        renderWithProviders(<Page />);

        await deleteProductActions();

        await waitFor(() => {
            expect(screen.getByText(/Borrado exitosamente/i)).toBeInTheDocument();
        });
    });

    it("shows an error message if deleting a product fails", async () => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockImplementation(() => {
            return {
                token: "mockToken",
                userData: {
                    ...initialTestUser,
                    roles: [{ id_roles: 2, tipo: Roles.proveedor }],
                },
                authLoading: false,
            }
        })

        const mockProducts = [
            //error "can not read property 'id_usuarios' of undefined"
            { id_productos: 1, nombre: "Product 1" }
        ];

        vi.spyOn(serverActions, "GET_user_products").mockResolvedValue(mockProducts);

        renderWithProviders(<Page />);

        await deleteProductActions();

        await waitFor(() => {
            expect(screen.getByText(/Ha ocurrido un error inesperado, intentelo mas tarde/i)).toBeInTheDocument();
        });
    });
});

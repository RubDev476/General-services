import {vi, describe, it, beforeEach, expect} from "vitest";
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as useAuthSelectors from "@/store/hooks/useAuthSelectors";
import * as serverActions from "@/server-actions";

import Page from "@/app/(private)/my-services/page";

import { initialTestUser, renderWithProviders, Roles } from "@tests/setup";

import { routerPushMock } from "@mocks/next/navigation";

vi.mock("next/navigation");

describe("My services page", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        cleanup();
    });

    const deleteServiceActions = async () => {
        await waitFor(() => {
            expect(screen.getByText("Service 1")).toBeInTheDocument();
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

        expect(screen.getByText(/Mis servicios/i)).toBeInTheDocument();
        expect(screen.getByTestId("loader-page")).toBeInTheDocument();
    });

    it("displays 'No tienes servicios aún' if no services are found", async () => {
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

        vi.spyOn(serverActions, "GET_user_services").mockResolvedValue([]);

        renderWithProviders(<Page />);

        await waitFor(() => {
            expect(screen.getByText(/No tienes servicios aún/)).toBeInTheDocument();
        });
    });

    it("renders the table with services if data is available", async () => {
        const mockServices = [
            { id_servicios: 1, nombre: "Service 1" },
            { id_servicios: 2, nombre: "Service 2" },
        ];

        vi.spyOn(serverActions, "GET_user_services").mockResolvedValue(mockServices);

        renderWithProviders(<Page />);

        await waitFor(() => {
            expect(screen.getByText("Service 1")).toBeInTheDocument();
            expect(screen.getByText("Service 2")).toBeInTheDocument();
        });
    });

    it("opens the delete modal and deletes a service", async () => {
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

        const mockServices = [
            { id_servicios: 1, nombre: "Service 1", usuarios_proveedores: { id_usuarios: 1 } }
        ];

        vi.spyOn(serverActions, "GET_user_services").mockResolvedValue(mockServices);
        vi.spyOn(serverActions, "DELETE_user_service").mockResolvedValue({});

        renderWithProviders(<Page />);

        await deleteServiceActions();

        await waitFor(() => {
            expect(screen.getByText(/Borrado exitosamente/i)).toBeInTheDocument();
        });
    });

    it("shows an error message if deleting a service fails", async () => {
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

        const mockServices = [
            //error "can not read property 'id_usuarios' of undefined"
            { id_servicios: 1, nombre: "Service 1" }
        ];

        vi.spyOn(serverActions, "GET_user_services").mockResolvedValue(mockServices);

        renderWithProviders(<Page />);

        await deleteServiceActions();

        await waitFor(() => {
            expect(screen.getByText(/Ha ocurrido un error inesperado, intentelo mas tarde/i)).toBeInTheDocument();
        });
    });
});

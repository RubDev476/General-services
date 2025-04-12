import { test, describe, beforeAll, expect, afterAll } from "vitest";
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../setup';

import {NavItemsInitial} from "@/components/layout/Header";

import { Roles, UserType } from "@/types/forms";

const authUserMock = {
    preloadedState: {
        authReducer: {
            authLoading: false,
            userData: {
                nombre: "any user",
                id_usuarios: 1,
                imagen: "https://cloudinary.com/image",
                roles: [
                    {
                        id_roles: 1,
                        tipo: Roles.cliente
                    }
                ],
                correo: "correo",
                telefono: "98989",
                tipo_usuario: {
                    id_tipos_usuario: 1,
                    tipo: UserType.particular
                }
            },
            token: null
        }
    }    
}

describe("mobileSize / no auth user", () => {
    beforeAll(() => {
        renderWithProviders(<NavItemsInitial mobileSize={true} />);
    })

    afterAll(() => {
        cleanup();
    })

    test('initial links displayed correctly', () => {
        const services_link = screen.getByText(/Servicios/);
        const login_link = screen.getByTestId("login-link");
        const signUp_link = screen.getByText(/Registro/);

        expect(services_link).toBeInTheDocument();
        expect(login_link).toBeInTheDocument();
        expect(signUp_link).toBeInTheDocument();
    })
})

describe("mobileSize / auth user (client role)", () => {
    beforeAll(() => {
        renderWithProviders(<NavItemsInitial mobileSize={true} />, authUserMock);
    })

    test('login and signUp link not displayed', () => {
        const login_link = screen.queryByTestId("login-link");
        const signUp_link = screen.queryByText(/Registro/);

        expect(login_link).not.toBeInTheDocument();
        expect(signUp_link).not.toBeInTheDocument();
    })

    test("create service link not displayed", () => {
        const createService_link = screen.queryByText(/Crear servicio/);

        expect(createService_link).not.toBeInTheDocument();
    })
})

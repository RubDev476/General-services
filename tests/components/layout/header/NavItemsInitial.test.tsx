import { test, describe, beforeAll, expect, afterAll } from "vitest";
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders, initialTestUser, Roles, initialState } from '@tests/setup';

import {NavItemsInitial} from "@/components/layout/Header";

describe("no auth user", () => {
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

    test("create service link not displayed", () => {
        const createService_link = screen.queryByText(/Crear servicio/);

        expect(createService_link).not.toBeInTheDocument();
    })
})

describe("auth user (client role - particular type)", () => {
    beforeAll(() => {
        renderWithProviders(<NavItemsInitial mobileSize={true} />, {
            preloadedState: {
                authReducer: {
                    ...initialState,
                    userData: initialTestUser
                }
            }
        });
    })

    afterAll(() => {
        cleanup();
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

describe("auth user (proveedor role - particular type)", () => {
    beforeAll(() => {
        renderWithProviders(<NavItemsInitial mobileSize={true} />, {
            preloadedState: {
                authReducer: {
                    ...initialState,
                    userData: {
                        ...initialTestUser,
                        roles: [{
                            id_roles: 2,
                            tipo: Roles.proveedor
                        }]
                    }
                }
            }
        });
    })

    afterAll(() => {
        cleanup();
    })
    
    test("create service link displayed", () => {
        const createService_link = screen.queryByText(/Crear servicio/);

        expect(createService_link).toBeInTheDocument();
    })
})

describe("component sizes / auth user", () => {
    test("(mobile size) nav items session desktop not displayed", () => {
        renderWithProviders(<NavItemsInitial mobileSize={true} />, {
            preloadedState: {
                authReducer: {
                    ...initialState,
                    userData: initialTestUser
                }
            }
        });

        const navDesktop = screen.queryByTestId("nav-items-session-desktop");

        expect(navDesktop).not.toBeInTheDocument();

        cleanup();
    })

    test("(desktop size) nav items session desktop displayed", () => {
        renderWithProviders(<NavItemsInitial mobileSize={false} />, {
            preloadedState: {
                authReducer: {
                    ...initialState,
                    userData: initialTestUser
                }
            }
        });

        const navDesktop = screen.getByTestId("nav-items-session-desktop");

        expect(navDesktop).toBeInTheDocument();

        cleanup();
    })
})

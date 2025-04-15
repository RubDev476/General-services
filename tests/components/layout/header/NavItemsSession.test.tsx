import { test, describe, beforeAll, expect, afterAll } from "vitest";
import { cleanup, screen } from '@testing-library/react';
import { renderWithProviders, initialTestUser, Roles, initialState } from '../../../setup';

import { NavItemsSession } from "@/components/layout/Header";
import { afterEach, beforeEach } from "node:test";

describe("any authenticated user", () => {
    beforeAll(() => {
        renderWithProviders(<NavItemsSession mobileSize={false} userData={initialTestUser} />);
    })

    afterAll(() => {
        cleanup();
    })

    test("user name and email displayed", () => {
        const name = screen.getByText(/test user name/);
        const email = screen.getByText(/correo@test.com/);

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    })

    test("links 'my profile' and 'edit profile' displayed", () => {
        const myProfile_link = screen.getByText(/Mi perfil/);
        const editProfile_link = screen.getByText(/Editar perfil/);

        expect(myProfile_link).toBeInTheDocument();
        expect(editProfile_link).toBeInTheDocument();
    })

    test("logout button displayed", () => {
        const logoutBtn = screen.getByRole("button");

        expect(logoutBtn).toBeInTheDocument();
    })
})

describe("'my services' link", () => {
    afterEach(() => {
        cleanup();
    })

    test("(client role) not displayed", () => {
        renderWithProviders(<NavItemsSession mobileSize={false} userData={initialTestUser} />);

        const myServices_link = screen.queryByText(/Mis servicios/);

        expect(myServices_link).not.toBeInTheDocument();
    })

    test("(proveedor role) displayed", () => {
        renderWithProviders(<NavItemsSession mobileSize={false} userData={{...initialTestUser, roles: [{id_roles: 2, tipo: Roles.proveedor}]}} />);

        const myServices_link = screen.queryByText(/Mis servicios/);

        expect(myServices_link).toBeInTheDocument();
    })
})

describe("avatar container", () => {
    test('(mobile size) - displayed', () => {
        renderWithProviders(<NavItemsSession mobileSize={true} userData={initialTestUser} />);

        const avatarContainer = screen.getByTestId("avatar-container");

        expect(avatarContainer).toBeInTheDocument();

        cleanup();
    })

    test('(desktop size) - not displayed', () => {
        renderWithProviders(<NavItemsSession mobileSize={false} userData={initialTestUser} />);

        const avatarContainer = screen.queryByTestId("avatar-container");

        expect(avatarContainer).not.toBeInTheDocument();

        cleanup();
    })
})

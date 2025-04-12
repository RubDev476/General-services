import { test, describe, expect, beforeAll } from "vitest";
import { render, screen } from '@testing-library/react';

import Footer from '@/components/layout/Footer';

describe('Footer component', () => {
    beforeAll(() => {
        render(<Footer />);
    })

    test('displays correctly when loading the site', () => {
        const footer = document.querySelector("FOOTER") as HTMLElement;

        expect(footer).toBeInTheDocument();
    })

    test("service links are displayed correctly", () => {
        const allServices_link = screen.getByText(/Todos los servicios/);
        const createServices_link = screen.getByText(/Crear servicio/);

        expect(allServices_link).toBeInTheDocument();
        expect(createServices_link).toBeInTheDocument();
    })

    test("user links are displayed correctly", () => {
        const manageServices_link = screen.getByText(/Administrar servicios/);
        const editProfile_link = screen.getByText(/Editar perfil/);

        expect(manageServices_link).toBeInTheDocument();
        expect(editProfile_link).toBeInTheDocument();
    })

    test("creator links are displayed correctly", () => {
        const rubdeveloper_link = screen.getByText(/Rubdeveloper/);
        const martinAlexis_link = screen.getByText(/martin-alexis/);

        expect(rubdeveloper_link).toBeInTheDocument();
        expect(martinAlexis_link).toBeInTheDocument();
    })
})

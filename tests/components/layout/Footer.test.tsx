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
        const allServices_link = screen.getByText(/Comprar articulos|Todos los servicios/i);
        const createServices_link = screen.getByText(/Vender articulo|Crear servicio/i);

        expect(allServices_link).toBeInTheDocument();
        expect(createServices_link).toBeInTheDocument();
    })

    test("creator links are displayed correctly", () => {
        const creator_link = screen.getByText(/Rubdev/i);

        expect(creator_link).toBeInTheDocument();
    })
})

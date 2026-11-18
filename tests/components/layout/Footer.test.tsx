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

    test("product links are displayed correctly", () => {
        const allProducts_link = screen.getByText(/Comprar articulos/i);
        const createProducts_link = screen.getByText(/Vender articulo/i);

        expect(allProducts_link).toBeInTheDocument();
        expect(createProducts_link).toBeInTheDocument();
    })

    test("creator links are displayed correctly", () => {
        const creator_link = screen.getByText(/Rubdev/i);

        expect(creator_link).toBeInTheDocument();
    })
})

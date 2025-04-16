import { test, expect } from "vitest";
import { render, screen } from '@testing-library/react';

import Home from "@/app/page";

test("main links displayed", () => {
    render(<Home />);

    const start_link = screen.getByText(/Comenzar/);
    const viewAllServices_link = screen.getByText(/Ver todos los servicios/);

    expect(start_link).toBeInTheDocument();
    expect(viewAllServices_link).toBeInTheDocument();
})

import { test, expect } from "vitest";
import { render, screen } from '@testing-library/react';

import Home from "@/app/page";

test("main links displayed", () => {
    render(<Home />);

    const explore_link = screen.getByRole('link', { name: /Explorar artículos/i });
    const publish_link = screen.getByRole('link', { name: /Publicar un artículo ahora/i });

    expect(explore_link).toBeInTheDocument();
    expect(publish_link).toBeInTheDocument();
})

import { test, describe, beforeAll, expect, afterAll } from "vitest";
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/setup';

import Header from '@/components/layout/Header';

describe('mobile size', () => {
    beforeAll(() => {
        renderWithProviders(<Header />);
    })

    afterAll(() => {
        cleanup();
    })

    test("displays correctly on first load", () => {
        const header = screen.getByRole('banner');
        const menuButton = screen.getByRole("button");

        expect(header).toBeInTheDocument();
        expect(menuButton).toBeInTheDocument();
    });

    test("bars icon should be displayed / xmark icon should not be displayed", () => {;
        const menuButton = screen.getByRole("button");
        const icon = menuButton.querySelector('svg');

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass("fa-bars");
        expect(icon).not.toHaveClass("fa-xmark");
    });

    test("nav mobile shouldn't be displayed", () => {
        const navMobile = screen.getByTestId("nav-mobile");

        expect(navMobile).toHaveClass("left-[-100%]");
        expect(navMobile).not.toHaveClass("left-0");
    })

    test("menu button click event > icons changed", async () => {;
        const menuButton = screen.getByRole("button");
        
        await userEvent.click(menuButton);

        const icon = menuButton.querySelector('svg');

        expect(icon).not.toHaveClass("fa-bars");
        expect(icon).toHaveClass("fa-xmark");
    });

    test("menu button click event > nav mobile displayed", () => {
        const navMobile = screen.getByTestId("nav-mobile");

        expect(navMobile).toHaveClass("left-0");
        expect(navMobile).not.toHaveClass("left-[-100%]");
    })
})

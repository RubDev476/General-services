import { describe, test, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import Marketplace from "@/components/page/Marketplace";
import * as useGetData from "@/hooks/useGetData";

import { routerPushMock } from "@mocks/next/navigation";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation");

describe("Marketplace page", () => {
    afterEach(() => {
        vi.clearAllMocks();

        cleanup();
    })

    const useGetDataMock = {
        loadingData: false,
        setLoadingData: vi.fn(),
        setErrorMessage: vi.fn(),
        setFetchData: vi.fn(),
        fetchData: null,
        errorMessage: { title: "", message: "" }
    }

    const renderMarketplace = (mock: any) => {
        vi.spyOn(useGetData, "default").mockReturnValue(mock);

        render(<Marketplace />);
    }

    test("filters button displayed", () => {
        render(<Marketplace />);

        expect(screen.getByText(/Limpiar filtros/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    test("modal filters no displayed", () => {
        render(<Marketplace />);

        expect(screen.queryByTestId("modal-filters-container")).not.toBeInTheDocument();
    })

    test("open modal filters", async () => {
        render(<Marketplace />);

        await userEvent.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.queryByTestId("modal-filters-container")).toBeInTheDocument());
    })

    test("filter action success (busqueda)", async () => {
        render(<Marketplace />);

        await userEvent.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.queryByTestId("modal-filters-container")).toBeInTheDocument());

        await userEvent.type(screen.getByPlaceholderText(/Buscar por nombre/), "any search");

        await userEvent.click(screen.getByText(/Buscar/));

        expect(routerPushMock).toHaveBeenCalledWith("/marketplace?busqueda=any+search", {scroll: true});
    })

    test("if 'loadingData' is true displays skeletons", () => {
        renderMarketplace({...useGetDataMock, loadingData: true});

        expect(screen.queryByTestId("skeletons-product")).toBeInTheDocument();
    })

    test("if 'fetchData' is true displays products", () => {
        const mockProducts = [
            {
                id_productos: 1,
                imagen: "https://www.cloudinary.com/img",
                nombre: "product 1",
                precio: 900,
                ubicacion: "some where"
            },
            {
                id_productos: 2,
                imagen: "https://www.cloudinary.com/img",
                nombre: "product 2",
                precio: 900,
                ubicacion: "some where"
            }
        ]

        renderMarketplace({...useGetDataMock, fetchData: mockProducts});

        expect(screen.queryByTestId("skeletons-product")).not.toBeInTheDocument();
        expect(screen.queryByTestId("products-container")).toBeInTheDocument();
    })

    test("if 'fetchData' is null displays 'ErrorComponent'", async () => {
        renderMarketplace({...useGetDataMock, errorMessage: {title: "Error inesperado", message: "Vuelva al inicio o intentelo mas tarde"}});

        expect(screen.queryByTestId("skeletons-product")).not.toBeInTheDocument();
        expect(screen.queryByTestId("products-container")).not.toBeInTheDocument();
        
        expect(screen.getByText(/Error inesperado/i)).toBeInTheDocument();
        expect(screen.getByText(/Vuelva al inicio o intentelo mas tarde/i)).toBeInTheDocument();
    })
})

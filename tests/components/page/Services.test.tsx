import { describe, test, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import Services from "@/components/page/Services";
import * as useGetData from "@/hooks/useGetData";

import { routerPushMock } from "@mocks/next/navigation";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation");

describe("Services page", () => {
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

    const renderService = (mock: any) => {
        vi.spyOn(useGetData, "default").mockReturnValue(mock);

        render(<Services />);
    }

    test("filters button displayed", () => {
        render(<Services />);

        expect(screen.getByText(/Limpiar filtros/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    test("modal filters no displayed", () => {
        render(<Services />);

        expect(screen.queryByTestId("modal-filters-container")).not.toBeInTheDocument();
    })

    test("open modal filters", async () => {
        render(<Services />);

        await userEvent.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.queryByTestId("modal-filters-container")).toBeInTheDocument());
    })

    test("filter action success (busqueda)", async () => {
        render(<Services />);

        await userEvent.click(screen.getByRole("button"));

        await waitFor(() => expect(screen.queryByTestId("modal-filters-container")).toBeInTheDocument());

        await userEvent.type(screen.getByPlaceholderText(/Buscar por nombre/), "any search");

        await userEvent.click(screen.getByText(/Buscar/));

        expect(routerPushMock).toHaveBeenCalledWith("/services?busqueda=any+search", {scroll: true});
    })

    test("if 'loadingData' is true displays skeletons", () => {
        renderService({...useGetDataMock, loadingData: true});

        expect(screen.queryByTestId("skeletons-service")).toBeInTheDocument();
    })

    test("if 'fetchData' is true displays services", () => {
        const mockServices = [
            {
                id_servicios: 1,
                imagen: "https://www.cloudinary.com/img",
                nombre: "service 1",
                precio: 900,
                ubicacion: "some where"
            },
            {
                id_servicios: 2,
                imagen: "https://www.cloudinary.com/img",
                nombre: "service 2",
                precio: 900,
                ubicacion: "some where"
            }
        ]

        renderService({...useGetDataMock, fetchData: mockServices});

        expect(screen.queryByTestId("skeletons-service")).not.toBeInTheDocument();
        expect(screen.queryByTestId("services-container")).toBeInTheDocument();
    })

    test("if 'fetchData' is null displays 'ErrorComponent'", async () => {
        renderService({...useGetDataMock, errorMessage: {title: "Error inesperado", message: "Vuelva al inicio o intentelo mas tarde"}});

        expect(screen.queryByTestId("skeletons-service")).not.toBeInTheDocument();
        expect(screen.queryByTestId("services-container")).not.toBeInTheDocument();
        
        expect(screen.getByText(/Error inesperado/i)).toBeInTheDocument();
        expect(screen.getByText(/Vuelva al inicio o intentelo mas tarde/i)).toBeInTheDocument();
    })
})

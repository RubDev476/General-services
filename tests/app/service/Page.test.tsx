import {vi, expect, describe, it, afterEach} from "vitest";
import {cleanup, render, screen, waitFor} from "@testing-library/react";

import * as useGetData from "@/hooks/useGetData";

import Service from "@/components/page/Service";

import ErrorComponent from "@/components/ui/Error";

vi.mock("@/components/ui/Error", {spy: true});

describe("Service Page Component", () => {
    afterEach(() => {
        vi.clearAllMocks();

        cleanup();
    });

    const useGetDataMock = {
        loadingData: false,
        fetchData: null,
        setLoadingData: vi.fn(),
        setFetchData: vi.fn(),
        errorMessage: { title: "", message: "" },
        setErrorMessage: vi.fn(),
    };

    const renderService = (mock: any) => {
        vi.spyOn(useGetData, "default").mockReturnValue(mock);

        render(<Service idService="1" />);
    }

    it("renders the skeleton while loading", () => {
        renderService({...useGetDataMock, loadingData: true});

        expect(screen.queryByTestId("skeleton-service")).toBeInTheDocument();
    });

    it("renders the error message when no service is found", async () => {
        renderService(useGetDataMock);

        expect(ErrorComponent).toHaveBeenCalledWith({
            message: "Vuelva al inicio para explorar otros servicios",
            title: "Servicio no encontrado",
        }, undefined);

        await waitFor(() => {
            expect(screen.getByText(/Servicio no encontrado/i)).toBeInTheDocument();
            expect(screen.getByText(/Vuelva al inicio para explorar otros servicios/i)).toBeInTheDocument();
        })
    });

    it("renders the service details when service data is available", async () => {
        const mockService = {
            imagen: "/test-image.jpg",
            nombre: "Test Service",
            disponibilidad_servicio: { estado: "Disponible" },
            precio: 100,
            ubicacion: "Test Location",
            descripcion: "Test Description",
            usuarios_proveedores: { id_usuarios: "123", nombre: "Test User" },
        };

        renderService({...useGetDataMock, fetchData: mockService});

        await waitFor(() => {
            expect(screen.getByText(mockService.nombre)).toBeInTheDocument();
            expect(screen.getByText(`$${mockService.precio}`)).toBeInTheDocument();
            expect(screen.getByText(mockService.descripcion)).toBeInTheDocument();
            expect(screen.getByText(mockService.ubicacion)).toBeInTheDocument();
            expect(screen.getByText(mockService.usuarios_proveedores.nombre)).toBeInTheDocument();
            expect(screen.getByText(/(Disponible)/)).toBeInTheDocument();
        });
    });
});
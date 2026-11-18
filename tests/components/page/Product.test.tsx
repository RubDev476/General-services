import {vi, expect, describe, it, afterEach} from "vitest";
import {cleanup, render, screen, waitFor} from "@testing-library/react";

import * as useGetData from "@/hooks/useGetData";

import Product from "@/components/page/Product";

import ErrorComponent from "@/components/ui/Error";

vi.mock("@/components/ui/Error", {spy: true});

describe("Product Page Component", () => {
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

    const renderProduct = (mock: any) => {
        vi.spyOn(useGetData, "default").mockReturnValue(mock);

        render(<Product idProduct="1" />);
    }

    it("renders the skeleton while loading", () => {
        renderProduct({...useGetDataMock, loadingData: true});

        expect(screen.queryByTestId("skeleton-product")).toBeInTheDocument();
    });

    it("renders the error message when no product is found", async () => {
        renderProduct(useGetDataMock);

        expect(ErrorComponent).toHaveBeenCalledWith({
            message: "Vuelva al inicio para explorar otros productos",
            title: "Producto no encontrado",
        }, undefined);

        await waitFor(() => {
            expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
            expect(screen.getByText(/Vuelva al inicio para explorar otros productos/i)).toBeInTheDocument();
        })
    });

    it("renders the product details when product data is available", async () => {
        const mockProduct = {
            imagen: "/test-image.jpg",
            nombre: "Test Product",
            disponibilidad_producto: { estado: "Disponible" },
            precio: 100,
            ubicacion: "Test Location",
            descripcion: "Test Description",
            usuarios_proveedores: { id_usuarios: "123", nombre: "Test User" },
        };

        renderProduct({...useGetDataMock, fetchData: mockProduct});

        await waitFor(() => {
            expect(screen.getByText(mockProduct.nombre)).toBeInTheDocument();
            expect(screen.getByText(`$${mockProduct.precio}`)).toBeInTheDocument();
            expect(screen.getByText(mockProduct.descripcion)).toBeInTheDocument();
            expect(screen.getByText(mockProduct.ubicacion)).toBeInTheDocument();
            expect(screen.getByText(mockProduct.usuarios_proveedores.nombre)).toBeInTheDocument();
            expect(screen.getByText(/(Disponible)/)).toBeInTheDocument();
        });
    });
});
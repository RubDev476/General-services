import React, { PropsWithChildren, JSX } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { RootState, AppStore, setupStore } from '@/store';

import { Roles, UserType } from "@/types/forms";

import { initialState } from "@/store/slices/auth";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

const initialTestUser = {
    nombre: "test user name",
    id_usuarios: 1,
    imagen: "https://cloudinary.com/image",
    roles: [
        {
            id_roles: 1,
            tipo: Roles.cliente
        }
    ],
    correo: "correo@test.com",
    telefono: "98989444",
    tipo_usuario: {
        id_tipos_usuario: 1,
        tipo: UserType.particular
    }
}

export {
    renderWithProviders,
    Roles,
    UserType,
    initialState,
    initialTestUser
}

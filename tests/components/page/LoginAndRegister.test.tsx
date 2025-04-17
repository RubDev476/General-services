import { test, expect, beforeAll, describe, afterAll, vi, afterEach, beforeEach } from "vitest";
import { cleanup, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import { initialTestUser, renderWithProviders } from "@tests/setup";

import * as serverActions from "@/server-actions";
import * as useAuthSelectors from "@/store/hooks/useAuthSelectors";
import { routerPushMock } from "@mocks/next/navigation";

import LoginAndRegister from "@/components/page/LoginAndRegister";

vi.mock('next/navigation');

afterAll(() => {
    vi.clearAllMocks();
    cleanup();
})

describe("general", () => {
    beforeAll(() => {
        renderWithProviders(<LoginAndRegister isRegister={false} />)
    })

    afterAll(() => {
        cleanup();
    })

    test("icon user displayed", () => {
        const iconUser = screen.getByTestId("icon-user");

        expect(iconUser).toBeInTheDocument();
    })

    test("form displayed", () => {
        const form = screen.getByRole("form");

        expect(form).toBeInTheDocument();
    })

    test("inputs password and email displayed", () => {
        const email = screen.getByPlaceholderText(/E-mail/);
        const password = screen.getByPlaceholderText(/Contraseña/);

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    })

    test("submit button displayed", () => {
        const submitBtn = screen.getByRole("button");

        expect(submitBtn).toBeInTheDocument();
    })
})

describe("login", () => {
    beforeAll(() => {
        renderWithProviders(<LoginAndRegister isRegister={false} />)
    })

    afterAll(() => {
        cleanup();
    })
  
    test("register inputs not displayed", () => {
        const confirmPass = screen.queryByPlaceholderText(/Confirmar contraseña/);
        const name = screen.queryByPlaceholderText(/Nombre/);
        const phone = screen.queryByPlaceholderText(/Teléfono/);
        const roles = screen.queryByTestId("fieldset-roles");
        const types = screen.queryByTestId("fieldset-types");

        expect(confirmPass).not.toBeInTheDocument();
        expect(name).not.toBeInTheDocument();
        expect(phone).not.toBeInTheDocument();
        expect(roles).not.toBeInTheDocument();
        expect(types).not.toBeInTheDocument();
    })

    test("links 'register' and 'forget password' displayed", () => {
        const registerLink = screen.queryByText(/Olvidaste tu contraseña/i);
        const forgetPassLink = screen.queryByText(/No tienes una cuenta/i);

        expect(registerLink).toBeInTheDocument();
        expect(forgetPassLink).toBeInTheDocument();
    })

    test("'login' link not displayed", () => {
        const loginLink = screen.queryByText(/Ya tienes una cuenta/i);

        expect(loginLink).not.toBeInTheDocument();
    })
})

describe("register", () => {
    beforeAll(() => {
        renderWithProviders(<LoginAndRegister isRegister={true} />)
    })

    afterAll(() => {
        cleanup();
    })
  
    test("register inputs displayed", () => {
        const confirmPass = screen.queryByPlaceholderText(/Confirmar contraseña/);
        const name = screen.queryByPlaceholderText(/Nombre/);
        const phone = screen.queryByPlaceholderText(/Teléfono/);
        const roles = screen.queryByTestId("fieldset-roles");
        const types = screen.queryByTestId("fieldset-types");

        expect(confirmPass).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(phone).toBeInTheDocument();
        expect(roles).toBeInTheDocument();
        expect(types).toBeInTheDocument();
    })

    test("links 'register' and 'forget password' not displayed", () => {
        const registerLink = screen.queryByText(/Olvidaste tu contraseña/i);
        const forgetPassLink = screen.queryByText(/No tienes una cuenta/i);

        expect(registerLink).not.toBeInTheDocument();
        expect(forgetPassLink).not.toBeInTheDocument();
    })

    test("'login' link displayed", () => {
        const loginLink = screen.queryByText(/Ya tienes una cuenta/i);

        expect(loginLink).toBeInTheDocument();
    })
})

describe("form submission - login", () => {
    afterEach(() => {
        cleanup();
    })

    test("success", async () => {
        renderWithProviders(<LoginAndRegister isRegister={false} />);

        const mockSubmitLogin = vi.fn();
        vi.spyOn(serverActions, "POST_register_login").mockImplementation(mockSubmitLogin);

        const emailInput = screen.getByPlaceholderText(/E-mail/);
        const passwordInput = screen.getByPlaceholderText(/Contraseña/);
        const submitButton = screen.getByRole("button");

        await userEvent.type(emailInput, initialTestUser.correo);
        await userEvent.type(passwordInput, "password123");
        await userEvent.click(submitButton);

        expect(mockSubmitLogin).toHaveBeenCalledWith({ email: initialTestUser.correo, password: "password123" }, "/login");
    });

    test("redirects to user page if userData exists", () => {
        vi.spyOn(useAuthSelectors, "useAuthSelectors").mockReturnValue({
            userData: initialTestUser,
            token: "mockedToken",
            authLoading: false,
        });

        renderWithProviders(<LoginAndRegister isRegister={false} />);

        expect(routerPushMock).toHaveBeenCalledWith("/user/1");
    });
});

describe("form submission - register", () => {
    beforeEach(() => {
        renderWithProviders(<LoginAndRegister isRegister={true} />);
    })

    afterEach(() => {
        cleanup();
    })

    const mockUser = {
        email: initialTestUser.correo,
        password: "password123",
        confirmPassword: "password123",
        name: initialTestUser.nombre,
        phone: initialTestUser.telefono,
    }

    const mockForm = async (data: any, radio: boolean = true) => {
        const emailInput = screen.getByPlaceholderText(/E-mail/);
        const passwordInput = screen.getByPlaceholderText(/Contraseña/);
        const confirmPasswordInput = screen.getByPlaceholderText(/Confirmar contraseña/);
        const nameInput = screen.getByPlaceholderText(/Nombre/);
        const phoneInput = screen.getByPlaceholderText(/Teléfono/);

        const submitButton = screen.getByRole("button");

        await userEvent.type(emailInput, data.email);
        await userEvent.type(passwordInput, data.password);
        await userEvent.type(confirmPasswordInput, data.confirmPassword);
        await userEvent.type(nameInput, data.name);
        await userEvent.type(phoneInput, data.phone);

        if(radio) {
            const radioParticular = screen.getByTestId("radio-particular");
            await userEvent.click(radioParticular);
        }

        return { submitButton };
    }

    test("sucess", async () => {
        const mockSubmitRegister = vi.fn();
        vi.spyOn(serverActions, "POST_register_login").mockImplementation(mockSubmitRegister);

        const { submitButton } = await mockForm(mockUser);

        await userEvent.click(submitButton);

        expect(mockSubmitRegister).toHaveBeenCalled();
    });

    test("displays error when passwords do not match", async () => {
        const { submitButton } = await mockForm({...mockUser, confirmPassword: "differentPassword"});

        await userEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Las contraseñas no coinciden/);
        expect(errorMessage).toBeInTheDocument();
    });

    test("displays error when there are no roles", async () => {
        const checkClient = screen.getByTestId("check-client"); // default checked

        const { submitButton } = await mockForm(mockUser);

        await userEvent.click(checkClient); // uncheck client
        await userEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Elige un rol/);
        expect(errorMessage).toBeInTheDocument();
    })

    test("displays error when there is no type", async () => {
        const { submitButton } = await mockForm(mockUser, false);

        await userEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Elige un tipo de usuario/);
        expect(errorMessage).toBeInTheDocument();
    })

    test("displays error when there is no numbers", async () => {
        const { submitButton } = await mockForm({...mockUser, phone: "invalidPhone98998"});

        await userEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Agregue solo numeros al telefono/);
        expect(errorMessage).toBeInTheDocument();
    })
})

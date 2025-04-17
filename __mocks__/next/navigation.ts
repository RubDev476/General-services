import { vi } from 'vitest';

export const routerPushMock = vi.fn();

const useRouter = () => ({
    push: routerPushMock
})

export {
    useRouter,
}

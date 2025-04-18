import { vi } from 'vitest';

export const routerPushMock = vi.fn();

const useRouter = () => ({
    push: routerPushMock
})

const searchParams = new URLSearchParams('/');
const useSearchParams = () => searchParams;

export {
    useRouter,
    useSearchParams
}

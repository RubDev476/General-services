import { vi } from 'vitest';

export const pushMock = vi.fn();

const useRouter = () => ({
    push: pushMock
})

export {
    useRouter,
}

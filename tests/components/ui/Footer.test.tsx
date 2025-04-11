import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page';
import { renderWithProviders } from '../../jest.setup';

describe('Page', () => {
    beforeAll(() => {
        renderWithProviders(<Page />, {
            preloadedState: {
                authReducer: {
                    token: null,
                    userData: null,
                    authLoading: false
                }
            }
        });
    })

    it('renders a heading', () => {
        //render(<Page />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})

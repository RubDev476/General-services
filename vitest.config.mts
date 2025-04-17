import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: "./tests/setup.tsx",
  },
  resolve: { 
    alias: { 
        '@': path.resolve(__dirname, './src'),
        '@mocks': path.resolve(__dirname, './__mocks__'),
        '@tests': path.resolve(__dirname, './tests'),
    }, 
},
})
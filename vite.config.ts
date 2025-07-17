import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { defineConfig as vitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(
  vitestConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    plugins: [react(), tailwindcss()],
    test: {
      globals: false,
      environment: 'jsdom',
      setupFiles: ['src/__test__/index.ts'],
      coverage: {
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          'src/interfaces/*.ts',
          'src/**/*.test.{js,jsx,ts,tsx}',
          'src/**/*.spec.{js,jsx,ts,tsx}',
          'src/index.{js,jsx,ts,tsx}',
          'src/__test__/*/*.{js,ts}',
          'src/**/*.d.ts',
          'src/components/index.ts',
        ],
        reporter: ['text', 'json', 'html'],
        thresholds: {
          global: {
            statements: 80,
            branches: 50,
            functions: 50,
            lines: 50,
          },
        },
      },
    },
  })
);

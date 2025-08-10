import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { defineConfig as vitestConfig } from 'vitest/config';

export default defineConfig(
  vitestConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    plugins: [react(), tailwindcss()],
    test: {
      reporters: ['verbose'],
      globals: false,
      environment: 'jsdom',
      setupFiles: ['src/__test__/index.ts'],
      coverage: {
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          'src/interfaces/*.ts',
          'src/**/*.unused.*',
          'src/**/*.test.{js,jsx,ts,tsx}',
          'src/**/*.spec.{js,jsx,ts,tsx}',
          'src/**/index.{js,jsx,ts,tsx}',
          'src/__test__/*/*.{js,ts}',
          'src/**/*.d.ts',
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

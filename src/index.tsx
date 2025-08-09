import './index.css';

import { appRouter } from '@/app-router/app-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { QueryProvider, ThemeProvider } from '@/providers';

import { ErrorBoundary } from '@/components';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <QueryProvider>
          <ThemeProvider>
            <RouterProvider router={appRouter} />
          </ThemeProvider>
        </QueryProvider>
      </ErrorBoundary>
    </StrictMode>
  );

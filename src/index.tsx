import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import './index.css';

import { ThemeProvider } from './contexts/ThemeContext';
import { router } from './router';

import { ErrorBoundary } from '@/components';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );

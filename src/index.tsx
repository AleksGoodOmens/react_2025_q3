import './index.css';

import { HomePage } from './pages/home/home-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/providers';

import { ErrorBoundary } from '@/components';

const root = document.getElementById('root');

const queryClient = new QueryClient();

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <HomePage />
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );

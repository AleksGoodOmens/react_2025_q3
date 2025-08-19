import './index.css';

import { HomePage } from './pages/home/home-page';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/providers';

import { ErrorBoundary } from '@/components';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );

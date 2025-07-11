import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import Home from '@pages/home/Home';

import ErrorBoundary from '@components/error-boundary/ErrorBoundary';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Home />
      </ErrorBoundary>
    </StrictMode>
  );

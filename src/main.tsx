import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from '@pages/home/Home';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <Home />
    </StrictMode>
  );

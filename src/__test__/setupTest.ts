// src/setupTests.ts
import '@testing-library/jest-dom/vitest';
import './mockData/mockLocalStorage';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

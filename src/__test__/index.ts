// src/setupTests.ts
import '@testing-library/jest-dom/vitest';
import './mockData/mockLocalStorage.js';

import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { handlers } from './mockData/handlers.js';

export { mockCountries } from './mockData/countries.mock.js';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

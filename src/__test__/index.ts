import '@testing-library/jest-dom/vitest';
import './mockData/mockLocalStorage.js';

import { handlers } from './mockData/handlers.js';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

export { mockCountries } from './mockData/countries.mock.js';

export const user = userEvent.setup();
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

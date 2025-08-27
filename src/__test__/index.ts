import '@testing-library/jest-dom/vitest';
import './mockData/mockLocalStorage.js';

import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach } from 'vitest';

export const user = userEvent.setup();

beforeEach(() => {
  cleanup();
});

import '@testing-library/jest-dom/vitest';
import './mockData/mockLocalStorage.js';

import userEvent from '@testing-library/user-event';

export const user = userEvent.setup();

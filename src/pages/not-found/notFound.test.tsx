import NotFound from './NotFound';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('Not found page', () => {
  it('not found page contains one h1 tag only', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

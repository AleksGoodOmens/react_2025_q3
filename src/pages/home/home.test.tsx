import Home from './Home';
import { user } from '@/__test__';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from '@/components';

describe('home page', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('render home page heading', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('have button that trigger error', async () => {
    render(
      <ErrorBoundary fallback="test">
        <Home />
      </ErrorBoundary>
    );

    const btn = screen.getByRole('button', { name: 'error' });

    expect(btn).toBeInTheDocument();

    await user.click(btn);

    expect(btn).not.toBeInTheDocument();
  });
});

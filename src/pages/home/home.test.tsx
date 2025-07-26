import { user } from '@/__test__';
import { router } from '@/router';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router';

describe('home page', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    cleanup();
  });

  it('render home page heading', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('trigger error', async () => {
    render(<RouterProvider router={router} />);

    const errorBtn = await screen.findByRole('button', { name: 'error' });
    expect(errorBtn).toBeInTheDocument();
    await user.click(errorBtn);
    expect(consoleSpy).toHaveBeenCalled();
  });

  afterAll(() => {
    cleanup();
    vi.restoreAllMocks();
  });
});

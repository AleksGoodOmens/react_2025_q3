import { server, user } from '@/__test__';
import { routerConfig } from '@/router';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

describe('home page', () => {
  beforeEach(() => {
    cleanup();
  });
  it('should render home page with countries data', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    // Проверяем, что заголовок отрендерился
    expect(
      await screen.findByRole('heading', { level: 1 })
    ).toBeInTheDocument();

    expect(await screen.findAllByRole('listitem')).toHaveLength(20);
  });

  it('should handle loader error', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/No countries found/i)).toBeInTheDocument();
    });
  });

  it('should trigger component error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const errorBtn = await screen.findByRole('button', { name: 'error' });
    await user.click(errorBtn);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('user can navigate through pages', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const getButton = async (name: 'prev' | 'next' | '1' | '2') => {
      return screen.findByRole('button', { name });
    };

    expect(await getButton('prev')).toBeDisabled();
    expect(await getButton('next')).not.toBeDisabled();
    expect(
      await screen.findByRole('heading', { name: /Total pages:/i })
    ).toHaveTextContent('Total pages: 2');
    expect(router.state.location.search).not.toContain('page=2');

    await user.click(await getButton('next'));

    await waitFor(
      async () => {
        expect(await getButton('prev')).not.toBeDisabled();
        expect(await getButton('next')).toBeDisabled();
        expect(router.state.location.search).toContain('page=2');
      },
      { timeout: 2000 }
    );

    await user.click(await getButton('prev'));

    await waitFor(
      async () => {
        expect(await getButton('prev')).toBeDisabled();
        expect(await getButton('next')).not.toBeDisabled();
        expect(router.state.location.search).not.toContain('page=2');
      },
      { timeout: 2000 }
    );

    expect(await getButton('1')).toHaveClass('bg-amber-800');
    expect(await getButton('2')).not.toHaveClass('bg-amber-800');
    expect(router.state.location.search).not.toContain('page=2');

    await user.click(await getButton('2'));
    await waitFor(
      async () => {
        expect(await getButton('1')).not.toHaveClass('bg-amber-800');
        expect(await getButton('2')).toHaveClass('bg-amber-800');
        expect(await getButton('prev')).not.toBeDisabled();
        expect(await getButton('next')).toBeDisabled();
        expect(router.state.location.search).toContain('page=2');
      },
      { timeout: 2000 }
    );
  });

  it('user can change limit', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);
    const select = await screen.findByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('20');
    expect(
      await screen.findByRole('heading', { name: /Total pages:/i })
    ).toHaveTextContent('Total pages: 2');

    await user.selectOptions(select, '50');

    expect(await screen.findByRole('combobox')).toHaveValue('50');

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: /Total pages:/i })
        ).toHaveTextContent('Total pages: 1');
      },
      { timeout: 3000 }
    );
  });
});

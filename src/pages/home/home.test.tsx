import { server, user } from '@/__test__';
import { routerConfig } from '@/router';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { QueryProvider, ThemeProvider } from '@/providers';

describe('home page', () => {
  describe.skip('positive scenario', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    beforeEach(() => {
      cleanup();
      render(
        <QueryProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryProvider>
      );
    });

    it('should render home page with countries data', async () => {
      expect(
        await screen.findByRole('heading', { level: 1 })
      ).toBeInTheDocument();

      await waitFor(
        () => {
          const countries = screen.getAllByRole('listitem');
          screen.debug(countries);
          // expect(countries).toHaveLength(20);
        },
        { timeout: 3000 }
      );
    });

    it('user can navigate through pages', async () => {
      const getButton = (name: 'prev' | 'next' | '1' | '2') => {
        return screen.findByRole('button', { name });
      };

      expect(await getButton('prev')).toBeDisabled();
      expect(await getButton('next')).not.toBeDisabled();
      expect(
        await screen.findByRole('heading', { name: /Total pages:/i })
      ).toHaveTextContent('Total pages: 2');
      expect(router.state.location.search).not.toContain('page=2');

      await user.click(await getButton('next'));
      expect(await getButton('prev')).not.toBeDisabled();
      expect(await getButton('next')).toBeDisabled();
      expect(router.state.location.search).toContain('page=2');

      await user.click(await getButton('prev'));
      expect(await getButton('prev')).toBeDisabled();
      expect(await getButton('next')).not.toBeDisabled();
      expect(router.state.location.search).not.toContain('page=2');

      expect(await getButton('1')).toHaveClass('bg-amber-800');
      expect(await getButton('2')).not.toHaveClass('bg-amber-800');

      await user.click(await getButton('2'));
      expect(await getButton('1')).not.toHaveClass('bg-amber-800');
      expect(await getButton('2')).toHaveClass('bg-amber-800');
      expect(router.state.location.search).toContain('page=2');
    });

    it('user can change limit', async () => {
      const select = await screen.findByRole('combobox');
      expect(select).toHaveValue('20');
      expect(
        await screen.findByRole('heading', { name: /Total pages:/i })
      ).toHaveTextContent('Total pages: 2');

      await user.selectOptions(select, '50');
      expect(await screen.findByRole('combobox')).toHaveValue('50');
      expect(
        await screen.findByRole('heading', { name: /Total pages:/i })
      ).toHaveTextContent('Total pages: 1');
    });
  });

  describe('negative scenario', () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    beforeEach(() => {
      cleanup();

      render(
        <QueryProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryProvider>
      );
    });

    it('should trigger component error', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const router = createMemoryRouter(routerConfig, {
        initialEntries: ['/'],
      });

      render(
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      );

      const errorBtn = await screen.findByRole('button', { name: 'error' });
      await user.click(errorBtn);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

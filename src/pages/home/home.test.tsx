// home.test.tsx

import '@/__test__/mockHooks';

import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

import { QueryProvider, ThemeProvider } from '@/providers';

describe('home page', async () => {
  const Home = (await import('./Home')).default;

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Home,
      loader: () => ({
        search: 'all',
        page: 1,
        limit: 20,
      }),
      hydrateFallbackElement: <div>loading...</div>,
    },
  ]);

  render(
    <QueryProvider>
      <ThemeProvider>
        <Stub initialEntries={['/']} />
      </ThemeProvider>
    </QueryProvider>
  );

  it('should render home page with countries data', async () => {
    const countries = await screen.findAllByRole('listitem');
    expect(countries).toHaveLength(40);
    const refetchBtn = screen.getByRole('button', { name: 'fresh reload' });

    expect(refetchBtn).toBeInTheDocument();
  });

  it('have error btn', () => {
    const btn = screen.getByRole('button', { name: 'error' });
    expect(btn).toBeInTheDocument();
  });
});

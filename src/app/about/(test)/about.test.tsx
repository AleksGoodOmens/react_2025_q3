import { aboutMe } from '../components/data';
import About from '../page';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('about', () => {
  it('page contains one h1 tag only', async () => {
    const memoryRouter = createMemoryRouter([
      {
        path: '/',
        hydrateFallbackElement: <div>loading...</div>,
        Component: About,
        loader: () => {
          return { ...aboutMe };
        },
      },
    ]);
    render(<RouterProvider router={memoryRouter} />);

    expect(await screen.findAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

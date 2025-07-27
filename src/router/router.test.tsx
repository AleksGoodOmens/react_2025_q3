import { router } from '.';
import { user } from '@/__test__';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router';

describe('router', () => {
  render(<RouterProvider router={router} />);

  it('have loading', async () => {
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });
  it('render home page', async () => {
    expect(
      await screen.findByRole('heading', { name: /Countries by AmensGood/i })
    ).toBeInTheDocument();
  });
  it('render detailed page', async () => {
    const card = screen.getAllByRole('listitem')[0];
    expect(card).toHaveClass('animate-fadeIn');
    const btn = card.firstChild as HTMLButtonElement;
    expect(btn).toBeInTheDocument();
    await user.click(btn);

    await waitFor(
      () => {
        expect(router.state.location.pathname).toMatch(/details/);
      },
      { timeout: 3000 }
    );
  });
  it('render about page', async () => {
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    await user.click(aboutLink);
    expect(await screen.findByText('Aleks Gomeniuk')).toBeInTheDocument();
  });
});

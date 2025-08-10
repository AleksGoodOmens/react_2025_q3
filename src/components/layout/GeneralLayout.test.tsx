import { GeneralLayout } from './GeneralLayout';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/providers';

describe('GeneralLayout', () => {
  const renderLayout = (initialRoute = '/') => {
    return render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/" element={<GeneralLayout />}>
              <Route index element={<div>Home Page</div>} />
              <Route path="about" element={<div>About Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('should render navigation links', () => {
    renderLayout();

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
  });

  it('should mark active link with correct class', () => {
    cleanup();
    renderLayout('/about');

    const homeLink = screen.getByText('home');
    const aboutLink = screen.getByText('about');

    expect(homeLink).not.toHaveClass('text-white');
    expect(aboutLink).toHaveClass('text-white');
  });

  it('should render Outlet content', () => {
    cleanup();

    renderLayout();

    expect(screen.getByText('Home Page')).toBeInTheDocument();

    renderLayout('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  it('should apply correct container classes', () => {
    cleanup();

    renderLayout();

    const container = screen.getByRole('document');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('mx-auto');
    expect(container).toHaveClass('min-h-dvh');
    expect(container).toHaveClass('flex-col');
  });
});

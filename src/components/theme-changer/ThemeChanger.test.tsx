import { ThemeChanger } from './ThemeChanger';
import { user } from '@/__test__';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/providers';

describe('ThemeChanger', () => {
  it('render and have icon', async () => {
    render(
      <ThemeProvider>
        <ThemeChanger />
      </ThemeProvider>
    );

    const elementBtn = screen.getByRole('button');
    expect(elementBtn).toBeInTheDocument();
    const moon = elementBtn.firstChild;
    expect(moon).toHaveClass('text-amber-900');
    await user.click(elementBtn);
    const sunSvg = screen.getByRole('button').firstChild;
    expect(sunSvg).toHaveClass('text-amber-100');
  });
});

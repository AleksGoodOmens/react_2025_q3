import { Flyout } from './Flyout';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Flyout test', () => {
  it('hided if now favorite countries', () => {
    render(<Flyout />);
    const flyout = screen.getByRole('dialog');
    expect(flyout).toHaveClass('opacity-0');
    expect(flyout).toHaveClass('pointer-events-none');
  });
});

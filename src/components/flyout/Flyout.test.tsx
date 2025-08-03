import { Flyout } from './Flyout';
import { mockCountry } from '@/__test__/mockData/countries.mock';
import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { useCountryStore } from '@/hooks';

describe('Flyout test', () => {
  beforeEach(() => {
    cleanup();
  });
  it('hided if now favorite countries', () => {
    useCountryStore.setState({
      favorite: [],
    });
    render(<Flyout />);
    const flyout = screen.getByRole('dialog');
    expect(flyout).toHaveClass('opacity-0');
    expect(flyout).toHaveClass('pointer-events-none');
  });
  it('visible if favorite country exist', () => {
    useCountryStore.setState({
      favorite: [mockCountry],
    });
    render(<Flyout />);
    const flyout = screen.getByRole('dialog');
    expect(flyout).toHaveClass('opacity-100');
    expect(flyout).toHaveClass('pointer-events-auto');
  });
});

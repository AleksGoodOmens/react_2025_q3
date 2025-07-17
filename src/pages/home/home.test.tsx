import Home from './Home';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('home page', () => {
  it('render home page', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

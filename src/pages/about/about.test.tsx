import About from './About';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('about', () => {
  it('page contains one h1 tag only', () => {
    render(<About />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

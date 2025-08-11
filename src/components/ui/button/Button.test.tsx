import { Button } from './Button';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockButtonChildren = 'test button';

describe('button', () => {
  it('render button with children', () => {
    render(<Button variant="main">{mockButtonChildren}</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});

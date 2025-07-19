import { Button } from './Button';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

const mockButtonChildren = 'test button';

describe('button', () => {
  it('render button with children', () => {
    render(<Button>{mockButtonChildren}</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});

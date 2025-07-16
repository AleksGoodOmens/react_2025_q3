import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

const mockButtonChildren = 'test button';

describe('button test', () => {
  it('render button with children', () => {
    render(<Button>{mockButtonChildren}</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});

import { SearchFormSkeleton } from './SearchFromSkeleton';
import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('SearchFromSkeleton', () => {
  beforeEach(() => {
    render(<SearchFormSkeleton />);
  });

  afterEach(() => {
    cleanup();
  });
  it('render component', () => {
    const element = screen.getByRole('status');
    expect(element).toBeInTheDocument();
  });
  it('render component with animation class', () => {
    const element = screen.getByRole('status');
    expect(element).toHaveClass('animate-pulse');
  });
});

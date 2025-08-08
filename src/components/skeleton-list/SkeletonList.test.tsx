import { SkeletonList } from './SkeletonList';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('SkeletonList', () => {
  it('render "skeleton" component', () => {
    render(<SkeletonList amount={5} />);
    expect(screen.getAllByRole('status')).toHaveLength(5);
  });
});

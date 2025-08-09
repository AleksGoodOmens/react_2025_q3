import { SkeletonList } from './SkeletonList';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SkeletonList', () => {
  it('render "skeleton" component', () => {
    render(<SkeletonList amount={5} />);
    expect(screen.getAllByRole('status')).toHaveLength(5);
  });
});

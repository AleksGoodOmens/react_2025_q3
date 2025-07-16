import { SkeletonListItem } from './SkeletonListItem';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('SkeletonListItem', () => {
  it('render "li" component', () => {
    render(<SkeletonListItem />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});

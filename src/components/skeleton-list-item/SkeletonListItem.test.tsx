import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SkeletonListItem } from './SkeletonListItem';

describe('SkeletonListItem', () => {
  it('render "li" component', () => {
    render(<SkeletonListItem />);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});

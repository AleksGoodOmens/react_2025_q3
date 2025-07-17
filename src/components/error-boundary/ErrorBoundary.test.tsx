import { ErrorBoundary } from './ErrorBoundary';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('error boundary', () => {
  it('render component', async () => {
    const fallBack = <p>test fallback</p>;
    const children = <h1>test</h1>;

    render(<ErrorBoundary fallback={fallBack}>{children}</ErrorBoundary>);
    screen.debug();
    expect(await screen.getByRole('heading')).toBeInTheDocument();
  });
});

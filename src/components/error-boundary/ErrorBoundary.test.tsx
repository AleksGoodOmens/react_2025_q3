import { ErrorBoundary } from './ErrorBoundary';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('error boundary', () => {
  const fallback = <p>test fallback</p>;
  const children = <h1>test</h1>;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('render component', () => {
    render(<ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render fallback when error occurs', () => {
    const BuggyComponent = () => {
      throw new Error('ErrorBoundary caught an error');
    };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={fallback}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('test fallback')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledOnce();

    consoleSpy.mockRestore();
  });
});

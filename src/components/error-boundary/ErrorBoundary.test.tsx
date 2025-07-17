import { ErrorBoundary } from './ErrorBoundary';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('error boundary', () => {
  const fallback = <p>test fallback</p>;
  const children = <h1>test</h1>;
  it('render component', () => {
    render(<ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>);
    screen.debug();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it.only('should render fallback when error occurs', () => {
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

// describe('ErrorBoundary', () => {
//   const fallback = <p>test fallback</p>;
//   const children = <h1>test</h1>;

//   it('should render children when no error', () => {
//     render(<ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>);

//     expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument();
//     expect(screen.queryByText('test fallback')).not.toBeInTheDocument();
//   });

//   it('should render fallback when error occurs', () => {
//     // Компонент, который выбрасывает ошибку
//     const BuggyComponent = () => {
//       throw new Error('Test error');
//     };

//     // Мокаем console.error чтобы тесты не засорялись
//     const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

//     render(
//       <ErrorBoundary fallback={fallback}>
//         <BuggyComponent />
//       </ErrorBoundary>
//     );

//     expect(screen.getByText('test fallback')).toBeInTheDocument();
//     expect(consoleSpy).toHaveBeenCalledWith(
//       'ErrorBoundary caught an error:',
//       expect.any(Error),
//       expect.any(Object)
//     );

//     consoleSpy.mockRestore();
//   });

//   it('should update state when error is caught', () => {
//     const { container } = render(
//       <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
//     );

//     // Получаем экземпляр ErrorBoundary
//     const instance =
//       container._reactRootContainer._internalRoot.current.child.pendingProps
//         .children;

//     // Имитируем вызов componentDidCatch
//     instance.componentDidCatch(new Error('Test error'), { componentStack: '' });

//     // Проверяем что состояние обновилось
//     expect(instance.state.hasError).toBe(true);
//   });
// });

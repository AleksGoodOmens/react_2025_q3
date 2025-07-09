import { Component, type PropsWithChildren, type ReactNode } from 'react';

interface IProps extends PropsWithChildren {
  fallback: ReactNode;
}

class ErrorBoundary extends Component<IProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

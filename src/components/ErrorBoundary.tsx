// ErrorBoundary.tsx
import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
    error: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error:', error, info);
    this.setState({ hasError: true, error: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>An error occurred: {this.state.error}</p>
          <p>Please reload the application.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

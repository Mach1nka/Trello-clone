import React from 'react';

import Error from './error';
// import { errorLog } from '../../api/error-request';

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error
    });
    // errorLog({ error: error.toString(), errorInfo: errorInfo.componentStack });
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <Error error={error?.toString()} /> : children;
  }
}

export default ErrorBoundary;

import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    // console.log(error, errorInfo, 'catch');
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <div>Component Crashed!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

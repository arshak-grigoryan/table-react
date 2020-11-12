import React from 'react';

class ErrorBoundary extends React.Component {
    state = {
        error: false
    }

    static getDerivedStateFromError(error) {
        console.log(error,'static')
        return {error:true}
    }

    componentDidCatch(error,info){
        console.log(error,info,'catch')
    }

    render() {
        const {error} = this.state
        const {fallback,children} = this.props
        return error ? fallback : children
    }
}

export default ErrorBoundary
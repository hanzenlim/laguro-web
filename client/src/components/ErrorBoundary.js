import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="stretch_height">
                    <h4>Something went wrong. Please try again later.</h4>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

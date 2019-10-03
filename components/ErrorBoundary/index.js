import React, { Component } from 'react';
import Router from 'next/router';

import GeneralErrorPage from '~/routes/GeneralErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', () => {
            if (this.state.hasError) {
                this.setState({
                    hasError: false,
                });
            }
        });
    }

    // eslint-disable-next-line
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <GeneralErrorPage />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

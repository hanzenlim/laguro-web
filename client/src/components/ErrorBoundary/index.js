import React, { Component } from 'react';
import history from '../../history';

import GeneralErrorPage from '../../pages/GeneralErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidMount() {
        history.listen(() => {
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

import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';

import LoginPageView from './view';
import {
    onLogin,
    onSignup,
    sendPassResetLink,
    getUser,
} from '../../util/authUtils';

class LoginPage extends Component {
    state = {
        currentModal: 'login',
        isSubmitting: false,
    };

    openLoginModal = () => {
        this.setState({
            currentModal: 'login',
        });
    };

    closeModal = () => {
        this.setState({
            currentModal: null,
        });
        this.props.history.push('/');
    };

    handleLogin = async values => {
        await this.setState({ isSubmitting: true });
        onLogin(values)
            .then(() => {
                this.setState({ isSubmitting: false });
            })
            .catch(() => {
                this.setState({ isSubmitting: false });
            });
    };

    handleSignup = async values => {
        await this.setState({ isSubmitting: true });
        onSignup(values)
            .then(() => {
                this.setState({ isSubmitting: false });
            })
            .catch(() => {
                this.setState({ isSubmitting: false });
            });
    };

    handleSendResetPasswordLink = async (values, onSuccess) => {
        await this.setState({ isSubmitting: true });
        sendPassResetLink(values, onSuccess)
            .then(() => {
                this.setState({ isSubmitting: false });
            })
            .catch(() => {
                this.setState({ isSubmitting: false });
            });
    };

    render() {
        const search = queryString.parse(_get(this.props, 'location.search'));
        const { location } = this.props;
        const user = getUser();

        // Check if user is logged in or not.
        if (_get(user, 'id')) {
            return <Redirect to={search.redirectTo} />;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Log in to Laguro</title>
                    <meta
                        name="description"
                        content="Log in to access your Laguro account."
                    />
                    <link rel="canonical" href="https://www.laguro.com/login" />
                </Helmet>
                <LoginPageView
                    onLogin={values => this.handleLogin(values)}
                    closeModal={this.closeModal}
                    closable
                    visibleModal={this.state.currentModal}
                    message={_get(location, 'state.message')}
                    isSubmitting={this.state.isSubmitting}
                />
            </Fragment>
        );
    }
}
export default LoginPage;

import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';
import LoginPageView from './view';
import { getActiveUserQuery } from './queries';
import { onLogin, onSignup, sendPassResetLink } from '../../util/authUtils';

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

    onOpenRegistrationModal = () => {
        this.setState({
            currentModal: 'register',
        });
    };

    onOpenForgotPassModal = () => {
        this.setState({
            currentModal: 'forgotPass',
        });
    };

    closeModal = () => {
        this.setState({
            currentModal: null,
        });
        this.props.history.push('/');
    };

    handleLogin = async (client, values) => {
        await this.setState({ isSubmitting: true });
        onLogin(client, values)
            .then(() => {
                this.setState({ isSubmitting: false });
            })
            .catch(() => {
                this.setState({ isSubmitting: false });
            });
    };

    handleSignup = async (client, values) => {
        await this.setState({ isSubmitting: true });
        onSignup(client, values)
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

        return (
            <Query query={getActiveUserQuery}>
                {({ loading, data, client }) => {
                    const { location } = this.props;
                    if (loading) {
                        return <div>loading...</div>;
                    }

                    // Check if user is logged in or not.
                    if (_get(data, 'activeUser.id')) {
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
                                <link
                                    rel="canonical"
                                    href="https://www.laguro.com/login"
                                />
                            </Helmet>
                            <LoginPageView
                                openRegistrationModal={
                                    this.onOpenRegistrationModal
                                }
                                openForgotPassModal={this.onOpenForgotPassModal}
                                closeModal={this.closeModal}
                                openLoginModal={this.openLoginModal}
                                closable
                                signup={values =>
                                    this.handleSignup(client, values)
                                }
                                onLogin={values =>
                                    this.handleLogin(client, values)
                                }
                                visibleModal={this.state.currentModal}
                                sendPassResetLink={
                                    this.handleSendResetPasswordLink
                                }
                                message={_get(location, 'state.message')}
                                isSubmitting={this.state.isSubmitting}
                            />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}
export default LoginPage;

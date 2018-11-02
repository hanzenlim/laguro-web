import React, { Component } from 'react';
import queryString from 'query-string';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';
import ForgotPasswordPageView from './view';
import { getActiveUserQuery } from './queries';
import { onLogin, onSignup, sendPassResetLink } from '../../util/authUtils';

class ForgotPasswordPage extends Component {
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
                    if (loading) {
                        return <div>loading...</div>;
                    }

                    // Check if user is logged in or not.
                    if (_get(data, 'activeUser.id')) {
                        return <Redirect to={search.redirectTo} />;
                    }

                    return (
                        <ForgotPasswordPageView
                            openRegistrationModal={this.onOpenRegistrationModal}
                            openForgotPassModal={this.onOpenForgotPassModal}
                            closeModal={this.closeModal}
                            openLoginModal={this.openLoginModal}
                            closable
                            signup={values => this.handleSignup(client, values)}
                            onLogin={values => this.handleLogin(client, values)}
                            visibleModal={this.state.currentModal}
                            sendPassResetLink={this.handleSendResetPasswordLink}
                            message="You need to login first before you can view this page"
                            isSubmitting={this.state.isSubmitting}
                            location={this.props.location}
                        />
                    );
                }}
            </Query>
        );
    }
}
export default ForgotPasswordPage;

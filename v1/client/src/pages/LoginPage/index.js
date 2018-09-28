import React, { Component } from 'react';
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
            currentModal: 'login',
        });
    };

    render() {
        const location = queryString.parse(_get(this.props, 'location.search'));

        return (
            <Query query={getActiveUserQuery}>
                {({ loading, data, client }) => {
                    if (loading) {
                        return <div>loading...</div>;
                    }

                    // Check if user is logged in or not.
                    if (_get(data, 'activeUser.id')) {
                        return <Redirect to={location.redirectTo} />;
                    }

                    return (
                        <LoginPageView
                            openRegistrationModal={this.onOpenRegistrationModal}
                            openForgotPassModal={this.onOpenForgotPassModal}
                            closeModal={this.closeModal}
                            openLoginModal={this.openLoginModal}
                            closable={false}
                            signup={values => {
                                onSignup(client, values);
                            }}
                            onLogin={values => {
                                onLogin(client, values);
                            }}
                            visibleModal={this.state.currentModal}
                            sendPassResetLink={sendPassResetLink}
                            message="You need to login first before you can view this page"
                        />
                    );
                }}
            </Query>
        );
    }
}
export default LoginPage;

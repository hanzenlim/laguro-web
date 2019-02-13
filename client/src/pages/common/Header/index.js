import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Query } from 'react-apollo';

import HeaderView from './view';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { getUserQuery } from './queries';
import {
    onLogin,
    onSignup,
    sendPassResetLink,
    onLogout,
    openLoginModal,
    openRegistrationModal,
    openForgotPassModal,
    closeModal,
} from '../../../util/authUtils';
import history from '../../../history';

class HeaderContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            pathname: window.location.pathname + window.location.search,
        };

        history.listen(location => {
            this.setState({
                pathname: location.pathname + location.search,
            });
        });
    }

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
        return (
            <Query query={getUserQuery}>
                {({ loading, error, data, client }) => {
                    if (loading) {
                        return <div />;
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    return (
                        <HeaderView
                            auth={data.activeUser}
                            isSubmitting={this.state.isSubmitting}
                            isDentist={_get(data, 'activeUser.isDentist')}
                            isHost={_get(data, 'activeUser.isHost')}
                            visibleModal={data.visibleModal}
                            login={values => this.handleLogin(client, values)}
                            logout={() => onLogout(client)}
                            signup={values => this.handleSignup(client, values)}
                            sendPassResetLink={this.handleSendResetPasswordLink}
                            openLoginModal={() => openLoginModal(client)}
                            openRegistrationModal={() =>
                                openRegistrationModal(client)
                            }
                            openForgotPassModal={() =>
                                openForgotPassModal(client)
                            }
                            closeModal={() => closeModal(client)}
                            pathname={this.state.pathname}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default HeaderContainer;

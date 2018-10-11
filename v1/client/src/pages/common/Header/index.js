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

class HeaderContainer extends PureComponent {
    state = {
        isSubmitting: false,
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
        return (
            <Query query={getUserQuery}>
                {({ loading, error, data, client }) => {
                    const onLandingPage = window.location.pathname === '/';
                    const onOnboardingPage = window.location.pathname.includes(
                        'host-onboarding'
                    );

                    if (loading) {
                        return <HeaderView onLandingPage={onLandingPage} />;
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
                            onLandingPage={onLandingPage}
                            onOnboardingPage={onOnboardingPage}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default HeaderContainer;

import React from 'react';
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

const HeaderContainer = () => (
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
                    isDentist={_get(data, 'activeUser.isDentist')}
                    isHost={_get(data, 'activeUser.isHost')}
                    visibleModal={data.visibleModal}
                    login={values => onLogin(client, values)}
                    logout={() => onLogout(client)}
                    signup={values => onSignup(client, values)}
                    sendPassResetLink={sendPassResetLink}
                    openLoginModal={() => openLoginModal(client)}
                    openRegistrationModal={() => openRegistrationModal(client)}
                    openForgotPassModal={() => openForgotPassModal(client)}
                    closeModal={() => closeModal(client)}
                    onLandingPage={onLandingPage}
                    onOnboardingPage={onOnboardingPage}
                />
            );
        }}
    </Query>
);

export default HeaderContainer;

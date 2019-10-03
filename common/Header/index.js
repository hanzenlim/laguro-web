import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import _flowRight from 'lodash/flowRight';
import _get from 'lodash/get';
import { Router, withRouter } from 'next/router';

import { AppContext } from '../../appContext';
import HeaderView from './view';
import { withScreenSizes } from '~/components/Responsive';
import { onLogout, getUser } from '~/util/authUtils';

class HeaderContainer extends PureComponent {
    constructor(props) {
        super(props);

        const { router } = this.props;

        this.state = {
            isSubmitting: false,
            pathname: router.asPath,
        };

        Router.events.on('routeChangeStart', url => {
            this.setState({
                pathname: url,
            });
        });
    }

    onLogout = () => {
        onLogout();

        // We're forcing it to rerender so that it will update the header to
        // the logout state.
        this.forceUpdate();
    };

    render() {
        const { isSubmitting, pathname } = this.state;
        const {
            isLoginModalOpen,
            customRedirect,
            sideEffect,
            mode,
            closeLoginModal,
            toggleLoginModal,
        } = this.props;

        if (this.props.router.pathname.includes('kiosk')) {
            return null;
        }

        return (
            <AppContext.Consumer>
                {({ mounted }) => {
                    const user = mounted && getUser();
                    return (
                        <HeaderView
                            auth={user}
                            isSubmitting={isSubmitting}
                            isDentist={_get(user, 'isDentist')}
                            isHost={_get(user, 'isHost')}
                            hasUpdatedDentistBio={
                                !!_get(user, 'hasUpdatedDentistBio')
                            }
                            onLogout={this.onLogout}
                            toggleLoginModal={toggleLoginModal}
                            closeLoginModal={closeLoginModal}
                            isLoginModalOpen={isLoginModalOpen}
                            pathname={pathname}
                            customRedirect={customRedirect}
                            sideEffect={sideEffect}
                            mode={mode}
                        />
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

HeaderContainer.propTypes = {
    // mobileOnly: PropTypes.bool.isRequired,
};

export default _flowRight(withRouter, withScreenSizes)(HeaderContainer);

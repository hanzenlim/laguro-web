import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import HeaderView from './view';
import { withScreenSizes } from '../../../components/Responsive';
import { onLogout, getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { AuthContext } from '../../../App';

class HeaderContainer extends PureComponent {
    constructor(props) {
        super(props);

        const { history } = this.props;

        this.state = {
            isSubmitting: false,
            pathname: window.location.pathname + window.location.search,
            isLoginModalOpen: false,
            customRedirect: history.location.pathname,
            sideEffect: () => {},
            mode: 'signIn',
        };

        history.listen(location => {
            this.setState({
                pathname: location.pathname + location.search,
            });
        });

        emitter.on('loginModal', args => {
            const redirectPath = _get(args, 'redirectPath');
            const sideEffect = _get(args, 'sideEffect');
            const mode = _get(args, 'mode', 'signIn');

            const { mobileOnly } = this.props;
            if (mobileOnly) {
                history.push(`/login?redirectTo=${this.state.pathname}`, {
                    mode,
                });
                window.scrollTo(0, 0);
            } else {
                this.setState({
                    isLoginModalOpen: true,
                    customRedirect: redirectPath || history.location.pathname,
                    sideEffect,
                    mode,
                });
            }
        });

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = () => {
        const { setIsAuth } = this.props;
        setIsAuth(false);
        onLogout();

        // We're forcing it to rerender so that it will update the header to
        // the logout state.
        this.forceUpdate();
    };

    closeLoginModal = () => {
        this.setState({
            isLoginModalOpen: false,
            mode: 'signIn',
        });
    };

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
            mode: 'signIn',
        });
    };

    render() {
        const user = getUser();

        const {
            mode,
            isSubmitting,
            isLoginModalOpen,
            pathname,
            customRedirect,
            sideEffect,
        } = this.state;

        return (
            <HeaderView
                auth={user}
                isSubmitting={isSubmitting}
                isDentist={_get(user, 'isDentist')}
                isHost={_get(user, 'isHost')}
                hasUpdatedDentistBio={!!_get(user, 'hasUpdatedDentistBio')}
                onLogout={this.onLogout}
                toggleLoginModal={this.toggleLoginModal}
                closeLoginModal={this.closeLoginModal}
                isLoginModalOpen={isLoginModalOpen}
                pathname={pathname}
                customRedirect={customRedirect}
                sideEffect={sideEffect}
                mode={mode}
            />
        );
    }
}

const withAuthContext = Component => props => {
    const { setIsAuth } = useContext(AuthContext);

    return <Component setIsAuth={setIsAuth} {...props} />;
};

HeaderContainer.propTypes = {
    mobileOnly: PropTypes.bool.isRequired,
};

export default compose(
    withRouter,
    withScreenSizes,
    withAuthContext
)(HeaderContainer);

import React, { PureComponent } from 'react';
import _get from 'lodash/get';

import HeaderView from './view';
import { withScreenSizes } from '../../../components/Responsive';
import { onLogout, getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import history from '../../../history';

class HeaderContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            pathname: window.location.pathname + window.location.search,
            isLoginModalOpen: false,
        };

        history.listen(location => {
            this.setState({
                pathname: location.pathname + location.search,
            });
        });

        emitter.on('loginModal', () => {
            const { mobileOnly } = this.props;
            if (mobileOnly) {
                history.push(`/login?redirectTo=${this.state.pathname}`);
                window.scrollTo(0, 0);
            } else {
                this.setState({
                    isLoginModalOpen: true,
                });
            }
        });

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    };

    onLogout = () => {
        onLogout();

        // We're forcing it to rerender so that it will update the header to
        // the logout state.
        this.forceUpdate();
    };

    render() {
        const user = getUser();
        return (
            <HeaderView
                auth={user}
                isSubmitting={this.state.isSubmitting}
                isDentist={_get(user, 'isDentist')}
                isHost={_get(user, 'isHost')}
                hasUpdatedDentistBio={_get(user, 'hasUpdatedDentistBio')}
                onLogout={this.onLogout}
                toggleLoginModal={this.toggleLoginModal}
                isLoginModalOpen={this.state.isLoginModalOpen}
                pathname={this.state.pathname}
            />
        );
    }
}

export default withScreenSizes(HeaderContainer);

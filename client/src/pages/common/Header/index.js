import React, { PureComponent } from 'react';
import _get from 'lodash/get';

import HeaderView from './view';
import { onLogout, getUser } from '../../../util/authUtils';
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
            debugger;
            this.setState({
                pathname: location.pathname + location.search,
            });
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
                onLogout={this.onLogout}
                toggleLoginModal={this.toggleLoginModal}
                isLoginModalOpen={this.state.isLoginModalOpen}
                pathname={this.state.pathname}
            />
        );
    }
}

export default HeaderContainer;

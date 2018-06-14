import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Flex } from './common';

import GoogleLoginButton from './images/google-login-button.png';

class LoginModal extends Component {
    render() {
        const { open } = this.props;

        if (!open) return null;

        return (
            <Modal closable open={open} onClose={this.props.onClose}>
                <Flex justifyContent="center">
                    <a href="/auth/google">
                        <img
                            alt="google login button"
                            width="300"
                            height="70"
                            src={GoogleLoginButton}
                        />
                    </a>
                </Flex>
            </Modal>
        );
    }
}

LoginModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default LoginModal;

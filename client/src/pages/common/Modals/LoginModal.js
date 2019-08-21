import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../../components';
import Login from '../Login';

const LoginModal = ({
    isLoginModalOpen,
    toggleLoginModal,
    closeLoginModal,
    message,
    customRedirect,
    sideEffect,
    mode,
}) => {
    const login = (
        <Login
            closeModal={toggleLoginModal}
            message={message}
            customRedirect={customRedirect}
            sideEffect={sideEffect}
            mode={mode}
        />
    );

    return (
        <Modal
            onCancel={closeLoginModal}
            destroyOnClose
            visible={isLoginModalOpen}
            width={600}
            bodyStyle={{ height: 600, padding: 0 }}
        >
            {login}
        </Modal>
    );
};

LoginModal.propTypes = {
    isLoginModalOpen: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
    customRedirect: PropTypes.string.isRequired,
    sideEffect: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

export default LoginModal;

import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../../components';
import Login from '../Login';

const LoginModal = ({
    isLoginModalOpen,
    toggleLoginModal,
    message,
    customRedirect,
}) => (
    <Modal
        onCancel={toggleLoginModal}
        destroyOnClose={true}
        visible={isLoginModalOpen}
        width={600}
        bodyStyle={{ height: 600, padding: 0 }}
    >
        <Login
            closeModal={toggleLoginModal}
            message={message}
            customRedirect={customRedirect}
        />
    </Modal>
);

LoginModal.defaultProps = {
    login: () => {},
    closeModal: () => {},
    visible: false,
    message: '',
    closable: true,
    isSubmitting: false,
};

LoginModal.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
    message: PropTypes.string,
    closable: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default LoginModal;

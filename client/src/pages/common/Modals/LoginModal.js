import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../../components';
import Login from '../Login';

const LoginModal = ({
    login,
    visible,
    openRegistrationModal,
    openForgotPassModal,
    closeModal,
    message,
    location,
    closable,
    isSubmitting,
}) => (
    <Modal
        onCancel={closeModal}
        destroyOnClose={true}
        visible={visible}
        width={600}
        bodyStyle={{ height: 600, padding: 0 }}
        closable={closable}
    >
        <Login
            login={login}
            openRegistrationModal={openRegistrationModal}
            openForgotPassModal={openForgotPassModal}
            message={message}
            location={location}
            isSubmitting={isSubmitting}
            closeModal={closeModal}
        />
    </Modal>
);

LoginModal.defaultProps = {
    login: () => {},
    closeModal: () => {},
    openRegistrationModal: () => {},
    visible: false,
    message: '',
    closable: true,
    isSubmitting: false,
};

LoginModal.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    visible: PropTypes.bool,
    message: PropTypes.string,
    closable: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default LoginModal;

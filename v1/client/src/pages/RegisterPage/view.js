import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../components';
import Register from '../common/Register';

const RegisterPageView = ({
    onLogin,
    openRegistrationModal,
    openForgotPassModal,
    message,
    isSubmitting,
    signup,
}) => (
    <Box>
        <Register
            login={onLogin}
            openRegistrationModal={openRegistrationModal}
            openForgotPassModal={openForgotPassModal}
            message={message}
            signup={signup}
            isSubmitting={isSubmitting}
        />
    </Box>
);

RegisterPageView.defaultProps = {
    login: () => {},
    closeModal: () => {},
    openRegistrationModal: () => {},
    visible: false,
};

RegisterPageView.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default RegisterPageView;

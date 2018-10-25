import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../components';
import ForgotPassword from '../common/ForgotPassword';

const ForgotPasswordPageView = ({
    onLogin,
    openRegistrationModal,
    openForgotPassModal,
    message,
    isSubmitting,
    location,
    sendPassResetLink,
}) => (
    <Box>
        <ForgotPassword
            location={location}
            login={onLogin}
            openRegistrationModal={openRegistrationModal}
            openForgotPassModal={openForgotPassModal}
            message={message}
            isSubmitting={isSubmitting}
            sendPassResetLink={sendPassResetLink}
        />
    </Box>
);

ForgotPasswordPageView.defaultProps = {
    login: () => {},
    closeModal: () => {},
    openRegistrationModal: () => {},
    visible: false,
};

ForgotPasswordPageView.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default ForgotPasswordPageView;

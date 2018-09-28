import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../components';
import LoginModal from '../common/Modals/LoginModal';
import RegistrationModal from '../common/Modals/RegistrationModal';
import ForgotPassModal from '../common/Modals/ForgotPassModal';

const LoginPageView = ({
    onLogin,
    openRegistrationModal,
    openForgotPassModal,
    closeModal,
    closable,
    openLoginModal,
    signup,
    visibleModal,
    sendPassResetLink,
    message,
}) => (
    <Box>
        <LoginModal
            login={onLogin}
            openRegistrationModal={openRegistrationModal}
            openForgotPassModal={openForgotPassModal}
            closeModal={closeModal}
            closable={closable}
            visible={visibleModal === 'login'}
            message={message}
        />
        <RegistrationModal
            signup={signup}
            openLoginModal={openLoginModal}
            closeModal={closeModal}
            visible={visibleModal === 'register'}
        />
        <ForgotPassModal
            sendPassResetLink={sendPassResetLink}
            openLoginModal={openLoginModal}
            closeModal={closeModal}
            visible={visibleModal === 'forgotPass'}
        />
    </Box>
);

LoginPageView.defaultProps = {
    login: () => {},
    closeModal: () => {},
    openRegistrationModal: () => {},
    visible: false,
};

LoginPageView.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    openRegistrationModal: PropTypes.func,
    visible: PropTypes.bool,
};

export default LoginPageView;

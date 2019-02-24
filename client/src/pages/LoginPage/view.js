import React from 'react';
import PropTypes from 'prop-types';
import { Box, Responsive } from '../../components';
import LoginModal from '../common/Modals/LoginModal';
import ForgotPassModal from '../common/Modals/ForgotPassModal';
import Login from '../common/Login';

const { Mobile, TabletDesktop } = Responsive;

const LoginPageView = ({
    onLogin,
    closeModal,
    closable,
    openLoginModal,
    visibleModal,
    sendPassResetLink,
    message,
    isSubmitting,
}) => (
    <Box>
        <Mobile>
            <Login
                login={onLogin}
                message={message}
                isSubmitting={isSubmitting}
            />
        </Mobile>
        <TabletDesktop>
            <LoginModal
                login={onLogin}
                closeModal={closeModal}
                closable={closable}
                visible={visibleModal === 'login'}
                message={message}
                isSubmitting={isSubmitting}
            />
        </TabletDesktop>
        <ForgotPassModal
            sendPassResetLink={sendPassResetLink}
            openLoginModal={openLoginModal}
            closeModal={closeModal}
            visible={visibleModal === 'forgotPass'}
            isSubmitting={isSubmitting}
        />
    </Box>
);

LoginPageView.defaultProps = {
    login: () => {},
    closeModal: () => {},
    visible: false,
};

LoginPageView.propTypes = {
    login: PropTypes.func,
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default LoginPageView;

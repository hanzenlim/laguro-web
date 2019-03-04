import React from 'react';
import PropTypes from 'prop-types';
import { Box, Responsive } from '../../components';
import LoginModal from '../common/Modals/LoginModal';
import Login from '../common/Login';

const { Mobile, TabletDesktop } = Responsive;

const LoginPageView = ({
    onLogin,
    closeModal,
    closable,
    visibleModal,
    message,
    isSubmitting,
}) => (
    <Box>
        <Mobile>
            <Login
                closeModal={closeModal}
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

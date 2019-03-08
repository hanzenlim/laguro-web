import React from 'react';
import PropTypes from 'prop-types';
import { Box, Responsive } from '../../components';
import LoginModal from '../common/Modals/LoginModal';
import Login from '../common/Login';

const { Mobile, TabletDesktop } = Responsive;

const LoginPageView = ({ isLoginModalOpen, toggleLoginModal, message }) => (
    <Box>
        <Mobile>
            <Login closeModal={toggleLoginModal} message={message} />
        </Mobile>
        <TabletDesktop>
            <LoginModal
                isLoginModalOpen={isLoginModalOpen}
                toggleLoginModal={toggleLoginModal}
                message={message}
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

import React from 'react';

import { Box, Responsive } from '../../components';
import LoginModal from '../common/Modals/LoginModal';
import Login from '../common/Login';

const { Mobile, TabletDesktop } = Responsive;

const LoginPageView = ({
    isLoginModalOpen,
    toggleLoginModal,
    message,
    mode,
}) => (
    <Box>
        <Mobile>
            <Login
                closeModal={toggleLoginModal}
                message={message}
                mode={mode}
            />
        </Mobile>
        <TabletDesktop>
            <LoginModal
                isLoginModalOpen={isLoginModalOpen}
                toggleLoginModal={toggleLoginModal}
                message={message}
                mode={mode}
            />
        </TabletDesktop>
    </Box>
);

export default LoginPageView;

import React from 'react';
import { useRouter } from 'next/router';

import { Box, Responsive } from '~/components';
import LoginModal from '~/common/Modals/LoginModal';
import Login from '~/common/Login';
import { Flex, Image } from '~/components';

const { Mobile, TabletDesktop } = Responsive;

const LoginPageView = ({
    isLoginModalOpen,
    toggleLoginModal,
    message,
    mode,
}) => {
    const router = useRouter();
    return (
        <Box>
            <Mobile>
                <Login
                    closeModal={toggleLoginModal}
                    message={message}
                    mode={mode}
                />
            </Mobile>
            <TabletDesktop>
                <Flex
                    display={['none', 'flex', '']}
                    position="absolute"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                    zIndex="1"
                    style={{ overflow: 'hidden' }}
                >
                    <Image
                        height="100%"
                        src="/static/images/banner-bg.svg"
                        alt="homepage-background"
                        style={{ objectFit: 'cover' }}
                    />
                </Flex>
                <LoginModal
                    isLoginModalOpen={isLoginModalOpen}
                    toggleLoginModal={toggleLoginModal}
                    closeLoginModal={() => router.push('/')}
                    message={message}
                    mode={mode}
                />
            </TabletDesktop>
        </Box>
    );
};

export default LoginPageView;

import React, { useContext } from 'react';
import { Container, Box, Text, Button } from '~/components';
import { LoginContext } from '../../appContext';

const BottomCallToAction = () => {
    const { openLoginModal } = useContext(LoginContext);
    return (
        <Box
            background={[
                `url("/static/images/aboutUs_1024x323.png") no-repeat`,
                '',
                `url("/static/images/aboutUs_2560x631.png") no-repeat`,
            ]}
            backgroundSize={['cover', '', 'cover']}
            backgroundPosition={['center', '', 'center']}
            minHeight={[280, '', 642]}
            alignItems="center"
            display="flex"
        >
            <Container>
                <Box textAlign="center">
                    <Text
                        fontFamily="IowanOldStyle"
                        fontSize={[28, '', 50]}
                        fontWeight="bold"
                        color="text.white"
                        lineHeight={[1.43, '', 1.2]}
                        mb={[10, '', 16]}
                    >
                        Helping you smile anywhere.
                    </Text>
                    <Text
                        fontSize={[1, '', 4]}
                        color="text.white"
                        mb={[46, '', 56]}
                        mx="auto"
                        width={[292, '', 'auto']}
                    >
                        Are you ready to get started? Sign up today!
                    </Text>
                    <Button
                        type="ghost"
                        height={[50, '', 60]}
                        style={{ borderRadius: 30, overflow: 'hidden' }}
                        onClick={() => openLoginModal({ mode: 'getName' })}
                    >
                        <Text
                            bg="background.white"
                            color="text.blue"
                            width={[260, '', 308]}
                            lineHeight={['50px', '', '60px']}
                            fontWeight="medium"
                            fontSize={[1, '', 4]}
                        >
                            <Box
                                fontSize={[1, '', 4]}
                                display="inline"
                                fontWeight="medium"
                            >
                                Sign up{' '}
                            </Box>
                            <Box
                                fontSize={[1, '', 4]}
                                display="inline"
                                fontWeight="light"
                            >
                                — it&apos;s free!
                            </Box>
                        </Text>
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default BottomCallToAction;

import React from 'react';
import { Container, Box, Text, Button } from '../../components';

import bottomCtaBgDesktop from '../../images/aboutUs_2560x631.png';
import bottomCtaBgMobile from '../../images/aboutUs_1024x323.png';
import emitter from '../../util/emitter';

const BottomCallToAction = () => (
    <Box
        background={[
            `url(${bottomCtaBgMobile}) no-repeat`,
            '',
            `url(${bottomCtaBgDesktop}) no-repeat`,
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
                    onClick={() =>
                        emitter.emit('loginModal', { mode: 'getName' })
                    }
                >
                    <Text
                        bg="background.white"
                        color="text.blue"
                        width={[260, '', 308]}
                        lineHeight={['50px', '', '60px']}
                        fontWeight="medium"
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
                            — its free!
                        </Box>
                    </Text>
                </Button>
            </Box>
        </Container>
    </Box>
);

export default BottomCallToAction;

import React, { useContext } from 'react';
import { Flex, Box, Text, Button, Image } from '~/components';
import { LoginContext } from '../../appContext';

const SignUpBanner = () => {
    const { openLoginModal } = useContext(LoginContext);

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            height={[58, '', 72]}
            bg="#245197"
            px={5}
        >
            <Box alignSelf="flex-end" width={[78, '', 'auto']} mr={[4, '', 24]}>
                <Image
                    src="/static/images/signup-banner-image.svg"
                    alt="laguro signup"
                    width="100%"
                />
            </Box>
            <Text color="text.white" fontSize={[0, '', 4]} fontWeight="bold">
                {`Sign up to earn $100 dental credit. `}
                <Button
                    type="ghost"
                    height="auto"
                    onClick={() => openLoginModal({ mode: 'getName' })}
                >
                    <Text
                        color="text.white"
                        fontSize={[0, '', 4]}
                        fontWeight="bold"
                        style={{ textDecoration: 'underline' }}
                    >
                        Sign up
                    </Text>
                </Button>
            </Text>
        </Flex>
    );
};

export default SignUpBanner;

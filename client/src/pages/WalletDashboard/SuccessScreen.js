import React from 'react';

import { Box, Button, Image, Flex } from '../../components';
import WalletSuccessImg from '../../images/wallet-success.svg';

const SuccessScreen = ({ children, onDone }) => (
    <Flex
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
    >
        <Image src={WalletSuccessImg} alt="Success" maxWidth="100%" />
        <Box>{children}</Box>
        <Button
            fontSize={2}
            width="100%"
            style={{ borderRadius: 25 }}
            onClick={onDone}
        >
            Done
        </Button>
    </Flex>
);

export default SuccessScreen;

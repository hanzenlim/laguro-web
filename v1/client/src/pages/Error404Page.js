import React from 'react';

import { Flex, Link, Button, Text, Image, Box } from '../components';

import spaceship from '../images/spaceship.svg';

const Error404Page = () => (
    <Flex
        width="100%"
        minHeight="100vh"
        bg="#2f2c4e"
        alignItems="center"
        justifyContent="center"
    >
        <Box p={15} textAlign="center">
            <Image src={spaceship} alt="error-404" mb={40} />
            <Link to="/" type="ghost">
                <Button width={300} height="60px">
                    <Text fontSize={4} fontWeight="bold" color="text.white">
                        Go to Homepage
                    </Text>
                </Button>
            </Link>
        </Box>
    </Flex>
);

export default Error404Page;

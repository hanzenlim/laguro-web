import React from 'react';

import { Flex, Link, Button, Text, Image, Box } from '~/components';

const Error404Page = () => (
    <Flex
        width="100%"
        minHeight="100vh"
        bg="#2f3449"
        alignItems="center"
        justifyContent="center"
    >
        <Box p={15} textAlign="center">
            <Image src="/static/images/spaceship.svg" alt="error-404" mb={16} />
            <Text
                fontSize={70}
                color="text.white"
                mb={36}
                letterSpacing="-1.6px"
            >
                page not found :o
            </Text>
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

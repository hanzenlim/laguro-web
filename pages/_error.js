import React, { Fragment } from 'react';

import { Flex, Link, Button, Text, Image, Box } from '../components';

const Error404 = () => (
    <Flex
        width="100%"
        minHeight="100vh"
        bg="#2f3449"
        alignItems="center"
        justifyContent="center"
    >
        <Box p={15} textAlign="center">
            <Image
                src="/static/images/spaceship.svg"
                alt="error-404"
                mb={16}
                maxWidth="100%"
            />
            <Text
                fontSize={[30, '', 70]}
                color="text.white"
                mb={36}
                letterSpacing="-1.6px"
            >
                page not found :o
            </Text>
            <Link to="/" type="ghost">
                <Button width={300} height="60px">
                    <Text
                        fontSize={[2, '', 4]}
                        fontWeight="bold"
                        color="text.white"
                    >
                        Go to Homepage
                    </Text>
                </Button>
            </Link>
        </Box>
    </Flex>
);

const Error500 = () => (
    <Flex
        width="100%"
        minHeight="100vh"
        bg="#313647"
        alignItems="center"
        justifyContent="center"
    >
        <Box px={15} py={80} textAlign="center">
            <Text fontSize={[5, '', 6]} fontWeight="bold" color="text.white">
                Oops...
            </Text>
            <Text fontSize={[5, '', 6]} color="text.white" mb={20}>
                I think something went wrong!{' '}
                <Text is="span" fontWeight="bold" color="text.white">
                    Sorry.
                </Text>
            </Text>
            <Image
                src="/static/images/girlwithlaptop.svg"
                alt="general-error"
                mx="auto"
                maxWidth="100%"
            />
        </Box>
    </Flex>
);

const Error = ({ statusCode }) => (
    <Fragment>
        {statusCode === 404 && <Error404 />}
        {statusCode === 500 && <Error500 />}
    </Fragment>
);

const getStatusCode = (res, err) => {
    if (res) return res.statusCode;
    else if (err) return err.statusCode;
    return null;
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = getStatusCode(res, err);
    return { statusCode };
};

export default Error;

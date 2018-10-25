import React from 'react';
import { Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import {
    Button,
    Box,
    Container,
    Flex,
    Text,
    Link,
    Responsive,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import LocalLoginForm from '../Forms/LocalLoginForm';

const { Mobile, TabletDesktop } = Responsive;

const Login = ({
    login,
    openRegistrationModal,
    openForgotPassModal,
    message,
    location,
    isSubmitting,
}) => {
    const loginWithGoogle = (
        <Button
            bg="button.googleBlue"
            height="50px"
            borderRadius="7px"
            type="default"
            block
            icon="google"
            fontSize={1}
            onClick={() => {
                window.location.href = '/auth/google';
            }}
        >
            Login with Google
        </Button>
    );

    const search = _get(location, 'search');

    return (
        <Box>
            <TabletDesktop>
                <Flex
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="center"
                    px={15}
                >
                    {message && <Alert message={message} type="info" />}
                    <Text fontWeight="bold" fontSize={5}>
                        log in
                    </Text>
                    <Flex width={1} my={30} justifyContent="space-around">
                        <Flex
                            width={210}
                            flexDirection="column"
                            justifyContent="center"
                        >
                            {loginWithGoogle}
                        </Flex>
                        <Flex
                            border={'1px solid'}
                            borderColor="divider.gray"
                            width={0}
                            flexDirection="column"
                            justifyContent="center"
                            mx={60}
                        >
                            <Flex
                                border={'1px solid'}
                                borderColor="divider.gray"
                                borderRadius={25}
                                height={50}
                                width={50}
                                ml={-25}
                                bg="background.white"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontWeight="bold">or</Text>
                            </Flex>
                        </Flex>
                        <Box width={210}>
                            <LocalLoginForm
                                onSuccess={login}
                                isSubmitting={isSubmitting}
                            />
                        </Box>
                    </Flex>
                    <Flex>
                        <Link
                            to={{ hash: '#', search: _get(location, 'search') }}
                            onClick={openRegistrationModal}
                            width={140}
                        >
                            <Text
                                color="text.blue"
                                textAlign="right"
                                fontWeight="bold"
                            >
                                register now
                            </Text>
                        </Link>
                        <Text color="text.black">&nbsp;|&nbsp;</Text>
                        <Link
                            to={{ hash: '#', search: _get(location, 'search') }}
                            onClick={openForgotPassModal}
                            width={140}
                        >
                            <Text color="text.black" fontWeight="bold">
                                forgot password?
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
            </TabletDesktop>
            <Mobile>
                <Container>
                    <Flex
                        flexDirection="column"
                        justifyContent="space-around"
                        alignItems="center"
                        position="relative"
                        px={15}
                        pt={68}
                        pb={42}
                    >
                        {message && (
                            <Box
                                width={['100%', '', 'auto']}
                                position={['absolute', '', 'auto']}
                                top={6}
                                left={0}
                            >
                                <Alert message={message} type="info" />
                            </Box>
                        )}
                        <Text pb={70} fontWeight="bold" fontSize={4}>
                            log in
                        </Text>
                        <Box width={232} mb={34}>
                            <LocalLoginForm
                                onSuccess={login}
                                isSubmitting={isSubmitting}
                            />
                        </Box>
                        <Flex justifyContent="center">
                            <Link to={`/register${search}`}>
                                <Text color="text.blue" fontSize={1}>
                                    REGISTER NOW
                                </Text>
                            </Link>
                        </Flex>
                        <Flex justifyContent="center" mb={36}>
                            <Link
                                to={`/forgot-password${search}`}
                                onClick={openForgotPassModal}
                            >
                                <Text color="text.black" fontSize={0}>
                                    forgot password?
                                </Text>
                            </Link>
                        </Flex>
                        <Flex
                            width={232}
                            flexDirection="column"
                            justifyContent="center"
                        >
                            {loginWithGoogle}
                        </Flex>
                    </Flex>
                </Container>
            </Mobile>
        </Box>
    );
};
export default withScreenSizes(withRouter(Login));

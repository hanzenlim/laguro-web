import React from 'react';
import { Alert } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import _get from 'lodash/get';

import { Box, Flex, Responsive, Image, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import loginModalImage from '../../../images/loginmodal.png';
import StandaloneLoginView from './view';

const { TabletDesktop } = Responsive;

const Login = ({
    message,
    location,
    openForgotPassModal,
    closeModal,
    openRegistrationModal,
    history,
}) => {
    return (
        <Box height="100%">
            <TabletDesktop>
                <Flex flexDirection="row" height="100%">
                    {message && <Alert message={message} type="info" />}
                    <Box flex={1} borderRadius={4}>
                        <Image
                            src={loginModalImage}
                            alt="Laguro login"
                            width={443}
                            height={664}
                            borderRadius={4}
                        />
                    </Box>
                    <Flex flex={1} p={20} mt={34} flexDirection="column">
                        <Box width="100%" flex={9}>
                            <StandaloneLoginView
                                closeModal={closeModal}
                                push={history.push}
                            />
                        </Box>
                        <Flex
                            textAlign="center"
                            justifyContent="center"
                            mb={20}
                            flex={1}
                        >
                            <Link
                                to={{
                                    hash: '#',
                                    search: _get(location, 'search'),
                                }}
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
                                to={{
                                    hash: '#',
                                    search: _get(location, 'search'),
                                }}
                                onClick={openForgotPassModal}
                            >
                                <Text color="text.black" fontWeight="bold">
                                    forgot password?
                                </Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </TabletDesktop>
        </Box>
    );
};
export default withScreenSizes(withRouter(Login));

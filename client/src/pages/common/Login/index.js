import React, { Component } from 'react';
import { Alert } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import _get from 'lodash/get';
import styled from 'styled-components';

import { Box, Flex, Responsive, Image, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import loginModalImage from '../../../images/loginmodal.png';
import StandaloneLoginView from './view';

const { TabletDesktop } = Responsive;

const StyledFlex = styled(Flex)`
    && {
        width: 100%;
    }

    && form {
        width: 100%;
    }
`;

class Login extends Component {
    state = { showLoginTitle: true };

    toggleLoginTitle = () => {
        this.setState(state => ({
            showLoginTitle: !state.showLoginTitle,
        }));
    };

    render() {
        const { message, location, closeModal, history } = this.props;
        const { showLoginTitle } = this.state;

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
                        <Flex flex={1} p={20} flexDirection="column">
                            <StyledFlex
                                flex={9}
                                alignItems="center"
                                justifyContent="center"
                                px={10}
                            >
                                <StandaloneLoginView
                                    closeModal={closeModal}
                                    push={history.push}
                                    title={
                                        showLoginTitle
                                            ? 'Please sign in'
                                            : 'Sign up here'
                                    }
                                    authAction={
                                        showLoginTitle ? 'sign in' : 'sign up'
                                    }
                                />
                            </StyledFlex>
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
                                    onClick={this.toggleLoginTitle}
                                    width={140}
                                >
                                    <Text color="text.blue" textAlign="right">
                                        Register now
                                    </Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                </TabletDesktop>
            </Box>
        );
    }
}
export default withScreenSizes(withRouter(Login));

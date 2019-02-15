import React, { Component } from 'react';
import { Alert } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import _get from 'lodash/get';
import styled from 'styled-components';

import { Flex, Responsive, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import StandaloneLoginView from './view';

const { TabletDesktop, Mobile } = Responsive;

const StyledFlex = styled(Flex)`
    && {
        width: 100%;
    }

    && form {
        width: 100%;
    }
`;

class Login extends Component {
    constructor(props) {
        super(props);

        this.pinInputRef = null;
    }
    state = { showLoginTitle: true };

    toggleLoginTitle = () => {
        this.setState(state => ({
            showLoginTitle: !state.showLoginTitle,
        }));
    };

    setReference = node => {
        this.pinInputRef = node;
    };

    clear = () => {
        this.pinInputRef.clear();
    };

    render() {
        const { message, location, closeModal, history } = this.props;
        const { showLoginTitle } = this.state;

        return (
            <Flex justifyContent="center" height="100%">
                <TabletDesktop>
                    {message && <Alert message={message} type="info" />}
                    <Flex
                        p={20}
                        flexDirection="column"
                        height="100%"
                        width={440}
                    >
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
                                setReference={this.setReference}
                                clear={this.clear}
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
                </TabletDesktop>
                <Mobile>
                    {message && <Alert message={message} type="info" />}
                    <Flex
                        p={20}
                        flexDirection="column"
                        height="100%"
                        width={440}
                    >
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
                                setReference={this.setReference}
                                clear={this.clear}
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
                </Mobile>
            </Flex>
        );
    }
}
export default withScreenSizes(withRouter(Login));

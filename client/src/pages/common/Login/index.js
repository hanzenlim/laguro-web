import React, { Component, Fragment } from 'react';
import { message as warningMessage } from 'antd';
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

        this.state = { showLoginTitle: true };
        this.pinInputRef = null;
    }

    componentDidMount() {
        const { message } = this.props;
        if (message) {
            warningMessage.warning(message, 5);
        }
    }

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
        const { location, closeModal, history } = this.props;
        const { showLoginTitle } = this.state;

        return (
            <Fragment>
                <Flex justifyContent="center" height="100%">
                    <TabletDesktop>
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
            </Fragment>
        );
    }
}
export default withScreenSizes(withRouter(Login));

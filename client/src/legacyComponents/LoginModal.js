import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal, Flex, Box, Divider, Typography } from './common';
import ConnectedSignup from './forms/Signup';
import ConnectedLogin from './forms/Login';
import ConnectedForgotPassword from './forms/ForgotPassword';
import { fetchUser } from '../actions';

const LOGIN_VIEW = 'login';
const SIGNUP_VIEW = 'signup';
const FORGOT_PASSWORD_VIEW = 'forgotPassword';

const StyledLink = styled.a`
    // HACK
    cursor: pointer;
`;

class LoginModal extends Component {
    constructor() {
        super();

        this.state = {
            activeView: LOGIN_VIEW,
        };
    }

    setActiveView = e => {
        const { view } = e.target.dataset;

        this.setState({ activeView: view });
    };

    handleSuccess = async () => {
        await this.props.fetchUser();
        this.props.closeModal();
    };

    render() {
        const { open } = this.props;
        const { activeView } = this.state;

        if (!open) return null;

        return (
            <Modal closable open={open} closeModal={this.props.closeModal}>
                <Flex justifyContent="center" flexDirection="column">
                    {activeView === LOGIN_VIEW && (
                        <ConnectedLogin
                            onSuccess={this.handleSuccess}
                            onForgotPasswordClick={this.setActiveView}
                        />
                    )}

                    {activeView === SIGNUP_VIEW && (
                        <ConnectedSignup onSuccess={this.handleSuccess} />
                    )}

                    {activeView === FORGOT_PASSWORD_VIEW && (
                        <ConnectedForgotPassword
                            toggleForgotPassword={
                                this.handleToggleForgotPassword
                            }
                            onSuccess={this.handleSuccess}
                        />
                    )}

                    <Box py={4}>
                        <Divider />
                    </Box>

                    <Flex justifyContent="center">
                        {activeView === LOGIN_VIEW && (
                            <Typography>
                                Don’t have a Laguro account?{' '}
                                <StyledLink
                                    data-view={SIGNUP_VIEW}
                                    onClick={this.setActiveView}
                                >
                                    Create an Account
                                </StyledLink>
                            </Typography>
                        )}

                        {activeView === SIGNUP_VIEW && (
                            <Typography>
                                Already have a Laguro account?{' '}
                                <StyledLink
                                    data-view={LOGIN_VIEW}
                                    onClick={this.setActiveView}
                                >
                                    Sign In
                                </StyledLink>
                            </Typography>
                        )}

                        {activeView === FORGOT_PASSWORD_VIEW && (
                            <Typography>
                                Have an account?{' '}
                                <StyledLink
                                    data-view={LOGIN_VIEW}
                                    onClick={this.setActiveView}
                                >
                                    Login
                                </StyledLink>
                            </Typography>
                        )}
                    </Flex>
                </Flex>
            </Modal>
        );
    }
}

LoginModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default LoginModal;
// export default connect(null, { fetchUser })(LoginModal);

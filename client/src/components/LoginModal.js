import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal, Flex, Box, Divider, Typography } from './common';
import ConnectedSignup from './forms/Signup';
import ConnectedLogin from './forms/Login';
import * as actions from '../actions';

const LOGIN_VIEW = 'login';
const SIGNUP_VIEW = 'signup';

const StyledLink = styled.a`
    // HACK
    cursor: pointer;
`;

class LoginModal extends Component {
    constructor() {
        super();

        this.state = {
            view: LOGIN_VIEW,
        };
    }

    toggleView = () => {
        this.setState({
            view: this.state.view === LOGIN_VIEW ? SIGNUP_VIEW : LOGIN_VIEW,
        });
    };

    handleSuccess = async () => {
        await this.props.fetchUser();
        this.props.onClose();
    };

    render() {
        const { open } = this.props;

        if (!open) return null;

        return (
            <Modal closable open={open} onClose={this.props.onClose}>
                <Flex justifyContent="center" flexDirection="column">
                    <Box>
                        {this.state.view === LOGIN_VIEW ? (
                            <ConnectedLogin
                                onToggleView={this.handleToggleView}
                                onSuccess={this.handleSuccess}
                            />
                        ) : (
                            <ConnectedSignup
                                onToggleView={this.handleToggleView}
                                onSuccess={this.handleSuccess}
                            />
                        )}
                    </Box>

                    <Box py={4}>
                        <Divider />
                    </Box>

                    <Flex justifyContent="center">
                        {this.state.view === LOGIN_VIEW ? (
                            <Typography>
                                Don’t have a Laguro account?{' '}
                                <StyledLink onClick={this.toggleView}>
                                    Create an Account
                                </StyledLink>
                            </Typography>
                        ) : (
                            <Typography>
                                Already have a Laguro account?{' '}
                                <StyledLink onClick={this.toggleView}>
                                    Sign In
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
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default connect(
    null,
    actions
)(LoginModal);

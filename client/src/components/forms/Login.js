import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import request from './../../util/fetchUtil';
import { renderField } from './sharedComponents';
import { required } from './formValidation';
import { Flex, Box, Button, Typography, Divider } from './../common';
import GoogleButton from '../GoogleButton';

const StyledLink = styled.a`
    // HACK
    cursor: pointer;
`;

class Login extends Component {
    constructor() {
        super();

        this.state = {
            error: '',
        };
    }

    onSubmit = async values => {
        try {
            const result = await this.login(values);
            if (result) {
                this.onLoginSuccess();
            }
        } catch (error) {
            if (error && error.message) {
                this.onLoginFail(error.message);
            }
        }
    };

    login = values => {
        return request('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Origin': '*',
            },
            body: JSON.stringify({ ...values }),
        });
    };

    onLoginSuccess = () => {
        this.props.onSuccess();
    };

    onLoginFail = error => {
        this.setState({
            error,
        });
    };

    render() {
        const { handleSubmit, onForgotPasswordClick } = this.props;

        return (
            <Flex flexDirection="column">
                <Box pb={3}>
                    <Typography fontSize={5}>Sign In</Typography>
                </Box>

                <Box pb={4}>
                    <Typography>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </Typography>
                </Box>

                <GoogleButton href="/auth/google" />

                <Box py={4}>
                    <Divider text="or" />
                </Box>

                <form
                    onSubmit={
                        handleSubmit && handleSubmit(this.onSubmit.bind(this))
                    }
                >
                    <Box pb={2}>
                        <Field
                            name="username"
                            label="Email Address"
                            type="email"
                            component={renderField}
                            validate={[required]}
                        />
                    </Box>
                    <Box pb={3}>
                        <Field
                            name="password"
                            label="Password"
                            type="password"
                            component={renderField}
                            validate={[required]}
                        />
                    </Box>

                    <Flex justifyContent="flex-end" pb={3}>
                        <StyledLink
                            onClick={onForgotPasswordClick}
                            data-view="forgotPassword"
                        >
                            Forgot Password?
                        </StyledLink>
                    </Flex>

                    <Typography pb={2}>{this.state.error}</Typography>

                    <Button color="secondary" type="submit" fullWidth>
                        <Typography fontSize={4}>Sign In</Typography>
                    </Button>
                </form>
            </Flex>
        );
    }
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { Login };

export default reduxForm({
    form: 'login',
})(Login);

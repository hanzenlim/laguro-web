import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import request from './../../util/fetchUtil';
import { renderField } from './sharedComponents';
import { required } from './formValidation';
import { Flex, Box, Button, Typography, Divider } from './../common';
import GoogleButton from '../GoogleButton';

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            error: '',
        };
    }

    onSubmit = values => {
        request('/api/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Origin': '*',
            },
            body: JSON.stringify({ ...values }),
        })
            .then(() => {
                this.props.onSuccess();
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                });
            });
    };

    render() {
        const { handleSubmit } = this.props;

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

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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

                    <Typography pb={2}>{this.state.error}</Typography>

                    <Button color="secondary" type="submit" fullWidth>
                        <Typography fontSize={4}>Sign In</Typography>
                    </Button>
                </form>
            </Flex>
        );
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm);

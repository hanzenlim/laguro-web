import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import request from './../../util/fetchUtil';
import { renderField } from './sharedComponents';
import { required } from './formValidation';
import { Flex, Box, Button, Typography, Divider } from './../common';
import GoogleButton from '../GoogleButton';

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            error: ''
        };
    }

    onSubmit = async values => {
        try {
            const result = await this.signup(values);
            if (result) {
                this.onSignupSuccess();
            }
        } catch (error) {
            if (error && error.message) {
                this.onSignupFail(error.message);
            }
        }
    };

    signup = values => {
        return request('/api/signup', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Origin': '*'
            },
            body: JSON.stringify({ ...values })
        });
    };

    onSignupSuccess = () => {
        this.props.onSuccess();
    };

    onSignupFail = error => {
        this.setState({ error });
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <Flex flexDirection="column">
                <Box pb={3}>
                    <Typography fontSize={5}>Create Account</Typography>
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
                            name="firstName"
                            label="First Name"
                            component={renderField}
                            validate={[required]}
                        />
                    </Box>

                    <Box pb={2}>
                        <Field
                            name="lastName"
                            label="Last Name"
                            component={renderField}
                            validate={[required]}
                        />
                    </Box>
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
                        <Typography fontSize={4}>
                            Create Account with Email
                        </Typography>
                    </Button>
                </form>
            </Flex>
        );
    }
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { Signup };

export default reduxForm({
    form: 'signup'
})(Signup);

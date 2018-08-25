import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import request from './../../util/fetchUtil';
import { renderField } from './sharedComponents';
import { required } from './formValidation';
import { Flex, Box, Button, Typography } from './../common';

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            error: '',
        };
    }

    onSubmit = async values => {
        try {
            const result = await this.sendForgotPasswordEmail(values);
            if (result) {
                this.props.onSuccess();
            }
        } catch (error) {
            if (error && error.message) {
                this.setState({
                    error: error.message,
                });
            }
        }
    };

    sendForgotPasswordEmail = values => {
        return request('/api/forgot-password', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Origin': '*',
            },
            body: JSON.stringify({ ...values }),
        });
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <Flex flexDirection="column">
                <Box pb={10}>
                    <Typography fontSize={5}>Reset my password</Typography>
                </Box>

                <Box pb={4}>
                    <Typography>
                        Enter your email and a reset password link will be sent to you.
                    </Typography>
                </Box>

                <form
                    onSubmit={
                        handleSubmit && handleSubmit(this.onSubmit.bind(this))
                    }
                >
                    <Box pb={4}>
                        <Field
                            name="email"
                            label="Email Address"
                            type="email"
                            component={renderField}
                            validate={[required]}
                        />
                    </Box>

                    <Typography pb={2}>{this.state.error}</Typography>

                    <Button color="secondary" type="submit" fullWidth>
                        <Typography fontSize={4}>Reset Password</Typography>
                    </Button>
                </form>
            </Flex>
        );
    }
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { ForgotPassword };

export default reduxForm({
    form: 'forgotPassword',
})(ForgotPassword);

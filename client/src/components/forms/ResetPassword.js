import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
import styled from 'styled-components';
import request from './../../util/fetchUtil';
import { renderField } from './sharedComponents';
import { required } from './formValidation';
import { Flex, Box, Button, Typography } from './../common';
import history from '../../history';

const StyledContainer = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    margin-top: 150px;
`;

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        this.state = {
            message: '',
        };
    }

    onSubmit = async values => {
        if (values) {
            const { id, token } = this.urlParams;
            values.id = id;
            values.token = token;
        }

        try {
            const result = await this.useResetPasswordRequest(values);
            if (result && result.status && result.status === 'USED') {
                this.setState({ message: 'Your password has been changed. You can now log in with your new credentials.' });
            }
        } catch (error) {
            if (error && error.message) {
                this.setState({ message: error.message });
            }
        }
    };

    useResetPasswordRequest = values => {
        return request('/api/reset-password', {
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
            <StyledContainer>
                <Flex flexDirection="column">
                    <Box pb={10}>
                        <Typography fontSize={5}>Set your password</Typography>
                    </Box>

                    <form
                        onSubmit={
                            handleSubmit && handleSubmit(this.onSubmit.bind(this))
                        }
                    >
                        <Box pb={4}>
                            <Field
                                name="password"
                                label="Password"
                                type="password"
                                component={renderField}
                                validate={[required]}
                            />
                        </Box>

                        <Typography pb={2}>{this.state.message}</Typography>

                        <Button color="secondary" type="submit" fullWidth>
                            <Typography fontSize={4}>Submit</Typography>
                        </Button>
                    </form>
                </Flex>
            </StyledContainer>
        );
    }
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { ResetPassword };

export default reduxForm({
    form: 'resetPassword',
})(ResetPassword);

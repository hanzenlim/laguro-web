import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { renderField } from './sharedComponents';
import { required, confirmPassword } from './formValidation';
import { Flex, Box, Button, Typography } from './../common';
import User from '../../models/user';
import {
    INCORRECT_PASSWORD_ERROR,
    DEFAULT_ERROR_DISPLAY
} from '../../util/errors';

const StyledContainer = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    margin-top: 150px;
`;

class EditPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            error: ''
        };
    }

    onSubmit = async values => {
        const { auth } = this.props;
        const { currentPassword, newPassword } = values;
        try {
            const args = { userId: auth.id, currentPassword, newPassword };
            const result = await User.editPassword(args);
            if (result) {
                this.setState({
                    message:
                        'Your password has been changed. You can now log in with your new credentials.',
                    error: ''
                });
            }
        } catch (error) {
            let errorMessage = '';
            if (error.message === INCORRECT_PASSWORD_ERROR) {
                errorMessage = INCORRECT_PASSWORD_ERROR;
            } else {
                errorMessage = DEFAULT_ERROR_DISPLAY;
            }
            this.setState({ message: '', error: errorMessage });
        }
    };

    render() {
        const { handleSubmit, auth } = this.props;
        const { message, error } = this.state;

        if (!auth) {
            return <div />;
        }

        return (
            <StyledContainer>
                <Flex flexDirection="column">
                    <Box pb={10}>
                        <Typography fontSize={5}>
                            Update your password
                        </Typography>
                    </Box>

                    <form
                        onSubmit={
                            handleSubmit &&
                            handleSubmit(this.onSubmit.bind(this))
                        }
                    >
                        <Box pb={4}>
                            <Field
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                component={renderField}
                                validate={[required]}
                            />
                        </Box>

                        <Box pb={4}>
                            <Field
                                name="newPassword"
                                label="Password"
                                type="password"
                                component={renderField}
                                validate={[required]}
                            />
                        </Box>

                        <Box pb={4}>
                            <Field
                                name="confirmationPassword"
                                label="Confirm Password"
                                type="password"
                                component={renderField}
                                validate={[required, confirmPassword]}
                            />
                        </Box>

                        <Typography pb={2}>
                            {message}
                            <div className="red-text">{error}</div>
                        </Typography>

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
export { EditPassword };

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default reduxForm({
    form: 'editUser'
})(connect(mapStateToProps, null)(EditPassword));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { updateUserProfile } from '../../actions';
import { Button, Typography, Box, Modal } from '../common';
import { required } from './formValidation';
import {
    renderField,
    renderMaskedField,
    renderCheckbox
} from './sharedComponents';
import {
    maskPhoneNumber,
    formatPhoneNumber,
    isPhoneNumberInputValid,
    PHONE_NUMBER_MASK
} from '../../util/phoneNumberUtil';

class EditUser extends Component {
    async componentWillMount() {
        const { auth } = this.props;
        document.title = 'Laguro - Edit User Profile';

        this.props.initialize({
            firstName: auth && auth.firstName,
            lastName: auth && auth.lastName,
            phoneNumber: maskPhoneNumber(auth && auth.phoneNumber),
            notificationSettings: auth && auth.notificationSettings
        });
    }

    onSubmit = values => {
        const { phoneNumber, notificationSettings } = values;

        if (
            (phoneNumber && !isPhoneNumberInputValid(phoneNumber)) ||
            (!phoneNumber && notificationSettings.general.sms)
        ) {
            throw new SubmissionError({
                phoneNumber: 'Please add a valid phone number.'
            });
        }

        this.props.updateUserProfile(this.props.auth.id, {
            ...values,
            phoneNumber: formatPhoneNumber(phoneNumber)
        });

        this.props.onClose();
    };

    render() {
        const { handleSubmit, open, onClose } = this.props;
        return (
            <Modal closable open={open} onClose={onClose}>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Box pb={2}>
                        <Typography fontSize={5}>Edit Profile</Typography>
                    </Box>
                    <Box pb={2}>
                        <Field
                            name="firstName"
                            label="First Name"
                            placeholder=""
                            validate={required}
                            component={renderField}
                        />
                    </Box>
                    <Box pb={2}>
                        <Field
                            name="lastName"
                            label="Last Name"
                            placeholder=""
                            validate={required}
                            component={renderField}
                        />
                    </Box>
                    <Box pb={2}>
                        <Field
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="(555) 495-3947"
                            component={renderMaskedField}
                            mask={PHONE_NUMBER_MASK}
                            placeholderChar={'\u2000'}
                        />
                    </Box>
                    <div>
                        <Box pb={2}>
                            <h5>Notification Settings</h5>
                        </Box>
                        <Field
                            name="notificationSettings.general.email"
                            label="Email"
                            component={renderCheckbox}
                        />
                        <Box pb={4}>
                            <Field
                                name="notificationSettings.general.sms"
                                label="Text Message"
                                component={renderCheckbox}
                            />
                        </Box>
                    </div>
                    <Box>
                        <Button type="submit" color="primary">
                            <Typography fontSize={4} fontWeight="medium">
                                Save Changes
                            </Typography>
                        </Button>
                    </Box>
                </form>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default reduxForm({
    form: 'editUser'
})(connect(mapStateToProps, { updateUserProfile })(EditUser));

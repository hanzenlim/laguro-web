import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { updateUserProfile } from '../../actions';
import { Button, Typography, Box, Modal } from '../common';
import { required } from './formValidation';
import { renderMaskedField } from './sharedComponents';
import {
    formatPhoneNumber,
    isPhoneNumberInputValid,
    PHONE_NUMBER_MASK
} from '../../util/phoneNumberUtil';

const defaultSettings = { general: { email: true, sms: true } };

class AddPhoneNumber extends Component {
    onSubmit = values => {
        const { auth } = this.props;
        const { phoneNumber } = values;

        if (phoneNumber && !isPhoneNumberInputValid(phoneNumber)) {
            throw new SubmissionError({
                phoneNumber: 'Please add a valid phone number.'
            });
        }

        let { notificationSettings } = auth;
        if (!notificationSettings) {
            notificationSettings = defaultSettings;
        } else if (!notificationSettings.general) {
            notificationSettings.general = defaultSettings.general;
        } else {
            notificationSettings.general.sms = true;
        }

        this.props.updateUserProfile(this.props.auth.id, {
            phoneNumber: formatPhoneNumber(phoneNumber),
            notificationSettings
        });
        this.props.closeModal();
    };

    renderPurposeStatement() {
        const { type } = this.props;
        switch (type) {
        case 'appointment':
            return 'This is so Laguro can contact you about any updates to your appointment.';
        case 'listing':
            return 'This is so Laguro can let you know you about any new reservations made for your listing.';
        case 'reservation':
            return 'This is so Laguro can let you know about any new appointments booked for your reservation.';
        default:
            return 'This is so Laguro can contact you regarding this action.';
        }
    }

    render() {
        const { handleSubmit, closeModal, open } = this.props;

        return (
            <Modal closable open={open} closeModal={closeModal}>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Box pb={2}>
                        <Typography fontSize={5}>
                            Add your phone number
                        </Typography>
                    </Box>
                    <Box pb={2}>
                        <Typography>{this.renderPurposeStatement()}</Typography>
                    </Box>
                    <Box pb={4}>
                        <Field
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="(555) 495-3947"
                            validate={required}
                            component={renderMaskedField}
                            mask={PHONE_NUMBER_MASK}
                            placeholderChar={'\u2000'}
                        />
                    </Box>
                    <Box>
                        <Button type="submit" color="primary">
                            <Typography fontSize={4} fontWeight="medium">
                                Add Phone Number
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

export { AddPhoneNumber };
export default reduxForm({
    form: 'addPhoneNumber'
})(connect(mapStateToProps, { updateUserProfile })(AddPhoneNumber));

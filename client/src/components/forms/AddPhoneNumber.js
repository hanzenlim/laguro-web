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
    PHONE_NUMBER_MASK,
} from '../../util/phoneNumberUtil';

class AddPhoneNumber extends Component {
    onSubmit = values => {
        const { phoneNumber } = values;

        if (phoneNumber && !isPhoneNumberInputValid(phoneNumber)) {
            throw new SubmissionError({
                phoneNumber: 'Please add a valid phone number.',
            });
        }

        this.props.updateUserProfile(this.props.auth.id, {
            phoneNumber: formatPhoneNumber(phoneNumber),
        });

        this.props.onClose();
    };

    render() {
        const { handleSubmit, onClose, open } = this.props;

        return (
            <Modal closable open={open} onClose={onClose}>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Box pb={2}>
                        <Typography fontSize={5}>
                            Add your phone number
                        </Typography>
                    </Box>
                    <Box pb={2}>
                        <Typography>
                            This is so your dentist can contact you, and so
                            Laugro knows how to reach you.
                        </Typography>
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
        auth: state.auth,
    };
}

export default reduxForm({
    form: 'addPhoneNumber',
})(
    connect(
        mapStateToProps,
        { updateUserProfile }
    )(AddPhoneNumber)
);

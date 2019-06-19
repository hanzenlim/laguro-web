import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { SEND_REGISTRATION_CODE, REGISTER_USER } from '../queries';
import { Box } from '../../../components/index';
import { setUser, setAuthToken } from '../../../util/authUtils';
import { GET_PATIENT_NAME_WIZARD_STEP_ID } from '..';
import { execute } from '../../../util/gqlUtils';
import { validatePhoneOrEmail } from '../../../util/validationUtils';
import { trackUserSignup, trackUserAuth } from '../../../util/trackingUtils';
import { KioskRegister } from '../../common/KioskRegister';
import {
    REGISTRATION_STEPTWO_ALREADYHAVEACCOUNT,
    REGISTRATION_STEPTWO_PROVIDENAME,
} from '../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../util/intlUtils';

const Composed = adopt({
    sendRegistrationCode: ({ render }) => (
        <Mutation mutation={SEND_REGISTRATION_CODE}>{render}</Mutation>
    ),
    registerUser: ({ render }) => (
        <Mutation mutation={REGISTER_USER}>{render}</Mutation>
    ),
});

const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const getRegisterResult = data => {
    const user = _get(data, 'data.registerUser.user');
    const isPinValid = _get(data, 'data.registerUser.user.id');
    const token = _get(data, 'data.registerUser.authToken.body');

    return {
        user,
        isPinValid,
        token,
    };
};

// TODO: Move to common folder
class RegisterStep extends Component {
    render() {
        return (
            <Composed>
                {({ registerUser, sendRegistrationCode }) => {
                    const numberEmail =
                        this.props.formikProps.values.emailOrPhoneNumber ||
                        this.props.defaultNumberEmailValue;
                    const getValidatePinInput = passcode => {
                        const isEmail = validateEmail(numberEmail);

                        const getPatientNameWizardStepValues = _get(
                            this.props,
                            `values[${GET_PATIENT_NAME_WIZARD_STEP_ID}]`
                        );

                        const firstName = _get(
                            getPatientNameWizardStepValues,
                            'firstName'
                        );
                        const middleName = _get(
                            getPatientNameWizardStepValues,
                            'middleName'
                        );
                        const lastName = _get(
                            getPatientNameWizardStepValues,
                            'lastName'
                        );

                        if (_isEmpty(firstName) || _isEmpty(lastName)) {
                            message.error(
                                formatText(REGISTRATION_STEPTWO_PROVIDENAME)
                            );
                            return null;
                        }

                        return {
                            passcode,
                            firstName,
                            middleName,
                            lastName,
                            ...(isEmail
                                ? {
                                      email: numberEmail,
                                  }
                                : {
                                      phoneNumber: `+1${numberEmail}`,
                                  }),
                        };
                    };

                    const validatePin = async ({ input }) => {
                        try {
                            let registerUserResult;
                            const hasNoError = await execute({
                                action: async () => {
                                    registerUserResult = await registerUser({
                                        variables: {
                                            input,
                                        },
                                    });
                                },
                            });

                            if (!hasNoError) {
                                this.props.clear();
                                this.props.formikProps.setFieldValue(
                                    'code',
                                    ''
                                );
                                return;
                            }

                            const {
                                isPinValid,
                                token,
                                user,
                            } = getRegisterResult(registerUserResult);

                            if (!isPinValid) {
                                this.props.clear();
                                this.props.formikProps.setFieldValue(
                                    'code',
                                    ''
                                );
                                return;
                            }

                            trackUserSignup();
                            trackUserAuth({ userId: user.id });

                            this.props.formikProps.setFieldValue(
                                'isPinValid',
                                true
                            );

                            // used to distinguish between dentists and hosts. recently signed-up user will not be a dentist and therefore will not have a dentist bio
                            setUser({
                                ...user,
                                token,
                                hasUpdatedDentistBio: false,
                            });
                            setAuthToken(token);

                            if (this.props.closeModal) {
                                this.props.closeModal();
                            }

                            this.props.formikProps.submitForm();
                            this.props.formikProps.setSubmitting(false);
                        } catch (error) {
                            this.props.clear();
                            this.props.formikProps.setSubmitting(false);
                            message.error(error.graphQLErrors[0].message);
                        }
                    };

                    const formatText = getFormatTextFromProps(this.props);

                    return (
                        <Box maxWidth={431}>
                            <KioskRegister
                                {...this.props}
                                // eslint-disable-next-line
                                onRequestPinCode={async username => {
                                    this.props.formikProps.setFieldValue(
                                        'isCodeSent',
                                        false
                                    );
                                    const isEmailOrPhoneValid = validatePhoneOrEmail(
                                        username
                                    );

                                    if (!isEmailOrPhoneValid) {
                                        return null;
                                    }

                                    const isEmail = validateEmail(username);

                                    const input = {};

                                    if (isEmail) {
                                        input.email = username;
                                    } else {
                                        const phoneNumber = `+1${username}`;
                                        input.phoneNumber = phoneNumber;
                                    }

                                    this.props.formikProps.setSubmitting(true);

                                    try {
                                        let sendRegistrationCodeResult;

                                        const hasNoError = await execute({
                                            action: async () => {
                                                sendRegistrationCodeResult = await sendRegistrationCode(
                                                    {
                                                        variables: {
                                                            input,
                                                        },
                                                    }
                                                );
                                            },
                                            formatText,
                                        });

                                        if (!hasNoError) {
                                            this.props.formikProps.setSubmitting(
                                                false
                                            );
                                            return null;
                                        }

                                        const isCodeSent = _get(
                                            sendRegistrationCodeResult,
                                            'data.sendRegistrationCode'
                                        );

                                        if (isCodeSent) {
                                            this.props.formikProps.setFieldValue(
                                                'isCodeSent',
                                                true
                                            );
                                        } else {
                                            message.error(
                                                formatText(
                                                    REGISTRATION_STEPTWO_ALREADYHAVEACCOUNT
                                                )
                                            );
                                        }
                                    } catch (error) {
                                        this.props.formikProps.setSubmitting(
                                            false
                                        );
                                        message.error(
                                            error.graphQLErrors[0].message
                                        );
                                    }

                                    this.props.formikProps.setSubmitting(false);
                                }}
                                onSubmitPinCode={async pin => {
                                    if (
                                        this.props.formikProps.values.code
                                            .length !== 6
                                    )
                                        return;

                                    try {
                                        const validatePinInput = getValidatePinInput(
                                            pin
                                        );
                                        if (!_isEmpty(validatePinInput)) {
                                            await execute({
                                                action: async () =>
                                                    validatePin({
                                                        input: validatePinInput,
                                                    }),
                                            });
                                        }
                                        // eslint-disable-next-line
                                        return true;
                                    } catch (error) {
                                        message.error(
                                            error.graphQLErrors[0].message
                                        );
                                    }
                                }}
                            />
                        </Box>
                    );
                }}
            </Composed>
        );
    }
}

export { RegisterStep };

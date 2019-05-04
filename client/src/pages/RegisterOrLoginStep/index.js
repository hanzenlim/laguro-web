import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { adopt } from 'react-adopt';
import {
    Verification,
    GetPatientName,
} from '@laguro/the-bright-side-components';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { validatePhoneOrEmail } from '../../util/validationUtils';

import {
    SEND_KIOSK_LOGIN_CODE,
    SEND_REGISTRATION_CODE,
    LOGIN,
    REGISTER_USER,
} from './queries';

import history from '../../history';
import { setUser, setAuthToken } from '../../util/authUtils';
import { isBioUpdated } from '../../util/dentistUtils';
import { trackUserAuth, trackUserSignup } from '../../util/trackingUtils';

const Composed = adopt({
    sendKioskLoginCode: ({ render }) => (
        <Mutation mutation={SEND_KIOSK_LOGIN_CODE}>{render}</Mutation>
    ),
    sendRegistrationCode: ({ render }) => (
        <Mutation mutation={SEND_REGISTRATION_CODE}>{render}</Mutation>
    ),
    login: ({ render }) => <Mutation mutation={LOGIN}>{render}</Mutation>,
    registerUser: ({ render }) => (
        <Mutation mutation={REGISTER_USER}>{render}</Mutation>
    ),
});

const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const getLoginResult = data => {
    const user = _get(data, 'data.login.user');
    const isPinValid = _get(data, 'data.login.user.id');
    const token = _get(data, 'data.login.authToken.body');
    const dentist = _get(data, 'data.login.user.dentist');

    return {
        user,
        isPinValid,
        token,
        dentist,
    };
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
export const RegisterOrLoginStep = props => (
    <Composed>
        {({
            sendKioskLoginCode,
            registerUser,
            login,
            sendRegistrationCode,
        }) => {
            const redirectUser = ({ user }) => {
                if (props.context === 'web') {
                    if (props.formikProps.values.mode === 'signUp') {
                        const redirect = props.customRedirect
                            ? props.customRedirect
                            : history.location.pathname;
                        history.push(
                            `/onboarding/name-and-persona/?redirectTo=${redirect}`
                        );
                    } else {
                        // Redirect based on user data
                    }
                } else {
                    let upcomingAppointments = [];
                    if (_get(user, 'appointments')) {
                        upcomingAppointments = _get(user, 'appointments');
                    }

                    const purposeOfVisit = _get(
                        props,
                        'values[0].purposeOfVisit'
                    );

                    if (
                        purposeOfVisit === 'checkIn' &&
                        upcomingAppointments.length
                    ) {
                        history.push(
                            `/kiosk/check-in/${_get(
                                upcomingAppointments,
                                '[0].id'
                            )}`
                        );
                    } else if (user.firstName) {
                        history.push(`/kiosk/reason-of-visit`);
                    } else {
                        props.formikProps.submitForm();
                    }
                }
            };

            const getValidatePinInput = passcode => {
                const isEmail = validateEmail(
                    props.formikProps.values.emailOrPhoneNumber
                );
                const phoneNumberFromSignup =
                    props.formikProps.values.phoneNumber;

                return {
                    passcode,
                    ...(!_isEmpty(props.formikProps.values.firstName) && {
                        firstName: props.formikProps.values.firstName,
                    }),
                    ...(!_isEmpty(props.formikProps.values.middleName) && {
                        middleName: props.formikProps.values.middleName,
                    }),
                    ...(!_isEmpty(props.formikProps.values.lastName) && {
                        lastName: props.formikProps.values.lastName,
                    }),
                    ...(!phoneNumberFromSignup && isEmail
                        ? {
                              email:
                                  props.formikProps.values.emailOrPhoneNumber,
                          }
                        : {
                              phoneNumber: `+1${
                                  props.formikProps.values.emailOrPhoneNumber
                              }`,
                          }),
                    ...(phoneNumberFromSignup && {
                        phoneNumber: `+1${phoneNumberFromSignup}`,
                    }),
                };
            };

            const validatePin = async ({ input }) => {
                if (props.formikProps.values.mode === 'signIn') {
                    try {
                        const loginResult = await login({
                            variables: {
                                input,
                            },
                        });

                        const {
                            isPinValid,
                            token,
                            user,
                            dentist,
                        } = getLoginResult(loginResult);

                        if (!isPinValid) {
                            props.clear();
                            props.formikProps.setSubmitting(false);
                            return;
                        }

                        props.formikProps.setFieldValue('isPinValid', true);

                        const dentistBio = _get(dentist, 'bio');

                        setUser({
                            ...user,
                            token,
                            hasUpdatedDentistBio: isBioUpdated(dentistBio), // used to distinguish between dentists and hosts. actual dentists will have a bio, because this is a required field. hosts will have a bio of ' '(a space character).
                        });
                        setAuthToken(token);

                        trackUserAuth({ userId: user.id });

                        if (props.closeModal) {
                            props.closeModal();
                        }

                        redirectUser({
                            user,
                        });
                    } catch (error) {
                        props.clear();
                        props.formikProps.setSubmitting(false);
                        if (error && !_isEmpty(error.graphQLErrors)) {
                            message.error(error.graphQLErrors[0].message);
                        }
                    }
                } else if (props.formikProps.values.mode === 'signUp') {
                    try {
                        const registerUserResult = await registerUser({
                            variables: {
                                input,
                            },
                        });

                        const { isPinValid, token, user } = getRegisterResult(
                            registerUserResult
                        );

                        if (!isPinValid) return;

                        props.formikProps.setFieldValue('isPinValid', true);

                        // used to distinguish between dentists and hosts. recently signed-up user will not be a dentist and therefore will not have a dentist bio
                        setUser({
                            ...user,
                            token,
                            hasUpdatedDentistBio: false,
                        });
                        setAuthToken(token);

                        trackUserSignup();
                        trackUserAuth({ userId: user.id });

                        if (props.closeModal) {
                            props.closeModal();
                        }

                        redirectUser({
                            user,
                        });

                        props.formikProps.setSubmitting(false);
                    } catch (error) {
                        props.clear();
                        props.formikProps.setSubmitting(false);
                        message.error(error.graphQLErrors[0].message);
                    }
                }
            };

            if (
                props.formikProps.values.mode === 'signIn' ||
                props.formikProps.values.mode === 'signUp'
            ) {
                return (
                    <Verification
                        {...props}
                        onRequestPinCode={async username => {
                            props.formikProps.setFieldValue(
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

                            props.formikProps.setSubmitting(true);
                            if (props.formikProps.values.mode === 'signIn') {
                                const sendKioskLoginCodeResult = await sendKioskLoginCode(
                                    {
                                        variables: {
                                            input,
                                        },
                                    }
                                );

                                const isCodeSent = _get(
                                    sendKioskLoginCodeResult,
                                    'data.sendKioskLoginCode'
                                );

                                if (isCodeSent) {
                                    props.formikProps.setFieldValue(
                                        'isCodeSent',
                                        true
                                    );
                                } else {
                                    message.warning(
                                        'We do not recognize this Phone number or e-mail. Please sign up.'
                                    );
                                }

                                props.formikProps.setSubmitting(false);
                            } else if (
                                props.formikProps.values.mode === 'signUp'
                            ) {
                                try {
                                    const sendRegistrationCodeResult = await sendRegistrationCode(
                                        {
                                            variables: {
                                                input,
                                            },
                                        }
                                    );

                                    const isCodeSent = _get(
                                        sendRegistrationCodeResult,
                                        'data.sendRegistrationCode'
                                    );

                                    if (isCodeSent) {
                                        props.formikProps.setFieldValue(
                                            'isCodeSent',
                                            true
                                        );
                                    } else {
                                        message.error(
                                            'You already have an account.'
                                        );
                                    }
                                } catch (error) {
                                    props.formikProps.setSubmitting(false);
                                    message.error(
                                        error.graphQLErrors[0].message
                                    );
                                }

                                props.formikProps.setSubmitting(false);
                            }
                        }}
                        onPinComplete={async pin => {
                            if (props.formikProps.values.mode === 'signUp')
                                return;

                            try {
                                props.formikProps.setSubmitting(true);
                                validatePin({
                                    input: getValidatePinInput(pin),
                                });
                            } catch (error) {
                                props.formikProps.setSubmitting(false);
                                message.error(() => (
                                    <div>
                                        This phone number is already registered.{' '}
                                        <div>Please sign in instead.</div>
                                    </div>
                                ));
                            }
                        }}
                        onSubmitPinCode={async pin => {
                            if (props.formikProps.values.mode === 'signIn')
                                return;
                            if (props.formikProps.values.code.length !== 6)
                                return;

                            try {
                                await validatePin({
                                    input: getValidatePinInput(pin),
                                });

                                return true;
                            } catch (error) {
                                message.error(error.graphQLErrors[0].message);
                            }
                        }}
                    />
                );
            }
            return (
                <GetPatientName
                    {...props}
                    onNext={() => {
                        if (Object.keys(props.formikProps.errors).length !== 0)
                            return;
                        props.formikProps.setFieldValue('mode', 'signUp');
                    }}
                />
            );
        }}
    </Composed>
);

import React, { useContext } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { validatePhoneOrEmail } from '~/util/validationUtils';
import {
    SEND_KIOSK_LOGIN_CODE,
    SEND_REGISTRATION_CODE,
    LOGIN,
    REGISTER_USER,
} from './queries';

import { useRouter } from 'next/router';
import { setUser, setAuthToken } from '~/util/authUtils';
import { isBioUpdated } from '~/util/dentistUtils';
import {
    trackUserAuth,
    trackUserSignup,
    trackSignupAttempt,
} from '~/util/trackingUtils';
import { Verification } from '~/common/the-bright-side-components/components/Onboarding/Patient/Verification';
import { GetPatientName } from '~/common/the-bright-side-components/components/Onboarding/Registration/GetPatientName';
import { AppContext } from '../../appContext';

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
const RegisterOrLoginStep = props => {
    const { setIsAuth } = useContext(AppContext);
    const router = useRouter();
    return (
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
                            if (
                                router.pathname.includes('promo100') ||
                                router.pathname.includes('login') ||
                                router.pathname.includes('signup')
                            ) {
                                return router.push(`/onboarding/terms`);
                            } else {
                                const redirect = props.customRedirect
                                    ? props.customRedirect
                                    : router.pathname;
                                return router.push(
                                    `/onboarding/terms/?redirectTo=${redirect}`
                                );
                            }
                        }

                        if (router.query.redirectTo) {
                            return router.push(router.query.redirectTo);
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
                            return router.push(
                                `/kiosk/check-in/${_get(
                                    upcomingAppointments,
                                    '[0].id'
                                )}`
                            );
                        } else if (user.firstName) {
                            return router.push(`/kiosk/reason-of-visit`);
                        } else {
                            return props.formikProps.submitForm();
                        }
                    }
                };

                const getValidatePinInput = passcode => {
                    const usernameFromSignin =
                        props.formikProps.values.emailOrPhoneNumber;
                    const usernameFromSignup =
                        props.formikProps.values.phoneNumber;
                    const username = usernameFromSignup || usernameFromSignin;

                    return {
                        passcode,
                        ...(!_isEmpty(props.formikProps.values.firstName) && {
                            firstName: _capitalize(
                                props.formikProps.values.firstName
                            ),
                        }),
                        ...(!_isEmpty(props.formikProps.values.middleName) && {
                            middleName: _capitalize(
                                props.formikProps.values.middleName
                            ),
                        }),
                        ...(!_isEmpty(props.formikProps.values.lastName) && {
                            lastName: _capitalize(
                                props.formikProps.values.lastName
                            ),
                        }),
                        ...(validateEmail(username) && {
                            email: username,
                        }),
                        ...(!validateEmail(username) && {
                            phoneNumber: `+1${username}`,
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
                            setIsAuth(true);

                            trackUserAuth({ userId: user.id });

                            redirectUser({
                                user,
                            });

                            const { sideEffect } = props;
                            if (sideEffect) await sideEffect(user);

                            if (props.closeModal) {
                                props.closeModal();
                                window.scrollTo(0, 0);
                            }
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

                            const {
                                isPinValid,
                                token,
                                user,
                            } = getRegisterResult(registerUserResult);

                            if (!isPinValid) return;

                            props.formikProps.setFieldValue('isPinValid', true);

                            // used to distinguish between dentists and hosts. recently signed-up user will not be a dentist and therefore will not have a dentist bio
                            setUser({
                                ...user,
                                token,
                                hasUpdatedDentistBio: false,
                            });
                            setAuthToken(token);
                            setIsAuth(true);

                            trackUserSignup();
                            trackUserAuth({ userId: user.id });

                            redirectUser({
                                user,
                            });

                            props.formikProps.setSubmitting(false);

                            if (props.closeModal) {
                                props.closeModal();
                                window.scrollTo(0, 0);
                            }
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
                            onClickSignup={() => {
                                if (trackSignupAttempt) {
                                    trackSignupAttempt();
                                }
                            }}
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
                                if (
                                    props.formikProps.values.mode === 'signIn'
                                ) {
                                    try {
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
                                    } catch (error) {
                                        props.formikProps.setSubmitting(false);
                                        message.error(
                                            error.graphQLErrors[0].message
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
                                return null;
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
                                            This phone number is already
                                            registered.{' '}
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
                                } catch (error) {
                                    if (error.graphQLErrors) {
                                        message.error(
                                            error.graphQLErrors[0].message
                                        );
                                    }
                                }
                            }}
                        />
                    );
                }
                return (
                    <GetPatientName
                        {...props}
                        onNext={() => {
                            if (
                                Object.keys(props.formikProps.errors).length !==
                                0
                            )
                                return;
                            props.formikProps.setFieldValue('mode', 'signUp');
                        }}
                    />
                );
            }}
        </Composed>
    );
};

export default RegisterOrLoginStep;

import React, { Fragment } from 'react';
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { adopt } from 'react-adopt';
import {
    Wizard,
    Progress,
    PurposeOfVisit,
    Verification,
    GetPatientName,
    PreviousButton,
} from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import {
    SEND_KIOSK_LOGIN_CODE,
    SEND_REGISTRATION_CODE,
    LOGIN,
    SET_ACTIVE_USER,
    REGISTER_USER,
} from './queries';
import cookies from 'browser-cookies';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import history from '../../history';

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
    setActiveUser: ({ render }) => (
        <Mutation mutation={SET_ACTIVE_USER}>{render}</Mutation>
    ),
});

const progressSteps = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
    '3 MEDICAL HISTORY FORM',
    '4 INSURANCE',
];

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            purposeOfVisit: Yup.string().required(
                'You must select your purpose of visit.'
            ),
        }),
        component: null,
        initialValues: {
            purposeOfVisit: 'walkIn',
        },
    },
    {
        id: '1',
        validationSchema: Yup.object().shape({
            firstName: Yup.string().when('mode', {
                is: 'addName',
                then: Yup.string().required(),
            }),
            lastName: Yup.string().when('mode', {
                is: 'addName',
                then: Yup.string().required(),
            }),
        }),
        component: null,
        initialValues: {
            mode: 'signIn',
            isPinValid: false,
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
            firstName: '',
            middleName: '',
            lastName: '',
        },
    },
];

const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const validatePhoneOrEmail = phoneOrEmail => {
    const isEmail = validator.isEmail(phoneOrEmail);
    const isNumeric = validator.isNumeric(phoneOrEmail);
    const hasCorrectDigitCount = phoneOrEmail.length === 10;

    if (!phoneOrEmail) {
        return false;
    }

    if (!isEmail) {
        if (!isNumeric) {
            return false;
        }

        if (!hasCorrectDigitCount) {
            return false;
        }
    }

    return true;
};

const getLoginResult = data => {
    const user = _get(data, 'data.login.user');
    const isPinValid = _get(data, 'data.login.user.id');
    const token = _get(data, 'data.login.authToken.body');

    return {
        user,
        isPinValid,
        token,
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

const PurposeOfVisitStep = props => <PurposeOfVisit {...props} />;

// TODO: Move to common folder
export const RegisterOrLoginStep = props => {
    return (
        <Composed>
            {({
                sendKioskLoginCode,
                registerUser,
                login,
                setActiveUser,
                sendRegistrationCode,
            }) => {
                const setUser = async ({ user, token }) => {
                    cookies.set(
                        'user',
                        JSON.stringify({
                            ...user,
                            token,
                        })
                    );

                    await setActiveUser({
                        variables: {
                            input: {
                                activeUser: {
                                    ...user,
                                },
                            },
                        },
                    });
                };

                const redirectUser = ({ user }) => {
                    if (props.context === 'web') {
                        history.push(
                            `/onboarding/name-and-persona/?redirectTo=${
                                history.location.pathname
                            }`
                        );
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
                        ...(isEmail
                            ? {
                                  email:
                                      props.formikProps.values
                                          .emailOrPhoneNumber,
                              }
                            : {
                                  phoneNumber: `+1${
                                      props.formikProps.values
                                          .emailOrPhoneNumber
                                  }`,
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

                            const { isPinValid, token, user } = getLoginResult(
                                loginResult
                            );

                            if (!isPinValid) {
                                props.clear();
                                props.formikProps.setSubmitting(false);
                                return;
                            }

                            props.formikProps.setFieldValue('isPinValid', true);

                            setUser({ user, token });

                            if (props.context !== 'web') {
                                redirectUser({
                                    user,
                                });
                            }
                        } catch (error) {
                            props.clear();
                            props.formikProps.setSubmitting(false);
                            message.error(error.graphQLErrors[0].message);
                        }
                    } else if (props.formikProps.values.mode === 'signUp') {
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

                        setUser({ user, token });

                        if (props.context !== 'web') {
                            redirectUser({
                                user,
                            });
                        }

                        props.formikProps.setSubmitting(false);
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

                                if (
                                    props.formikProps.values.mode === 'signIn'
                                ) {
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
                                            'We do not recognize this phone number/email address. Please sign up.'
                                        );
                                    }
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
                                        message.error(
                                            error.graphQLErrors[0].message
                                        );
                                    }
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
                                    message.error(
                                        // error.graphQLErrors[0].message
                                        'This phone number is already registered. Please sign in'
                                    );
                                }
                            }}
                            onSubmitPinCode={() => {
                                if (props.formikProps.values.mode === 'signIn')
                                    return;
                                if (props.formikProps.values.code.length !== 6)
                                    return;

                                try {
                                    validatePin({
                                        input: getValidatePinInput(),
                                    });
                                } catch (error) {
                                    message.error(
                                        error.graphQLErrors[0].message
                                    );
                                }
                            }}
                        />
                    );
                } else {
                    return (
                        <GetPatientName
                            {...props}
                            onNext={async values => {
                                if (
                                    _isEmpty(values.firstName) ||
                                    _isEmpty(values.lastName)
                                ) {
                                    return;
                                }

                                props.formikProps.setFieldValue(
                                    'mode',
                                    'signUp'
                                );
                            }}
                        />
                    );
                }
            }}
        </Composed>
    );
};

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = PurposeOfVisitStep(props);
            break;
        case '1':
            step = RegisterOrLoginStep(props);
            break;
        default:
            step = PurposeOfVisitStep(props);
    }

    return (
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

const KioskOnboardingPage = componentProps => (
    <Fragment>
        {/* TODO: Move progress to a parent component */}
        <Progress step={1} steps={progressSteps} percent={22.5} />
        <Wizard
            onSubmit={value => console.log(value)}
            Form="form"
            render={props => (
                <React.Fragment>
                    {props.actions.canGoBack && (
                        <PreviousButton
                            goToPreviousStep={props.actions.goToPreviousStep}
                        />
                    )}
                    {render({ ...props, ...componentProps })}
                </React.Fragment>
            )}
            steps={steps}
        />
    </Fragment>
);

export default withRouter(KioskOnboardingPage);

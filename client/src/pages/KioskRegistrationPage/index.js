import React, { Fragment } from 'react';
import _get from 'lodash/get';
import * as Yup from 'yup';
import { adopt } from 'react-adopt';
import {
    Wizard,
    Progress,
    PurposeOfVisit,
    Verification,
    GetPatientName,
} from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import {
    SEND_KIOSK_LOGIN_CODE,
    LOGIN,
    SET_ACTIVE_USER,
    UPDATE_USER,
} from './queries';
import cookies from 'browser-cookies';
import { Mutation } from 'react-apollo';
import { message } from 'antd';

const Composed = adopt({
    sendKioskLoginCode: ({ render }) => {
        return <Mutation mutation={SEND_KIOSK_LOGIN_CODE}>{render}</Mutation>;
    },
    login: ({ render }) => {
        return <Mutation mutation={LOGIN}>{render}</Mutation>;
    },
    setActiveUser: ({ render }) => {
        return <Mutation mutation={SET_ACTIVE_USER}>{render}</Mutation>;
    },
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
        validationSchema: {},
        component: null,
        initialValues: {},
    },
    {
        id: '1',
        validationSchema: {},
        component: null,
        initialValues: {
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
        },
    },
    {
        id: '2',
        validationSchema: {},
        component: null,
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
        },
    },
];

const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const Step0 = props => <PurposeOfVisit {...props} />;
const Step1 = props => (
    <Composed>
        {({ sendKioskLoginCode, login, setActiveUser }) => {
            return (
                <Verification
                    {...props}
                    onRequestPinCode={async username => {
                        const isEmail = validateEmail(username);

                        const input = {};
                        if (isEmail) {
                            input.email = username;
                        } else {
                            input.phoneNumber = username;
                        }

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
                            props.formikProps.setFieldValue('isCodeSent', true);
                        }
                    }}
                    onPinComplete={async (username, passcode) => {
                        const isEmail = validateEmail(username);

                        const input = {
                            passcode,
                        };

                        if (isEmail) {
                            input.email = username;
                        } else {
                            input.phoneNumber = username;
                        }

                        try {
                            const loginResult = await login({
                                variables: {
                                    input,
                                },
                            });

                            const isPinValid = _get(
                                loginResult,
                                'data.login.user.id'
                            );

                            if (isPinValid) {
                                props.formikProps.setFieldValue(
                                    'isPinValid',
                                    true
                                );
                            }

                            const user = {
                                ..._get(loginResult, 'data.login.user'),
                                token: _get(
                                    loginResult,
                                    'data.login.authToken.body'
                                ),
                            };

                            cookies.set('user', JSON.stringify(user));

                            await setActiveUser({
                                variables: {
                                    input: {
                                        activeUser: {
                                            ..._get(
                                                loginResult,
                                                'data.login.user'
                                            ),
                                        },
                                    },
                                },
                            });
                        } catch (error) {
                            message.error(error.graphQLErrors[0].message);
                        }
                    }}
                    // TODO: Refactor
                    onSubmitPinCode={() => {
                        const user = JSON.parse(cookies.get('user'));

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
                            props.history.push(
                                `/kiosk/check-in/${_get(
                                    upcomingAppointments,
                                    '[0].id'
                                )}`
                            );
                        } else if (user.firstName) {
                            props.history.push(`/kiosk/book-an-appointment`);
                        }
                    }}
                />
            );
        }}
    </Composed>
);

const ComposedStep2 = adopt({
    updateUser: ({ render }) => {
        return <Mutation mutation={UPDATE_USER}>{render}</Mutation>;
    },
});

const Step2 = props => {
    return (
        <ComposedStep2>
            {({ updateUser }) => {
                return (
                    <GetPatientName
                        {...props}
                        onNext={async values => {
                            let user = cookies.get('user');
                            if (user) {
                                user = JSON.parse(user);
                            }

                            await updateUser({
                                variables: {
                                    input: {
                                        id: user.id,
                                        firstName: values.firstName,
                                        middleName: values.middleName,
                                        lastName: values.lastName,
                                    },
                                },
                            });
                            props.history.push(`/kiosk/book-an-appointment`);
                        }}
                    />
                );
            }}
        </ComposedStep2>
    );
};

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        case '2':
            step = Step2(props);
            break;
        default:
            step = Step1(props);
    }

    return (
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

const KioskOnboardingPage = componentProps => {
    return (
        <Fragment>
            {/* TODO: Move progress to a parent component */}
            <Progress step={1} steps={progressSteps} percent={22.5} />
            <Wizard
                onSubmit={value => console.log(value)}
                Form="form"
                render={props => render({ ...props, ...componentProps })}
                steps={steps}
            />
        </Fragment>
    );
};

export default KioskOnboardingPage;

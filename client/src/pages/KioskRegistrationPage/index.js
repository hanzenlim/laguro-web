import React, { Fragment } from 'react';
import _get from 'lodash/get';
import * as Yup from 'yup';
import { adopt } from 'react-adopt';
import {
    Wizard,
    Progress,
    PersonaSelection,
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
        initialValues: {},
        validationSchema: Yup.object().shape({
            persona: Yup.string().required('You must select your persona'),
        }),
    },
    {
        id: '1',
        validationSchema: {},
        component: null,
        initialValues: {},
    },
    {
        id: '2',
        validationSchema: {},
        component: null,
        initialValues: {
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
        },
    },
    {
        id: '3',
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

const Step0 = props => <PersonaSelection {...props} />;
const Step1 = props => <PurposeOfVisit {...props} />;
const Step2 = props => (
    <Composed>
        {({ sendKioskLoginCode, login, setActiveUser }) => {
            return (
                <Verification
                    {...props}
                    onRequestPinCode={username => {
                        const isEmail = validateEmail(username);

                        const input = {};
                        if (isEmail) {
                            input.email = username;
                        } else {
                            input.phoneNumber = username;
                        }

                        sendKioskLoginCode({
                            variables: {
                                input,
                            },
                        });
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

                        const result = await login({
                            variables: {
                                input,
                            },
                        });

                        const user = {
                            ..._get(result, 'data.login.user'),
                            token: _get(result, 'data.login.authToken.body'),
                        };

                        cookies.set('user', JSON.stringify(user));

                        await setActiveUser({
                            variables: {
                                input: {
                                    activeUser: {
                                        ..._get(result, 'data.login.user'),
                                    },
                                },
                            },
                        });
                    }}
                    // TODO: Refactor
                    onSubmitPinCode={() => {
                        const user = JSON.parse(cookies.get('user'));
                        const willCheckIn =
                            props.values[1].purposeOfVisit === 'checkIn';
                        const hasAppointment = true;
                        if (willCheckIn && hasAppointment) {
                            // TODO: Pass reservation id in URL
                            props.history.push(`/kiosk/check-in`);
                        } else if (user.firstName) {
                            props.history.push(`/kiosk/book-an-appointment`);
                        }
                    }}
                />
            );
        }}
    </Composed>
);

const ComposedStep3 = adopt({
    updateUser: ({ render }) => {
        return <Mutation mutation={UPDATE_USER}>{render}</Mutation>;
    },
});

const Step3 = props => {
    return (
        <ComposedStep3>
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
        </ComposedStep3>
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
        case '3':
            step = Step3(props);
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

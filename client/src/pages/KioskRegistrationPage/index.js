import React, { Fragment } from 'react';
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
import { SEND_KIOSK_LOGIN_CODE, LOGIN, SET_ACTIVE_USER } from './queries';
import cookies from 'browser-cookies';
import { Query, Mutation } from 'react-apollo';

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

const Step0 = props => <PersonaSelection {...props} />;
const Step1 = props => <PurposeOfVisit {...props} />;
const Step2 = props => (
    <Composed>
        {({ sendKioskLoginCode, login, setActiveUser }) => {
            return (
                <Verification
                    {...props}
                    onRequestPinCode={username => {
                        sendKioskLoginCode({
                            variables: {
                                input: {
                                    email: username,
                                },
                            },
                        });
                    }}
                    onSubmitPinCode={async (username, passcode) => {
                        const result = await login({
                            variables: {
                                input: {
                                    email: username,
                                    passcode,
                                },
                            },
                        });

                        cookies.set(
                            'user',
                            JSON.stringify(result.data.login.user)
                        );

                        if (result.data.login.user.firstName) {
                            props.history.push(`/kiosk/book-an-appointment`);
                        }

                        const result1 = await setActiveUser({
                            variables: {
                                input: {
                                    activeUser: {
                                        ...result.data.login.user,
                                    },
                                },
                            },
                        });
                    }}
                />
            );
        }}
    </Composed>
);
const Step3 = props => <GetPatientName {...props} />;

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

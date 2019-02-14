import React, { Fragment } from 'react';
import * as Yup from 'yup';
import _get from 'lodash/get';
import { adopt } from 'react-adopt';
import { Wizard, StandaloneLogin } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import cookies from 'browser-cookies';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import isEmpty from 'lodash/isEmpty';

import history from '../../../history';

import {
    SEND_KIOSK_LOGIN_CODE,
    LOGIN,
    SET_ACTIVE_USER,
} from '../../KioskRegistrationPage/queries';

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

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            isPinValid: Yup.boolean().oneOf([true], 'Pin must be valid'),
        }),
        component: null,
        initialValues: {
            isPinValid: false,
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
        },
    },
];

const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const Step0 = props => (
    <Composed>
        {({ sendKioskLoginCode, login, setActiveUser }) => {
            return (
                <StandaloneLogin
                    {...props}
                    onRequestPinCode={async username => {
                        const isEmail = validateEmail(username);

                        const input = {};
                        if (isEmail) {
                            input.email = username;
                        } else {
                            const phoneNumber = `+1${username}`;
                            input.phoneNumber = phoneNumber;
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
                            input.phoneNumber = `+1${username}`;
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
                                            ...user,
                                        },
                                    },
                                },
                            });

                            const userFromLoginMutation = _get(
                                loginResult,
                                'data.login.user'
                            );

                            if (isEmpty(userFromLoginMutation.firstName)) {
                                props.push(
                                    `/onboarding/name-and-persona${
                                        history.location.search
                                    }`
                                );

                                props.closeModal();
                                return null;
                            }

                            return props.closeModal();
                        } catch (error) {
                            message.error(error.graphQLErrors[0].message);
                        }
                    }}
                />
            );
        }}
    </Composed>
);

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        default:
            step = Step0(props);
    }

    return <Flex justifyContent="center">{step}</Flex>;
};

const KioskOnboardingPage = componentProps => {
    return (
        <Fragment>
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

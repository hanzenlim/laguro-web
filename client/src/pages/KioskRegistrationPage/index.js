import React, { Fragment } from 'react';
import { adopt } from 'react-adopt';
import { Verification } from '@laguro/the-bright-side-components';
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

const KioskOnboardingPage = props => {
    return (
        <Fragment>
            <Composed>
                {({ sendKioskLoginCode, login, setActiveUser }) => {
                    return (
                        <Verification
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
        </Fragment>
    );
};

export default KioskOnboardingPage;

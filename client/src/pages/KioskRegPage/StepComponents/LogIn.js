import React from 'react';
import _get from 'lodash/get';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { injectIntl } from 'react-intl';
import { SEND_KIOSK_LOGIN_CODE, LOGIN } from '../queries';
import { Box } from '../../../components/index';
import { setUser, setAuthToken } from '../../../util/authUtils';
import { isBioUpdated } from '../../../util/dentistUtils';
import { execute } from '../../../util/gqlUtils';
import { validatePhoneOrEmail } from '../../../util/validationUtils';
import { trackUserAuth } from '../../../util/trackingUtils';
import { KioskLogIn } from '../../common/the-bright-side-components/components/Kiosk/KioskLogIn';
import { getFormatTextFromProps } from '../../../util/intlUtils';
import { INCORRECT_PASSWORD_GQL_ERROR } from '../../../util/errors';

const Composed = adopt({
    sendKioskLoginCode: ({ render }) => (
        <Mutation mutation={SEND_KIOSK_LOGIN_CODE}>{render}</Mutation>
    ),
    login: ({ render }) => <Mutation mutation={LOGIN}>{render}</Mutation>,
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

export const LoginStep = injectIntl(props => {
    const formatText = getFormatTextFromProps(props);
    return (
        <Composed>
            {({ sendKioskLoginCode, login }) => {
                const getValidatePinInput = passcode => {
                    const isEmail = validateEmail(
                        props.formikProps.values.emailOrPhoneNumber
                    );

                    return {
                        passcode,
                        ...(isEmail
                            ? {
                                  email:
                                      props.formikProps.values
                                          .emailOrPhoneNumber,
                              }
                            : {
                                  phoneNumber: `+1${props.formikProps.values.emailOrPhoneNumber}`,
                              }),
                    };
                };

                const validatePin = async ({ input }) => {
                    let loginResult;

                    props.formikProps.setSubmitting(true);

                    const hasNoError = await execute({
                        action: async () => {
                            loginResult = await login({
                                variables: {
                                    input,
                                },
                            });
                        },
                        onError: () => {
                            const { clear } = props;
                            if (clear) {
                                clear();
                            }
                        },
                        errorMessages: {
                            [INCORRECT_PASSWORD_GQL_ERROR]: formatText(
                                'registration.signIn.incorrectCode'
                            ),
                        },
                    });

                    props.formikProps.setSubmitting(false);

                    if (!hasNoError) {
                        return;
                    }

                    const { isPinValid, token, user, dentist } = getLoginResult(
                        loginResult
                    );

                    if (!isPinValid) {
                        const { clear, formikProps } = props;
                        if (clear) {
                            clear();
                        }
                        formikProps.setSubmitting(false);
                        return;
                    }

                    trackUserAuth({ userId: user.id });

                    props.formikProps.setFieldValue('isPinValid', true);
                    if (user.family.members.length > 1) {
                        props.formikProps.setFieldValue(
                            'hasFamilyMembers',
                            true
                        );
                    }

                    const dentistBio = _get(dentist, 'bio');

                    setUser({
                        ...user,
                        token,
                        hasUpdatedDentistBio: isBioUpdated(dentistBio), // used to distinguish between dentists and hosts. actual dentists will have a bio, because this is a required field. hosts will have a bio of ' '(a space character).
                    });
                    setAuthToken(token);

                    if (props.closeModal) {
                        props.closeModal();
                    }
                    // allows skipping of register steps
                    props.formikProps.submitForm();
                };

                return (
                    <Box maxWidth={431}>
                        <KioskLogIn
                            {...props}
                            // eslint-disable-next-line
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
                                let sendKioskLoginCodeResult;

                                const hasNoError = await execute({
                                    action: async () => {
                                        sendKioskLoginCodeResult = await sendKioskLoginCode(
                                            {
                                                variables: {
                                                    input,
                                                },
                                            }
                                        );
                                    },
                                });

                                if (!hasNoError) {
                                    props.formikProps.setSubmitting(false);
                                    return null;
                                }

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
                                        formatText(
                                            'registration.signIn.notRecognized'
                                        )
                                    );
                                }

                                props.formikProps.setSubmitting(false);
                            }}
                            onPinComplete={async pin => {
                                validatePin({
                                    input: getValidatePinInput(pin),
                                });
                            }}
                        />
                    </Box>
                );
            }}
        </Composed>
    );
});

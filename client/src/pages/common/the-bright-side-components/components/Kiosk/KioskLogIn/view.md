import { Box, Button, Flex, Text } from '@laguro/basic-components';
import { Field } from 'formik';
import * as React from 'react';
import validator from 'validator';

import Onboarding from '../../Onboarding';
import InfoIcon from '../../Onboarding/Assets/infoIcon';
import PinInput from '../../Onboarding/PinInput';

const REGISTER_MODE = 'register-mode';
const LOGIN_MODE = 'logIn-mode';

const validate = (phoneOrEmail: string): string => {
    const isEmail = validator.isEmail(phoneOrEmail);
    const isNumeric = validator.isNumeric(phoneOrEmail);
    const hasCorrectDigitCount = phoneOrEmail.length === 10;

    if (!phoneOrEmail) {
        return 'Required';
    }

    if (!isEmail) {
        if (!isNumeric) {
            return 'Invalid phone number or email';
        }

        if (!hasCorrectDigitCount) {
            return 'Must have 10 digits';
        }
    }

    return '';
};

// Move outside render so that autofocus doesn't re run on every type
// See: https://github.com/s-yadav/react-number-format/issues/233
const InputWithAutoFocus = props => <Onboarding.InputField {...props} autoFocus={true} />;

export default class KioskLogInView extends React.Component<any, any> {
    public static REGISTER_MODE = REGISTER_MODE;
    public static LOGIN_MODE = LOGIN_MODE;

    public render() {
        const { props } = this;

        return (
            <Flex flexDirection="column" width="100%">
                <Flex justifyContent="center" width="100%">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Sign in" />
                <Onboarding.StepBlurbText
                    text="Type in your information below to log in
                 A temporary log-in code will be sent"
                />
                <Flex flexDirection="column" mb="20px">
                    <Flex alignItems="flex-start" mb="10px">
                        <Text>Phone number or e-mail</Text>
                    </Flex>

                    <Flex>
                        <Box flex="1">
                            <Field
                                name="emailOrPhoneNumber"
                                component={InputWithAutoFocus}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        if (validate(props.formikProps.values.emailOrPhoneNumber)) {
                                            props.formikProps.setFieldError(
                                                'emailOrPhoneNumber',
                                                validate(props.formikProps.values.emailOrPhoneNumber)
                                            );
                                        }

                                        if (props.onRequestPinCode) {
                                            props.onRequestPinCode(props.formikProps.values.emailOrPhoneNumber);
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <Button
                            ml="20px"
                            disabled={props.formikProps.values.emailOrPhoneNumber.length === 0}
                            loading={!props.formikProps.values.isCodeSent && props.formikProps.isSubmitting}
                            onClick={() => {
                                if (validate(props.formikProps.values.emailOrPhoneNumber)) {
                                    props.formikProps.setFieldError(
                                        'emailOrPhoneNumber',
                                        validate(props.formikProps.values.emailOrPhoneNumber)
                                    );
                                }

                                if (props.onRequestPinCode) {
                                    props.onRequestPinCode(props.formikProps.values.emailOrPhoneNumber);
                                }
                            }}
                        >
                            Send
                        </Button>
                    </Flex>
                    {props.formikProps.values.isCodeSent && (
                        <div>
                            <Text color="#3481f8" fontSize="12px" mb={15}>
                                Your log-in code has been sent
                            </Text>

                            <Box>
                                <Box mb={10}>
                                    <Text>Enter log-in code</Text>
                                </Box>
                                <PinInput
                                    length={6}
                                    focus={true}
                                    onChange={pin => {
                                        props.formikProps.setFieldValue('code', pin);
                                    }}
                                    onComplete={async pin => {
                                        await props.formikProps.setFieldValue('mode', LOGIN_MODE);
                                        props.onPinComplete(pin);
                                    }}
                                    type="tel"
                                    ref={props.setReference}
                                />
                                <Box height={5} />

                                {props.formikProps.errors.isPinValid && (
                                    <Onboarding.ValidationMessage text={props.formikProps.errors.isPinValid} />
                                )}
                            </Box>
                        </div>
                    )}
                </Flex>

                {!props.formikProps.values.isCodeSent && (
                    <Flex flexDirection="column" alignItems="center">
                        <Button
                            onClick={() => {
                                props.history.push('/kiosk/registration/get-patient-name-step');
                            }}
                            height="50px"
                            type="ghost"
                        >
                            <Text color="#3481f8" fontSize="16px" textAlign="center">
                                Sign up
                            </Text>
                        </Button>
                    </Flex>
                )}
            </Flex>
        );
    }
}

import { Box, Button, Flex, Text } from '~/components';
import { Field } from 'formik';
import * as React from 'react';
import validator from 'validator';
import { Tooltip, Icon } from 'antd';

import Onboarding from '../../../Onboarding';
import InfoIcon from '../../Assets/infoIcon';
import PinInput from '../../PinInput';

const checkIfValidPhoneOrEmail = phoneOrEmail => {
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
const InputWithAutoFocus = props => (
    <Onboarding.InputField {...props} autoFocus />
);

export const Verification = props => {
    if (
        props.formikProps.values.phoneNumber === '' &&
        props.formikProps.values.mode === 'signUp' &&
        props.formikProps.touched.phoneNumber
    ) {
        props.formikProps.setFieldTouched('phoneNumber', false, false);
    }
    const handleSendAction = () => {
        if (
            checkIfValidPhoneOrEmail(
                props.formikProps.values.emailOrPhoneNumber
            ) ||
            checkIfValidPhoneOrEmail(props.formikProps.values.phoneNumber)
        ) {
            props.formikProps.setFieldTouched('emailOrPhoneNumber', true);
            props.formikProps.setFieldError(
                'emailOrPhoneNumber',
                checkIfValidPhoneOrEmail(
                    props.formikProps.values.emailOrPhoneNumber
                )
            );

            props.formikProps.setFieldTouched('phoneNumber', true);
            props.formikProps.setFieldError(
                'phoneNumber',
                checkIfValidPhoneOrEmail(props.formikProps.values.phoneNumber)
            );
        }

        if (props.onRequestPinCode) {
            const pinCodeContact =
                props.formikProps.values.mode === 'signIn'
                    ? props.formikProps.values.emailOrPhoneNumber
                    : props.formikProps.values.phoneNumber;
            props.onRequestPinCode(pinCodeContact);
        }
    };

    const handleVerificationCodeSendAction = () => {
        if (checkIfValidPhoneOrEmail(props.formikProps.values.phoneNumber)) {
            props.formikProps.setFieldTouched('phoneNumber', true);
            props.formikProps.setFieldError(
                'phoneNumber',
                checkIfValidPhoneOrEmail(props.formikProps.values.phoneNumber)
            );
        } else {
            if (props.onRequestPinCode) {
                const pinCodeContact =
                    props.formikProps.values.mode === 'signIn'
                        ? props.formikProps.values.emailOrPhoneNumber
                        : props.formikProps.values.phoneNumber;
                props.onRequestPinCode(pinCodeContact);
            }
        }
    };

    return (
        <Flex flexDirection="column" width="100%">
            <Flex justifyContent="center" width="100%">
                <InfoIcon />
            </Flex>
            <Onboarding.StepTitleText
                text={
                    props.formikProps.values.mode === 'signIn'
                        ? 'Sign in'
                        : 'Step 2. Verification'
                }
            />
            <Onboarding.StepBlurbText
                text={
                    props.formikProps.values.mode === 'signIn'
                        ? `Type in your information below to log in
             A temporary log-in code will be sent`
                        : `Type in your information below to log in
             A verification will be sent`
                }
            />
            <Flex flexDirection="column" mb="40px">
                <Flex alignItems="center" mb="10px">
                    <Text>Phone number or e-mail</Text>
                    <Box ml="4px">
                        <Tooltip
                            placement="top"
                            title="Must provide an email or a valid 10-digit number, including area code."
                        >
                            <Icon type="info-circle" />
                        </Tooltip>
                    </Box>
                </Flex>

                <Flex flexDirection={['column', 'row', 'row']}>
                    <Box flex="1">
                        {props.formikProps.values.mode === 'signIn' && (
                            <Field
                                name="emailOrPhoneNumber"
                                type="email"
                                component={InputWithAutoFocus}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSendAction();
                                    }
                                }}
                            />
                        )}
                        {props.formikProps.values.mode === 'signUp' && (
                            <Field
                                name="phoneNumber"
                                type="tel"
                                component={InputWithAutoFocus}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleVerificationCodeSendAction();
                                    }
                                }}
                            />
                        )}
                    </Box>
                    <Button
                        ml={[0, 20, 20]}
                        height={46}
                        disabled={
                            props.formikProps.values.emailOrPhoneNumber
                                .length === 0 &&
                            props.formikProps.values.phoneNumber.length === 0
                        }
                        loading={
                            !props.formikProps.values.isCodeSent &&
                            props.formikProps.isSubmitting
                        }
                        onClick={
                            props.formikProps.values.mode === 'signIn'
                                ? handleSendAction
                                : handleVerificationCodeSendAction
                        }
                    >
                        Send
                    </Button>
                </Flex>
                {props.formikProps.values.isCodeSent && (
                    <div>
                        <Text color="#3481f8" fontSize="12px" mb={15}>
                            {props.formikProps.values.mode === 'signIn'
                                ? 'Your log-in code has been sent'
                                : 'Your verification code has been sent'}
                        </Text>

                        <Box>
                            <Box mb={10}>
                                <Text>
                                    {props.formikProps.values.mode === 'signIn'
                                        ? 'Enter log-in code'
                                        : 'Enter verification code'}
                                </Text>
                            </Box>
                            <PinInput
                                length={6}
                                focus={true}
                                onChange={pin => {
                                    props.formikProps.setFieldValue(
                                        'code',
                                        pin
                                    );
                                }}
                                onComplete={pin => {
                                    props.onPinComplete(pin);
                                }}
                                type="tel"
                                ref={props.setReference}
                            />
                            <Box height={5} />

                            {props.formikProps.values.mode !== 'signUp' &&
                                props.formikProps.isSubmitting && (
                                    <Text color="#3481f8" fontSize="12px">
                                        Sending...
                                    </Text>
                                )}

                            {props.formikProps.values.mode !== 'signUp' &&
                            props.formikProps.values.isPinValid ? (
                                <Text color="#3481f8" fontSize="12px">
                                    Your phone number has been verified
                                </Text>
                            ) : (
                                props.formikProps.submitCount !== 0 &&
                                props.formikProps.errors.isPinValid && (
                                    <Onboarding.ValidationMessage
                                        text={
                                            props.formikProps.errors.isPinValid
                                        }
                                    />
                                )
                            )}
                        </Box>
                    </div>
                )}
            </Flex>

            {props.formikProps.values.isCodeSent &&
                props.formikProps.values.mode === 'signUp' && (
                    <Onboarding.NextButton
                        onClick={async () => {
                            if (props.onSubmitPinCode) {
                                props.formikProps.setSubmitting(true);
                                await props.onSubmitPinCode(
                                    props.formikProps.values.code
                                );
                                props.formikProps.setSubmitting(false);
                            }

                            props.formikProps.submitForm();
                        }}
                        loading={props.formikProps.isSubmitting}
                    >
                        Create a new account
                    </Onboarding.NextButton>
                )}

            {!props.formikProps.values.isCodeSent &&
                props.formikProps.values.mode === 'signIn' && (
                    <Flex flexDirection="column" alignItems="center">
                        <Button
                            onClick={() => {
                                props.formikProps.setFieldValue(
                                    'mode',
                                    'getName'
                                );
                                if (props.onClickSignup) {
                                    props.onClickSignup();
                                }
                            }}
                            type="ghost"
                        >
                            <Text
                                color="#3481f8"
                                fontSize="16px"
                                textAlign="center"
                            >
                                Sign up
                            </Text>
                        </Button>
                    </Flex>
                )}
        </Flex>
    );
};

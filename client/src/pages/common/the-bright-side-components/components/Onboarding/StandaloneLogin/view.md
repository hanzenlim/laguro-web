import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import validator from 'validator';

import Onboarding from '../../Onboarding';
import InfoIcon from '../Assets/infoIcon';
import PinInput from '../PinInput';

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

const VerificationView = props => {
    return (
        <Box width="100%">
            <Flex justifyContent="center">
                <InfoIcon />
            </Flex>
            <Onboarding.StepTitleText text={props.title} />
            <Onboarding.StepBlurbTextLogin text={`Type in your information below to ${props.authAction}`} />

            <Flex flexDirection="column" mb="40px">
                <Flex alignItems="flex-start" mb="10px">
                    <Text>Phone number / email address</Text>
                </Flex>

                <Flex>
                    <Onboarding.Input
                        height="50px"
                        type="text"
                        mb="6px"
                        name="phoneOrEmail"
                        value={props.formikProps.values.emailOrPhoneNumber}
                        onChange={e => {
                            if (!e.target.value) {
                                props.formikProps.setFieldError('emailOrPhoneNumber', '');
                            }

                            props.formikProps.setFieldValue('emailOrPhoneNumber', e.target.value);
                        }}
                        onFocus={() => {
                            props.formikProps.setFieldError('emailOrPhoneNumber', '');
                        }}
                    />
                    <Button
                        ml="20px"
                        disabled={props.formikProps.values.emailOrPhoneNumber.length === 0}
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
                {props.formikProps.submitCount !== 0 && props.formikProps.errors.emailOrPhoneNumber && (
                    <Onboarding.ValidationMessage text={props.formikProps.errors.emailOrPhoneNumber} />
                )}
                {props.formikProps.values.isCodeSent && (
                    <div>
                        <Text color="#3481f8" fontSize="12px" mb={15}>
                            We have sent you a verification code.
                        </Text>

                        <Box>
                            <Box mb={10}>
                                <Text>Enter verification code</Text>
                            </Box>
                            <PinInput
                                length={6}
                                focus
                                small
                                onChange={pin => {
                                    props.formikProps.setFieldValue('code', pin);
                                }}
                                onComplete={pin => {
                                    props.onPinComplete(props.formikProps.values.emailOrPhoneNumber, pin);
                                }}
                                type="tel"
                                ref={props.setReference}
                            />
                            <Box height={5} />
                            {props.formikProps.isSubmitting && (
                                <Text color="#3481f8" fontSize="12px">
                                    Sending...
                                </Text>
                            )}

                            {props.formikProps.values.isPinValid ? (
                                <Text color="#3481f8" fontSize="12px">
                                    Your phone number has been verified
                                </Text>
                            ) : (
                                props.formikProps.submitCount !== 0 && props.formikProps.errors.isPinValid && (
                                    <Onboarding.ValidationMessage text={props.formikProps.errors.isPinValid} />
                                )
                            )}
                        </Box>
                    </div>
                )}
            </Flex>
        </Box>
    );
};

export default VerificationView;

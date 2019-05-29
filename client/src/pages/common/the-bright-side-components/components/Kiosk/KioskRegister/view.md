import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import validator from 'validator';
import _isEmpty from 'lodash/isEmpty';
import Onboarding from '../../Onboarding';
import InfoIcon from '../../Onboarding/Assets/infoIcon';
import PinInput from '../../Onboarding/PinInput';

const validate = (phoneOrEmail: string): string => {
    const isEmail = validator.isEmail(phoneOrEmail);
    const isNumeric = validator.isNumeric(phoneOrEmail);
    const hasCorrectDigitCount = !_isEmpty(phoneOrEmail) && phoneOrEmail.length === 10;

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

interface Props {
    formikProps: any;
    onRequestPinCode: any;
    setReference: any;
    onSubmitPinCode: any;
    defaultNumberEmailValue: any;
}

class KioskRegisterView extends React.Component<Props> {
    numberEmailInputhasBeenTouched: boolean;
    constructor(props: any) {
        super(props);
    }

    render() {
        const emailOrPhoneNumber =
            (!this.numberEmailInputhasBeenTouched && this.props.defaultNumberEmailValue) ||
            this.props.formikProps.values.emailOrPhoneNumber;

        return (
            <Flex flexDirection="column" width="100%">
                <Flex justifyContent="center" width="100%">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Step 2. Verification" />
                <Onboarding.StepBlurbText
                    text="Type in your information below to log in
             A verification will be sent"
                />
                <Flex flexDirection="column" mb="40px">
                    <Flex alignItems="flex-start" mb="10px">
                        <Text>Phone number or e-mail</Text>
                    </Flex>

                    <Flex>
                        <Onboarding.Input
                            autoFocus={true}
                            height="50px"
                            type="text"
                            mb="6px"
                            name="phoneOrEmail"
                            value={emailOrPhoneNumber}
                            onChange={e => {
                                this.numberEmailInputhasBeenTouched = true;
                                if (!e.target.value) {
                                    this.props.formikProps.setFieldError('emailOrPhoneNumber', '');
                                }

                                this.props.formikProps.setFieldValue('emailOrPhoneNumber', e.target.value);
                            }}
                        />
                        <Button
                            ml="20px"
                            disabled={
                                this.props.formikProps.values.isCodeSent ||
                                (this.numberEmailInputhasBeenTouched
                                    ? _isEmpty(emailOrPhoneNumber)
                                    : _isEmpty(this.props.defaultNumberEmailValue))
                            }
                            loading={!this.props.formikProps.values.isCodeSent && this.props.formikProps.isSubmitting}
                            onClick={() => {
                                if (validate(emailOrPhoneNumber)) {
                                    this.props.formikProps.setFieldError(
                                        'emailOrPhoneNumber',
                                        validate(emailOrPhoneNumber)
                                    );
                                }

                                if (this.props.onRequestPinCode) {
                                    this.props.onRequestPinCode(emailOrPhoneNumber);
                                }
                            }}
                        >
                            Send
                        </Button>
                    </Flex>
                    {this.props.formikProps.errors.emailOrPhoneNumber && (
                        <Onboarding.ValidationMessage text={this.props.formikProps.errors.emailOrPhoneNumber} />
                    )}
                    {this.props.formikProps.values.isCodeSent && (
                        <div>
                            <Text color="#3481f8" fontSize="12px" mb={15}>
                                Your verification code has been sent
                            </Text>

                            <Box>
                                <Box mb={10}>
                                    <Text>Enter verification code</Text>
                                </Box>
                                <PinInput
                                    length={6}
                                    focus={true}
                                    onChange={pin => {
                                        this.props.formikProps.setFieldValue('code', pin);
                                    }}
                                    type="tel"
                                    ref={this.props.setReference}
                                />
                                <Box height={5} />

                                {this.props.formikProps.isSubmitting && (
                                    <Text color="#3481f8" fontSize="12px">
                                        Sending...
                                    </Text>
                                )}

                                {this.props.formikProps.values.isPinValid && (
                                    <Text color="#3481f8" fontSize="12px">
                                        Your phone number has been verified
                                    </Text>
                                )}
                            </Box>
                        </div>
                    )}
                </Flex>

                {this.props.formikProps.values.isCodeSent && (
                    <Onboarding.NextButton
                        onClick={async () => {
                            if (this.props.onSubmitPinCode) {
                                this.props.formikProps.setSubmitting(true);
                                await this.props.onSubmitPinCode(this.props.formikProps.values.code);
                                this.props.formikProps.setSubmitting(false);
                            }
                        }}
                        loading={this.props.formikProps.isSubmitting}
                        disabled={this.props.formikProps.values.code.length !== 6}
                    >
                        Create a new account
                    </Onboarding.NextButton>
                )}
            </Flex>
        );
    }
}

export default KioskRegisterView;

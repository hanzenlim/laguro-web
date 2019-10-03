import { Box, Button, Flex, Text } from '~/components';
import { Field } from 'formik';
import { Tooltip, Icon } from 'antd';
import * as React from 'react';
import validator from 'validator';
import { injectIntl } from 'react-intl';
import Onboarding from '../../Onboarding';
import InfoIcon from '../../Onboarding/Assets/infoIcon';
import PinInput from '../../Onboarding/PinInput';
import { getFormatTextFromProps } from '~/util/intlUtils';

const REGISTER_MODE = 'register-mode';
const LOGIN_MODE = 'logIn-mode';

// Move outside render so that autofocus doesn't re run on every type
// See: https://github.com/s-yadav/react-number-format/issues/233
const InputWithAutoFocus = props => (
    <Onboarding.InputField {...props} autoFocus />
);

class KioskLogInClass extends React.Component {
    static REGISTER_MODE = REGISTER_MODE;
    static LOGIN_MODE = LOGIN_MODE;

    constructor(props) {
        super(props);

        const formatText = getFormatTextFromProps(this.props);
        this.validate = phoneOrEmail => {
            const isEmail = validator.isEmail(phoneOrEmail);
            const isNumeric = validator.isNumeric(phoneOrEmail);
            const hasCorrectDigitCount = phoneOrEmail.length === 10;

            if (!phoneOrEmail) {
                return formatText('general.fieldIsRequired');
            }

            if (!isEmail) {
                if (!isNumeric) {
                    return formatText('registration.signIn.invalid');
                }

                if (!hasCorrectDigitCount) {
                    return formatText('registration.signIn.mustHave10');
                }
            }

            return '';
        };
    }

    render() {
        const { props } = this;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex flexDirection="column" width="100%">
                <Flex justifyContent="center" width="100%">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('registration.signIn.signIn')}
                />
                <Onboarding.StepBlurbText
                    text={formatText('registration.signIn.typeInfromation')}
                />
                <Flex flexDirection="column" mb="20px">
                    <Flex alignItems="center" mb="10px">
                        <Text>
                            {formatText('registration.signIn.phoneOrEmail')}
                        </Text>
                        <Box ml="4px">
                            <Tooltip
                                placement="top"
                                title="Must provide a valid 10-digit number, including area code."
                            >
                                <Icon type="info-circle" />
                            </Tooltip>
                        </Box>
                    </Flex>

                    <Flex>
                        <Box flex="1">
                            <Field
                                name="emailOrPhoneNumber"
                                component={InputWithAutoFocus}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        if (
                                            this.validate(
                                                props.formikProps.values
                                                    .emailOrPhoneNumber
                                            )
                                        ) {
                                            props.formikProps.setFieldError(
                                                'emailOrPhoneNumber',
                                                this.validate(
                                                    props.formikProps.values
                                                        .emailOrPhoneNumber
                                                )
                                            );
                                        }

                                        if (props.onRequestPinCode) {
                                            props.onRequestPinCode(
                                                props.formikProps.values
                                                    .emailOrPhoneNumber
                                            );
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <Button
                            ml="20px"
                            disabled={
                                props.formikProps.values.emailOrPhoneNumber
                                    .length === 0
                            }
                            loading={
                                !props.formikProps.values.isCodeSent &&
                                props.formikProps.isSubmitting
                            }
                            onClick={() => {
                                if (
                                    this.validate(
                                        props.formikProps.values
                                            .emailOrPhoneNumber
                                    )
                                ) {
                                    props.formikProps.setFieldError(
                                        'emailOrPhoneNumber',
                                        this.validate(
                                            props.formikProps.values
                                                .emailOrPhoneNumber
                                        )
                                    );
                                }

                                if (props.onRequestPinCode) {
                                    props.onRequestPinCode(
                                        props.formikProps.values
                                            .emailOrPhoneNumber
                                    );
                                }
                            }}
                        >
                            {formatText('registration.signIn.send')}
                        </Button>
                    </Flex>
                    {props.formikProps.values.isCodeSent && (
                        <div>
                            <Text color="#3481f8" fontSize="12px" mb={15}>
                                {formatText('registration.signIn.codeSent')}
                            </Text>

                            <Box>
                                <Box mb={10}>
                                    <Text>
                                        {formatText(
                                            'registration.signIn.enterCode'
                                        )}
                                    </Text>
                                </Box>
                                <PinInput
                                    length={6}
                                    focus
                                    onChange={pin => {
                                        props.formikProps.setFieldValue(
                                            'code',
                                            pin
                                        );
                                    }}
                                    onComplete={async pin => {
                                        await props.formikProps.setFieldValue(
                                            'mode',
                                            LOGIN_MODE
                                        );
                                        props.onPinComplete(pin);
                                    }}
                                    type="tel"
                                    ref={props.setReference}
                                />
                                <Box height={5} />

                                {props.formikProps.errors.isPinValid && (
                                    <Onboarding.ValidationMessage
                                        text={
                                            props.formikProps.errors.isPinValid
                                        }
                                    />
                                )}
                            </Box>
                        </div>
                    )}
                </Flex>

                {!props.formikProps.values.isCodeSent && (
                    <Flex flexDirection="column" alignItems="center">
                        <Button
                            onClick={() => {
                                props.history.push(
                                    '/kiosk/registration/get-patient-name-step'
                                );
                            }}
                            height="50px"
                            type="ghost"
                        >
                            <Text
                                color="#3481f8"
                                fontSize="16px"
                                textAlign="center"
                            >
                                {formatText('registration.signIn.signUp')}
                            </Text>
                        </Button>
                    </Flex>
                )}
            </Flex>
        );
    }
}

export const KioskLogIn = injectIntl(KioskLogInClass);

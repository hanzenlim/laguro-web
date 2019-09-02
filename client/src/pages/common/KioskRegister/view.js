import { Box, Button, Flex, Text } from '../../../components';
import * as React from 'react';
import validator from 'validator';
import _isEmpty from 'lodash/isEmpty';
import { Onboarding } from '../the-bright-side-components';
import InfoIcon from '../../../components/Icon/infoIcon';
import PinInput from '../PinInput';
import { getFormatTextFromProps } from '../../../util/intlUtils';
import { injectIntl } from 'react-intl';

class KioskRegisterView extends React.Component {
    validate = phoneNumber => {
        const formatText = getFormatTextFromProps(this.props);
        const isNumeric = validator.isNumeric(phoneNumber);
        const hasCorrectDigitCount =
            !_isEmpty(phoneNumber) && phoneNumber.length === 10;

        if (!phoneNumber) {
            return formatText('general.pleaseFill');
        }

        if (!isNumeric) {
            return formatText('general.invalidPhone');
        }

        if (!hasCorrectDigitCount) {
            return formatText('general.mustHave10');
        }

        return '';
    };

    render() {
        const emailOrPhoneNumber =
            (!this.numberEmailInputhasBeenTouched &&
                this.props.defaultNumberEmailValue) ||
            this.props.formikProps.values.emailOrPhoneNumber;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex flexDirection="column" width="100%">
                <Flex justifyContent="center" width="100%">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('registration.stepTwo.stepTwo')}
                />
                <Onboarding.StepBlurbText
                    text={formatText('registration.stepTwo.typeInformation')}
                />
                <Flex flexDirection="column" mb="40px">
                    <Flex alignItems="flex-start" mb="10px">
                        <Text>{formatText('registration.stepTwo.phone')}</Text>
                    </Flex>

                    <Flex>
                        <Onboarding.Input
                            autoFocus={true}
                            height="50px"
                            type="text"
                            name="phoneOrEmail"
                            value={emailOrPhoneNumber}
                            onChange={e => {
                                this.numberEmailInputhasBeenTouched = true;
                                if (!e.target.value) {
                                    this.props.formikProps.setFieldError(
                                        'emailOrPhoneNumber',
                                        ''
                                    );
                                }

                                this.props.formikProps.setFieldValue(
                                    'emailOrPhoneNumber',
                                    e.target.value
                                );
                            }}
                        />
                        <Button
                            ml="20px"
                            disabled={
                                this.props.formikProps.values.isCodeSent ||
                                (this.numberEmailInputhasBeenTouched
                                    ? _isEmpty(emailOrPhoneNumber)
                                    : _isEmpty(
                                          this.props.defaultNumberEmailValue
                                      ))
                            }
                            loading={
                                !this.props.formikProps.values.isCodeSent &&
                                this.props.formikProps.isSubmitting
                            }
                            onClick={() => {
                                if (this.validate(emailOrPhoneNumber)) {
                                    this.props.formikProps.setFieldError(
                                        'emailOrPhoneNumber',
                                        this.validate(emailOrPhoneNumber)
                                    );
                                } else if (this.props.onRequestPinCode) {
                                    this.props.onRequestPinCode(
                                        emailOrPhoneNumber
                                    );
                                }
                            }}
                        >
                            {formatText('general.send')}
                        </Button>
                    </Flex>
                    {this.props.formikProps.errors.emailOrPhoneNumber && (
                        <Box mt={-13}>
                            <Onboarding.ValidationMessage
                                text={
                                    this.props.formikProps.errors
                                        .emailOrPhoneNumber
                                }
                            />
                        </Box>
                    )}
                    {this.props.formikProps.values.isCodeSent && (
                        <div>
                            <Text color="#3481f8" fontSize="12px" mb={15}>
                                {formatText(
                                    'registration.stepTwo.verificationCodeSent'
                                )}
                            </Text>

                            <Box>
                                <Box mb={10}>
                                    <Text>
                                        {formatText(
                                            'registration.stepTwo.enterVerificationCode'
                                        )}
                                    </Text>
                                </Box>
                                <PinInput
                                    length={6}
                                    focus={true}
                                    onChange={pin => {
                                        this.props.formikProps.setFieldValue(
                                            'code',
                                            pin
                                        );
                                    }}
                                    type="tel"
                                    ref={this.props.setReference}
                                />
                                <Box height={5} />

                                {this.props.formikProps.isSubmitting && (
                                    <Text color="#3481f8" fontSize="12px">
                                        {formatText(
                                            'registration.stepTwo.sending'
                                        )}
                                    </Text>
                                )}

                                {this.props.formikProps.values.isPinValid && (
                                    <Text color="#3481f8" fontSize="12px">
                                        {formatText(
                                            'registration.stepTwo.phoneVerified'
                                        )}
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
                                await this.props.onSubmitPinCode(
                                    this.props.formikProps.values.code
                                );
                                this.props.formikProps.setSubmitting(false);
                            }
                        }}
                        loading={this.props.formikProps.isSubmitting}
                        disabled={
                            this.props.formikProps.values.code.length !== 6
                        }
                    >
                        {formatText('registration.stepTwo.createNewAccount')}
                    </Onboarding.NextButton>
                )}
            </Flex>
        );
    }
}

export default injectIntl(KioskRegisterView);

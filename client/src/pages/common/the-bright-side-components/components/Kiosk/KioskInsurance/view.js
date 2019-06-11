import { Box, Button, Flex, Text } from '@laguro/basic-components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Field } from 'formik';
import * as React from 'react';
import Onboarding from '../../Onboarding';
import InsuranceUmbrella from '../../Onboarding/Assets/insuranceUmbrella';
import insuranceList from './insuranceList';
import { getFormatTextFromProps } from '../../../../../../util/intlUtils';
import {
    GENERALINFORMATION_INSURANCE_PLEASESELECT,
    GENERALINFORMATION_INSURANCE_INSURANCE,
    GENERALINFORMATION_INSURANCE_STEP1,
    GENERALINFORMATION_INSURANCE_YOURINSURANCE,
    GENERALINFORMATION_INSURANCE_STEP2,
    GENERALINFORMATION_INSURANCE_YOURINSURANCENUMBER,
    GENERALINFORMATION_INSURANCE_STEP3,
    GENERALINFORMATION_INSURANCE_YOURPLAN,
    GENERALINFORMATION_INSURANCE_NOINSURANCE,
} from '../../../../../../strings/messageStrings';
import { injectIntl } from 'react-intl';

const HAS_NO_INSURANCE = 'hasNoInsurance';

class InsuranceView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        const hasNoInsurance = this.props.formikProps.values.HAS_NO_INSURANCE;
        // in case user clicks i don't have insurance and presses back button
        if (!_isEmpty(hasNoInsurance) && JSON.parse(hasNoInsurance)) {
            this.props.formikProps.setFieldValue(HAS_NO_INSURANCE, 'false');
        }

        const pathname = _get(this.props, 'match.path', '');

        return (
            <Box width="100%" px="20px">
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(GENERALINFORMATION_INSURANCE_INSURANCE)}
                />
                <Onboarding.StepBlurbText
                    text={
                        pathname === '/kiosk'
                            ? formatText(
                                  GENERALINFORMATION_INSURANCE_PLEASESELECT
                              )
                            : "Select your insurance provider and type in your insurance number. To ensure your insurance will be verified when clicking 'Next', please check that your general information in your Account Settings is correct (i.e.: full name, DOB). If you do not have insurance, then select 'I don't have insurance' to continue"
                    }
                />
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box width={['100%', '400px', '400px']}>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                GENERALINFORMATION_INSURANCE_STEP1
                            )}
                        />
                        <Field
                            name="insuranceProvider"
                            placeholder={formatText(
                                GENERALINFORMATION_INSURANCE_YOURINSURANCE
                            )}
                            component={props => (
                                <Onboarding.SelectField
                                    {...props}
                                    options={insuranceList.map(i => (
                                        <Onboarding.SelectOption value={i.id}>
                                            {i.name}
                                        </Onboarding.SelectOption>
                                    ))}
                                    onSelect={(value, element) => {
                                        // element.props.children is the html value of the element.
                                        this.props.formikProps.setFieldValue(
                                            'insuranceProvider',
                                            _get(element, 'props.children')
                                        );
                                        this.props.formikProps.setFieldValue(
                                            'insuranceProviderId',
                                            value
                                        );
                                    }}
                                    disabled={
                                        this.props.formikProps.isSubmitting
                                    }
                                />
                            )}
                        />
                        <Box mb="15px" />
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                GENERALINFORMATION_INSURANCE_STEP2
                            )}
                        />
                        <Field
                            name="patientInsuranceNum"
                            placeholder={formatText(
                                GENERALINFORMATION_INSURANCE_YOURINSURANCENUMBER
                            )}
                            component={Onboarding.InputField}
                            disabled={this.props.formikProps.isSubmitting}
                        />
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                GENERALINFORMATION_INSURANCE_STEP3
                            )}
                        />
                        <Field
                            name="planOrGroupNumber"
                            placeholder={formatText(
                                GENERALINFORMATION_INSURANCE_YOURPLAN
                            )}
                            component={Onboarding.InputField}
                            disabled={this.props.formikProps.isSubmitting}
                        />
                    </Box>
                </Flex>
                <Button
                    width="100%"
                    onClick={async () => {
                        await this.props.formikProps.setFieldValue(
                            HAS_NO_INSURANCE,
                            'true'
                        );
                        await this.props.formikProps.submitForm();
                    }}
                    type="ghost"
                >
                    <Text
                        fontSize={[1, 2, '']}
                        color="text.blue"
                        textAlign="center"
                    >
                        {this.props.formikProps.isSubmitting
                            ? 'Loading...'
                            : formatText(
                                  GENERALINFORMATION_INSURANCE_NOINSURANCE
                              )}
                    </Text>
                </Button>
                <Onboarding.NextButton
                    disabled={this.props.formikProps.isSubmitting}
                    onClick={async () => {
                        await this.props.formikProps.setFieldValue(
                            HAS_NO_INSURANCE,
                            'false'
                        ); // in case user clicks I don't have insurance and presses back and inputs insurance information;
                        this.props.formikProps.submitForm();
                    }}
                >
                    Save and check my insurance
                </Onboarding.NextButton>
            </Box>
        );
    }
}

InsuranceView['HAS_NO_INSURANCE'] = HAS_NO_INSURANCE;

export default injectIntl(InsuranceView);

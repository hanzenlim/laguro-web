import { Box, Button, Flex, Grid, Input, Select, Text } from '@laguro/basic-components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Field } from 'formik';
import * as React from 'react';
import { KioskInsuranceProps } from '.';
import Onboarding from '../../Onboarding';
import InsuranceUmbrella from '../../Onboarding/Assets/insuranceUmbrella';
import insuranceList from './insuranceList';

const HAS_NO_INSURANCE = 'hasNoInsurance';

class InsuranceView extends React.PureComponent<KioskInsuranceProps> {
    public render() {
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
                <Onboarding.StepTitleText text="Insurance" />
                <Onboarding.StepBlurbText
                    text={
                        pathname === '/kiosk'
                            ? "Select your insurance provider and type in your insurance number. If you do not have insurance, then select 'I don't have insurance' to continue"
                            : "Select your insurance provider and type in your insurance number. To ensure your insurance will be verified when clicking 'Next', please check that your general information in your Account Settings is correct (i.e.: full name, DOB). If you do not have insurance, then select 'I don't have insurance' to continue"
                    }
                />
                <Flex flexDirection="column" alignItems="center" justifyContent="center">
                    <Box width={['100%', '400px', '400px']}>
                        <Onboarding.FormItemLabelText text="Step 1. Select insurance" />
                        <Field
                            name="insuranceProvider"
                            placeholder="Your insurance here"
                            component={props => (
                                <Onboarding.SelectField
                                    {...props}
                                    options={insuranceList.map(i => (
                                        <Onboarding.SelectOption value={i.id}>{i.name}</Onboarding.SelectOption>
                                    ))}
                                    onSelect={(value, element) => {
                                        // element.props.children is the html value of the element.
                                        this.props.formikProps.setFieldValue(
                                            'insuranceProvider',
                                            _get(element, 'props.children')
                                        );
                                        this.props.formikProps.setFieldValue('insuranceProviderId', value);
                                    }}
                                    disabled={this.props.formikProps.isSubmitting}
                                />
                            )}
                        />
                        <Box mb="15px" />
                        <Onboarding.FormItemLabelText text="Step 2. Enter insurance number" />
                        <Field
                            name="patientInsuranceNum"
                            placeholder="Your insurance number here"
                            component={Onboarding.InputField}
                            disabled={this.props.formikProps.isSubmitting}
                        />
                        <Onboarding.FormItemLabelText text="Step 3. Enter plan/group number (optional)" />
                        <Field
                            name="planOrGroupNumber"
                            placeholder="Your plan/group number here"
                            component={Onboarding.InputField}
                            disabled={this.props.formikProps.isSubmitting}
                        />
                    </Box>
                </Flex>
                <Button
                    width="100%"
                    onClick={async () => {
                        await this.props.formikProps.setFieldValue(HAS_NO_INSURANCE, 'true');
                        await this.props.formikProps.submitForm();
                    }}
                    type="ghost"
                >
                    <Text fontSize={[1, 2, '']} color="text.blue" textAlign="center">
                        {this.props.formikProps.isSubmitting ? 'Loading...' : "I don't have insurance"}
                    </Text>
                </Button>
                <Onboarding.NextButton
                    disabled={this.props.formikProps.isSubmitting}
                    onClick={async () => {
                        await this.props.formikProps.setFieldValue(HAS_NO_INSURANCE, 'false'); // in case user clicks I don't have insurance and presses back and inputs insurance information;
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

export default InsuranceView;

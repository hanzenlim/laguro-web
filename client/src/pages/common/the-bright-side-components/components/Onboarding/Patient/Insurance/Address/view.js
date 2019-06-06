import { Box, Flex } from '@laguro/basic-components';
import { Field } from 'formik';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';

const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
];

class AddressView extends React.PureComponent {
    render() {
        return (
            <Box width={['100%', '329px', '329px']} px={['20px', '0', '0']}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText text="What is your address?" />
                <Onboarding.StepBlurbText />

                <Onboarding.FormItemLabelText text="Address 1" />
                <Field
                    name="patientAddress1"
                    placeholder="Street number, street name"
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText text="Address 2" />
                <Field
                    name="patientAddress2"
                    placeholder="Apartment, suite, unit, building, etc."
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText text="City" />
                <Field
                    name="patientCity"
                    placeholder="City / District / Suburb"
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText text="State" />
                <Field
                    name="patientState"
                    component={props => (
                        <Onboarding.SelectField
                            {...props}
                            options={states.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        />
                    )}
                />
                <Box mb="15px" />
                <Onboarding.FormItemLabelText text="Postal code" />
                <Field name="patientZIP" component={Onboarding.InputField} />
                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    Next
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default AddressView;

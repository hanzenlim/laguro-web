import { Box, Flex } from '~/components';
import { Field } from 'formik';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';

import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';
import { getFormatTextFromProps } from '~/util/intlUtils';

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
    constructor(props) {
        super(props);
        this.patientAddressOne = null;
        this.city = null;
        this.patientZIP = null;
    }

    componentDidUpdate(prevProps) {
        const { formikProps } = this.props;

        // TODO: Replace this with library that automatically scrolls to the first error
        if (
            !_isEmpty(formikProps.errors) &&
            prevProps.formikProps.errors.patientAddress1 !==
                formikProps.errors.patientAddress1
        ) {
            if (this.patientAddressOne.focus) {
                this.patientAddressOne.focus();
            }
        }

        if (formikProps.submitCount !== prevProps.formikProps.submitCount) {
            if (
                !_isEmpty(formikProps.errors) &&
                formikProps.errors.patientZIP
            ) {
                if (this.patientZIP.focus) {
                    this.patientZIP.focus();
                }
            }

            if (
                !_isEmpty(formikProps.errors) &&
                formikProps.errors.patientCity
            ) {
                if (this.city.focus) {
                    this.city.focus();
                }
            }

            if (
                !_isEmpty(formikProps.errors) &&
                formikProps.errors.patientAddress1
            ) {
                if (this.patientAddressOne.focus) {
                    this.patientAddressOne.focus();
                }
            }
        }
    }

    render() {
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Box width={['100%', '329px', '329px']} px={['20px', '0', '0']}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('generalInformation.address.address')}
                />
                <Onboarding.StepBlurbText />

                <Onboarding.FormItemLabelText
                    text={formatText('generalInformation.address.address1')}
                />
                <Field
                    name="patientAddress1"
                    placeholder={formatText(
                        'generalInformation.address.streetNumber'
                    )}
                    component={Onboarding.InputField}
                    setRef={node => (this.patientAddressOne = node)}
                />
                <Onboarding.FormItemLabelText
                    text={formatText('generalInformation.address.address2')}
                />
                <Field
                    name="patientAddress2"
                    placeholder={formatText(
                        'generalInformation.address.apartments'
                    )}
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText
                    text={formatText('generalInformation.address.city')}
                />
                <Field
                    name="patientCity"
                    placeholder={formatText(
                        'generalInformation.address.cityPlaceholder'
                    )}
                    component={Onboarding.InputField}
                    setRef={node => (this.city = node)}
                />
                <Onboarding.FormItemLabelText
                    text={formatText('generalInformation.address.state')}
                />
                <Field
                    name="patientState"
                    component={props => (
                        <Onboarding.SelectField
                            {...props}
                            showSearch
                            options={states.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        />
                    )}
                />
                <Box mb="15px" />
                <Onboarding.FormItemLabelText
                    text={formatText('generalInformation.address.postalCode')}
                />
                <Field
                    name="patientZIP"
                    component={Onboarding.InputField}
                    setRef={node => (this.patientZIP = node)}
                />
                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    {formatText('general.next')}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(AddressView);

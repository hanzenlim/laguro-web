import { Box, Flex } from '@laguro/basic-components';
import { Field } from 'formik';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';
import {
    GENERAL_NEXT,
    GENERALINFORMATION_ADDRESS_ADDRESS,
    GENERALINFORMATION_ADDRESS_ADDRESS1,
    GENERALINFORMATION_ADDRESS_ADDRESS2,
    GENERALINFORMATION_ADDRESS_STREETNUMBER,
    GENERALINFORMATION_ADDRESS_APARTMENTS,
    GENERALINFORMATION_ADDRESS_CITY,
    GENERALINFORMATION_ADDRESS_CITYPLACEHOLDER,
    GENERALINFORMATION_ADDRESS_STATE,
    GENERALINFORMATION_ADDRESS_POSTALCODE,
} from '../../../../../../../../strings/messageStrings';

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
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box width={['100%', '329px', '329px']} px={['20px', '0', '0']}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(GENERALINFORMATION_ADDRESS_ADDRESS)}
                />
                <Onboarding.StepBlurbText />

                <Onboarding.FormItemLabelText
                    text={formatText(GENERALINFORMATION_ADDRESS_ADDRESS1)}
                />
                <Field
                    name="patientAddress1"
                    placeholder={formatText(
                        GENERALINFORMATION_ADDRESS_STREETNUMBER
                    )}
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText
                    text={formatText(GENERALINFORMATION_ADDRESS_ADDRESS2)}
                />
                <Field
                    name="patientAddress2"
                    placeholder={formatText(
                        GENERALINFORMATION_ADDRESS_APARTMENTS
                    )}
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText
                    text={formatText(GENERALINFORMATION_ADDRESS_CITY)}
                />
                <Field
                    name="patientCity"
                    placeholder={formatText(
                        GENERALINFORMATION_ADDRESS_CITYPLACEHOLDER
                    )}
                    component={Onboarding.InputField}
                />
                <Onboarding.FormItemLabelText
                    text={formatText(GENERALINFORMATION_ADDRESS_STATE)}
                />
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
                <Onboarding.FormItemLabelText
                    text={formatText(GENERALINFORMATION_ADDRESS_POSTALCODE)}
                />
                <Field name="patientZIP" component={Onboarding.InputField} />
                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    {formatText(GENERAL_NEXT)}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(AddressView);

import { Box, Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

class GenderView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('generalInformation.gender.gender')}
                />
                <Onboarding.StepBlurbText />

                <Onboarding.Choices
                    formKey="patientGender"
                    namesAndTexts={[
                        {
                            name: 'female',
                            text: formatText(
                                'generalInformation.gender.female'
                            ),
                        },
                        {
                            name: 'male',
                            text: formatText('generalInformation.gender.male'),
                        },
                        {
                            name: 'unknown',
                            text: formatText(
                                'generalInformation.gender.doNotAnswer'
                            ),
                        },
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    {formatText('general.next')}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(GenderView);

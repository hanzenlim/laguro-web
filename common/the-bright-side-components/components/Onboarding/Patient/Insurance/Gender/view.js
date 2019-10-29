import * as React from 'react';
import { injectIntl } from 'react-intl';

import { Box, Flex } from '~/components';
import { getFormatTextFromProps } from '~/util/intlUtils';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';

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
            </Box>
        );
    }
}

export default injectIntl(GenderView);

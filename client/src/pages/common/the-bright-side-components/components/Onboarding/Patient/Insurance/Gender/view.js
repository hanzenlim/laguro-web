import { Box, Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';
import {
    GENERALINFORMATION_GENDER_GENDER,
    GENERALINFORMATION_GENDER_FEMALE,
    GENERALINFORMATION_GENDER_MALE,
    GENERALINFORMATION_GENDER_DONOTANSWER,
    GENERAL_NEXT,
} from '../../../../../../../../strings/messageStrings';
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
                    text={formatText(GENERALINFORMATION_GENDER_GENDER)}
                />
                <Onboarding.StepBlurbText />

                <Onboarding.Choices
                    formKey="patientGender"
                    namesAndTexts={[
                        {
                            name: 'female',
                            text: formatText(GENERALINFORMATION_GENDER_FEMALE),
                        },
                        {
                            name: 'male',
                            text: formatText(GENERALINFORMATION_GENDER_MALE),
                        },
                        {
                            name: 'unknown',
                            text: formatText(
                                GENERALINFORMATION_GENDER_DONOTANSWER
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
                    {formatText(GENERAL_NEXT)}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(GenderView);

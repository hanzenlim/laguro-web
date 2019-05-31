import { Box, Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';

class GenderView extends React.PureComponent {
    render() {
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText text="What is your gender?" />
                <Onboarding.StepBlurbText />

                <Onboarding.Choices
                    formKey="patientGender"
                    namesAndTexts={[
                        { name: 'female', text: 'Female' },
                        { name: 'male', text: 'Male' },
                        { name: 'unknown', text: 'I do not wish to answer' },
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    Next
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default GenderView;

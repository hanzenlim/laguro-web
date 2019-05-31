import { Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import AppointmentIcon from '../../../Assets/appointmentIcon';

class PurposeOfVisitSelectionView extends React.PureComponent {
    render() {
        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <AppointmentIcon />
                <Onboarding.StepTitleText text="What would you like to do today?" />
                <Onboarding.StepBlurbText text="Let us know what you want to do." />

                <Onboarding.Choices
                    formKey="purposeOfVisit"
                    namesAndTexts={[
                        {
                            name: 'walkIn',
                            text: 'Make an appointment (Walk-in)',
                        },
                        {
                            name: 'checkIn',
                            text: 'I have an appointment (Check-in)',
                        },
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                >
                    Next
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default PurposeOfVisitSelectionView;

import * as React from 'react';
import { Box, Flex } from '~/components';
import Onboarding from '../..';
import AppleIcon from '../../Assets/appleIcon';

class PersonaSelectionView extends React.PureComponent {
    render() {
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <AppleIcon />
                </Flex>
                <Onboarding.StepTitleText text="Welcome!" />
                <Onboarding.StepBlurbText text="Who would you like to sign up as?" />

                <Onboarding.Choices
                    formKey="persona"
                    namesAndTexts={[
                        { name: 'patient', text: 'I am a patient' },
                        { name: 'dentist', text: 'I am a dentist' },
                        { name: 'host', text: 'I am a host' },
                    ]}
                    {...this.props}
                />
            </Box>
        );
    }
}

export default PersonaSelectionView;

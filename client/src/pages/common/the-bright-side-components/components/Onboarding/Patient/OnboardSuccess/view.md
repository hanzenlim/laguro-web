import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../../Onboarding';
import CongratsIcon from '../../Assets/congratsIcon';

const OnboardSuccessView = props => {
    const { name = '' } = props;

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Onboarding.StepTitleText text={`Welcome aboard, ${name}`} />
            <Box mx="auto" mt="50px">
                <CongratsIcon />
            </Box>
            <Box mb="20px" mt="60px">
                <Text textAlign="center" fontSize="16px" color="#303449">
                    Thank you for completing these questionaires.
                </Text>
                <Text textAlign="center" fontSize="16px" color="#303449">
                    You are now officially a Laguro Patient!
                </Text>
            </Box>
            <Box>
                <Text textAlign="center" fontSize="16px" color="#303449">
                    Please take a seat and your dentist
                </Text>
                <Text textAlign="center" fontSize="16px" color="#303449">
                    will be with you shortly.
                </Text>
            </Box>
            <Box mt="40px">
                <Button onClick={props.onNext}>Done</Button>
            </Box>
        </Flex>
    );
};

export default OnboardSuccessView;

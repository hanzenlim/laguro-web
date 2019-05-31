import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../Onboarding';
import CongratsIcon from '../../Onboarding/Assets/congratsIcon';

export const KioskFlowSuccess = props => {
    const { name = '' } = props;

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
        >
            <Onboarding.StepTitleText text={`Congrats, ${name}`} />
            <Box mx="auto" mt="50px">
                <CongratsIcon />
            </Box>
            <Box mb="20px" mt="60px">
                <Text textAlign="center" fontSize="16px" color="#303449">
                    Thank you for completing these questionaires. You're all set
                    for your appointment.
                </Text>
            </Box>
            <Box>
                <Text textAlign="center" fontSize="16px" color="#303449">
                    Please take a seat, and your dentist will be with you
                    shortly.
                </Text>
            </Box>
            <Box mt="40px">
                <Button onClick={props.onNext}>Done</Button>
            </Box>
        </Flex>
    );
};

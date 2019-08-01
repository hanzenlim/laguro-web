import React from 'react';
import { Box, Button, Flex, Text } from '../../../components';
import { injectIntl } from 'react-intl';
import { Onboarding } from '../the-bright-side-components';
import InfoIcon from '../../../components/Icon/infoIcon';
import PinInput from '../PinInput';
import { getFormatTextFromProps } from '../../../util/intlUtils';

const CheckInWithAppointmentCodeView = props => {
    const { isSubmitting, pinInputRef, validatePin, redirect } = props;
    const formatText = getFormatTextFromProps(props);

    return (
        <Box>
            <Flex flexDirection="column" width="100%">
                <Flex justifyContent="center" width="100%">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Check-in" />
                <Onboarding.StepBlurbText text="Please check your appointment reminder text for appointment code" />

                <Flex flexDirection="column" mb="40px">
                    <Flex alignItems="flex-start" mb="10px">
                        <Text>Appointment code</Text>
                    </Flex>
                    <Flex>
                        <PinInput
                            length={6}
                            focus={true}
                            onComplete={validatePin}
                            ref={pinInputRef}
                            type="tel"
                        />
                    </Flex>
                    {isSubmitting && (
                        <Text color="#3481f8" fontSize="12px">
                            {formatText('registration.stepTwo.sending')}
                        </Text>
                    )}
                    <Button width="100%" onClick={redirect} type="ghost">
                        <Text
                            fontSize={[1, 2, '']}
                            color="text.blue"
                            textAlign="center"
                        >
                            I don't have an appointment code
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default injectIntl(CheckInWithAppointmentCodeView);

import { Box, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding, { AppointmentCard } from '../../Onboarding';
import ConfirmedIcon from '../../Onboarding/Assets/confirmedIcon';

export const KioskBookingConfirmation = props => {
    const { doctorName, rating, numReviews, date, time, imageUrl } = props;

    return (
        <Box>
            <Flex justifyContent="center">
                <ConfirmedIcon />
            </Flex>
            <Onboarding.StepTitleText text="Appointment confirmation" />
            <Onboarding.StepBlurbText
                text={`Your appointment with ${doctorName} has been scheduled`}
            />

            <AppointmentCard
                imageUrl={imageUrl}
                doctorName={doctorName}
                rating={rating}
                numReviews={numReviews}
                date={date}
                time={time}
            />

            <Flex textAlign="center" flexDirection="column" mt="40px">
                <Text>
                    We have notified your dentist about this appointment.
                </Text>
            </Flex>

            <Onboarding.StartQuestionaireButton
                onNext={() => props.formikProps.submitForm()}
            >
                Next
            </Onboarding.StartQuestionaireButton>
        </Box>
    );
};

import { Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding, { AppointmentCard } from '../../Onboarding';
import InfoIcon from '../../Onboarding/Assets/infoIcon';

export const KioskCheckInConfirmation = props => {
    const { doctorName, rating, numReviews, date, time, imageUrl } = props;

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
        >
            <InfoIcon />
            <Onboarding.StepTitleText text="Appointment details" />
            <Onboarding.StepBlurbText
                text={`You have 1 appointment with ${doctorName}.`}
            />

            <AppointmentCard
                imageUrl={imageUrl}
                doctorName={doctorName}
                rating={rating}
                numReviews={numReviews}
                date={date}
                time={time}
            />

            <Flex flexDirection="column" mt="40px" mb="20px">
                <Text textAlign="center">
                    Please take a seat and your dentist will be with you
                    shortly.
                </Text>
            </Flex>

            <Onboarding.StartQuestionaireButton
                onNext={() => props.formikProps.submitForm()}
            >
                Done
            </Onboarding.StartQuestionaireButton>
        </Flex>
    );
};

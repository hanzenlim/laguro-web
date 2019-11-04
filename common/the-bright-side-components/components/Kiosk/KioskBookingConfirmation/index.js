import { Box, Flex, Text } from '~/components';
import * as React from 'react';
import Onboarding, { AppointmentCard } from '../../Onboarding';
import ConfirmedIcon from '../../Onboarding/Assets/confirmedIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '~/util/intlUtils';

class KioskBookingConfirmationClass extends React.Component {
    render() {
        const {
            patientName,
            doctorName,
            rating,
            numReviews,
            date,
            time,
            imageUrl,
        } = this.props;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Box>
                <Flex justifyContent="center">
                    <ConfirmedIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(
                        'bookAppointment.appointmentConfirmation.appointmentConfirmation'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'bookAppointment.appointmentConfirmation.yourAppointment',
                        { patientName, dentistName: doctorName }
                    )}
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
                        {formatText(
                            'bookAppointment.appointmentConfirmation.notifiedDentist'
                        )}
                    </Text>
                </Flex>

                <Onboarding.StartQuestionaireButton
                    onNext={() => this.props.formikProps.submitForm()}
                >
                    {formatText('general.next')}
                </Onboarding.StartQuestionaireButton>
            </Box>
        );
    }
}

export const KioskBookingConfirmation = injectIntl(
    KioskBookingConfirmationClass
);

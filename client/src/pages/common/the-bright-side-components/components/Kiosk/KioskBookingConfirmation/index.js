import { Box, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding, { AppointmentCard } from '../../Onboarding';
import ConfirmedIcon from '../../Onboarding/Assets/confirmedIcon';
import {
    BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_APPOINTMENTCONFIRMATION,
    BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_NOTIFIEDDENTIST,
    GENERAL_NEXT,
    BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_YOURAPPOINTMENT,
} from '../../../../../../strings/messageStrings';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../util/intlUtils';

class KioskBookingConfirmationClass extends React.Component {
    render() {
        const {
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
                        BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_APPOINTMENTCONFIRMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_YOURAPPOINTMENT,
                        { dentistName: doctorName }
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
                            BOOKAPPOINTMENT_APPOINTMENTCONFIRMATION_NOTIFIEDDENTIST
                        )}
                    </Text>
                </Flex>

                <Onboarding.StartQuestionaireButton
                    onNext={() => this.props.formikProps.submitForm()}
                >
                    {formatText(GENERAL_NEXT)}
                </Onboarding.StartQuestionaireButton>
            </Box>
        );
    }
}

export const KioskBookingConfirmation = injectIntl(
    KioskBookingConfirmationClass
);

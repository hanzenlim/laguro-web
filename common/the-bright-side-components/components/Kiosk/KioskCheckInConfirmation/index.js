import { Flex, Text } from '~/components';
import * as React from 'react';
import Onboarding, { AppointmentCard } from '../../Onboarding';
import InfoIcon from '../../Onboarding/Assets/infoIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '~/util/intlUtils';

class KioskCheckInConfirmationClass extends React.Component {
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
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <InfoIcon />
                <Onboarding.StepTitleText
                    text={formatText('final.appointmentDetails')}
                />
                <Onboarding.StepBlurbText
                    text={`${formatText(
                        'final.haveAppointmentWith'
                    )} ${doctorName}.`}
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
                        {formatText('final.pleaseTakeASeat')}
                    </Text>
                </Flex>

                <Onboarding.StartQuestionaireButton
                    onNext={() => this.props.formikProps.submitForm()}
                >
                    {formatText('general.done')}
                </Onboarding.StartQuestionaireButton>
            </Flex>
        );
    }
}

export const KioskCheckInConfirmation = injectIntl(
    KioskCheckInConfirmationClass
);

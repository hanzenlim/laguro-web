import React from 'react';
import _get from 'lodash/get';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { getFormatTextFromProps } from '~/util/intlUtils';
import { Flex, Text, Loading } from '~/components';
import Onboarding, {
    AppointmentCard,
} from '~/common/the-bright-side-components/components/Onboarding';
import InfoIcon from '~/common/the-bright-side-components/components/Onboarding/Assets/infoIcon';
import GeneralErrorPage from '~/routes/GeneralErrorPage';

import { GET_APPOINTMENT } from './queries';

const KioskAppointmentCodeConfirmation = props => {
    const router = useRouter();
    const appointmentId = router.query.id;
    const { data, loading, error } = useQuery(GET_APPOINTMENT, {
        variables: { id: appointmentId },
    });
    const formatText = getFormatTextFromProps(props);
    const appointment = _get(data, 'getAppointment', null);
    const localStartTime = _get(appointment, 'localStartTime', null);
    const dentist = _get(appointment, 'dentist', null);
    const firstName = _get(dentist, 'user.firstName', null);
    const lastName = _get(dentist, 'user.lastName', null);
    const imageUrl = _get(dentist, 'user.imageUrl', null);
    const averageRating = _get(dentist, 'averageRating', null);
    const numReviews = _get(dentist, 'numReviews', null);

    if (loading) return <Loading />;
    if (error) return <GeneralErrorPage />;

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            mt="100px"
        >
            <InfoIcon />
            <Onboarding.StepTitleText
                text={formatText('final.appointmentDetails')}
            />
            <Onboarding.StepBlurbText
                text={`${formatText(
                    'final.haveAppointmentWith'
                )} Dr. ${firstName} ${lastName}.`}
            />
            <AppointmentCard
                imageUrl={imageUrl}
                doctorName={`Dr. ${firstName} ${lastName}`}
                rating={averageRating}
                numReviews={numReviews}
                date={moment(localStartTime).format('MMM D, YYYY')}
                time={moment(localStartTime).format('h:mm A')}
            />
            <Flex flexDirection="column" mt="40px" mb="20px">
                <Text textAlign="center">
                    {formatText('final.pleaseTakeASeat')}
                </Text>
            </Flex>
            <Onboarding.StartQuestionaireButton
                onNext={() => {
                    router.push('/kiosk/registration');
                }}
            >
                {formatText('general.done')}
            </Onboarding.StartQuestionaireButton>
        </Flex>
    );
};

export default injectIntl(KioskAppointmentCodeConfirmation);

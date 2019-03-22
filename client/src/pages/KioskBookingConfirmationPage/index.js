import React, { Fragment } from 'react';
import { adopt } from 'react-adopt';
import { Query, withApollo } from 'react-apollo';
import {
    BookingConfirmation,
    Progress,
} from '@laguro/the-bright-side-components';
import { Flex, Loading } from '@laguro/basic-components';
import _get from 'lodash/get';
import moment from 'moment';

import { onKioskLogout } from '../../util/authUtils';
import { GET_APPOINTMENT } from './queries';

const progressSteps = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
    '3 MEDICAL HISTORY FORM',
    '4 INSURANCE',
];

const progressStepsForHistoryAndInsuranceDone = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
];

const KioskBookingConfirmationPage = props => {
    const appointmentId = _get(props, 'match.params.id');

    const Composed = adopt({
        getAppointment: ({ render }) => (
            <Query query={GET_APPOINTMENT} variables={{ id: appointmentId }}>
                {render}
            </Query>
        ),
    });

    return (
        <Composed>
            {({ getAppointment }) => {
                if (_get(getAppointment, 'loading')) {
                    return <Loading />;
                }

                const data = _get(getAppointment, 'data.getAppointment');

                const localStartTime = _get(data, 'localStartTime');
                const totalRating = _get(data, 'dentist.totalRating');

                const firstName = _get(data, 'dentist.user.firstName');
                const lastName = _get(data, 'dentist.user.lastName');
                const imageUrl = _get(data, 'dentist.user.imageUrl');

                const hasSubmittedHealthHistoryForm = _get(
                    data,
                    'patient.hasSubmittedHealthHistoryForm'
                );
                const hasGoneThroughInsurancePage = _get(
                    data,
                    'patient.insuranceInfo'
                );

                return (
                    <Fragment>
                        <Progress
                            step={2}
                            steps={
                                hasGoneThroughInsurancePage &&
                                hasSubmittedHealthHistoryForm
                                    ? progressStepsForHistoryAndInsuranceDone
                                    : progressSteps
                            }
                            percent={
                                hasGoneThroughInsurancePage &&
                                hasSubmittedHealthHistoryForm
                                    ? 50
                                    : 22.5
                            }
                        />
                        <Flex justifyContent="center" mt="50px">
                            <BookingConfirmation
                                imageUrl={imageUrl}
                                date={moment(localStartTime).format(
                                    'MMM D, YYYY'
                                )}
                                rating={totalRating || 0}
                                time={moment(localStartTime).format('h:mm A')}
                                doctorName={`Dr. ${firstName} ${lastName}`}
                                onNext={() => {
                                    if (
                                        hasSubmittedHealthHistoryForm &&
                                        hasGoneThroughInsurancePage
                                    ) {
                                        onKioskLogout(props.client);
                                    } else {
                                        props.history.push(
                                            '/kiosk/medical-history-form'
                                        );
                                    }
                                }}
                                hasSubmittedHealthHistoryForm={
                                    hasSubmittedHealthHistoryForm
                                }
                                hasGoneThroughInsurancePage={
                                    hasGoneThroughInsurancePage
                                }
                            />
                        </Flex>
                    </Fragment>
                );
            }}
        </Composed>
    );
};

export default withApollo(KioskBookingConfirmationPage);

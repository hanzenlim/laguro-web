import React from 'react';
import { CheckInConfirmation } from '@laguro/the-bright-side-components';
import { Flex, Loading } from '@laguro/basic-components';
import { GET_APPOINTMENT } from './queries';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import _get from 'lodash/get';
import moment from 'moment';
import { withApollo } from 'react-apollo';
import cookies from 'browser-cookies';

const KioskCheckInPage = props => {
    const appointmentId = _get(props, 'match.params.id');

    const Composed = adopt({
        getAppointment: ({ render }) => {
            return (
                <Query
                    query={GET_APPOINTMENT}
                    variables={{ id: appointmentId }}
                >
                    {render}
                </Query>
            );
        },
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

                return (
                    <Flex justifyContent="center" mt="100px">
                        <CheckInConfirmation
                            imageUrl={imageUrl}
                            date={moment(localStartTime).format('MMM D, YYYY')}
                            rating={totalRating || 0}
                            time={moment(localStartTime).format('h:mm A')}
                            doctorName={`Dr. ${firstName} ${lastName}`}
                            onNext={() => {
                                if (hasSubmittedHealthHistoryForm) {
                                    props.client.writeData({
                                        data: { activeUser: null },
                                    });

                                    cookies.set('user', '');

                                    props.history.push('/kiosk/registration');
                                } else {
                                    props.history.push(
                                        '/kiosk/medical-history-form'
                                    );
                                }
                            }}
                            hasSubmittedHealthHistoryForm={
                                hasSubmittedHealthHistoryForm
                            }
                        />
                    </Flex>
                );
            }}
        </Composed>
    );
};

export default withApollo(KioskCheckInPage);

import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import moment from 'moment';
import _get from 'lodash/get';
import _mapKeys from 'lodash/mapKeys';
import { message } from 'antd';
import { Box, Loading } from '@laguro/basic-components';
import {
    getDentistIdQueryClient,
    getDentistQuery,
    updateAppointmentMutation,
} from './queries';
import { RedirectErrorPage } from '../../GeneralErrorPage';
import DentistBookingsView from './view';
import {
    ACTIVE,
    CANCELLED,
    REJECTED_BY_PATIENT,
    PENDING_PATIENT_APPROVAL,
} from '../../../util/strings';

class DentistBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            // will be populated by OfficeFilter
            currentOfficeIds: null,
        };
    }

    getUniqueOfficeIdsFromReservations = reservations => [
        ...new Set(reservations.map(res => res.office.id)),
    ];

    // called by OfficeFilter
    onOfficeChange = officeIds =>
        this.setState({ currentOfficeIds: officeIds });

    // called by MiniCalendar
    onDateChange = date => {
        this.setState({ date });
    };

    onNextWeek = () => {
        const { date } = this.state;
        date.setDate(date.getDate() + 7);
        this.setState({ date });
    };

    onPrevWeek = () => {
        const { date } = this.state;
        date.setDate(date.getDate() - 7);
        this.setState({ date });
    };

    handleUpdateCancellation = () => {
        this.setState({ isUpdateConfirmModalVisible: false });
    };

    // used to see if new startTime and endTime of appt is in a booking
    isAppointmentTimeInBooking = (startTime, endTime) => {
        const activeReservations = this.reservations.filter(
            res => res.status === ACTIVE
        );
        for (let i = 0; i < activeReservations.length; i += 1) {
            const res = activeReservations[i];

            for (let j = 0; j < res.localAvailableTimes.length; j += 1) {
                // localAvailableTime
                const lat = res.localAvailableTimes[j];
                // if any localAvailbleTime includes (startTime, endTime) return true
                if (
                    moment(lat.startTime).isSameOrBefore(moment(startTime)) &&
                    moment(lat.endTime).isSameOrAfter(moment(endTime))
                ) {
                    return true;
                }
            }
        }

        return false;
    };

    render() {
        const { currentOfficeIds } = this.state;

        return (
            <Query query={getDentistIdQueryClient}>
                {({ data: clientData }) => (
                    <Query
                        query={getDentistQuery}
                        fetchPolicy="network-only"
                        variables={{ id: clientData.activeUser.dentistId }}
                    >
                        {({ loading, error, data, refetch }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loading)
                                return (
                                    <Box height="100vh">
                                        <Loading />
                                    </Box>
                                );

                            let appointments = _get(
                                data,
                                'getDentist.appointments'
                            );

                            appointments = appointments.map(appt => ({
                                ..._mapKeys(appt, (value, key) => {
                                    if (key === 'localStartTime')
                                        return 'startTime';
                                    if (key === 'localEndTime')
                                        return 'endTime';
                                    return key;
                                }),
                                isPending:
                                    appt.status === PENDING_PATIENT_APPROVAL,
                                isCancelled: appt.status === CANCELLED,
                                isRejected: appt.status === REJECTED_BY_PATIENT,
                            }));

                            const reservations = _get(
                                data,
                                'getDentist.reservations'
                            );

                            this.reservations = reservations;

                            return (
                                <Mutation mutation={updateAppointmentMutation}>
                                    {updateAppointmentTime => {
                                        const handleMoveEvent = async (
                                            event,
                                            start,
                                            end
                                        ) => {
                                            // save info for handleUpdateConfirmation
                                            this.apptToBeUpdated = {
                                                event,
                                                start,
                                                end,
                                            };

                                            // if user is trying to drop the appointment at the same time, don't do anything
                                            //// startTime here is localStartTime
                                            if (
                                                moment(event.start).isSame(
                                                    moment(start)
                                                ) &&
                                                moment(event.end).isSame(
                                                    moment(end)
                                                )
                                            ) {
                                                return;
                                            }
                                            // if user is trying to drag a past appointment
                                            else if (
                                                moment(event.start).isBefore(
                                                    moment()
                                                )
                                            ) {
                                                message.error(
                                                    "You can't move a past appointment!"
                                                );
                                                return;
                                            }
                                            // if user is trying to drag an appointment to a startTime that is in the past
                                            else if (
                                                moment(start).isBefore(moment())
                                            ) {
                                                message.error(
                                                    "You can't move an appointment to a past time!"
                                                );
                                                return;
                                            }
                                            // if user is trying to drag an appointment to outside of a booking
                                            else if (
                                                !this.isAppointmentTimeInBooking(
                                                    start,
                                                    end
                                                )
                                            ) {
                                                message.error(
                                                    'Appointments have to be in a booking!'
                                                );
                                                return;
                                            }

                                            this.setState({
                                                isUpdateConfirmModalVisible: true,
                                            });
                                        };

                                        const handleUpdateConfirmation = async () => {
                                            this.setState({
                                                isUpdateConfirmModalSubmitting: true,
                                            });

                                            try {
                                                await updateAppointmentTime({
                                                    variables: {
                                                        input: {
                                                            appointmentId: this
                                                                .apptToBeUpdated
                                                                .event.id,
                                                            localStartTime: this
                                                                .apptToBeUpdated
                                                                .start,
                                                            localEndTime: this
                                                                .apptToBeUpdated
                                                                .end,
                                                        },
                                                    },
                                                });

                                                await refetch();
                                            } catch (err) {
                                                throw err;
                                            } finally {
                                                this.setState({
                                                    isUpdateConfirmModalSubmitting: false,
                                                });
                                            }

                                            this.setState({
                                                isUpdateConfirmModalVisible: false,
                                            });
                                        };

                                        return (
                                            <DentistBookingsView
                                                errorMessage={
                                                    this.state.errorMessage
                                                }
                                                isUpdateConfirmModalSubmitting={
                                                    this.state
                                                        .isUpdateConfirmModalSubmitting
                                                }
                                                isUpdateConfirmModalVisible={
                                                    this.state
                                                        .isUpdateConfirmModalVisible
                                                }
                                                handleUpdateConfirmation={
                                                    handleUpdateConfirmation
                                                }
                                                handleUpdateCancellation={
                                                    this
                                                        .handleUpdateCancellation
                                                }
                                                refetch={refetch}
                                                date={this.state.date}
                                                onDateChange={this.onDateChange}
                                                onNextWeek={this.onNextWeek}
                                                onPrevWeek={this.onPrevWeek}
                                                onOfficeChange={
                                                    this.onOfficeChange
                                                }
                                                reservations={reservations}
                                                appointments={appointments}
                                                officeIds={
                                                    currentOfficeIds ||
                                                    this.getUniqueOfficeIdsFromReservations(
                                                        reservations
                                                    )
                                                }
                                                onMoveEvent={handleMoveEvent}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default DentistBookings;

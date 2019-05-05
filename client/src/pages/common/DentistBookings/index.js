import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import moment from 'moment';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import _isEmpty from 'lodash/isEmpty';
import _mapKeys from 'lodash/mapKeys';
import { message } from 'antd';
import { adopt } from 'react-adopt';
import { Loading } from '@laguro/basic-components';
import { getDentistQuery, updateAppointmentMutation } from './queries';
import { RedirectErrorPage } from '../../GeneralErrorPage';
import DentistBookingsView from './view';
import {
    CANCELLED,
    REJECTED_BY_PATIENT,
    PENDING_PATIENT_APPROVAL,
} from '../../../util/strings';
import { getUser } from '../../../util/authUtils';
import { RecurringWeekDayAvailability } from '../../../util/recurringWeekDayAvailability';
import { appointmentClient } from '../../../util/apolloClients';

const userDentistId = _get(getUser(), 'dentistId');

const Composed = adopt({
    getDentist: ({ render }) => (
        <Query
            query={getDentistQuery}
            fetchPolicy="network-only"
            variables={{ id: userDentistId }}
        >
            {render}
        </Query>
    ),
    updateAppointmentMutation: ({ render }) => (
        <Mutation
            mutation={updateAppointmentMutation}
            client={appointmentClient}
        >
            {render}
        </Mutation>
    ),
});

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

    getUniqueOfficeIdsFromAppointments = appointments => [
        ...new Set(appointments.map(appt => appt.office.id)),
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

    // used to see if new startTime and endTime of appt is within its listing
    isApptWithinListing = (startTime, endTime) => {
        for (let i = 0; i < this.officeListings.length; i += 1) {
            const res = this.officeListings[i];

            for (let j = 0; j < res.localAvailableTimes.length; j += 1) {
                // localAvailableTime
                const lat = res.localAvailableTimes[j];
                // if any localAvailbleTime includes (startTime, endTime) return true
                if (
                    moment(lat.startTime).isSameOrBefore(moment(startTime)) &&
                    moment(lat.endTime).isSameOrAfter(moment(endTime))
                ) {
                    this.newListingId = lat.listingId;
                    return true;
                }
            }
        }

        return false;
    };

    getOfficeListings = offices => {
        const officeListings = _flatten(
            offices
                .filter(i => i)
                .map((office, index) => {
                    return {
                        id: (index + 1).toString(),
                        office,
                        appointments: [{ id: '' }],
                        host: office.host,
                        equipmentSelected: office.equipment.map(eq => eq.name),
                        localAvailableTimes: _flatten(
                            office.listings.map(listing =>
                                new RecurringWeekDayAvailability(
                                    listing.availability
                                )
                                    .getTimeIntervals(
                                        '2000-01-01',
                                        '2100-01-01'
                                    )
                                    .map(interval => ({
                                        startTime: interval.localStartTime,
                                        endTime: interval.localEndTime,
                                        numChairsAvailable:
                                            listing.numChairsAvailable,
                                        listingId: listing.id,
                                    }))
                                    .filter(interval =>
                                        moment(interval.startTime).isBefore(
                                            moment().add(3, 'years')
                                        )
                                    )
                            )
                        ),
                    };
                })
                .map(officeListing =>
                    officeListing.localAvailableTimes.map((lat, index) => ({
                        ...officeListing,
                        numChairsSelected: lat.numChairsAvailable,
                        localAvailableTimes: [lat],
                        id: (
                            100000000000 +
                            parseInt(officeListing.id) * index
                        ).toString(),
                    }))
                )
        );

        return officeListings;
    };

    getMappedAppointments = appointments =>
        appointments.map(appt => ({
            ...appt,
            reservation: { office: appt.office },
        }));

    handleMoveEvent = async (event, start, end) => {
        // save info for handleUpdateConfirmation
        this.apptToBeUpdated = {
            event,
            start,
            end,
        };

        // if user is trying to drop the appointment at the same time, don't do anything
        if (
            moment(event.start).isSame(moment(start)) &&
            moment(event.end).isSame(moment(end))
        ) {
            return;
        }
        // if user is trying to drag a past appointment
        else if (moment(event.start).isBefore(moment())) {
            message.error("You can't move a past appointment!");
            return;
        }
        // if user is trying to drag an appointment to a startTime that is in the past
        else if (moment(start).isBefore(moment())) {
            message.error("You can't move an appointment to a past time!");
            return;
        }
        // if user is trying to drag an appointment to outside of a booking
        else if (!this.isApptWithinListing(start, end)) {
            message.error('Appointments have to be in a listing!');
            return;
        }

        this.setState({
            isUpdateConfirmModalVisible: true,
        });
    };

    handleUpdateConfirmation = async () => {
        this.setState({
            isUpdateConfirmModalSubmitting: true,
        });

        try {
            await this.updateAppointmentMutation({
                variables: {
                    input: {
                        appointmentId: this.apptToBeUpdated.event.id,
                        listingId: this.newListingId,
                        localStartTime: this.apptToBeUpdated.start,
                        localEndTime: this.apptToBeUpdated.end,
                    },
                },
            });

            await this.refetch();
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

    render() {
        const { currentOfficeIds } = this.state;

        return (
            <Composed>
                {({
                    getDentist: {
                        loading: getDentistIsLoading,
                        error: getDentistHasError,
                        data: dentistData,
                        refetch,
                    },
                    updateAppointmentMutation,
                }) => {
                    if (getDentistIsLoading) return <Loading />;
                    if (getDentistHasError) return <RedirectErrorPage />;

                    this.updateAppointmentMutation = updateAppointmentMutation;
                    this.refetch = refetch;

                    const dentist = _get(dentistData, 'getDentist');
                    let appointments = _get(dentist, 'appointments');
                    const offices = _get(dentist, 'preferredLocations');

                    appointments = appointments.map(appt => ({
                        ..._mapKeys(appt, (value, key) => {
                            if (key === 'localStartTime') return 'startTime';
                            if (key === 'localEndTime') return 'endTime';
                            return key;
                        }),
                        isPending: appt.status === PENDING_PATIENT_APPROVAL,
                        isCancelled: appt.status === CANCELLED,
                        isRejected: appt.status === REJECTED_BY_PATIENT,
                    }));

                    if (_isEmpty(this.officeListings)) {
                        this.officeListings = this.getOfficeListings(offices);
                    }

                    const allOfficeIds = offices.map(o => o.id);

                    return (
                        <DentistBookingsView
                            errorMessage={this.state.errorMessage}
                            isUpdateConfirmModalSubmitting={
                                this.state.isUpdateConfirmModalSubmitting
                            }
                            isUpdateConfirmModalVisible={
                                this.state.isUpdateConfirmModalVisible
                            }
                            handleUpdateConfirmation={
                                this.handleUpdateConfirmation
                            }
                            handleUpdateCancellation={
                                this.handleUpdateCancellation
                            }
                            refetch={refetch}
                            date={this.state.date}
                            onDateChange={this.onDateChange}
                            onNextWeek={this.onNextWeek}
                            onPrevWeek={this.onPrevWeek}
                            onOfficeChange={this.onOfficeChange}
                            appointments={this.getMappedAppointments(
                                appointments
                            )}
                            officeIds={currentOfficeIds || allOfficeIds}
                            allOfficeIds={allOfficeIds}
                            onMoveEvent={this.handleMoveEvent}
                            officeListings={this.officeListings}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default DentistBookings;

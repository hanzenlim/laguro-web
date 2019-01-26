import React, { Component } from 'react';
import moment from 'moment';
import _flatten from 'lodash/flatten';
import _isEmpty from 'lodash/isEmpty';
import hexToRgba from 'hex-to-rgba';
import DentistCalendarView from './view';
import {
    CANCELLED,
    ACTIVE,
    REJECTED_BY_PATIENT,
    PENDING_PATIENT_APPROVAL,
} from '../../../util/strings';

const OFFICE_COLORS = [
    '#71DC4D',
    '#FFCE70',
    '#3890FA',
    '#FF7B2A',
    '#69F6DE',
    '#FF5A8B',
    '#3B8B9B',
    '#417505',
    '#915B3C',
    '#024592',
    '#DC1919',
    '#FF9B21',
    '#B5DCA8',
    '#A48BFF',
    '#FFD7BE',
    '#42857A',
    '#CE8198',
    '#A9CBE8',
    '#D9C199',
    '#85A4C8',
];

const getOfficeIdToColorMap = officeIds => {
    const map = {};
    for (let i = 0; i < officeIds.length; i += 1) {
        map[officeIds[i]] = OFFICE_COLORS[i % OFFICE_COLORS.length];
    }

    return map;
};

class DentistCalendar extends Component {
    constructor() {
        super();
        this.state = {
            resId: null,
            apptId: null,
        };
    }

    onReservationClick = (e, resEvent) => {
        this.setState({ resId: resEvent.id.slice(0, 36) });
    };

    closeResModal = () => this.setState({ resId: null });

    onAppointmentClick = (e, apptEvent) => {
        this.setState({ apptId: apptEvent.id });
    };

    closeApptModal = () => this.setState({ apptId: null });

    render() {
        const officeIdToColorMap = getOfficeIdToColorMap(
            this.props.reservations
                .filter(res => res.status === ACTIVE)
                .map(res => res.office.id)
        );

        const appointmentEvents = this.props.appointments
            .filter(
                appt =>
                    this.props.offices.includes(appt.reservation.office.id) &&
                    appt.status !== CANCELLED &&
                    appt.status !== REJECTED_BY_PATIENT
            )
            .map(appt => ({
                id: appt.id,
                title: `${appt.patient.firstName} ${appt.patient.lastName}`,
                start: moment(appt.startTime).toDate(),
                end: moment(appt.endTime).toDate(),
                color:
                    appt.reservation.status !== CANCELLED
                        ? officeIdToColorMap[appt.reservation.office.id]
                        : '#b7b7b7',
                image: appt.patient.imageUrl,
                isPending: appt.status === PENDING_PATIENT_APPROVAL,
            }));

        const reservationEvents = _flatten(
            this.props.reservations
                .filter(
                    res =>
                        this.props.offices.includes(res.office.id) &&
                        res.status !== CANCELLED
                )
                .map(res =>
                    res.localAvailableTimes.map(lat => ({
                        id: `${res.id}${lat.startTime}`,
                        start: moment(lat.startTime).toDate(),
                        end: moment(lat.endTime).toDate(),
                        color: hexToRgba(
                            officeIdToColorMap[res.office.id],
                            0.1
                        ),
                    }))
                )
        );
        return (
            <DentistCalendarView
                date={this.props.date}
                onReservationClick={this.onReservationClick}
                onAppointmentClick={this.onAppointmentClick}
                appointmentEvents={
                    !_isEmpty(this.props.offices) ? appointmentEvents : []
                }
                reservationEvents={
                    !_isEmpty(this.props.offices) ? reservationEvents : []
                }
                reservation={
                    this.props.reservations.filter(
                        res => res.id === this.state.resId
                    )[0]
                }
                appointment={
                    this.props.appointments.filter(
                        appt => appt.id === this.state.apptId
                    )[0]
                }
                closeResModal={this.closeResModal}
                closeApptModal={this.closeApptModal}
                resId={this.state.resId}
                apptId={this.state.apptId}
                onNextWeek={this.props.onNextWeek}
                onPrevWeek={this.props.onPrevWeek}
                refetch={this.props.refetch}
                onMoveEvent={this.props.onMoveEvent}
            />
        );
    }
}

export default DentistCalendar;

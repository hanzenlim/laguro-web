import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AppointmentDetails from './AppointmentDetails';

import Appointment from '../models/appointment';
import { PATIENT_ID, END_TIME, STATUS, ACTIVE } from '../util/strings';

class PatientAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        };
    }

    componentWillMount() {
        this.getAppointments();
    }

    async getAppointments() {
        const { patientId } = this.props;
        const appointments = await Appointment.query(PATIENT_ID, patientId, {
            sortKey: `${END_TIME}`,
            rangeStart: `${moment().format()}`,
            filters: [
                {
                    filterKey: `${STATUS}`,
                    filterValue: `${ACTIVE}`
                }
            ]
        });
        this.setState({ appointments });
    }

    // TODO: Calcalation of refund amount should be done in the backend, not frontend.
    // calculate percentage of appointment cost to refund
    calculateAppointmentRefund = appointment => {
        const ms = moment().diff(moment(appointment.dateCreated));
        const timeElapsedInHours = moment.duration(ms).asHours();
        if (timeElapsedInHours < 24) {
            return 1;
        }
        if (timeElapsedInHours < 48) {
            return 0.5;
        }

        return 0;
    };

    cancelAppointment = async appointment => {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete appointment for ${moment(appointment.startTime).format(
                    'MMM D, h:mm a'
                )}?. A total amount of $${Math.round(
                    20 * this.calculateAppointmentRefund(appointment)
                )}`
            )
        ) {
            await Appointment.delete(appointment.id);
            await this.getAppointments();
        }
    };

    getAppointmentDetails(appointments) {
        return appointments.map(appointment => (
            <AppointmentDetails
                key={appointment.id}
                appointment={appointment}
                cancelAppointment={this.cancelAppointment}
            />
        ));
    }

    render() {
        const appointments = this.state.appointments;
        if (!appointments.length) {
            return (
                <div>
                    <h6>
                        {'No appointments yet - '}
                        <Link
                            className="blue-text text-darken-2"
                            to={'/dentist/search'}
                        >
                            search for dentists to schedule an appointment
                        </Link>
                    </h6>
                </div>
            );
        }
        const appointmentDetails = this.getAppointmentDetails(appointments);
        return (
            <div>
                <h5>Upcoming Appointments</h5>
                <div className="appointment profile-sectionl">
                    <div className="appointment_header">
                        {appointmentDetails}
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientAppointments;

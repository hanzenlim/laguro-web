import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AppointmentDetails from './AppointmentDetails';

import Appointment from '../models/appointment';
import { PATIENT_ID } from '../util/strings';

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
        const appointments = await Appointment.query(PATIENT_ID, patientId);
        this.setState({ appointments });
    }

    async cancelAppointment(appointment) {
        if (
            // eslint-disable-next-line
            confirm(
                `Delete appointment for ${moment(appointment.startTime).format(
                    'MMM D, h:mm a'
                )}?`
            )
        ) {
            await Appointment.delete(appointment.id);
            await this.getAppointments();
        }
    }

    getAppointmentDetails(appointments) {
        return appointments.map(appointment => (
            <AppointmentDetails
                key={appointment.id}
                appointment={appointment}
                cancelAppointment={this.cancelAppointment.bind(
                    this,
                    appointment
                )}
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
                            to={'/dentists/search'}
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

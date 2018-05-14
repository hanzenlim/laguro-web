import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions';

class AppointmentOptions extends Component {
    reserveAppt(procedure) {
        const {
            auth, reservation, appointments, index,
        } = this.props;
        if (auth && auth.data) {
            for (let i = index; i < appointments.length; i++) {
                const overlap = this.timeComparison(
                    appointments[index].time,
                    appointments[i].time,
                    procedure.duration,
                );

                if (overlap) {
                    this.props.reserveAppointment(
                        reservation._id,
                        appointments[i]._id,
                        auth.data._id,
                    );
                }
            }
        } else {
            window.location.href = '/auth/google';
        }
    }

    // compare two times to see if an appointment at time1 with duration = duration would overlap time2
    timeComparison(time1, time2, duration) {
        return moment(time1)
            .add(duration, 'minutes')
            .isAfter(moment(time2));
    }

    // Insure that there is enough time for the appointment the patient is attempting to book
    invalidDurationCheck(reservation, procedure, appointments, index) {
    // dont allow reservations to go past the closing time
        const pastClosing = this.timeComparison(
            appointments[index].time,
            reservation.time_end,
            procedure.duration,
        );

        if (pastClosing) {
            return true;
        }

        // dont allow reservations that go over into the next time slot if that slot is already reserved
        for (let i = index; i < appointments.length; i++) {
            const overlap = this.timeComparison(
                appointments[index].time,
                appointments[i].time,
                procedure.duration,
            );

            const reserved = appointments[i].patient_id;

            if (overlap && reserved) {
                return true;
            }
        }

        return false;
    }

    renderProcedureButtons() {
        const {
            procedures, appointments, index, reservation,
        } = this.props;
        return procedures.map(procedure => (
            <button
                key={procedure.name}
                className="procedure waves-effect btn light-blue lighten-2"
                type="button"
                disabled={this.invalidDurationCheck(
                    reservation,
                    procedure,
                    appointments,
                    index,
                )}
                onClick={this.reserveAppt.bind(this, procedure)}
            >
                {`${procedure.name} - ${procedure.duration} mins`}
            </button>
        ));
    }

    render() {
        return <div className="procedureBtns">{this.renderProcedureButtons()}</div>;
    }
}

export default connect(null, actions)(AppointmentOptions);

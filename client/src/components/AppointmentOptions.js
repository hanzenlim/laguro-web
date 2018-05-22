import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getStartTime } from '../util/timeUtil';
import { RESERVED_BY } from '../util/strings';

class AppointmentOptions extends Component {
    reserveAppointment(procedure) {
        const { auth, dentist, reservation, index } = this.props;
        const startTime = getStartTime(index, reservation.startTime);
        const endTime = startTime.clone();
        endTime.add(procedure.duration, 'minutes');
        const params = {
            reservationId: reservation.id,
            dentistId: dentist.id,
            patientId: auth.id,
            procedure,
            location: reservation.office.location,
            startTime,
            endTime,
            // TODO plug in totalPaid from reservation calculation once available
            totalPaid: 100
        };
        if (auth) {
            this.props.createAppointment(params);
            this.props.queryReservations(RESERVED_BY, dentist.id);
        } else {
            window.location.href = '/auth/google';
        }
    }

    renderProcedureButtons() {
        const { procedures } = this.props;
        return procedures.map(procedure => (
            <button
                key={procedure.name}
                className="procedure waves-effect btn light-blue lighten-2"
                type="button"
                disabled={this.props.distance < procedure.duration}
                onClick={this.reserveAppointment.bind(this, procedure)}
            >
                {`${procedure.name} - ${procedure.duration} mins`}
            </button>
        ));
    }

    render() {
        return (
            <div className="procedureBtns">{this.renderProcedureButtons()}</div>
        );
    }
}

export default connect(null, actions)(AppointmentOptions);

import React, { Component } from 'react';
import moment from 'moment';

class AppointmentDetails extends Component {
    render() {
        const { appointment } = this.props;
        return (
            <div key={appointment.id} className="card-panel">
                {appointment.procedure.name}
                <div className="content">
                    <p>
                        {moment(appointment.startTime).format(
                            'MMM D, h:mm a - '
                        )}
                        {moment(appointment.endTime).format('h:mm a')}
                    </p>
                </div>
                <h6
                    onClick={this.props.cancelAppointment}
                    className="red-text valign-wrapper"
                    style={{ cursor: 'pointer' }}
                >
                    <i className="material-icons" style={{ fontSize: '18px' }}>
                        delete_forever
                    </i>
                    Cancel Appointment
                </h6>
            </div>
        );
    }
}

export default AppointmentDetails;

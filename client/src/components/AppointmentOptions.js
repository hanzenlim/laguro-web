import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { getStartTime } from '../util/timeUtil';

class AppointmentOptions extends Component {
    constructor(props) {
        super(props);

        this.state = { redirectToPayment: false, procedure: null };
    }

    initiatePayment(procedure) {
        const { auth } = this.props;
        if (auth) {
            this.setState({ procedure, redirectToPayment: true });
        } else {
            this.props.toggleLoginModal();
        }
    }

    renderProcedureButtons() {
        const { procedures } = this.props;
        return procedures.map(procedure => (
            <button
                key={procedure.name}
                className="procedure waves-effect btn light-blue lighten-2"
                type="button"
                disabled={
                    this.props.durationToNextAppointment < procedure.duration
                }
                onClick={this.initiatePayment.bind(this, procedure)}
            >
                {`${procedure.name} - ${procedure.duration} mins`}
            </button>
        ));
    }

    render() {
        const { redirectToPayment } = this.state;

        if (redirectToPayment) {
            const { auth, reservation, index } = this.props;
            let { procedure } = this.state;

            const startTime = getStartTime(index, reservation.startTime);
            const endTime = startTime.clone();
            endTime.add(procedure.duration, 'minutes');

            procedure = JSON.stringify(procedure);

            return (
                <Redirect
                    push
                    to={{
                        pathname: '/payment',
                        search: `?type=appointment&totalPaid=10000&time=[${moment(
                            startTime
                        ).format()},${moment(
                            endTime
                        ).format()}]&procedure=${procedure}&reservationId=${
                            reservation.id
                        }&patientId=${auth.id}`
                    }}
                />
            );
        }

        return (
            <div className="procedureBtns">{this.renderProcedureButtons()}</div>
        );
    }
}

export default connect(null, actions)(AppointmentOptions);

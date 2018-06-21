import React, { Component } from 'react';
import moment from 'moment';
import { Typography } from './common';
import { getStartTime, calculateTimeslots } from '../util/timeUtil';

class Appointments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {
            reservation,
            duration_to_next_appointment,
            start_time
        } = e.target.dataset;
        this.props.handleBookAppointment(
            start_time,
            duration_to_next_appointment,
            JSON.parse(reservation)
        );
    }

    render() {
        const { reservation } = this.props;
        const timeslots = calculateTimeslots(
            reservation,
            reservation.appointments
        );
        return timeslots.map((durationToNextAppointment, index) => (
            <div key={index}>
                {durationToNextAppointment !== 0 ? (
                    <div>
                        <a
                            className="text-accent-4 dropdown-trigger"
                            style={{ cursor: 'pointer' }}
                            data-target={`dropdown${index}`}
                        >
                            {/* If no patient has reserved this appt */}
                            <Typography
                                color="appointment_green"
                                data-reservation={JSON.stringify(reservation)}
                                data-duration_to_next_appointment={
                                    durationToNextAppointment
                                }
                                data-start_time={moment(
                                    getStartTime(index, reservation.startTime)
                                ).format()}
                                onClick={this.handleClick}
                            >
                                {`${getStartTime(
                                    index,
                                    reservation.startTime
                                ).format('h:mm a')} - Available!`}
                            </Typography>
                        </a>
                    </div>
                ) : (
                    <span
                        className="grey-text"
                        style={{
                            textDecoration: 'line-through',
                            cursor: 'not-allowed'
                        }}
                    >
                        {/* If appt has already been reserved */}
                        {`${getStartTime(index, reservation.startTime).format(
                            'h:mm a'
                        )} - Reserved`}
                    </span>
                )}
            </div>
        ));
    }
}

export default Appointments;

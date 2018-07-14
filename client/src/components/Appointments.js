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
        let appointments = reservation.appointments
            ? reservation.appointments
            : [];

        const timeslots = calculateTimeslots(reservation, appointments);
        const currentTime = moment();
        const appointmentSlots = timeslots.map(
            (durationToNextAppointment, index) => {
                const blockStartTime = getStartTime(
                    index,
                    reservation.startTime
                );
                return (
                    <div key={index}>
                        {durationToNextAppointment !== 0 &&
                        blockStartTime.isAfter(currentTime) ? (
                                <div data-name="available-slot">
                                    <a
                                        className="text-accent-4 dropdown-trigger"
                                        style={{ cursor: 'pointer' }}
                                        data-target={`dropdown${index}`}
                                    >
                                        {/* If no patient has reserved this appt */}
                                        <Typography
                                            color="appointment_green"
                                            data-reservation={JSON.stringify(
                                                reservation
                                            )}
                                            data-duration_to_next_appointment={
                                                durationToNextAppointment
                                            }
                                            data-start_time={blockStartTime.format()}
                                            onClick={this.handleClick}
                                        >
                                            {`${blockStartTime.format(
                                                'h:mm a'
                                            )} - Available!`}
                                        </Typography>
                                    </a>
                                </div>
                            ) : (
                                <span
                                    className="grey-text"
                                    data-name="unavailable-slot"
                                    style={{
                                        textDecoration: 'line-through',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    {/* If appt has already been reserved */}
                                    {`${blockStartTime.format(
                                        'h:mm a'
                                    )} - Reserved`}
                                </span>
                            )}
                    </div>
                );
            }
        );
        return <div className="reservation-schedule">{appointmentSlots}</div>;
    }
}

export default Appointments;

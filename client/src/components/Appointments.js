import React, { Component } from 'react';
import moment from 'moment';
import { Typography } from './common';
import {
    DEFAULT_APPOINTMENT_WINDOW_SIZE,
    calculateTimeDifferenceInMinutes,
    calculateTimeSlotIndex,
    getStartTime
} from '../util/timeUtil';

class Appointments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    calculateTimeslots() {
        const { reservation } = this.props;
        const { appointments } = reservation;
        // number of minutes available between reservation start and end time
        const windowSize = calculateTimeDifferenceInMinutes(
            reservation.startTime,
            reservation.endTime
        );
        const numSlots = Math.floor(
            windowSize / DEFAULT_APPOINTMENT_WINDOW_SIZE
        );
        const timeslots = new Array(numSlots).fill(true);

        // find all blocks that are not available, mark them
        for (let i = 0; i < appointments.length; i += 1) {
            const currentAppointment = appointments[i];
            const startBlock = calculateTimeSlotIndex(
                reservation.startTime,
                currentAppointment.startTime
            );
            const endBlock =
                startBlock -
                1 +
                Math.ceil(
                    currentAppointment.procedure.duration /
                        DEFAULT_APPOINTMENT_WINDOW_SIZE
                );
            for (let j = startBlock; j <= endBlock; j += 1) {
                timeslots[j] = 0;
            }
        }

        // mark available blocks by the number of minutes from start timeout
        // to next unavailable block or the end
        // this allows us to check whether we have enough time for a procedure
        let durationToNextAppointment = calculateTimeDifferenceInMinutes(
            getStartTime(timeslots.length - 1, reservation.startTime),
            reservation.endTime
        );
        for (let i = timeslots.length - 1; i >= 0; i -= 1) {
            if (timeslots[i]) {
                timeslots[i] = durationToNextAppointment;
                durationToNextAppointment += DEFAULT_APPOINTMENT_WINDOW_SIZE;
            } else {
                durationToNextAppointment = DEFAULT_APPOINTMENT_WINDOW_SIZE;
            }
        }
        return timeslots;
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
        const timeslots = this.calculateTimeslots();
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

import React, { Component } from 'react';

import AppointmentOptions from './AppointmentOptions';
import {
    DEFAULT_APPOINTMENT_WINDOW_SIZE,
    calculateTimeDifferenceInMinutes,
    calculateBlockIndex,
    getStartTime
} from '../util/timeUtil';

class Appointments extends Component {
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
            const startBlock = calculateBlockIndex(
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
        let distanceToNextAppointment = calculateTimeDifferenceInMinutes(
            getStartTime(timeslots.length - 1, reservation.startTime),
            reservation.endTime
        );
        for (let i = timeslots.length - 1; i >= 0; i -= 1) {
            if (timeslots[i]) {
                timeslots[i] = distanceToNextAppointment;
                distanceToNextAppointment += DEFAULT_APPOINTMENT_WINDOW_SIZE;
            } else {
                distanceToNextAppointment = DEFAULT_APPOINTMENT_WINDOW_SIZE;
            }
        }
        return timeslots;
    }

    render() {
        const { auth, dentist, reservation } = this.props;
        const timeslots = this.calculateTimeslots();
        return timeslots.map((distance, index) => (
            <div key={index}>
                {distance ? (
                    <div>
                        <a
                            className="light-green-text text-accent-4 dropdown-trigger"
                            style={{ cursor: 'pointer' }}
                            data-target={`dropdown${index}`}
                        >
                            {/* If no patient has reserved this appt */}
                            {`${getStartTime(
                                index,
                                reservation.startTime
                            ).format('h:mm a')} - Available!`}
                        </a>
                        <ul
                            className="dropdown-content"
                            id={`dropdown${index}`}
                        >
                            <AppointmentOptions
                                procedures={dentist.procedures}
                                auth={auth}
                                index={index}
                                distance={distance}
                                dentist={dentist}
                                reservation={reservation}
                            />
                        </ul>
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

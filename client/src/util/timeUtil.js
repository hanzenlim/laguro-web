import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const DEFAULT_APPOINTMENT_WINDOW_SIZE = 15;

export const convertToUnixTimestamp = timestamp => {
    return moment(timestamp).valueOf();
};

const MINUTES_IN_HALF_HOUR = 30;

// return the moment corresponding to the nearest next half hours
// if it's 12:15, nearest next half hour is 12:30
export const getNextHalfHour = () => {
    var currentMoment = moment();
    const remainder =
        MINUTES_IN_HALF_HOUR - currentMoment.minute() % MINUTES_IN_HALF_HOUR;
    return currentMoment.add(remainder, 'minutes');
};

export const calculateTimeDifferenceInMinutes = (t1, t2) => {
    return moment(t2).diff(moment(t1), 'minutes');
};

// compare two times to see if one is at or after the other
export const isSameOrAfter = (time1, time2) => {
    return moment(time1).isSameOrAfter(moment(time2));
};

// get index for corresponding time if we create an interview based
// on a start time and end time, where each block is of length
// DEFAULT_APPOINTMENT_WINDOW_SIZE
export const calculateTimeSlotIndex = (baseTime, currentTime) => {
    return Math.ceil(
        calculateTimeDifferenceInMinutes(baseTime, currentTime) /
            DEFAULT_APPOINTMENT_WINDOW_SIZE
    );
};

// takes two times and formats their display based on when those times are
export const formatListingTime = (startTime, endTime) => {
    const time = 'h:mm a';
    const day = 'MMMM D';

    // if listing is not in the same year, display full length format
    if (!moment(startTime).isSame(moment(), 'year')) {
        return (
            moment(startTime).format(`LL, ${time} - `) +
            moment(endTime).format(`LL, ${time}`)
        );
    }

    // if listing start time and end time are different days, display day for both start and end time
    if (!moment(startTime).isSame(moment(endTime), 'day')) {
        return (
            moment(startTime).format(`${day}, ${time} - `) +
            moment(endTime).format(`${day}, ${time}`)
        );
    }

    // if listing start time and end time are same day, display condensed format
    return (
        moment(startTime).format(`${day}, ${time} - `) +
        moment(endTime).format(`${time}`)
    );
};

// get startTime of an index where each block except the last is of length
// DEFAULT_APPOINTMENT_WINDOW_SIZE, with initial block starting with startTime
export const getStartTime = (index, startTime) => {
    return moment(startTime)
        .clone()
        .add(DEFAULT_APPOINTMENT_WINDOW_SIZE * index, 'minutes');
};

export const calculateTimeslots = (reservation, appointments) => {
    // number of minutes available between reservation start and end time
    const windowSize = calculateTimeDifferenceInMinutes(
        reservation.startTime,
        reservation.endTime
    );
    const numSlots = Math.floor(windowSize / DEFAULT_APPOINTMENT_WINDOW_SIZE);
    const timeslots = new Array(numSlots).fill(true);

    // find all blocks that are not available, mark them
    for (let i = 0; i < appointments.length; i += 1) {
        const currentAppointment = appointments[i];
        const startBlock = calculateTimeSlotIndex(
            reservation.startTime,
            currentAppointment.startTime
        );

        // if appointment with procedure, use the procedure for duration
        // else, calc duration from reservation start/endtime
        const duration = currentAppointment.procedure
            ? currentAppointment.procedure.duration
            : calculateTimeDifferenceInMinutes(
                currentAppointment.startTime,
                currentAppointment.endTime
            );

        const endBlock =
            startBlock -
            1 +
            Math.ceil(duration / DEFAULT_APPOINTMENT_WINDOW_SIZE);
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
};

import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const DEFAULT_APPOINTMENT_WINDOW_SIZE = 30;

export const convertToUnixTimestamp = timestamp => {
    return moment(timestamp).valueOf();
};

const MS_IN_MINUTE = 60000;
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
    return (
        (convertToUnixTimestamp(t2) - convertToUnixTimestamp(t1)) / MS_IN_MINUTE
    );
};

// compare two times to see if one is at or after the other
export const isSameOrAfter = (time1, time2) => {
    return moment(time1).isSameOrAfter(moment(time2));
};

// get index for corresponding time if we create an interview based
// on a start time and end time, where each block is of length
// DEFAULT_APPOINTMENT_WINDOW_SIZE
export const calculateBlockIndex = (baseTime, currentTime) => {
    return (
        calculateTimeDifferenceInMinutes(baseTime, currentTime) /
        DEFAULT_APPOINTMENT_WINDOW_SIZE
    );
};

// get startTime of an index where each block except the last is of length
// DEFAULT_APPOINTMENT_WINDOW_SIZE, with initial block starting with startTime
export const getStartTime = (index, startTime) => {
    return moment(startTime)
        .clone()
        .add(DEFAULT_APPOINTMENT_WINDOW_SIZE * index, 'minutes');
};

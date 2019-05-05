import moment from 'moment-timezone';

const TIME_FIELD = ['startTime', 'endTime'];
const DEFAULT_TIMEZONE = 'America/Los_Angeles';
const MINUTES_IN_HOUR = 60;
const LOCAL_TIMESTAMP_LENGTH = 19;
export const REMINDER_TIME_PREFIX_LENGTH = 10;
export const TIME_LENGTH = 8;
export const LOCAL_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export const addDays = (timestamp, numDays) =>
    moment(timestamp)
        .add(numDays, 'days')
        .utc()
        .format();

export const standardizeTime = timestamp => {
    if (!timestamp) {
        return null;
    }
    return moment(timestamp)
        .utc()
        .format();
};

export const getPreviousTime = days =>
    moment()
        .subtract(days, 'days')
        .utc()
        .format();

export const getCurrentTime = () =>
    moment()
        .utc()
        .format();

export const isTimeInPast = time => moment().isAfter(moment(time));

// format to be human-friendly
// example: August 8, 2018 11:30 AM
// TODO need long term solution, such as storing patient's zipcode to get timezone
// for now, we have all farmatted times in PST
export const formatTime = time =>
    `${moment(time)
        .tz('America/Los_Angeles')
        .format('LLL')} PDT`;

export const formatEHR = time =>
    moment(time)
        .tz('America/Los_Angeles')
        .format('YYYY-MM-DD HH:mm:ss');

// returns ms elapsed since previousTime, which is represented as a unix timestamp
export const getHoursElapsed = previousTime => {
    const ms = moment().diff(moment(previousTime));
    return moment.duration(ms).asHours();
};

export const isTimeField = fieldName => TIME_FIELD.includes(fieldName);
// our convention is that certain field names MUST be timestamps
export const standardizeTimeFields = params => {
    const paramsCopy = { ...params };
    for (let i = 0; i < TIME_FIELD.length; i += 1) {
        const currentTimeField = TIME_FIELD[i];
        if (paramsCopy[currentTimeField]) {
            paramsCopy[currentTimeField] = standardizeTime(
                paramsCopy[currentTimeField]
            );
        }
    }
    return paramsCopy;
};

export const getDayBefore = timestamp =>
    moment(timestamp)
        .subtract(1, 'days')
        .utc()
        .format();

export const diffTimeInMinutes = (startTime, endTime) =>
    moment(endTime).diff(startTime, 'minutes');

// is true if range is on same day, inclusive of start, exclusive of end
export const isDayRange = (start, end) => {
    const originalEnd = moment(end).format();
    const m1 = moment(start).startOf('day');
    const m2 = moment(end).startOf('day');

    if (m2.isSame(m1)) {
        return true;
    }

    if (originalEnd === m2.format()) {
        m2.subtract(1, 'day');
    }

    return m1.format('dddd') === m2.format('dddd');
};

export const getDateFromMoment = momentObj => momentObj.format('YYYY-MM-DD');

export const diffTimeInHours = (startTime, endTime) =>
    moment(endTime).diff(startTime, 'minutes') / MINUTES_IN_HOUR;

export const getLocalTime = timestamp =>
    timestamp.substring(0, LOCAL_TIMESTAMP_LENGTH);
export const getStandardizedLocalTime = (
    timestamp,
    timezone = DEFAULT_TIMEZONE
) =>
    moment
        .tz(timestamp, timezone)
        .utc()
        .format();

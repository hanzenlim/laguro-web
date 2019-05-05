import moment from 'moment';

export const MONDAY = 'MONDAY';
export const TUESDAY = 'TUESDAY';
export const WEDNESDAY = 'WEDNESDAY';
export const THURSDAY = 'THURSDAY';
export const FRIDAY = 'FRIDAY';
export const SATURDAY = 'SATURDAY';
export const SUNDAY = 'SUNDAY';

export const VALID_DAYS_VALUES = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY];

export const WEEK_DAYS_INDEX = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
};

export const DAY_SERIALIZATION_FORMAT = 'YYYY-MM-DD';
export const NUM_DAYS_IN_WEEK = 7;

export const getSerializedDay = momentInstance => momentInstance.format('dddd').toUpperCase();

// assumes recurring week days type
// remove extremities of the availability
// for example, if listing starts on a tuesday but occurs only on thursday,
// update return availability structure to start on thursday
export const trimAvailability = ({
    startDay, startTime, endDay, endTime, days, ...rest
}) => {
    const start = moment(startDay);
    const end = moment(endDay);
    const newStart = moment(startDay);
    const newEnd = moment(endDay);
    const minimalDays = [];

    if (start.isAfter(end)) {
        return null;
    }

    for (let i = 0; ; i += 1) {
        if (i >= NUM_DAYS_IN_WEEK || newStart.isAfter(end)) {
            return null;
        }

        // convert the day's name to a number (e.g. Monday becomes 0, Tuesday becomes 1)
        const currentDay = getSerializedDay(newStart);
        if (days.includes(currentDay)) {
            break;
        }
        newStart.add(1, 'day');
    }

    // after the above loop, we are guaranteed at least one day of the week
    // so no need for checks
    while (!days.includes(getSerializedDay(newEnd))) {
        newEnd.subtract(1, 'day');
    }

    const current = newStart.clone();
    for (let i = 0; i < NUM_DAYS_IN_WEEK && !current.isAfter(newEnd); i += 1) {
        const currentDay = getSerializedDay(current);
        if (days.includes(currentDay)) {
            minimalDays.push(currentDay);
        }
        current.add(1, 'day');
    }

    const newStartDay = newStart.format(DAY_SERIALIZATION_FORMAT);
    const newEndDay = newEnd.format(DAY_SERIALIZATION_FORMAT);

    return {
        startDay: newStartDay,
        startTime,
        endDay: newEndDay,
        endTime,
        days: minimalDays,
        ...rest,
    };
};

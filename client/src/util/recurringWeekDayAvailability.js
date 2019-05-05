import moment from 'moment-timezone';
import _intersection from 'lodash/intersection';
import { intersect } from './timeInterval';
import { trimAvailability, getSerializedDay } from './scheduleUtils';
import {
    TIME_LENGTH,
    LOCAL_TIME_FORMAT,
    isDayRange,
    getDateFromMoment,
} from './time_utils';

const DAY_TIME_DELIMITER = 'T';

const START_HOUR_OF_NEW_DAY = '00:00:00';

class RecurringWeekDayAvailability {
    constructor(availability) {
        const trimmedAvailability = trimAvailability(availability);
        if (!trimmedAvailability) {
            throw new Error('Invalid recurring week day availability');
        }

        const {
            startDay,
            startTime,
            endDay,
            endTime,
            days,
        } = trimmedAvailability;

        this.startDay = startDay;
        this.startTime = startTime;
        this.endDay = endDay;
        this.endTime = endTime;
        this.days = days;
    }

    // check if the availability contains the slot
    // simplifying assumption is that the slot is < 24 hours
    containsSlot(timeslot) {
        const { startTime, endTime } = timeslot;
        const start = moment(startTime);
        const end = moment(endTime);
        if (end.diff(start, 'days', true) > 1) {
            throw new Error('Timeslot duration must be < 24 hours');
        }

        const [startDay, sHour] = startTime.split(DAY_TIME_DELIMITER);
        const [endDay, eHour] = endTime.split(DAY_TIME_DELIMITER);

        const startHour = sHour.substring(0, TIME_LENGTH);
        const endHour = eHour.substring(0, TIME_LENGTH);

        const containsDay =
            this.dayInterval.includesDay(startDay) &&
            this.dayIntervali.includesDay(endDay);
        const containsTime =
            this.startTime <= startHour &&
            startHour < this.endTime &&
            this.startTime < endHour &&
            endHour <= this.endTime;

        return containsDay && containsTime;
    }

    getIntersection(otherRecurringWeekDayAvailability) {
        const {
            startDay,
            startTime,
            endDay,
            endTime,
            days,
        } = otherRecurringWeekDayAvailability;

        const intersectionStartDay =
            startDay < this.startDay ? this.startDay : startDay;
        const intersectionEndDay = endDay < this.endDay ? endDay : this.endDay;
        const intersectionStartTime =
            startTime < this.startTime ? this.startTime : startTime;
        let intersectionEndTime = endTime;
        if (
            endTime === START_HOUR_OF_NEW_DAY ||
            (this.endTime < endTime && this.endTime !== START_HOUR_OF_NEW_DAY)
        ) {
            intersectionEndTime = this.endTime;
        }
        const intersectionDays = _intersection(this.days, days);

        if (
            (intersectionStartTime >= intersectionEndTime &&
                intersectionEndTime !== START_HOUR_OF_NEW_DAY) ||
            intersectionStartDay > intersectionEndDay
        ) {
            return null;
        }

        const trimmedAvailability = trimAvailability({
            startDay: intersectionStartDay,
            endDay: intersectionEndDay,
            days: intersectionDays,
        });
        if (!trimmedAvailability) {
            return null;
        }

        return new RecurringWeekDayAvailability({
            startDay: trimmedAvailability.startDay,
            endDay: trimmedAvailability.endDay,
            startTime: intersectionStartTime,
            endTime: intersectionEndTime,
            days: trimmedAvailability.days,
        });
    }

    includesDay(day) {
        const dayMoment = moment(day);

        return (
            this.startDay <= day &&
            day <= this.endDay &&
            this.days.includes(getSerializedDay(dayMoment))
        );
    }

    // get the intersection of the availability to day range
    getDaySlot(rangeStart, rangeEnd) {
        if (!isDayRange(rangeStart, rangeEnd)) {
            throw new Error('Day range must not span more than one day');
        }

        const day = getDateFromMoment(moment(rangeStart));
        const nextDay = getDateFromMoment(moment(rangeStart).add(1, 'day'));

        if (!this.includesDay(day)) {
            return null;
        }

        const thisStartTime = `${day}T${this.startTime}`;
        const thisEndTime =
            this.endTime === START_HOUR_OF_NEW_DAY
                ? `${nextDay}T${this.endTime}`
                : `${day}T${this.endTime}`;

        const intersectionStartTime =
            rangeStart < thisStartTime ? thisStartTime : rangeStart;
        const intersectionEndTime =
            thisEndTime < rangeEnd ? thisEndTime : rangeEnd;

        if (intersectionStartTime >= intersectionEndTime) {
            return null;
        }

        return {
            localStartTime: intersectionStartTime,
            localEndTime: intersectionEndTime,
        };
    }

    // given a continuous interval, return a list of continuous intervals
    // that intersect with this availability
    getTimeIntervals(rangeStart, rangeEnd, timezone) {
        // the implementation is to break the input into 24 hour blocks, which is
        // easier to intersect
        const daySlots = [];

        const thisStartTime = moment.tz(
            `${this.startDay}T${this.startTime}`,
            timezone
        );
        const thisEndTime = moment.tz(
            `${this.endDay}T${this.endTime}`,
            timezone
        );

        const inputStartTime = moment.tz(rangeStart, timezone);
        const inputEndTime = moment.tz(rangeEnd, timezone);

        if (
            !intersect(
                {
                    startTime: inputStartTime.format(),
                    endTime: inputEndTime.format(),
                },
                {
                    startTime: thisStartTime.format(),
                    endTime: thisEndTime.format(),
                }
            )
        ) {
            return daySlots;
        }

        let startDayTime = thisStartTime.isAfter(inputStartTime)
            ? thisStartTime
            : inputStartTime;
        startDayTime = moment(startDayTime);
        let end = thisEndTime.isBefore(inputEndTime)
            ? thisEndTime
            : inputEndTime;
        end = moment(end);

        const current = moment(startDayTime);

        // handle case when there is only one interval
        if (getDateFromMoment(moment(current)) === getDateFromMoment(end)) {
            daySlots.push(
                this.getDaySlot(
                    current.format(LOCAL_TIME_FORMAT),
                    end.format(LOCAL_TIME_FORMAT)
                )
            );
        } else {
            current.startOf('day').add(1, 'day');

            daySlots.push(
                this.getDaySlot(
                    startDayTime.format(LOCAL_TIME_FORMAT),
                    current.format(LOCAL_TIME_FORMAT)
                )
            );

            while (
                getDateFromMoment(moment(current)) < getDateFromMoment(end)
            ) {
                const intervalStart = current.format(LOCAL_TIME_FORMAT);
                current.add(1, 'day');
                const intervalEnd = current.format(LOCAL_TIME_FORMAT);
                daySlots.push(this.getDaySlot(intervalStart, intervalEnd));
            }

            if (getDateFromMoment(moment(current)) === getDateFromMoment(end)) {
                daySlots.push(
                    this.getDaySlot(
                        current.format(LOCAL_TIME_FORMAT),
                        end.format(LOCAL_TIME_FORMAT)
                    )
                );
            }
        }

        return daySlots.filter(i => !!i);
    }

    valueOf() {
        return {
            startDay: this.startDay,
            startTime: this.startTime,
            endDay: this.endDay,
            endTime: this.endTime,
            days: this.days,
        };
    }
}

export { RecurringWeekDayAvailability };

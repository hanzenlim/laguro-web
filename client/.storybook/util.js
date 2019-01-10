import _random from 'lodash/random';
import moment from 'moment';

const NUM_OF_HALF_HOURS_IN_YEARS = 17523;

export const getRandomHalfHourInYear = () =>
    moment()
        .startOf('hour')
        .add(1, 'hour')
        .add(_random(NUM_OF_HALF_HOURS_IN_YEARS) * 30, 'minutes');

export const getRandomElement = array => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};

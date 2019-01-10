import React from 'react';
import { storiesOf } from '@storybook/react';
import DentistBookings from '../../src/pages/DentistBookings/view';
import moment from 'moment';
import _range from 'lodash/range';
import faker from 'faker';
import _random from 'lodash/random';
import _sample from 'lodash/sample';
import { getRandomHalfHourInYear, getRandomElement } from '../util';
const reservations = [];

for (let i = 0; i < 6; i += 1) {
    reservations.push({
        id: '48272740-107e-11e9-90a1-0bd57dd87966',
        office: {
            id: `${i}462cb6d0-107e-11e9-90a1-0bd57dd87966`,
            name: 'Yazmin Dental Office',
            location: {
                name: '1800 Washington Ave, San Leandro, CA, 94577',
            },
        },
        localAvailableTimes: [
            {
                startTime: '2019-01-03T16:10:17',
                endTime: '2019-01-03T18:10:17',
            },
        ],
        host: {
            user: {
                firstName: 'Inezitonal',
                lastName: 'KimValenst',
                imageUrl: 'http://bit.ly/laguro-joe',
            },
        },
        numChairsSelected: 4,
        equipmentSelected: ['x-ray', 'this', 'that'],
        appointments: [{ id: 'id' }],
    });
}

const randomTimes = [];
for (let i = 0; i < 100; i += 1) {
    const randomTime = getRandomHalfHourInYear();

    for (let j = 0; j < 3; j += 1) {
        randomTimes.push(randomTime);
    }
}

const officeIds = ['Smile Dental', 'Evil Dental', 'Bell Dental'];
const imageUrls = [
    'http://bit.ly/laguro-joe',
    'http://bit.ly/laguro-sam',
    'http://bit.ly/laguro-tina',
    'http://bit.ly/laguro-taka',
    'http://bit.ly/laguro-travis',
];

const appointments = _range(10).map(i => {
    const randomTime = randomTimes.pop();
    const randomOfficeId = _random(officeIds.length - 1);
    return {
        id: i.toString(),
        startTime: randomTime,
        endTime: moment(randomTime.valueOf()).add(30, 'minutes'),
        patient: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            imageUrl: _sample(imageUrls),
        },
        status: 'ACTIVE',
        reservation: {
            id: i.toString(),
            office: {
                id: randomOfficeId.toString(),
                name: officeIds[randomOfficeId],
            },
        },
    };
});

storiesOf('DentistBookings', module).add('default', () => (
    <DentistBookings reservations={reservations} appointments={appointments} />
));

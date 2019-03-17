import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import DentistListingCard from '../src/pages/common/DentistListingCard';

export const actions = {
    onRedirect: action('onRedirect'),
    onSelectAppointment: action('onSelectAppointment'),
};

export const dentist = {
    id: '1',
    availableTimes: [
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
        '2019-03-08T21:17:47Z',
    ],
    name: 'Dr. Ina Kim',
    specialty: 'Implant specialist',
    rating: 3.5,
    ratingCount: 30,
    procedures: ['Implant Treatment', 'Braces', 'Exams'],
    languages: ['English', 'Russian', 'Spanish'],
    address: '1598 Washington Ave, San Leandro, CA',
    insurance: ['Medical', 'Cigna', 'Metlife'],
    imageUrl: 'https:bit.ly/laguro-tina',
};

storiesOf('DentistListingCard', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <DentistListingCard
            dentist={object('dentist', { ...dentist })}
            {...actions}
        />
    ));

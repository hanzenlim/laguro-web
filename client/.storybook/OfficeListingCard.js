import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import OfficeListingCard from '../src/pages/common/OfficeListingCard';

export const actions = {
    onRedirect: action('onRedirect'),
};

export const offices = [
    {
        id: 1,
        title: 'Super Center',
        image: 'https:bit.ly/laguro-tina',
        address: 'Super Place, 15, Waldorf, Maryland',

        rating: 5,
        numReviews: 13,
        equipment: [
            'Composites',
            'Braces',
            'X-rays',
            'Lasers',
            'Burs',
            'Needles/Syringes',
            'Needles/Syringes',
        ],
        subtitle:
            'Super Center is a friendly family dental office with equipment and supplies available to facilitate implant procedures.',
    },
    {
        id: 2,
        title: 'Super Center',
        image: 'https:bit.ly/laguro-tina',
        address: 'Super Place, 15, Waldorf, Maryland',

        rating: 5,
        numReviews: 13,
        equipment: [
            'Composites',
            'Braces',
            'X-rays',
            'Lasers',
            'Burs',
            'Needles/Syringes',
            'Needles/Syringes',
        ],
        subtitle:
            'Super Center is a friendly family dental office with equipment and supplies available to facilitate implant procedures.',
    },
    {
        id: 3,
        title: 'Super Center',
        image: 'https:bit.ly/laguro-tina',
        address: 'Super Place, 15, Waldorf, Maryland',

        rating: 5,
        numReviews: 13,
        equipment: [
            'Composites',
            'Braces',
            'X-rays',
            'Lasers',
            'Burs',
            'Needles/Syringes',
            'Needles/Syringes',
        ],
        subtitle:
            'Super Center is a friendly family dental office with equipment and supplies available to facilitate implant procedures.',
    },
];

storiesOf('OfficeListingCard', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <Fragment>
            {offices.map(office => (
                <OfficeListingCard
                    key={office.id}
                    office={object('office', { ...office })}
                    {...actions}
                />
            ))}
        </Fragment>
    ));

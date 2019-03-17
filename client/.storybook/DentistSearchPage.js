import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import DentistSearchPageView from '../src/pages/DentistSearchPage/view';

export const actions = {
    onRedirect: action('onRedirect'),
    onSelectAppointment: action('onSelectAppointment'),
};

export const data = {
    data: [
        {
            title: 'William F Choi',
            image: null,
            reservations: [],
            address: '',
            subtitle: 'General Dentist',
            url: '/dentist/d0a81d50-36c0-11e9-aa92-d543d2310dec',
            uniqueLocations: [],
        },
        {
            title: 'New Dentist Dentist',
            reservations: [],
            address: '',
            subtitle: 'General Dentist',
            url: '/dentist/4e8c6f60-3ff3-11e9-94f8-a1034385ecc8',
            uniqueLocations: [],
        },
        {
            title: 'Ricardo Test Test 20',
            image:
                'https://cdn.filestackcontent.com/resize=width:130/uPm4DGszQ4SEQCz08Cu0',
            reservations: [],
            address: '',
            subtitle: ' ',
            url: '/dentist/2566f090-2be1-11e9-93e4-01089a4f8844',
            uniqueLocations: [],
        },
    ],
    showMap: false,
    total: 3,
    defaultPosition: { lon: -122.463, lat: 37.7648 },
    urlParams: { page: '1' },
    mapDimensions: { width: 623.5, height: 193 },
};

storiesOf('DentistSearchPage', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <DentistSearchPageView {...object('data', { ...data })} />
    ));

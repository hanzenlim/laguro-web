import React from 'react';
import { storiesOf } from '@storybook/react';
import history from 'history';
import { MemoryRouter } from 'react-router-dom';
import HostListingsView from '../src/pages/common/HostListings/view';

storiesOf('HostListings', module).add('default', () => (
    <MemoryRouter initialEntries={['/']}>
        <HostListingsView
            offices={[
                {
                    id: 'id',
                    name: 'Bell Dental',
                    listings: [
                        {
                            dateCreated: '2018-11-15T22:05:39Z',
                            officeId: '8aac7d00-e922-11e8-a2c8-e33fc78354c0',
                            timezone: 'America/New_York',
                            hostId: '8a921730-e922-11e8-a2c8-e33fc78354c0',
                            numChairsAvailable: 2,
                            startTime: '2018-11-16T05:00:00Z',
                            cleaningFee: 125,
                            availability: {
                                days: ['FRIDAY'],
                                startTime: '00:00:00',
                                endTime: '01:00:00',
                                type: 'RECURRING_WEEK_DAYS',
                                startDay: '2018-11-16',
                                endDay: '2018-11-16',
                            },
                            endTime: '2018-11-16T06:00:00Z',
                            id: '96325140-e922-11e8-a2c8-e33fc78354c0',
                            chairHourlyPrice: 125,
                            status: 'ACTIVE',
                            reservations: [
                                {
                                    equipmentSelected: [],
                                    numChairsSelected: 3,
                                    totalPaid: 4506,
                                    timezone: 'America/New_York',
                                    hostId:
                                        '2ae19d70-e6dd-11e8-bed6-c90392b0d2cd',
                                    listingId:
                                        '2b827150-e6dd-11e8-bed6-c90392b0d2cd',
                                    availableTimes: [
                                        {
                                            startTime:
                                                '2018-11-14T15:00:00-05:00',
                                            endTime:
                                                '2018-11-14T19:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-14T22:00:00-05:00',
                                            endTime:
                                                '2018-11-14T23:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-15T15:00:00-05:00',
                                            endTime:
                                                '2018-11-15T17:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-16T15:00:00-05:00',
                                            endTime:
                                                '2018-11-16T16:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-16T18:00:00-05:00',
                                            endTime:
                                                '2018-11-16T19:00:00-05:00',
                                        },
                                    ],
                                    dateCreated: '2018-11-13T17:57:38Z',
                                    officeId:
                                        '2afacac0-e6dd-11e8-bed6-c90392b0d2cd',
                                    paymentId:
                                        '9b7381d0-e76d-11e8-b312-abaf00e46924',
                                    reservedBy: {
                                        id: '123',
                                        user: {
                                            firstName: 'hello',
                                            lastName: 'hello',
                                            imageUrl: '12',
                                        },
                                    },
                                    location: {
                                        name:
                                            '125r Boyer St, Johnstown, Pennsylvania 15906, United States',
                                        geoPoint: {
                                            lat: 40.352399,
                                            lon: -78.936636,
                                        },
                                        addressDetails: '125',
                                    },
                                    startTime: '2018-11-14T20:00:00Z',
                                    endTime: '2018-11-17T00:00:00Z',
                                    id: '9b76b620-e76d-11e8-b312-abaf00e46924',
                                    status: 'ACTIVE',
                                },
                            ],
                        },
                        {
                            dateCreated: '2018-11-15T22:05:39Z',
                            officeId: '8aac7d00-e922-11e8-a2c8-e33fc78354c0',
                            timezone: 'America/New_York',
                            hostId: '8a921730-e922-11e8-a2c8-e33fc78354c0',
                            numChairsAvailable: 2,
                            startTime: '2018-11-16T05:00:00Z',
                            cleaningFee: 125,
                            availability: {
                                days: ['FRIDAY'],
                                startTime: '00:00:00',
                                endTime: '01:00:00',
                                type: 'RECURRING_WEEK_DAYS',
                                startDay: '2018-11-16',
                                endDay: '2018-11-16',
                            },
                            endTime: '2018-11-16T06:00:00Z',
                            id: '96325140-e922-11e8-a2c8-e33fc78354c0',
                            chairHourlyPrice: 125,
                            status: 'ACTIVE',
                            reservations: [
                                {
                                    equipmentSelected: [],
                                    numChairsSelected: 3,
                                    totalPaid: 4506,
                                    timezone: 'America/New_York',
                                    hostId:
                                        '2ae19d70-e6dd-11e8-bed6-c90392b0d2cd',
                                    listingId:
                                        '2b827150-e6dd-11e8-bed6-c90392b0d2cd',
                                    availableTimes: [
                                        {
                                            startTime:
                                                '2018-11-14T15:00:00-05:00',
                                            endTime:
                                                '2018-11-14T19:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-14T22:00:00-05:00',
                                            endTime:
                                                '2018-11-14T23:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-15T15:00:00-05:00',
                                            endTime:
                                                '2018-11-15T17:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-16T15:00:00-05:00',
                                            endTime:
                                                '2018-11-16T16:00:00-05:00',
                                        },
                                        {
                                            startTime:
                                                '2018-11-16T18:00:00-05:00',
                                            endTime:
                                                '2018-11-16T19:00:00-05:00',
                                        },
                                    ],
                                    dateCreated: '2018-11-13T17:57:38Z',
                                    officeId:
                                        '2afacac0-e6dd-11e8-bed6-c90392b0d2cd',
                                    paymentId:
                                        '9b7381d0-e76d-11e8-b312-abaf00e46924',
                                    reservedBy: {
                                        id: '123',
                                        user: {
                                            firstName: 'hello',
                                            lastName: 'hello',
                                            imageUrl: '12',
                                        },
                                    },
                                    location: {
                                        name:
                                            '125r Boyer St, Johnstown, Pennsylvania 15906, United States',
                                        geoPoint: {
                                            lat: 40.352399,
                                            lon: -78.936636,
                                        },
                                        addressDetails: '125',
                                    },
                                    startTime: '2018-11-14T20:00:00Z',
                                    endTime: '2018-11-17T00:00:00Z',
                                    id: '9b76b620-e76d-11e8-b312-abaf00e46924',
                                    status: 'ACTIVE',
                                },
                            ],
                        },
                        {
                            dateCreated: '2018-11-15T22:05:39Z',
                            officeId: '8aac7d00-e922-11e8-a2c8-e33fc78354c0',
                            timezone: 'America/New_York',
                            hostId: '8a921730-e922-11e8-a2c8-e33fc78354c0',
                            numChairsAvailable: 2,
                            startTime: '2018-11-16T05:00:00Z',
                            cleaningFee: 125,
                            availability: {
                                days: ['FRIDAY'],
                                startTime: '00:00:00',
                                endTime: '01:00:00',
                                type: 'RECURRING_WEEK_DAYS',
                                startDay: '2018-11-16',
                                endDay: '2018-11-16',
                            },
                            endTime: '2018-11-16T06:00:00Z',
                            id: '96325140-e922-11e8-a2c8-e33fc78354c0',
                            chairHourlyPrice: 125,
                            status: 'ACTIVE',
                            reservations: [
                                {
                                    equipmentSelected: [],
                                    numChairsSelected: 3,
                                    totalPaid: 4506,
                                    timezone: 'America/New_York',
                                    hostId:
                                        '2ae19d70-e6dd-11e8-bed6-c90392b0d2cd',
                                    listingId:
                                        '2b827150-e6dd-11e8-bed6-c90392b0d2cd',
                                    availableTimes: [
                                        {
                                            startTime:
                                                '2018-11-14T15:00:00-05:00',
                                            endTime:
                                                '2018-11-14T19:00:00-05:00',
                                        },
                                    ],
                                    dateCreated: '2018-11-13T17:57:38Z',
                                    officeId:
                                        '2afacac0-e6dd-11e8-bed6-c90392b0d2cd',
                                    paymentId:
                                        '9b7381d0-e76d-11e8-b312-abaf00e46924',
                                    reservedBy: {
                                        id: '123',
                                        user: {
                                            firstName: 'hello',
                                            lastName: 'hello',
                                            imageUrl: '12',
                                        },
                                    },
                                    location: {
                                        name:
                                            '125r Boyer St, Johnstown, Pennsylvania 15906, United States',
                                        geoPoint: {
                                            lat: 40.352399,
                                            lon: -78.936636,
                                        },
                                        addressDetails: '125',
                                    },
                                    startTime: '2018-11-14T20:00:00Z',
                                    endTime: '2018-11-17T00:00:00Z',
                                    id: '9b76b620-e76d-11e8-b312-abaf00e46924',
                                    status: 'ACTIVE',
                                },
                            ],
                        },
                    ],
                    equipment: [
                        {
                            name: 'Digital Xray Sensors',
                            price: 2000,
                        },
                        {
                            name: 'Lateral Ceph',
                            price: 2000,
                        },
                        {
                            name: 'Panoramic',
                            price: 2000,
                        },
                        {
                            name: 'CBCT',
                            price: 10000,
                        },
                        {
                            name: 'Intraoral Camera',
                            price: 2000,
                        },
                        {
                            name: 'Cerec CAD/CAM',
                            price: 20000,
                        },
                        {
                            name: 'Caries Detection Cameras',
                            price: 2000,
                        },
                    ],
                    location: { name: 'Bell Dental, 1578 Washington Ave' },
                },
            ]}
        />
    </MemoryRouter>
));

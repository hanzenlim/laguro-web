import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import ListingConfirmationView from '../src/pages/common/ListingConfirmation/view';
import { Box } from '../src/components';

storiesOf('ListingConfirmation', module).add('default', () => (
    <Box p={20} maxWidth={667}>
        <ListingConfirmationView
            name="Bell Dental"
            address="Bell Dental, Awesome St. 12125, Alameda, CA"
            listings={[
                {
                    id: 'id',
                    availability: {
                        startDay: moment(),
                        endDay: moment(),
                        days: [
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                        ],
                    },
                    numChairsAvailable: 2,
                    chairHourlyPrice: '$200.00',
                    cleaningFee: '$200.00',
                    localStartTime: moment(),
                    localEndTime: moment(),
                },
                {
                    id: 'id',
                    availability: {
                        startDay: moment(),
                        endDay: moment(),
                        days: ['TUESDAY', 'WEDNESDAY', 'THURSDAY', 'MONDAY'],
                    },
                    numChairsAvailable: 2,
                    chairHourlyPrice: '$200.00',
                    cleaningFee: '$200.00',
                    localStartTime: moment(),
                    localEndTime: moment(),
                },
                {
                    id: 'id',
                    availability: {
                        startDay: moment(),
                        endDay: moment(),
                        days: [
                            'MONDAY',
                            'TUESDAY',
                            'WEDNESDAY',
                            'THURSDAY',
                            'FRIDAY',
                            'SATURDAY',
                            'SUNDAY',
                        ],
                    },
                    numChairsAvailable: 2,
                    chairHourlyPrice: '$200.00',
                    cleaningFee: '$200.00',
                    localStartTime: moment(),
                    localEndTime: moment(),
                },
            ]}
        />
    </Box>
));

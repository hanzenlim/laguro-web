import React from 'react';
import { storiesOf } from '@storybook/react';
import BookAppointmentView from '../src/pages/common/BookAppointment/view';
import { Box } from '../src/components';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '',
});

storiesOf('BookAppointmentView', module).add('default', () => (
    <ApolloProvider client={client}>
        <Box maxWidth={300}>
            <BookAppointmentView
                firstAppointmentDuration={30}
                data={[
                    {
                        equipmentSelected: [],
                        numChairsSelected: 3,
                        totalPaid: 4506,
                        timezone: 'America/New_York',
                        hostId: '2ae19d70-e6dd-11e8-bed6-c90392b0d2cd',
                        listingId: '2b827150-e6dd-11e8-bed6-c90392b0d2cd',
                        availableTimes: [
                            {
                                startTime: '2019-11-14T15:00:00-05:00',
                                endTime: '2019-11-14T19:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-14T22:00:00-05:00',
                                endTime: '2019-11-14T23:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-15T15:00:00-05:00',
                                endTime: '2019-11-15T17:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-16T15:00:00-05:00',
                                endTime: '2019-11-16T16:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-16T18:00:00-05:00',
                                endTime: '2019-11-16T19:00:00-05:00',
                            },
                        ],
                        localAvailableTimes: [
                            {
                                startTime: '2019-11-14T15:00:00-05:00',
                                endTime: '2019-11-14T19:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-14T22:00:00-05:00',
                                endTime: '2019-11-14T23:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-15T15:00:00-05:00',
                                endTime: '2019-11-15T17:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-16T15:00:00-05:00',
                                endTime: '2019-11-16T16:00:00-05:00',
                            },
                            {
                                startTime: '2019-11-16T18:00:00-05:00',
                                endTime: '2019-11-16T19:00:00-05:00',
                            },
                        ],
                        dateCreated: '2019-11-13T17:57:38Z',
                        officeId: '2afacac0-e6dd-11e8-bed6-c90392b0d2cd',
                        paymentId: '9b7381d0-e76d-11e8-b312-abaf00e46924',
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
                        startTime: '2019-11-14T20:00:00Z',
                        appointments: [],
                        endTime: '2019-11-17T00:00:00Z',
                        id: '9b76b620-e76d-11e8-b312-abaf00e46924',
                        status: 'ACTIVE',
                    },
                ]}
                isPaymentVisible={false}
                bookedAppointment={null}
                showVerificationModal={false}
                onFilter={() => {}}
                onPay={() => {}}
                onSelect={() => {}}
                onVerificationResult={() => {}}
                isSubmitting={false}
                updateSubmittingState={() => {}}
                checkIfVerified={true}
            />
        </Box>
    </ApolloProvider>
));

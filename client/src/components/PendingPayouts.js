import React, { Component } from 'react';
import moment from 'moment';

import { renderPrice } from '../util/paymentUtil';
import { Flex, Typography } from './common';

class PendingPayouts extends Component {
    receivableList =
        // TODO consider storing PAYOUT amount or implement calculation util function
        // TODO figure out what info to display
        this.props.receivable.map((receivable, index) => {
            const { reservation } = receivable;
            let location = reservation
                ? `Location: ${reservation.location}`
                : '';
            let type =
                receivable.type === 'RESERVATION' ? 'Reservation' : 'Procedure';
            return (
                <li key={index}>
                    <Flex
                        flexDirection="column"
                        p={3}
                        my={2}
                        withborder="true"
                    >
                        <Flex justifyContent="space-between">
                            <Typography mb={3} fontWeight="bold">
                                {`${type} Income`}
                            </Typography>
                            <Typography>
                                {renderPrice(
                                    receivable.stripePayment.amount * 0.8
                                )}
                            </Typography>
                        </Flex>

                        <Typography mb={1}>{location}</Typography>
                        {reservation && (
                            <Typography>
                                {`Time: ${moment(reservation.startTime).format(
                                    'M/D/YY h:mm a'
                                )} - ${moment(reservation.endTime).format(
                                    'h:mm a'
                                )}`}
                            </Typography>
                        )}
                    </Flex>
                </li>
            );
        });

    render() {
        const { receivable } = this.props;
        if (!receivable) return <div />;

        return <ul>{this.receivableList}</ul>;
    }
}

export default PendingPayouts;

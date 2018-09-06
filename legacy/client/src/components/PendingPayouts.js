import React, { Component } from 'react';
import moment from 'moment';

import { renderPrice } from '../util/paymentUtil';
import { Flex, Typography, Chip, Box } from './common';

const PROCEDURE_PERCENTAGE = 0.85;
const RESERVATION_PERCENTAGE = 0.8;

class PendingPayouts extends Component {
    receivableList =
        // TODO consider storing PAYOUT amount or implement calculation util function
        // TODO figure out what info to display
        this.props.receivable.map((receivable, index) => {
            const { reservation, procedures } = receivable;
            const location = reservation
                ? `Location: ${reservation.location.name}`
                : '';
            const procedureNames =
                procedures && procedures
                    ? procedures.map(proc => proc.name).join(', ')
                    : '';
            const type =
                receivable.type === 'RESERVATION' ? 'Reservation' : 'Procedure';
            const percentage =
                type === 'Reservation'
                    ? RESERVATION_PERCENTAGE
                    : PROCEDURE_PERCENTAGE;

            // temporary stop gap until backend is ready to process procedure payouts
            if (receivable.type !== 'RESERVATION')
                receivable = { ...receivable, chargeStatus: 'pending' };

            return (
                <li key={index}>
                    <Flex flexDirection="column" p={3} my={2} withborder="true">
                        <Flex justifyContent="space-between">
                            <Box mb={3}>
                                <Typography mr={3} fontWeight="bold">
                                    {`${type} Income`}
                                </Typography>
                                <Typography fontSize={1}>
                                    {`Paid ${moment(
                                        receivable.dateCreated
                                    ).format('M/D')}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip
                                    label={
                                        receivable.chargeStatus === 'available'
                                            ? 'Available'
                                            : 'Pending'
                                    }
                                />
                                <Typography>
                                    {renderPrice(
                                        Math.floor(
                                            receivable.stripePayment.amount *
                                                percentage
                                        )
                                    )}
                                </Typography>
                            </Box>
                        </Flex>

                        {procedures && (
                            <Flex flexDirection="column">
                                <Typography
                                    mb={1}
                                >{`Procedures: ${procedureNames}`}</Typography>
                            </Flex>
                        )}

                        {reservation && (
                            <Flex flexDirection="column">
                                <Typography mb={1}>{location}</Typography>
                                <Typography>
                                    {`Time: ${moment(
                                        reservation.startTime
                                    ).format('M/D/YY h:mm a')} - ${moment(
                                        reservation.endTime
                                    ).format('h:mm a')}`}
                                </Typography>
                            </Flex>
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

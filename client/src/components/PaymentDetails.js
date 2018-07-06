import React, { Component } from 'react';
import moment from 'moment';
import {
    RESERVATION_PAYMENT_TYPE,
    APPOINTMENT_PAYMENT_TYPE
} from '../util/strings';
import { Box, Card, Flex, Typography } from './common';

class PaymentDetails extends Component {
    render() {
        const { payment } = this.props;
        const { source } = payment.stripePayment;
        const { reservation, appointment } = payment;

        // let itemInfo = '';
        let type;
        let office;
        let procedureName;
        let eventType = reservation;
        if (payment.type === RESERVATION_PAYMENT_TYPE && reservation) {
            type = 'Reservation';
            office = reservation.office;
            eventType = reservation;
        } else if (payment.type === APPOINTMENT_PAYMENT_TYPE && appointment) {
            type = 'Appointment'
            office = appointment.reservation.office;
            procedureName = appointment.procedure.name;
            eventType = appointment;
        }

        const location = eventType.location;
        const startTime = eventType.startTime;
        const endTime = eventType.endTime;

        return (
            <Box mb={3}>
                <Card>
                    <Flex p={3}>
                        <img width="100px" height="67px" src={office.imageUrls[0]} alt={office.imageUrls[0]} />
                        <Box pr={3} />
                        <Box width={1000}>
                            <Typography fontSize={4} fontWeight="bold"> {office.name} </Typography>
                            <Typography fontSize={2}> {location} </Typography>
                            <div>
                                <div>
                                    Payment for {type}
                                </div>
                                <div>
                                    {moment(startTime).format(
                                        'MMM DD h:mm a - '
                                    ) + moment(endTime).format('h:mm a')}
                                </div>
                                <div>
                                    {procedureName && <li>{procedureName}</li>}
                                </div>
                            </div>
                        </Box>
                        <Box width={100}>
                            <p>{`${source.brand} - ${source.last4}`}</p>
                            <p>{`$${(payment.nominalAmount / 100).toFixed(2)}`}</p>
                        </Box>
                    </Flex>
                </Card>
            </Box>);
    }
}

export default PaymentDetails;

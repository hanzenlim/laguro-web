import React, { Component } from 'react';
import { isEmpty, orderBy } from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadPaymentHistory } from '../actions';
import {
    APPOINTMENT_BOOKED,
    APPOINTMENT_CANCELLED_BY_PATIENT,
    APPOINTMENT_PAYMENT_TYPE,
    CANCELLED,
    CHARGED,
    PAYER_ID,
    PAYMENT_MADE,
    REFUNDED,
    RESERVATION_BOOKED,
    RESERVATION_CANCELLED_BY_DENTIST,
    RESERVATION_PAYMENT_TYPE,
    PROCEDURE_PAYMENT_TYPE,
    PROCEDURES_ASSIGNED
} from '../util/strings';
import { Box, Flex, Typography } from './common';
import PaymentDetails from './PaymentDetails';

const StyledContainer = styled.div`
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
    padding: 0 10px;
`;

const paymentHistoryQuery = `
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            id
            payer {
                id
            }
            payee {
                id
            }
            type
            status
            reservation {
                numChairsSelected
                startTime
                endTime
                office {
                    id
                    location
                    name
                    imageUrls
                }
                status
                dateCancelled
            }
            appointment {
                procedure {
                    name
                }
                startTime
                endTime
                reservation{
                    office {
                        id
                        location
                        name
                        imageUrls
                    }
                }
                status
                dateCancelled
            }
            procedures {
                name
                dateCreated
            }
            nominalAmount
            currency
            stripePayment {
                created
                amount
                source {
                    brand
                    last4
                }
                refunds {
                    data {
                        created
                    }
                }
            }
            chargeStatus
            dateCreated
            refundAmount

        }
    }
`;

export class PaymentHistory extends Component {
    componentDidMount() {
        const userId = this.props.auth && this.props.auth.id;
        this.props.loadPaymentHistory(paymentHistoryQuery, PAYER_ID, userId);
    }

    processPayment = (auth, payment) => {
        const { source, created } = payment.stripePayment;
        const { reservation, appointment, procedures } = payment;
        let action,
            office,
            procedureNames,
            eventType,
            description,
            startTime,
            endTime;
        let paymentObj = {};
        let date = Number(created);
        let paymentAmount = payment.nominalAmount;
        if (payment.type === RESERVATION_PAYMENT_TYPE && reservation) {
            action = RESERVATION_BOOKED;
            office = reservation.office;
            eventType = reservation;
            startTime = eventType.startTime;
            endTime = eventType.endTime;
        } else if (payment.type === APPOINTMENT_PAYMENT_TYPE && appointment) {
            action = APPOINTMENT_BOOKED;
            office = appointment.reservation.office;
            procedureNames = [appointment.procedure.name];
            eventType = appointment;
            startTime = eventType.startTime;
            endTime = eventType.endTime;
        } else if (payment.type === PROCEDURE_PAYMENT_TYPE && procedures) {
            action = PROCEDURES_ASSIGNED;
            office = {};
            eventType = {};
            procedureNames = procedures.map(pc => pc.name);
        }

        // Upon refund, payment.status changes to REFUNDED. It is still necessary to process such payment with description PAYMENT_MADE.
        if (payment.status === CHARGED || payment.status === REFUNDED) {
            description = PAYMENT_MADE;
            paymentObj = {
                action,
                auth,
                date,
                description,
                endTime,
                office,
                paymentAmount,
                procedureNames,
                payeeId: payment.payee.id,
                payerId: payment.payer.id,
                startTime,
                source,
                type: payment.type
            };
        }

        return paymentObj;
    };

    processCancellation = (auth, payment) => {
        const { source, refunds } = payment.stripePayment;
        const { reservation, appointment, refundAmount, procedures } = payment;

        let office;
        let procedureNames;
        let eventType;
        let startTime;
        let endTime;

        if (payment.type === RESERVATION_PAYMENT_TYPE && reservation) {
            office = reservation.office;
            eventType = reservation;
            startTime = eventType.startTime;
            endTime = eventType.endTime;
        } else if (payment.type === APPOINTMENT_PAYMENT_TYPE && appointment) {
            office = appointment.reservation.office;
            procedureNames = appointment.procedure.name;
            eventType = appointment;
            startTime = eventType.startTime;
            endTime = eventType.endTime;
        } else if (payment.type === PROCEDURE_PAYMENT_TYPE && procedures) {
            office = {};
            eventType = {};
            procedureNames = procedures.map(pc => pc.name);
        }

        let cancellationObj = {};

        if (eventType.status === CANCELLED) {
            cancellationObj = {
                action:
                    payment.type === RESERVATION_PAYMENT_TYPE
                        ? RESERVATION_CANCELLED_BY_DENTIST
                        : APPOINTMENT_CANCELLED_BY_PATIENT,
                auth,
                endTime,
                office,
                procedureNames,
                payeeId: payment.payee.id,
                payerId: payment.payer.id,
                startTime,
                source,
                type: payment.type,
                date: refunds.data[0].created,
                description: CANCELLED,
                paymentAmount: -1 * refundAmount
            };
        }

        return cancellationObj;
    };

    processPayments = payerPayments => {
        const { auth } = this.props;
        const concat = (x, y) => x.concat(y);

        let processedPayments = payerPayments
            .filter(payment => auth.id === payment.payer.id)
            .map(payment => this.processPayment(auth, payment))
            .reduce(concat, []);

        processedPayments = processedPayments.concat(
            payerPayments
                .filter(payment => auth.id === payment.payer.id)
                .map(payment => this.processCancellation(auth, payment))
                .reduce(concat, [])
        );

        return processedPayments;
    };

    renderPaymentDetailsList = processedPayments => {
        const orderedProcessedPayments = orderBy(
            processedPayments,
            ['date'],
            ['desc']
        );
        return orderedProcessedPayments.map((payment, index) => (
            <PaymentDetails payment={payment} key={index} />
        ));
    };

    render() {
        const { isFetchingPaymentHistory, payerPayments } = this.props;
        const processedPayments = this.processPayments(payerPayments);
        const paymentDetailsList = this.renderPaymentDetailsList(
            processedPayments
        );

        return (
            <StyledContainer>
                <Box mt={[3, 5]}>
                    <Flex justifyContent="space-between">
                        <Typography fontSize={5}>Payment History</Typography>
                    </Flex>
                    <Box pb={3} />
                    {!isEmpty(paymentDetailsList)
                        ? paymentDetailsList
                        : isFetchingPaymentHistory
                            ? 'Loading...'
                            : 'No payment history.'}
                </Box>
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        isFetchingPaymentHistory: state.payments.isFetchingPayerPayments,
        payerPayments: state.payments.payerPayments
    };
}
export default connect(mapStateToProps, { loadPaymentHistory })(PaymentHistory);

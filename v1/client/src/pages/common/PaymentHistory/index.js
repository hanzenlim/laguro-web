import React from 'react';
import { Query } from 'react-apollo';

import { GET_PAYMENT_HISTORY_QUERY } from './queries';
import { Skeleton, Card, Text, Flex, Box } from '../../../components';
import PaymentCard from '../PaymentCard';
import ProcedurePaymentCard from '../PaymentCard/ProcedurePaymentCard';
import {
    PAYER_ID,
    PAYMENT,
    PAYMENT_MADE,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
    PROCEDURE_PAYMENT_TYPE,
    PATIENT,
} from '../../../util/strings';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

export const CardLoading = () => (
    <Flex flexDirection="column" width={720}>
        <Box mb={40}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
        <Box mb={40}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
        <Box mb={40}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
    </Flex>
);

export const NoPaymentsCard = ({ text }) => (
    <Card
        width={720}
        style={{ boxShadow: '1px 1px 7px 0 rgba(0, 0, 0, 0.15)' }}
    >
        <Flex alignItems="center" justifyContent="center">
            <Text fontSize={3} fontWeight="bold" color="text.black50">
                {text}
            </Text>
        </Flex>
    </Card>
);

const PaymentHistoryContainer = ({ userId }) => (
    <Query
        query={GET_PAYMENT_HISTORY_QUERY}
        variables={{
            input: {
                partitionKey: PAYER_ID,
                partitionValue: userId,
            },
        }}
    >
        {paymentHistoryQueryRes => {
            const { loading, error } = paymentHistoryQueryRes;
            const paymentData = paymentHistoryQueryRes.data;

            if (loading) return <CardLoading />;

            if (error) {
                return <RedirectErrorPage />;
            }

            return (
                <Flex flexDirection="column">
                    {paymentData.queryPayments.map((payment, index) => {
                        if (
                            payment.type === APPOINTMENT_PAYMENT_TYPE ||
                            payment.type === RESERVATION_PAYMENT_TYPE
                        ) {
                            return (
                                <PaymentCard
                                    key={index}
                                    payment={payment}
                                    cardType={PAYMENT}
                                    paymentStatus={PAYMENT_MADE}
                                />
                            );
                        } else if (payment.type === PROCEDURE_PAYMENT_TYPE) {
                            return (
                                <ProcedurePaymentCard
                                    key={index}
                                    payment={payment}
                                    persona={PATIENT}
                                    cardType={PAYMENT}
                                    paymentStatus={PAYMENT_MADE}
                                />
                            );
                        }

                        // In theory this should never happen.
                        return null;
                    })}
                    {paymentData.queryPayments.length === 0 && (
                        <NoPaymentsCard text="You have no payments yet!" />
                    )}
                </Flex>
            );
        }}
    </Query>
);

export default PaymentHistoryContainer;

import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_PAYMENT_HISTORY_QUERY } from './queries';
import {
    Skeleton,
    Card,
    Text,
    Container,
    Flex,
    Box,
    Responsive,
} from '../../../components';
import PaymentCard from '../PaymentCard';
import ProcedurePaymentCard from '../PaymentCard/ProcedurePaymentCard';
import {
    PAYER_ID,
    PAYMENT,
    PAYMENT_MADE,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
    PROCEDURE_PAYMENT_TYPE,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
    PATIENT,
} from '../../../util/strings';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

const { Desktop, TabletMobile } = Responsive;

export const CardLoading = () => (
    <Flex flexDirection="column">
        <Box mb={[7, '', 40]}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
        <Box mb={[7, '', 40]}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
        <Box mb={[7, '', 40]}>
            <Card>
                <Skeleton active />
            </Card>
        </Box>
    </Flex>
);

export const NoPaymentsCard = ({ text }) => (
    <Card style={{ boxShadow: '1px 1px 7px 0 rgba(0, 0, 0, 0.15)' }}>
        <Flex alignItems="center" justifyContent="center">
            <Text fontSize={[0, '', 3]} fontWeight="bold" color="text.black50">
                {text}
            </Text>
        </Flex>
    </Card>
);

const PaymentHistoryContainer = ({ userId }) => (
    <Query
        query={GET_PAYMENT_HISTORY_QUERY}
        fetchPolicy="cache-and-network"
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
            let content;

            if (loading) {
                content = <CardLoading />;
            } else if (error) {
                content = <RedirectErrorPage />;
            } else {
                content = (
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
                            } else if (
                                payment.type === PROCEDURE_PAYMENT_TYPE ||
                                payment.type ===
                                    PROCEDURE_SET_HISTORY_PAYMENT_TYPE
                            ) {
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
            }

            return (
                <Fragment>
                    <TabletMobile>
                        <Container>{content}</Container>
                    </TabletMobile>
                    <Desktop>{content}</Desktop>
                </Fragment>
            );
        }}
    </Query>
);

export default PaymentHistoryContainer;

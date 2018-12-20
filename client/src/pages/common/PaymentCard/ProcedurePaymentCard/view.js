import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetails from '../../PaymentDetails';
import { renderPrice } from '../../../../util/paymentUtil';
import {
    Card,
    Text,
    Flex,
    Box,
    Icon,
    Button,
    Truncate,
} from '../../../../components';
import {
    AVAILABLE,
    PENDING,
    PAYMENT_CARD,
    PATIENT,
    PAYMENT_MADE,
} from '../../../../util/strings';

const StyledCard = styled(Card)`
    && {
        width: 100%;
        margin-bottom: 7px;
        box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.15);
        border-color: ${props => props.theme.colors.divider.gray};

        .ant-card-body {
            padding: 14px 20px;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 20px 40px;
            }
        }

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            margin-bottom: 40px;
        }
    }
`;

const renderInvoiceItem = (procedures, persona) =>
    procedures.map(procedure => (
        <Box>
            <Flex justifyContent="space-between">
                <Text fontSize={[0, '', 2]}>{procedure.name}</Text>
                <Text fontSize={[0, '', 2]}>
                    {persona === PATIENT
                        ? renderPrice(procedure.totalPrice)
                        : renderPrice(procedure.payoutAmount)}
                </Text>
            </Flex>
            <Box
                my={[6, '', 15]}
                borderBottom="1px solid"
                borderColor="divider.darkGray"
            />
        </Box>
    ));

const ProcedurePaymentCardView = ({
    closeModal,
    cardType,
    opentDetailModal,
    visibleModal,
    payment,
    paymentStatus,
    totalAmount,
    persona,
}) => {
    const getPaymentStatusColor = () => {
        switch (paymentStatus) {
            case AVAILABLE:
                return 'text.blue';
            case PENDING:
                return 'text.yellow';
            default:
                return 'text.black';
        }
    };
    const { refundAmount } = payment;
    const isOnPaymentHistory = paymentStatus === PAYMENT_MADE;

    return (
        <StyledCard key={payment.id}>
            <Flex alignItems="center">
                <Box>
                    <Text
                        fontSize={[isOnPaymentHistory ? 1 : 0, '', 3]}
                        color={getPaymentStatusColor()}
                        textTransform={isOnPaymentHistory ? '' : 'uppercase'}
                        mb={isOnPaymentHistory ? 0 : 14}
                        fontWeight={isOnPaymentHistory ? 'normal' : 'bold'}
                    >
                        {paymentStatus}
                    </Text>
                    <Flex flexDirection="column">
                        {!isOnPaymentHistory ? (
                            <Text
                                fontSize={1}
                                textTransform="uppercase"
                                lineHeight="1.1"
                            >
                                Procedure
                            </Text>
                        ) : null}
                        <Flex alignItems="flex-end">
                            <Text
                                fontSize={[4, '', 5]}
                                fontWeight="bold"
                                lineHeight="1.1"
                            >
                                {renderPrice(totalAmount)}
                            </Text>
                            {refundAmount && (
                                <Text
                                    ml={10}
                                    color="text.yellow"
                                >{`(${renderPrice(
                                    refundAmount
                                )} Refunded)`}</Text>
                            )}
                        </Flex>
                    </Flex>
                </Box>
                <Flex alignItems="top">
                    <Button
                        onClick={() => opentDetailModal(payment.id)}
                        type="ghost"
                        height={[50, '', 70]}
                        width={[50, '', 70]}
                        top="0"
                        right="0"
                        position="absolute"
                    >
                        <Icon
                            fontSize={[0, '', 3]}
                            color="icon.blue"
                            type="right"
                        />
                    </Button>
                </Flex>
            </Flex>
            <Box
                my={[10, '', 16]}
                borderBottom="1px solid"
                borderColor="divider.darkGray"
            />
            <Text
                fontSize={[2, '', 5]}
                fontWeight="bold"
                lineHeight="1.1"
                mb={isOnPaymentHistory ? 14 : 4}
            >
                <Truncate lines={1}>
                    {persona === PATIENT
                        ? `Dr. ${payment.payee.firstName} ${
                              payment.payee.lastName
                          }`
                        : `${payment.payer.firstName} ${
                              payment.payer.lastName
                          }`}
                </Truncate>
            </Text>
            <PaymentDetails
                payment={payment}
                visible={visibleModal === `payment_detail_${payment.id}`}
                onCancel={closeModal}
                cardType={cardType}
                total={totalAmount}
            />
            <Box>
                <Text fontSize={[0, '', 3]} mb={[6, '', 10]}>
                    Procedure Summary
                </Text>
                {renderInvoiceItem(payment.invoice.items, persona)}
                <Flex fontSize={[0, '', 2]} justifyContent="space-between">
                    <Text fontWeight="500">Total</Text>
                    <Text fontWeight="500">{renderPrice(totalAmount)}</Text>
                </Flex>
            </Box>
        </StyledCard>
    );
};

ProcedurePaymentCardView.propTypes = {
    closeModal: PropTypes.func,
    cardType: PropTypes.string,
    payment: PropTypes.object,
    paymentStatus: PropTypes.string,
    persona: PropTypes.string,
    totalAmount: PropTypes.number,
    reservation: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    office: PropTypes.object,
};

ProcedurePaymentCardView.defaultProps = {
    closeModal: () => {},
    cardType: PAYMENT_CARD,
    payment: { id: '123', refundAmount: 123 },
    paymentStatus: AVAILABLE,
    totalAmount: 123,
    reservation: {},
    startTime: moment(),
    endTime: moment(),
    office: { name: 'Missing Office', location: { name: 'Missing Office' } },
};

export default ProcedurePaymentCardView;

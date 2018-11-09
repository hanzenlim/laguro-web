import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import { renderPrice } from '../../../../util/paymentUtil';
import { Card, Text, Flex, Box } from '../../../../components';
import {
    AVAILABLE,
    PENDING,
    PAYMENT_CARD,
    PATIENT,
} from '../../../../util/strings';

const StyledCard = styled(Card)`
    && {
        width: 100%;
        margin-bottom: 7px;
        box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.15);
        border-color: ${props => props.theme.colors.divider.gray};

        .ant-card-head-title {
            padding-bottom: 20px;
        }

        .ant-card-body {
            padding-top: 20px;
            padding-bottom: 40px;
        }

        .ant-card-head {
            border-bottom: none;
        }

        .ant-card-head:after {
            content: '';
            display: block;
            margin: 0 auto;
            width: 100%;

            border-bottom: 1px solid ${props => props.theme.colors.divider.gray};
        }

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            width: 720px;
            margin-bottom: 40px;

            .ant-card-head:after {
                width: 680px;
            }
        }
    }
`;

const renderInvoiceItem = (procedures, persona) =>
    procedures.map(procedure => (
        <Box>
            <Flex justifyContent="space-between">
                <Box fontSize={[0, '', 2]} fontWeight="bold">
                    {procedure.name}
                </Box>
                <Box fontSize={[0, '', 2]} fontWeight="bold">
                    {persona === PATIENT
                        ? renderPrice(procedure.totalPrice)
                        : renderPrice(procedure.payoutAmount)}
                </Box>
            </Flex>
            <Box
                my={[7, '', 15]}
                borderBottom="1px solid"
                borderColor="divider.darkGray"
            />
        </Box>
    ));

const PaymentCardView = ({
    closeModal,
    cardType,
    payment,
    paymentStatus,
    totalAmount,
    reservation,
    startTime,
    endTime,
    office,
    persona,
    ...rest
}) => {
    const totalColor = () => {
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

    return (
        <StyledCard
            {...rest}
            key={payment.id}
            title={
                <Flex alignItems="center">
                    <Box>
                        <Text fontSize={[1, '', 3]}>{paymentStatus}</Text>
                        <Flex alignItems="flex-end">
                            <Text
                                fontSize={[4, '', 5]}
                                fontWeight="bold"
                                lineHeight="1.1"
                                color={totalColor()}
                            >
                                {renderPrice(totalAmount)}
                            </Text>
                            {refundAmount && (
                                <Text
                                    ml={[8, '', 10]}
                                    fontSize={[4, '', 5]}
                                    color="text.yellow"
                                >{`(${renderPrice(
                                    refundAmount
                                )} Refunded)`}</Text>
                            )}
                        </Flex>
                    </Box>
                </Flex>
            }
        >
            <Text
                truncate
                fontSize={[2, '', 5]}
                fontWeight="bold"
                lineHeight="1.1"
            >
                {persona === PATIENT
                    ? `Dr. ${payment.payee.firstName} ${payment.payee.lastName}`
                    : `${payment.payer.firstName} ${payment.payer.lastName}`}
            </Text>
            <Box ml={[0, '', 30]} mt={[14, '', 30]}>
                <Text fontSize={[0, '', 3]} mb={5}>
                    Procedure Summary
                </Text>
                {renderInvoiceItem(payment.invoice.items, persona)}
                <Flex
                    fontSize={[0, '', 2]}
                    fontWeight="bold"
                    justifyContent="space-between"
                >
                    <Box>Total</Box>
                    <Box>{renderPrice(totalAmount)}</Box>
                </Flex>
            </Box>
        </StyledCard>
    );
};

PaymentCardView.propTypes = {
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

PaymentCardView.defaultProps = {
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

export default PaymentCardView;

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetails from '../PaymentDetails';

import { renderPrice } from '../../../util/paymentUtil';
import { Card, Text, Flex, Box, Icon, Button } from '../../../components';
import { AVAILABLE, PENDING, PAYMENT_CARD } from '../../../util/strings';

const StyledCard = styled(Card)`
    && {
        width: 720px;
        margin-bottom: 40px;
        box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.15);
        border-color: ${props => props.theme.colors.divider.gray};
    }

    && .ant-card-head-title {
        padding-bottom: 20px;
    }

    && .ant-card-body {
        padding-top: 20px;
        padding-bottom: 40px;
    }

    && .ant-card-head {
        border-bottom: none;
    }

    && .ant-card-head:after {
        content: '';
        display: block;
        margin: 0 auto;

        width: 680px;
        border-bottom: 1px solid ${props => props.theme.colors.divider.gray};
    }
`;

const PaymentCard = ({
    closeModal,
    opentDetailModal,
    visibleModal,
    cardType,
    payment,
    paymentStatus,
    totalAmount,
    reservation,
    startTime,
    endTime,
    office,
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
                        <Text fontSize={3}>{paymentStatus}</Text>
                        <Flex alignItems="flex-end">
                            <Text
                                fontSize={5}
                                fontWeight="bold"
                                lineHeight="1.1"
                                color={totalColor()}
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
                    </Box>
                </Flex>
            }
            extra={
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    mt={6}
                    onClick={() => opentDetailModal(payment.id)}
                >
                    <Button type="ghost">
                        <Icon
                            fontSize={3}
                            style={{ fontWeight: 'bold', color: '#000000' }}
                            type="eye-o"
                        />
                        <Text mt="5px">view details</Text>
                    </Button>
                </Flex>
            }
        >
            <PaymentDetails
                payment={payment}
                visible={visibleModal === `payment_detail_${payment.id}`}
                onCancel={closeModal}
                cardType={cardType}
                total={totalAmount}
                reservation={reservation}
                startTime={startTime}
                endTime={endTime}
            />
            <Text fontSize={5} fontWeight="bold" lineHeight="1.1">
                {moment(startTime).format('ddd, MMM D, YYYY')}
            </Text>
            <Text fontSize={5} lineHeight="1.1">
                {`${office.name} (${moment(startTime).format('hA')} - ${moment(
                    endTime
                ).format('hA')})`}
            </Text>
            <Flex mt={5}>
                <Icon
                    fontSize={4}
                    type="environment-o"
                    color="icon.lightGray"
                    style={{ fontWeight: 'bold' }}
                    mr={6}
                />
                <Text color="text.darkBlue">{office.location.name}</Text>
            </Flex>
        </StyledCard>
    );
};

PaymentCard.propTypes = {
    closeModal: PropTypes.func,
    opentDetailModal: PropTypes.func,
    visibleModal: PropTypes.string,
    cardType: PropTypes.string,
    payment: PropTypes.object,
    paymentStatus: PropTypes.string,
    totalAmount: PropTypes.number,
    reservation: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    office: PropTypes.object,
};

PaymentCard.defaultProps = {
    closeModal: () => {},
    opentDetailModal: () => {},
    visibleModal: '',
    cardType: PAYMENT_CARD,
    payment: { id: '123', refundAmount: 123 },
    paymentStatus: AVAILABLE,
    totalAmount: 123,
    reservation: {},
    startTime: moment(),
    endTime: moment(),
    office: { name: 'Missing Office', location: { name: 'Missing Office' } },
};

export default PaymentCard;

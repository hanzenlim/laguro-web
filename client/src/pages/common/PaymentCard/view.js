import React, { Fragment } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetails from '../PaymentDetails';

import { renderPrice } from '../../../util/paymentUtil';
import { Card, Text, Flex, Box, Icon, Button } from '../../../components';
import { AVAILABLE, PENDING, PAYMENT_CARD } from '../../../util/strings';

const StyledCard = styled(Card)`
    && {
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
                                    ml={10}
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

            {_get(reservation, 'availableTimes.length') ? (
                reservation.availableTimes.map(availableTime => (
                    <Fragment>
                        <Text
                            fontSize={[2, '', 5]}
                            fontWeight="bold"
                            lineHeight="1.1"
                        >
                            {moment(availableTime.startTime).format(
                                'ddd, MMM D, YYYY'
                            )}
                        </Text>
                        <Text fontSize={[2, '', 5]} lineHeight="1.1">
                            {`${office.name} (${moment(
                                availableTime.startTime
                            ).format('hA')} - ${moment(
                                availableTime.endTime
                            ).format('hA')})`}
                        </Text>
                    </Fragment>
                ))
            ) : (
                <Fragment>
                    <Text
                        fontSize={[2, '', 5]}
                        fontWeight="bold"
                        lineHeight="1.1"
                    >
                        {moment(startTime).format('ddd, MMM D, YYYY')}
                    </Text>
                    <Text fontSize={[2, '', 5]} lineHeight="1.1">
                        {`${office.name} (${moment(startTime).format(
                            'hA'
                        )} - ${moment(endTime).format('hA')})`}
                    </Text>
                </Fragment>
            )}

            <Flex mt={5}>
                <Text color="text.darkBlue">
                    <Icon
                        fontSize={[0, '', 4]}
                        type="environment-o"
                        color="icon.lightGray"
                        style={{ fontWeight: 'bold' }}
                        mr={6}
                    />
                    {office.location.name}
                </Text>
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

import React, { Fragment } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetails from '../PaymentDetails';

import { renderPrice } from '~/util/paymentUtil';
import {
    Card,
    Text,
    Flex,
    Box,
    Icon,
    Button,
    Truncate,
} from '~/components';
import {
    AVAILABLE,
    PENDING,
    PAYMENT_CARD,
    PAYMENT_MADE,
} from '~/util/strings';

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

const PaymentCard = ({
    isModalOpen,
    toggleModal,
    cardType,
    payment,
    paymentStatus,
    totalAmount,
    reservation,
    startTime,
    endTime,
    office,
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
                            <Text fontSize={1} lineHeight="1.1">
                                {payment.type}
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
                        onClick={toggleModal}
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
            <PaymentDetails
                payment={payment}
                visible={isModalOpen}
                onCancel={toggleModal}
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
                            lineHeight="1.38"
                        >
                            {`${moment(availableTime.startTime).format(
                                'ddd, MMM D, YYYY'
                            )} (${moment(availableTime.startTime).format(
                                'hA'
                            )} - ${moment(availableTime.endTime).format(
                                'hA'
                            )})`}
                        </Text>
                    </Fragment>
                ))
            ) : (
                <Fragment>
                    <Text
                        fontSize={[2, '', 5]}
                        fontWeight="bold"
                        lineHeight="1.38"
                    >
                        {`${moment(startTime).format(
                            'ddd, MMM D, YYYY'
                        )} (${moment(startTime).format('hA')} - ${moment(
                            endTime
                        ).format('hA')})`}
                    </Text>
                </Fragment>
            )}

            <Text fontSize={[2, '', 5]} lineHeight={[1.38, '', 1.1]}>
                {office.name}
            </Text>

            <Flex mt={5} alignItems="center">
                <Icon
                    fontSize={[0, '', 4]}
                    type="environment-o"
                    color={isOnPaymentHistory ? 'icon.blue' : 'icon.lightGray'}
                    style={{ fontWeight: 'bold' }}
                    mr={6}
                />
                <Text
                    color={isOnPaymentHistory ? 'text.blue' : 'text.gray'}
                    lineHeight={[1, '', 1.83]}
                    fontSize={[0, '', 3]}
                >
                    <Truncate lines={1}>{office.location.name}</Truncate>
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

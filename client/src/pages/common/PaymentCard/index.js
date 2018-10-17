import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import PaymentCardView from './view';
import { NoPaymentsCard } from '../PaymentHistory';
import { Box } from '../../../components';
import { APPOINTMENT_PAYMENT_TYPE, PAYMENT_CARD } from '../../../util/strings';
import { GET_VISIBLE_MODAL } from './queries';

const PaymentCardContainer = ({
    payment,
    cardType,
    paymentStatus,
    ...rest
}) => (
    <Query query={GET_VISIBLE_MODAL}>
        {({ data, client }) => {
            const opentDetailModal = id => {
                client.writeData({
                    data: {
                        visibleModal: `payment_detail_${id}`,
                    },
                });
            };

            const closeModal = () => {
                client.writeData({ data: { visibleModal: null } });
            };

            const { type, appointment, invoice } = payment;
            const reservation =
                type === APPOINTMENT_PAYMENT_TYPE
                    ? appointment.reservation
                    : payment.reservation;
            const startTime =
                type === APPOINTMENT_PAYMENT_TYPE
                    ? appointment.startTime
                    : reservation.startTime;
            const endTime =
                type === APPOINTMENT_PAYMENT_TYPE
                    ? appointment.endTime
                    : reservation.endTime;
            const { office } = reservation;

            if (!invoice || !invoice.items)
                return (
                    <Box mb={40}>
                        <NoPaymentsCard
                            text={`Something went wrong and this payment is unable to be displayed. Please contact us.`}
                        />
                    </Box>
                );

            const itemsTotalPrice = () =>
                invoice.items
                    .map(item => item.totalPrice)
                    .reduce((acc, val) => acc + val, 0);

            const itemsPayoutAmount = () =>
                invoice.items
                    .map(item => item.payoutAmount)
                    .reduce((acc, val) => acc + val, 0);

            const totalAmount =
                cardType === PAYMENT_CARD
                    ? itemsTotalPrice()
                    : itemsPayoutAmount();

            return (
                <PaymentCardView
                    payment={payment}
                    totalAmount={totalAmount}
                    reservation={reservation}
                    startTime={startTime}
                    endTime={endTime}
                    office={office}
                    paymentStatus={paymentStatus}
                    cardType={cardType}
                    opentDetailModal={opentDetailModal}
                    closeModal={closeModal}
                    visibleModal={data.visibleModal}
                    {...rest}
                />
            );
        }}
    </Query>
);

PaymentCardContainer.propTypes = {
    payment: PropTypes.object,
    cardType: PropTypes.string,
    paymentStatus: PropTypes.string,
};

PaymentCardContainer.defaultProps = {
    payment: {
        type: APPOINTMENT_PAYMENT_TYPE,
        appointment: { startTime: '123', endTime: '123' },
        invoice: { items: [] },
    },
    cardType: PAYMENT_CARD,
    paymentStatus: '',
};

export default PaymentCardContainer;

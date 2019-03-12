import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PaymentCardView from './view';
import { NoPaymentsCard } from '../../PaymentHistory';
import { Box } from '../../../../components';
import {
    APPOINTMENT_PAYMENT_TYPE,
    PAYMENT_CARD,
    PATIENT,
} from '../../../../util/strings';

class PaymentCardContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

    render() {
        const {
            payment,
            cardType,
            paymentStatus,
            persona,
            ...rest
        } = this.props;
        const { invoice } = payment;

        if (!invoice || !invoice.items)
            return (
                <Box mb={40}>
                    <NoPaymentsCard
                        text={`Something went wrong and this payment is unable to be displayed. Please contact us.`}
                    />
                </Box>
            );

        let totalAmount = 0;

        if (payment.paymentInstallmentPlan) {
            totalAmount = payment.paymentInstallmentPlan.charges
                .map(charge => charge.amount)
                .reduce((acc, val) => acc + val, 0);
        } else if (persona === PATIENT) {
            totalAmount = invoice.items
                .map(item => item.totalPrice)
                .reduce((acc, val) => acc + val, 0);
        } else {
            totalAmount = invoice.items
                .map(item => item.payoutAmount)
                .reduce((acc, val) => acc + val, 0);
        }

        return (
            <PaymentCardView
                payment={payment}
                persona={persona}
                totalAmount={totalAmount}
                paymentStatus={paymentStatus}
                cardType={cardType}
                isModalOpen={this.state.isModalOpen}
                toggleModal={this.toggleModal}
                {...rest}
            />
        );
    }
}

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

import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import moment from 'moment';

import BalanceHistoryView from './view';
import { CardLoading } from '../PaymentHistory';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { GET_BALANCE_QUERY } from './queries';
import {
    PAYMENT_PENDING,
    PAYMENT_AVAILABLE,
    PAYMENT_REFUNDED,
    PAYMENT_MADE,
    PAYMENT_CARD,
    BALANCE_CARD,
    REFUNDED,
    PAYMENT_WITHDRAWN,
    PAYEE_ID,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
} from '../../../util/strings';

const paymentStatus = (cardType, payment) => {
    const { refundAmount, nominalAmount, status, chargeStatus } = payment;
    if (cardType === PAYMENT_CARD) return PAYMENT_MADE;
    if (status === REFUNDED && refundAmount >= nominalAmount)
        return PAYMENT_REFUNDED;
    switch (chargeStatus) {
        case PAYMENT_AVAILABLE:
            return PAYMENT_AVAILABLE;
        case PAYMENT_PENDING:
            return PAYMENT_PENDING;
        default:
            return PAYMENT_WITHDRAWN;
    }
};

const getStartTime = payment => {
    switch (payment.type) {
        case APPOINTMENT_PAYMENT_TYPE:
            return payment.appointment.startTime;
        case RESERVATION_PAYMENT_TYPE:
            return payment.reservation.startTime;
        default:
            return payment.dateCreated;
    }
};

const getEndTime = payment => {
    switch (payment.type) {
        case APPOINTMENT_PAYMENT_TYPE:
            return payment.appointment.endTime;
        case RESERVATION_PAYMENT_TYPE:
            return payment.reservation.endTime;
        default:
            return payment.dateCreated;
    }
};

class BalanceHistoryContainer extends PureComponent {
    constructor(props) {
        super(props);
        const params = queryString.parse(window.location.search);
        const accountToken = params.code;

        this.state = {
            visiblePayments: PAYMENT_AVAILABLE,
            accountToken,
            dateRange: [],
        };
    }

    handleSelectChange = value => {
        this.setState({ visiblePayments: value });
    };

    handleDateSelectChange = dates => {
        this.setState({ dateRange: dates });
    };

    totalMany = (allPayments, statusName) => {
        const invoiceItems = [];

        allPayments
            .filter(payment => payment.paymentStatus === statusName)
            .forEach(payment => {
                invoiceItems.push(...payment.invoice.items);
            });

        return invoiceItems
            .map(item => item.payoutAmount)
            .reduce((acc, val) => acc + val, 0);
    };

    filterPayments = allPayments => {
        const filteredPayments = allPayments.filter(
            payment => payment.paymentStatus === this.state.visiblePayments
        );
        if (isEmpty(this.state.dateRange)) return filteredPayments;

        return filteredPayments.filter(payment => {
            const startTime = getStartTime(payment);
            const endTime = getEndTime(payment);
            const { dateRange } = this.state;
            return (
                moment(endTime).isSameOrAfter(dateRange[0]) &&
                moment(startTime).isSameOrBefore(dateRange[1])
            );
        });
    };

    render() {
        const { userId } = this.props;
        const { accountToken } = this.state;
        return (
            <Query
                query={GET_BALANCE_QUERY}
                variables={{
                    input: {
                        partitionKey: PAYEE_ID,
                        partitionValue: userId,
                    },
                }}
            >
                {({ loading, error, data: paymentData }) => {
                    if (loading) return <CardLoading />;

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const cardType = BALANCE_CARD;
                    const allPayments = paymentData.queryPayments.map(
                        payment => {
                            const statusName = paymentStatus(cardType, payment);
                            return {
                                ...payment,
                                paymentStatus: statusName,
                            };
                        }
                    );

                    const totalAvailable = this.totalMany(
                        allPayments,
                        PAYMENT_AVAILABLE
                    );

                    const totalPending = this.totalMany(
                        allPayments,
                        PAYMENT_PENDING
                    );

                    const filteredPayments = this.filterPayments(allPayments);

                    return (
                        <BalanceHistoryView
                            filteredPayments={filteredPayments}
                            totalAvailable={totalAvailable}
                            totalPending={totalPending}
                            cardType={cardType}
                            userId={userId}
                            accountToken={accountToken}
                            handleSelectChange={this.handleSelectChange}
                            handleDateSelectChange={this.handleDateSelectChange}
                            visiblePayments={this.state.visiblePayments}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default BalanceHistoryContainer;

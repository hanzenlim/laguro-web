import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import moment from 'moment';

import BalanceHistoryView from './view';
import { CardLoading } from '../PaymentHistory';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { GET_PAYMENTS } from './queries';
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

    render() {
        const { userId } = this.props;
        const { accountToken } = this.state;
        return (
            <Query
                query={GET_PAYMENTS}
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

                    let filteredPayments = allPayments.filter(
                        payment =>
                            payment.paymentStatus === this.state.visiblePayments
                    );

                    if (!isEmpty(this.state.dateRange)) {
                        filteredPayments = filteredPayments.filter(payment => {
                            const startTime =
                                payment.type === APPOINTMENT_PAYMENT_TYPE
                                    ? payment.appointment.startTime
                                    : payment.reservation.startTime;
                            const endTime =
                                payment.type === APPOINTMENT_PAYMENT_TYPE
                                    ? payment.appointment.endTime
                                    : payment.reservation.endTime;
                            const { dateRange } = this.state;
                            return (
                                moment(endTime).isSameOrAfter(dateRange[0]) &&
                                moment(startTime).isSameOrBefore(dateRange[1])
                            );
                        });
                    }

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

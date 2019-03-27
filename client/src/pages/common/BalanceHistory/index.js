import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import moment from 'moment';
import _get from 'lodash/get';
import BalanceHistoryView from './view';
import { CardLoading } from '../PaymentHistory';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { withScreenSizes } from '../../../components/Responsive';
import { Container } from '../../../components';

import { GET_BALANCE_QUERY } from './queries';
import {
    PAID_OUT,
    PAYMENT_PENDING,
    PAYMENT_AVAILABLE,
    PAYMENT_REFUNDED,
    PAYMENT_MADE,
    PAYMENT_CARD,
    BALANCE_CARD,
    REFUNDED,
    PAYMENT_WITHDRAWN,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
    HOST,
    DENTIST,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
} from '../../../util/strings';

const paymentStatus = (cardType, payment) => {
    const { status, isPayoutAvailable } = payment;
    if (cardType === PAYMENT_CARD) return PAYMENT_MADE;
    if (status === REFUNDED) return PAYMENT_REFUNDED;
    else if (status === PAID_OUT) {
        return PAYMENT_WITHDRAWN;
    } else if (isPayoutAvailable) {
        return PAYMENT_AVAILABLE;
    }
    return PAYMENT_PENDING;
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
        const { userId, persona, desktopOnly } = this.props;
        const { accountToken } = this.state;
        return (
            <Query
                query={GET_BALANCE_QUERY}
                fetchPolicy="cache-and-network"
                variables={{
                    input: {
                        userId,
                    },
                }}
            >
                {({ loading, error, data: paymentData }) => {
                    if (loading)
                        return (
                            <Container px={[25, '', 0]}>
                                <CardLoading />
                            </Container>
                        );

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const cardType = BALANCE_CARD;
                    const allPayments = paymentData.getBalanceHistory.map(
                        payment => {
                            const statusName = paymentStatus(cardType, payment);
                            return {
                                ...payment,
                                paymentStatus: statusName,
                            };
                        }
                    );

                    // to show only reservation payment objects for host persona, and procedure payment objects for dentist persona
                    const paymentsFilteredByPersona = allPayments.filter(
                        payment =>
                            (persona === HOST &&
                                _get(payment, 'type') ===
                                    RESERVATION_PAYMENT_TYPE) ||
                            (persona === DENTIST &&
                                _get(payment, 'type') ===
                                    PROCEDURE_SET_HISTORY_PAYMENT_TYPE)
                    );

                    const totalAvailable = paymentsFilteredByPersona.reduce(
                        (acc, payment) =>
                            acc + payment.payoutParams.availablePayoutAmount,
                        0
                    );

                    const totalPending = paymentsFilteredByPersona.reduce(
                        (acc, payment) =>
                            acc + payment.payoutParams.pendingPayoutAmount,
                        0
                    );

                    const filteredPayments = this.filterPayments(
                        paymentsFilteredByPersona
                    );

                    return (
                        <BalanceHistoryView
                            payments={
                                desktopOnly
                                    ? filteredPayments
                                    : paymentsFilteredByPersona
                            }
                            totalAvailable={totalAvailable}
                            totalPending={totalPending}
                            cardType={cardType}
                            userId={userId}
                            persona={persona}
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

export default withScreenSizes(BalanceHistoryContainer);

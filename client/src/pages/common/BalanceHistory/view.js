import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NoPaymentsCard } from '../PaymentHistory';
import PaymentCard from '../PaymentCard';
import ProcedurePaymentCard from '../PaymentCard/ProcedurePaymentCard';
import StripePayoutButtons from './StripePayout';
import { renderPrice } from '../../../util/paymentUtil';

import {
    Text,
    Flex,
    Select,
    RangePicker,
    Box,
    Responsive,
    Container,
    Card,
    Pagination,
} from '../../../components';
import {
    PAYMENT_PENDING,
    PAYMENT_AVAILABLE,
    PAYMENT_REFUNDED,
    PAYMENT_WITHDRAWN,
    PROCEDURE_PAYMENT_TYPE,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
} from '../../../util/strings';

const { Option } = Select;

const StyledSelect = styled(Select)`
    && .ant-select-selection-selected-value {
        padding: 5px 0;
    }
`;

const { Desktop } = Responsive;

class BalanceHistoryView extends PureComponent {
    defaultPageSize = 10;

    state = {
        currentPage: 1,
    };

    onPageChange = page => {
        this.setState({
            currentPage: page,
        });
    };

    renderPaymentCard = (payments, persona, props) => {
        if (payments.length) {
            const start = (this.state.currentPage - 1) * this.defaultPageSize;
            const end = this.state.currentPage * this.defaultPageSize;

            return payments.slice(start, end).map((payment, index) => {
                if (
                    payment.type === APPOINTMENT_PAYMENT_TYPE ||
                    payment.type === RESERVATION_PAYMENT_TYPE
                ) {
                    return (
                        <PaymentCard
                            key={index}
                            payment={payment}
                            paymentStatus={payment.paymentStatus}
                            {...props}
                        />
                    );
                } else if (
                    payment.type === PROCEDURE_PAYMENT_TYPE ||
                    payment.type === PROCEDURE_SET_HISTORY_PAYMENT_TYPE
                ) {
                    return (
                        <ProcedurePaymentCard
                            key={index}
                            persona={persona}
                            payment={payment}
                            paymentStatus={payment.paymentStatus}
                            {...props}
                        />
                    );
                }

                return null;
            });
        }

        return null;
    };

    render() {
        const {
            payments,
            totalAvailable,
            totalPending,
            userId,
            accountToken,
            handleSelectChange,
            handleDateSelectChange,
            visiblePayments,
            persona,
            ...rest
        } = this.props;

        return (
            <Container px={[25, '', 0]}>
                <Flex flexDirection="column">
                    <Box mb={[16, '', 20]}>
                        <Card>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Text fontSize={[0, '', 3]}>available</Text>
                                    <Text
                                        fontSize={[1, '', 5]}
                                        fontWeight="bold"
                                        lineHeight="1.1"
                                        color="text.blue"
                                    >
                                        {renderPrice(totalAvailable)}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize={[0, '', 3]}>pending</Text>
                                    <Text
                                        fontSize={[1, '', 5]}
                                        fontWeight="bold"
                                        lineHeight="1.1"
                                        color="text.yellow"
                                    >
                                        {renderPrice(totalPending)}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text fontSize={[0, '', 3]}>total</Text>
                                    <Text
                                        fontSize={[1, '', 5]}
                                        fontWeight="bold"
                                        lineHeight="1.1"
                                        color="text.black"
                                    >
                                        {renderPrice(
                                            totalPending + totalAvailable
                                        )}
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </Box>
                    <StripePayoutButtons
                        userId={userId}
                        accountToken={accountToken}
                        totalAvailable={totalAvailable}
                    />
                    <Desktop>
                        <Flex mb={20} justifyContent="space-between">
                            <StyledSelect
                                defaultValue={PAYMENT_AVAILABLE}
                                width={180}
                                onChange={handleSelectChange}
                            >
                                <Option value={PAYMENT_AVAILABLE}>
                                    Available
                                </Option>
                                <Option value={PAYMENT_PENDING}>Pending</Option>
                                <Option value={PAYMENT_REFUNDED}>
                                    Refunded
                                </Option>
                                <Option value={PAYMENT_WITHDRAWN}>
                                    Withdrawn
                                </Option>
                            </StyledSelect>
                            <RangePicker onChange={handleDateSelectChange} />
                        </Flex>
                    </Desktop>

                    {this.renderPaymentCard(payments, persona, rest)}
                    {payments.length === 0 && (
                        <NoPaymentsCard
                            text={`You have no ${visiblePayments} payments yet!`}
                        />
                    )}
                    <Pagination
                        current={this.state.currentPage}
                        defaultPageSize={this.defaultPageSize}
                        total={payments.length}
                        onChange={this.onPageChange}
                    />
                </Flex>
            </Container>
        );
    }
}

BalanceHistoryView.propTypes = {
    payments: PropTypes.array,
    totalAvailable: PropTypes.number,
    totalPending: PropTypes.number,
    userId: PropTypes.string,
    persona: PropTypes.string,
    accountToken: PropTypes.string,
    handleSelectChange: PropTypes.func,
    handleDateSelectChange: PropTypes.func,
    visiblePayments: PropTypes.string,
};

BalanceHistoryView.defaultProps = {
    payments: [],
    totalAvailable: 100,
    totalPending: 100,
    userId: '1233',
    accountToken: '',
    handleSelectChange: () => {},
    handleDateSelectChange: () => {},
    visiblePayments: PAYMENT_AVAILABLE,
};

export default BalanceHistoryView;

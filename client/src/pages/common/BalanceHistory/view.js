import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NoPaymentsCard } from '../PaymentHistory';
import PaymentCard from '../PaymentCard';
import ProcedurePaymentCard from '../PaymentCard/ProcedurePaymentCard';
import StripePayoutButtons from './StripePayout';
import { renderPrice } from '../../../util/paymentUtil';

import { Text, Flex, Select, RangePicker, Box } from '../../../components';
import {
    PAYMENT_PENDING,
    PAYMENT_AVAILABLE,
    PAYMENT_REFUNDED,
    PAYMENT_WITHDRAWN,
    PROCEDURE_PAYMENT_TYPE,
    APPOINTMENT_PAYMENT_TYPE,
    RESERVATION_PAYMENT_TYPE,
} from '../../../util/strings';

const { Option } = Select;

const StyledFlex = styled(Flex)`
    && {
        box-shadow: ${props => props.theme.shadows[0]};
        border: 1px solid;
        border-radius: 2px;
        border-color: ${props => props.theme.colors.divider.gray};
    }
`;

const StyledSelect = styled(Select)`
    && .ant-select-selection-selected-value {
        padding: 5px 0;
    }
`;

const BalanceHistoryView = ({
    filteredPayments,
    totalAvailable,
    totalPending,
    userId,
    accountToken,
    handleSelectChange,
    handleDateSelectChange,
    visiblePayments,
    persona,
    ...rest
}) => (
    <Flex flexDirection="column">
        <StyledFlex
            height={100}
            mb={20}
            justifyContent="space-around"
            alignItems="center"
        >
            <Box>
                <Text fontSize={3}>available</Text>
                <Text
                    fontSize={5}
                    fontWeight="bold"
                    lineHeight="1.1"
                    color="text.blue"
                >
                    {renderPrice(totalAvailable)}
                </Text>
            </Box>
            <Box>
                <Text fontSize={3}>pending</Text>
                <Text
                    fontSize={5}
                    fontWeight="bold"
                    lineHeight="1.1"
                    color="text.yellow"
                >
                    {renderPrice(totalPending)}
                </Text>
            </Box>
            <Box>
                <Text fontSize={3}>total</Text>
                <Text
                    fontSize={5}
                    fontWeight="bold"
                    lineHeight="1.1"
                    color="text.black"
                >
                    {renderPrice(totalPending + totalAvailable)}
                </Text>
            </Box>
        </StyledFlex>
        <StripePayoutButtons
            userId={userId}
            accountToken={accountToken}
            totalAvailable={totalAvailable}
        />
        <Flex mb={20} justifyContent="space-between">
            <StyledSelect
                defaultValue={PAYMENT_AVAILABLE}
                width={180}
                onChange={handleSelectChange}
            >
                <Option value={PAYMENT_AVAILABLE}>Available</Option>
                <Option value={PAYMENT_PENDING}>Pending</Option>
                <Option value={PAYMENT_REFUNDED}>Refunded</Option>
                <Option value={PAYMENT_WITHDRAWN}>Withdrawn</Option>
            </StyledSelect>
            <RangePicker onChange={handleDateSelectChange} />
        </Flex>

        {filteredPayments.map((payment, index) => {
            if (
                payment.type === APPOINTMENT_PAYMENT_TYPE ||
                payment.type === RESERVATION_PAYMENT_TYPE
            ) {
                return (
                    <PaymentCard
                        key={index}
                        payment={payment}
                        paymentStatus={payment.paymentStatus}
                        {...rest}
                    />
                );
            } else if (payment.type === PROCEDURE_PAYMENT_TYPE) {
                return (
                    <ProcedurePaymentCard
                        key={index}
                        persona={persona}
                        payment={payment}
                        paymentStatus={payment.paymentStatus}
                        {...rest}
                    />
                );
            }

            return null;
        })}
        {filteredPayments.length === 0 && (
            <NoPaymentsCard
                text={`You have no ${visiblePayments} payments yet!`}
            />
        )}
    </Flex>
);

BalanceHistoryView.propTypes = {
    filteredPayments: PropTypes.array,
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
    filteredPayments: [],
    totalAvailable: 100,
    totalPending: 100,
    userId: '1233',
    accountToken: '',
    handleSelectChange: () => {},
    handleDateSelectChange: () => {},
    visiblePayments: PAYMENT_AVAILABLE,
};

export default BalanceHistoryView;

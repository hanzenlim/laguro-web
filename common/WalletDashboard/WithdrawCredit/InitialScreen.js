import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '~/util/paymentUtil';

import { Text, Button, Flex } from '~/components';
import FundingSourceSelection from '../FundingSourceSelection';
import AmountInput from '../AmountInput';
import { WithdrawCreditContext } from './WithdrawCreditModal';

const InitialScreen = ({ isDisabled }) => {
    const {
        amount,
        computedAmount,
        setAmount,
        balance,
        setCurrentStep,
        WITHDRAW_CREDIT_STEPS,
    } = useContext(WithdrawCreditContext);

    const isNextDisabled = isDisabled || computedAmount > balance;
    return (
        <Fragment>
            <FundingSourceSelection mode="withdraw credit" />
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                mt={16}
                mb={16}
            >
                <AmountInput
                    amount={amount}
                    onChange={value => setAmount(value)}
                    mode="withdraw credit"
                />
            </Flex>
            <Text
                textAlign="center"
                fontSize={0}
                fontWeight="medium"
                color="text.gray"
                mb={24}
            >
                {`Your available balance is ${renderPrice(balance)}`}
            </Text>

            <Button
                disabled={isNextDisabled}
                type="ghost"
                width="100%"
                style={{
                    border: '1px solid #3481f8',
                    borderRadius: 25,
                    opacity: isNextDisabled ? 0.22 : 1,
                }}
                onClick={() => setCurrentStep(WITHDRAW_CREDIT_STEPS.REVIEW)}
            >
                <Text color="text.blue" display="inline" px={8}>
                    Next
                </Text>
            </Button>
        </Fragment>
    );
};

InitialScreen.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
};

export default InitialScreen;

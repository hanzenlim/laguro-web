import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '../../../util/paymentUtil';

import { Text, Button, Flex } from '../../../components';
import FundingSourceSelection from '../FundingSourceSelection';
import AmountInput from '../AmountInput';
import { AddCreditContext } from './AddCreditModal';

const InitialScreen = ({ isDisabled }) => {
    const {
        amount,
        setAmount,
        balance,
        setCurrentStep,
        ADD_CREDIT_STEPS,
    } = useContext(AddCreditContext);
    return (
        <Fragment>
            <FundingSourceSelection mode="add credit" />
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
                    mode="add credit"
                />
            </Flex>
            <Text
                textAlign="center"
                fontSize={0}
                fontWeight="medium"
                color="text.gray"
                mb={24}
            >
                {`Your total balance is ${renderPrice(balance)}`}
            </Text>

            <Button
                disabled={isDisabled}
                type="ghost"
                width="100%"
                style={{
                    border: '1px solid #3481f8',
                    borderRadius: 25,
                    opacity: isDisabled ? 0.22 : 1,
                }}
                onClick={() => setCurrentStep(ADD_CREDIT_STEPS.REVIEW)}
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

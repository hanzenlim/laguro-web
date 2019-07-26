import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Flex } from '../../../components';
import { PAYMENT_METHOD_STEPS } from './PaymentMethodModal';

const BankAccounts = ({ setCurrentStep }) => (
    <Box>
        <Text fontSize={0} mb={6}>
            Bank Accounts
        </Text>

        <Flex
            alignItems="center"
            width="100%"
            height={38}
            px={22}
            boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
            onClick={() =>
                setCurrentStep(PAYMENT_METHOD_STEPS.INFO_VERIFICATION)
            }
        >
            <Text fontSize={4} mr={24} fontWeight="light" color="text.blue">
                +
            </Text>
            <Text fontSize={0}>Link a new bank account</Text>
        </Flex>
    </Box>
);

BankAccounts.propTypes = {
    setCurrentStep: PropTypes.func.isRequired,
};

export default BankAccounts;

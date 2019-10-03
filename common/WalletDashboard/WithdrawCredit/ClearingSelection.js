import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '~/util/paymentUtil';

import { Box, Flex, Text } from '~/components';
import { WithdrawCreditContext } from './WithdrawCreditModal';

const ClearingSelection = ({ transactionAmountMaximum }) => {
    const { clearing, CLEARING_VALUES } = useContext(WithdrawCreditContext);

    const transactionAmountMaximumString = `(max ${renderPrice(
        transactionAmountMaximum
    )})`;

    const options = {
        standard: {
            title: 'Standard transfer',
            processingTime: '(Typically in 3-5 business days)',
            fee: 'No fee',
            max: transactionAmountMaximumString,
            value: CLEARING_VALUES.STANDARD,
        },
        instant: {
            title: 'Instant transfer',
            processingTime: '(Typically in 1-2 business days)',
            fee: '$1 per transaction',
            max: transactionAmountMaximumString,
            value: CLEARING_VALUES.INSTANT,
        },
    };

    return (
        <Box my={4}>
            <Box mb={4}>
                <Option
                    title={options.standard.title}
                    processingTime={options.standard.processingTime}
                    fee={options.standard.fee}
                    max={options.standard.max}
                    selected={clearing === options.standard.value}
                    value={options.standard.value}
                />
            </Box>
            <Box>
                <Option
                    title={options.instant.title}
                    processingTime={options.instant.processingTime}
                    fee={options.instant.fee}
                    max={options.instant.max}
                    selected={clearing === options.instant.value}
                    value={options.instant.value}
                />
            </Box>
        </Box>
    );
};

const Option = ({ title, processingTime, fee, max, selected, value }) => {
    const { setClearing } = useContext(WithdrawCreditContext);
    return (
        <Flex
            justifyContent="space-between"
            px={20}
            py={12}
            border="1px solid"
            borderColor={selected ? 'divider.blue' : 'divider.gray'}
            borderRadius={2}
            style={{ cursor: 'pointer' }}
            onClick={() => setClearing(value)}
        >
            <Box flex={1} textAlign="left">
                <Text fontSize={0} fontWeight="medium" mb={6}>
                    {title}
                </Text>
                <Text fontSize={10} fontWeight="medium" color="text.gray">
                    {processingTime}
                </Text>
            </Box>
            <Box flex={1} textAlign="right">
                <Text fontSize={0} fontWeight="medium" mb={6}>
                    {fee}
                </Text>
                <Text fontSize={0} fontWeight="medium">
                    {max}
                </Text>
            </Box>
        </Flex>
    );
};

ClearingSelection.propTypes = {
    transactionAmountMaximum: PropTypes.number.isRequired,
};

Option.propTypes = {
    title: PropTypes.string.isRequired,
    processingTime: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    value: PropTypes.string.isRequired,
};

Option.defaultProps = {
    selected: false,
};

export default ClearingSelection;

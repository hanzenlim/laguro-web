import React from 'react';

import { Box, Flex, Text } from '../../components';
import PaymentMethod from './PaymentMethod';
import { WalletTransactions } from '../WalletTransactions';
import { WalletDetails } from '../WalletDetails';

const WalletDashboardView = props => (
    <Box mx={[-12, '', 0]}>
        {window.location.href.includes('localhost') && (
            <Flex justifyContent="space-between" alignItems="center" mb={20}>
                <Text fontSize={2} fontWeight="medium">
                    Balance
                </Text>
                <PaymentMethod />
            </Flex>
        )}

        <Box mb={28}>
            <WalletDetails details={[props.balanceBreakdown]} />
        </Box>
        <WalletTransactions
            transactions={props.transactions}
            loading={props.loading}
            onCategoryChange={props.onCategoryChange}
            filteredInfo={props.filteredInfo}
            monthSelected={props.month}
            onMonthChange={props.onMonthChange}
        />
    </Box>
);

export default WalletDashboardView;

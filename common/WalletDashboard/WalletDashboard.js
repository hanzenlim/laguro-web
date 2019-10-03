import React from 'react';

import { Box, Flex, Text, Grid } from '~/components';
import PaymentMethod from './PaymentMethod';
import WalletTransactions from './WalletTransactions';
import WalletDetails from './WalletDetails';
import WithdrawCreditModal from './WithdrawCredit/WithdrawCreditModal';
import AddCreditModal from './AddCredit/AddCreditModal';

const WalletDashboardView = props => (
    <Box mx={[-12, '', 0]}>
        <Flex
            flexDirection={['column', '', 'row']}
            justifyContent="space-between"
            alignItems="center"
            mb={[0, '', 12]}
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mb={[20, '', 0]}
                width="100%"
            >
                <Text fontSize={2} fontWeight="medium">
                    Balance
                </Text>
                <PaymentMethod />
            </Flex>

            {process.env.REACT_APP_ENV !== 'production' ? (
                <Grid
                    gridTemplateColumns="1fr 1fr"
                    gridColumnGap={10}
                    mb={[12, '', 0]}
                    ml={[0, '', 12]}
                    width={['100%', '', 402]}
                >
                    <AddCreditModal
                        balance={props.balanceBreakdown.totalAmount}
                    />
                    <WithdrawCreditModal
                        balance={props.balanceBreakdown.availableAmount}
                    />
                </Grid>
            ) : (
                    <Box
                        mb={[12, '', 0]}
                        ml={[0, '', 12]}
                        width={['100%', '', 'auto']}
                    >
                        <AddCreditModal
                            balance={props.balanceBreakdown.totalAmount}
                        />
                    </Box>
                )}
        </Flex>

        <WalletDetails details={props.balanceBreakdown} />

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

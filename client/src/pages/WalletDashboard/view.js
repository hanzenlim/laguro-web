import React, { Fragment } from 'react';
import { WalletTransactions } from '../WalletTransactions';
import { WalletDetails } from '../WalletDetails';
import { Box } from '../../components';

export const WalletDashboardView = props => (
    <Fragment>
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
    </Fragment>
);

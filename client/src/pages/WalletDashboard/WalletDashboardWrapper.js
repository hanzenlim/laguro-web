import React, { useState, createContext } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';
import _get from 'lodash/get';

import { GET_WALLET_BY_USER_ID } from './queries';
import { walletClient } from '../../util/apolloClients';
import { getUser } from '../../util/authUtils';
import { RedirectErrorPage } from '../GeneralErrorPage';
import WalletDashboardView from './WalletDashboard';

export const WalletDashboardContext = createContext();

const WalletDashboard = () => {
    const [month, setMonth] = useState(moment().startOf('month'));
    const [filteredInfo, setFilteredInfo] = useState({
        type: ['All categories'],
    });

    const onMonthChange = newMonth => {
        setMonth(newMonth);
    };

    const onCategoryChange = ({ dataIndex, categories }) => {
        setFilteredInfo({ ...filteredInfo, [dataIndex]: categories });
    };

    return (
        <WalletDashboardContext.Provider value={{ month }}>
            <Query
                query={GET_WALLET_BY_USER_ID}
                client={walletClient}
                variables={{
                    input: {
                        userId: _get(getUser(), 'id', null),
                    },
                    rangeStart: moment.utc(month.startOf('month')).format(),
                    rangeEnd: moment.utc(month.endOf('month')).format(),
                }}
            >
                {({ data, loading, error }) => {
                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const wallet = _get(data, 'getWalletByUserId', {});
                    const transactions = _get(wallet, 'transactions', []);
                    const pendingAmount = _get(wallet, 'pendingAmount', 0);
                    const laguroCreditAmount = _get(
                        wallet,
                        'laguroCreditAmount',
                        0
                    );
                    const availableAmount = _get(wallet, 'availableAmount', 0);
                    const totalAmount = _get(wallet, 'totalAmount', 0);
                    const balanceBreakdown = {
                        pendingAmount,
                        laguroCreditAmount,
                        availableAmount,
                        totalAmount,
                    };

                    return (
                        <WalletDashboardView
                            balanceBreakdown={balanceBreakdown}
                            transactions={transactions}
                            month={month}
                            onMonthChange={onMonthChange}
                            filteredInfo={filteredInfo}
                            onCategoryChange={onCategoryChange}
                            loading={loading}
                        />
                    );
                }}
            </Query>
        </WalletDashboardContext.Provider>
    );
};

export default WalletDashboard;

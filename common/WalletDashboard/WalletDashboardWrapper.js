import React, { useState, createContext } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';
import _get from 'lodash/get';

import { GET_WALLET_BY_USER_ID, GET_WALLET } from './queries';
import { getUser } from '~/util/authUtils';
import RedirectErrorPage from '~/routes/GeneralErrorPage';
import WalletDashboardView from './WalletDashboard';

export const WalletDashboardContext = createContext();

const WalletDashboard = props => {
    const { walletId = null } = props;
    const isGroupWallet = !!walletId;
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
                query={isGroupWallet ? GET_WALLET : GET_WALLET_BY_USER_ID}
                context={{ clientName: 'wallet' }}
                variables={
                    isGroupWallet
                        ? {
                              id: walletId,
                              rangeStart: moment
                                  .utc(month.startOf('month'))
                                  .format(),
                              rangeEnd: moment
                                  .utc(month.endOf('month'))
                                  .format(),
                          }
                        : {
                              input: {
                                  userId: _get(getUser(), 'id', null),
                              },
                              rangeStart: moment
                                  .utc(month.startOf('month'))
                                  .format(),
                              rangeEnd: moment
                                  .utc(month.endOf('month'))
                                  .format(),
                          }
                }
                fetchPolicy="cache-and-network"
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
                            isGroupWallet={isGroupWallet}
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

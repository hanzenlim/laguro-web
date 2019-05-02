import React, { Component } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { WalletDashboardView } from './view';
import { walletClient } from '../../util/apolloClients';
import { GET_WALLET_BY_USER_ID } from './queries';
import { getUser } from '../../util/authUtils';
import { RedirectErrorPage } from '../GeneralErrorPage';
import { execute } from '../../util/gqlUtils';

class WalletDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().startOf('month'),
            filteredInfo: {
                type: ['All categories'],
            },
            getWalletIsLoading: false,
        };
        this.getWallet();
    }

    getWallet = async month => {
        this.setState({ getWalletIsLoading: true });
        let result;
        let error;
        await execute({
            action: async () => {
                result = await walletClient.query({
                    query: GET_WALLET_BY_USER_ID(
                        moment.utc(this.state.month.startOf('month')).format(),
                        moment.utc(this.state.month.endOf('month')).format()
                    ),
                    variables: {
                        input: {
                            userId: _get(getUser(), 'id'),
                        },
                    },
                });
            },
            onError: e => {
                error = e;
            },
        });
        if (!_isEmpty(error)) {
            this.setState({ getWalletError: error });
        }
        this.setState({
            walletData: _get(result, 'data'),
            getWalletIsLoading: false,
        });
    };

    onMonthChange = month => {
        this.setState({
            month,
        });
        this.getWallet(month);
    };

    onCategoryChange = ({ dataIndex, categories }) => {
        this.setState({
            filteredInfo: {
                ...this.state.filteredInfo,
                [dataIndex]: categories,
            },
        });
    };

    render() {
        if (!_isEmpty(this.state.getWalletError)) {
            return <RedirectErrorPage />;
        }

        const wallet = _get(this.state.walletData, 'getWalletByUserId', {});
        const transactions = _get(wallet, 'transactions', []);
        const balanceBreakdown = _get(wallet, 'balanceBreakdown', {});

        return (
            <WalletDashboardView
                balanceBreakdown={balanceBreakdown}
                transactions={transactions}
                month={this.state.month}
                onMonthChange={this.onMonthChange}
                filteredInfo={this.state.filteredInfo}
                onCategoryChange={this.onCategoryChange}
                loading={this.state.getWalletIsLoading}
            />
        );
    }
}

export default WalletDashboard;

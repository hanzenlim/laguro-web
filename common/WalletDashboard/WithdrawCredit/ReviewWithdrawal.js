import React, { Fragment, useContext } from 'react';
// import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import _get from 'lodash/get';
import moment from 'moment';

import { Loading, Button } from '~/components';
import ClearingSelection from './ClearingSelection';
import ReviewDetails from './ReviewDetails';
import { GET_TRANSFER_INFO, GET_WALLET_BY_USER_ID } from '../queries';
import { WITHDRAW_CREDIT } from '../mutations';
import { getUser } from '~/util/authUtils';
import { WithdrawCreditContext } from './WithdrawCreditModal';
import { execute } from '~/util/gqlUtils';
import { WalletDashboardContext } from '../WalletDashboardWrapper';

// Main Component
const ReviewWithdrawal = () => {
    const {
        computedAmount,
        clearing,
        selectedFundingSource,
        CLEARING_VALUES,
    } = useContext(WithdrawCreditContext);
    const { id: userId } = getUser();
    return (
        <Query
            query={GET_TRANSFER_INFO}
            variables={{ input: { userId, transferAmount: computedAmount } }}
            context={{ clientName: 'wallet' }}
        >
            {({ data, loading, error }) => {
                if (loading) return <Loading />;

                if (error) return <div>Something went wrong.</div>;

                const {
                    standardClearingFees,
                    nextAvailableClearingFees,
                    transactionAmountMaximum,
                } = _get(data, 'getTransferInfo', {
                    standardClearingFees: {
                        feeAmount: 0,
                    },
                    nextAvailableClearingFees: {
                        feeAmount: 0,
                    },
                    transactionAmountMaximum: 0,
                });

                const fee =
                    clearing === CLEARING_VALUES.STANDARD
                        ? standardClearingFees.feeAmount
                        : nextAvailableClearingFees.feeAmount;

                const today = moment();
                let daysToAdd = 0;

                // Sunday
                if (today.day() === 0)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 5 : 2;
                // Monday
                if (today.day() === 1)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 7 : 2;
                // Tuesday
                if (today.day() === 2)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 7 : 2;
                // Wednesday
                if (today.day() === 3)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 7 : 2;
                // Thursday
                if (today.day() === 4)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 7 : 4;
                // Friday
                if (today.day() === 5)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 7 : 4;
                // Saturday
                if (today.day() === 6)
                    daysToAdd = clearing === CLEARING_VALUES.STANDARD ? 6 : 3;

                const estimatedArrival = today
                    .add(daysToAdd, 'days')
                    .startOf('day')
                    .format('MMM. D, YYYY');

                return (
                    <Fragment>
                        <ClearingSelection
                            transactionAmountMaximum={transactionAmountMaximum}
                        />
                        <ReviewDetails
                            fee={fee}
                            amount={computedAmount}
                            estimatedArrival={estimatedArrival}
                            fundingSourceName={_get(
                                selectedFundingSource,
                                'name',
                                ''
                            )}
                        />
                        <ConfirmWithdraw />
                    </Fragment>
                );
            }}
        </Query>
    );
};

// Component that triggers mutation
const ConfirmWithdraw = () => {
    const { id: userId } = getUser();
    const {
        computedAmount,
        selectedFundingSource,
        clearing,
        setCurrentStep,
        WITHDRAW_CREDIT_STEPS,
    } = useContext(WithdrawCreditContext);
    const { month } = useContext(WalletDashboardContext);
    return (
        <Mutation
            mutation={WITHDRAW_CREDIT}
            variables={{
                input: {
                    userId,
                    amount: computedAmount,
                    fundingSourceUrl: _get(
                        selectedFundingSource,
                        'fundingSourceUrl',
                        ''
                    ),
                    clearing,
                },
            }}
            context={{ clientName: 'wallet' }}
            refetchQueries={() => [
                {
                    query: GET_WALLET_BY_USER_ID,
                    variables: {
                        input: { userId },
                        rangeStart: moment.utc(month.startOf('month')).format(),
                        rangeEnd: moment.utc(month.endOf('month')).format(),
                    },
                    context: { clientName: 'wallet' },
                },
            ]}
        >
            {(withdrawCredit, { loading, error }) => (
                <Button
                    disabled={loading}
                    loading={loading}
                    fontSize={0}
                    mt={80}
                    width="100%"
                    style={{ borderRadius: 25 }}
                    onClick={async () => {
                        await execute({
                            action: async () => {
                                await withdrawCredit();
                            },
                        });
                        if (!error)
                            setCurrentStep(WITHDRAW_CREDIT_STEPS.SUCCESS);
                    }}
                >
                    Confirm and Withdraw
                </Button>
            )}
        </Mutation>
    );
};

ReviewWithdrawal.propTypes = {};

export default ReviewWithdrawal;

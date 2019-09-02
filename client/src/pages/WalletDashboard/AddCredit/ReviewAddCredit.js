import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Mutation } from 'react-apollo';
import moment from 'moment';
import { renderPrice } from '../../../util/paymentUtil';

import { Box, Text, Button } from '../../../components';
import { AddCreditContext } from './AddCreditModal';
import { WalletDashboardContext } from '../WalletDashboardWrapper';
import { GET_WALLET_BY_USER_ID } from '../queries';
import { ADD_CREDIT } from '../mutations';
import { getUser } from '../../../util/authUtils';
import { walletClient } from '../../../util/apolloClients';
import { execute } from '../../../util/gqlUtils';

// Main Component
const ReviewAddCredit = () => {
    const { computedAmount, selectedFundingSource } = useContext(
        AddCreditContext
    );
    return (
        <Box textAlign="center" mt={10}>
            <Text fontSize={0} mb={22} mx="auto" width={240}>
                Please confirm the amount of money you want to add below
            </Text>

            <Text mb={15}>Amount</Text>

            <Text fontSize={40} fontWeight="medium" mb={22}>
                {renderPrice(computedAmount)}
            </Text>

            <Text p={14} border="1px solid" borderColor="divider.gray" mb={24}>
                {_get(selectedFundingSource, 'name', '')}
            </Text>

            <ConfirmAddCredit />
        </Box>
    );
};

// Component that triggers mutation
const ConfirmAddCredit = () => {
    const { id: userId } = getUser();
    const {
        computedAmount,
        selectedFundingSource,
        selectedPaymentPlatform,
        setCurrentStep,
        ADD_CREDIT_STEPS,
    } = useContext(AddCreditContext);

    const { month } = useContext(WalletDashboardContext);

    return (
        <Mutation
            mutation={ADD_CREDIT}
            variables={{
                input: {
                    userId,
                    amount: computedAmount,
                    paymentPlatform: selectedPaymentPlatform,
                    paymentOptionId:
                        selectedPaymentPlatform === 'DWOLLA'
                            ? _get(
                                  selectedFundingSource,
                                  'fundingSourceUrl',
                                  ''
                              )
                            : _get(selectedFundingSource, 'id', ''),
                },
            }}
            client={walletClient}
            refetchQueries={() => [
                {
                    query: GET_WALLET_BY_USER_ID,
                    variables: {
                        input: { userId },
                        rangeStart: moment.utc(month.startOf('month')).format(),
                        rangeEnd: moment.utc(month.endOf('month')).format(),
                    },
                },
            ]}
        >
            {(addCredit, { loading }) => (
                <Button
                    disabled={loading}
                    loading={loading}
                    fontSize={0}
                    width="100%"
                    style={{ borderRadius: 25 }}
                    onClick={async () => {
                        const response = await execute({
                            action: async () => {
                                await addCredit();
                            },
                        });
                        if (response) setCurrentStep(ADD_CREDIT_STEPS.SUCCESS);
                    }}
                >
                    Confirm and Add money
                </Button>
            )}
        </Mutation>
    );
};

ReviewAddCredit.propTypes = {};

export default ReviewAddCredit;

import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import _get from 'lodash/get';

import { Box, Text, Flex, Loading } from '~/components';
import DeleteFundingSource from './DeleteFundingSource';
import { PaymentMethodContext } from './PaymentMethodModal';
import { GET_DWOLLA_FUNDING_SOURCES } from '../queries';
import { getUser } from '~/util/authUtils';
import PaymentMethods from '~/common/PaymentMethods';

const BankAccounts = () => {
    const { setCurrentStep, PAYMENT_METHOD_STEPS } = useContext(
        PaymentMethodContext
    );
    const { id } = getUser();

    return (
        <Box>
            <Text fontSize={0} mb={6}>
                Credit/Debit cards
            </Text>
            <PaymentMethods />
            {process.env.REACT_APP_ENV !== 'production' && (
                <Fragment>
                    <Text fontSize={0} mb={6}>
                        Bank Accounts
                    </Text>

                    <Query
                        query={GET_DWOLLA_FUNDING_SOURCES}
                        variables={{ input: { userId: id } }}
                        context={{ clientName: 'wallet' }}
                        fetchPolicy="network-only"
                    >
                        {({ data, loading, error }) => {
                            if (loading) return <Loading />;

                            if (
                                error &&
                                !error.message.includes(
                                    'User has not registered for a dwolla account yet'
                                )
                            ) {
                                return <div>Something went wrong.</div>;
                            }

                            const bankAccounts = _get(
                                data,
                                'getDwollaFundingSources',
                                []
                            );

                            return (
                                <Fragment>
                                    {bankAccounts.map(
                                        ({ name, fundingSourceUrl }) => (
                                            <ItemWrapper
                                                key={fundingSourceUrl}
                                                fundingSourceUrl={
                                                    fundingSourceUrl
                                                }
                                            >
                                                <Text fontSize={0}>{name}</Text>
                                            </ItemWrapper>
                                        )
                                    )}

                                    <ItemWrapper
                                        onClick={() =>
                                            setCurrentStep(
                                                PAYMENT_METHOD_STEPS.INFO_VERIFICATION
                                            )
                                        }
                                        isAction
                                    >
                                        <Text
                                            fontSize={4}
                                            mr={24}
                                            fontWeight="light"
                                            color="text.blue"
                                        >
                                            +
                                        </Text>
                                        <Text fontSize={0}>
                                            Link a new bank account
                                        </Text>
                                    </ItemWrapper>
                                </Fragment>
                            );
                        }}
                    </Query>
                </Fragment>
            )}
        </Box>
    );
};

const ItemWrapper = ({ children, onClick, isAction, fundingSourceUrl }) => (
    <Flex
        alignItems="center"
        justifyContent={isAction ? 'flex-start' : 'space-between'}
        width="100%"
        minHeight={38}
        px={22}
        py={isAction ? 0 : 10}
        boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
        mb={isAction ? 0 : 5}
        onClick={onClick}
        style={isAction ? { cursor: 'pointer' } : null}
    >
        {children}
        {!isAction && (
            <DeleteFundingSource fundingSourceUrl={fundingSourceUrl} />
        )}
    </Flex>
);

ItemWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    isAction: PropTypes.bool,
    fundingSourceUrl: PropTypes.string,
};
BankAccounts.propTypes = {};

ItemWrapper.defaultProps = {
    onClick: null,
    isAction: false,
    fundingSourceUrl: '',
};

export default BankAccounts;

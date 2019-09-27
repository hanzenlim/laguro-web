import React, { useContext, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import styled from 'styled-components';

import { Button, Text, Icon, Box, Loading } from '../../components';
import { GET_DWOLLA_FUNDING_SOURCES, GET_PAYMENT_OPTIONS } from './queries';
import { getUser } from '../../util/authUtils';
import { walletClient } from '../../util/apolloClients';
import { WithdrawCreditContext } from './WithdrawCredit/WithdrawCreditModal';
import { AddCreditContext } from './AddCredit/AddCreditModal';

const Composed = adopt({
    getDwollaFundingSources: ({ render, userId }) => (
        <Query
            query={GET_DWOLLA_FUNDING_SOURCES}
            variables={{ input: { userId } }}
            client={walletClient}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
    getPaymentOptions: ({ render, userId }) => (
        <Query
            query={GET_PAYMENT_OPTIONS}
            variables={{ id: userId }}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
});

const FundingSourceSelection = ({ mode }) => {
    const isWithdrawCreditMode = mode === 'withdraw credit';

    const [isVisible, setVisibility] = useState(false);
    const { selectedFundingSource } = useContext(
        isWithdrawCreditMode ? WithdrawCreditContext : AddCreditContext
    );
    const { id: userId } = getUser();

    return (
        <Composed userId={userId}>
            {({ getDwollaFundingSources, getPaymentOptions }) => {
                if (
                    getDwollaFundingSources.loading ||
                    getPaymentOptions.loading
                )
                    return <Loading />;

                if (
                    getDwollaFundingSources.error &&
                    !getDwollaFundingSources.error.message.includes(
                        'User has not registered for a dwolla account yet'
                    )
                ) {
                    return <div>Something went wrong.</div>;
                }

                const bankAccounts = _get(
                    getDwollaFundingSources,
                    'data.getDwollaFundingSources',
                    []
                );

                let stripeCards = _get(
                    getPaymentOptions,
                    'data.getUser.paymentOptions',
                    []
                );
                stripeCards = stripeCards.map(card => ({
                    id: card.id,
                    name: `${card.brand} ** ${card.last4}`,
                }));

                return (
                    <Dropdown
                        overlay={
                            <Overlay
                                bankAccounts={bankAccounts}
                                stripeCards={stripeCards}
                                setVisibility={setVisibility}
                                isWithdrawCreditMode={isWithdrawCreditMode}
                            />
                        }
                        trigger={['click']}
                        visible={isVisible}
                    >
                        <Button
                            type="ghost"
                            width="100%"
                            style={{
                                boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.09)',
                                borderRadius: 25,
                            }}
                            onClick={() => setVisibility(!isVisible)}
                        >
                            <Text color="text.blue" fontSize={0}>
                                {selectedFundingSource &&
                                    selectedFundingSource.name}
                                {!selectedFundingSource &&
                                    !isWithdrawCreditMode &&
                                    `Select payment method `}
                                {!selectedFundingSource &&
                                    isWithdrawCreditMode &&
                                    `Select your bank account `}
                                {!selectedFundingSource && (
                                    <Icon
                                        type="down"
                                        color="text.blue"
                                        fontSize={0}
                                        ml={6}
                                    />
                                )}
                            </Text>
                        </Button>
                    </Dropdown>
                );
            }}
        </Composed>
    );
};

const StyledMenu = styled(Menu)`
    &.ant-menu-vertical {
        border-right: none;

        & > .ant-menu-item {
            margin: 0;
            border-bottom: 1px solid #f2f2f2;

            &:not(:last-child) {
                margin-bottom: 0;
            }
        }
    }
`;

const Overlay = ({
    bankAccounts,
    stripeCards,
    setVisibility,
    isWithdrawCreditMode,
}) => {
    const {
        setFundingSource,
        selectedFundingSource,
        setPaymentPlatform,
    } = useContext(
        isWithdrawCreditMode ? WithdrawCreditContext : AddCreditContext
    );
    const normalizedBankAccounts = _keyBy(
        bankAccounts,
        ({ fundingSourceUrl }) => fundingSourceUrl
    );
    const normalizedStripeCards = _keyBy(stripeCards, ({ id }) => id);
    return (
        <Box
            width="100%"
            bg="background.white"
            boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
            borderRadius={25}
            p={22}
        >
            {process.env.REACT_APP_ENV !== 'production' && (
                <Fragment>
                    <Text
                        fontSize={0}
                        fontWeight="medium"
                        pb={10}
                        borderBottom="1px solid"
                        borderColor="#f2f2f2"
                    >
                        Bank accounts
                    </Text>
                    {bankAccounts.length ? (
                        <Box pl={14}>
                            <StyledMenu
                                selectedKeys={[
                                    _get(
                                        selectedFundingSource,
                                        'fundingSourceUrl',
                                        null
                                    ),
                                ]}
                                onClick={({ key }) => {
                                    setFundingSource(
                                        normalizedBankAccounts[key]
                                    );
                                    setPaymentPlatform('DWOLLA');
                                    setVisibility(false);
                                }}
                            >
                                {bankAccounts.map(bankAccount => (
                                    <Menu.Item
                                        key={bankAccount.fundingSourceUrl}
                                    >
                                        <Text fontSize={0}>
                                            {bankAccount.name}
                                        </Text>
                                    </Menu.Item>
                                ))}
                            </StyledMenu>
                        </Box>
                    ) : (
                        <Text textAlign="center" fontSize={0} pt="10px">
                            No funding source available.
                        </Text>
                    )}
                </Fragment>
            )}

            {!isWithdrawCreditMode && (
                <Fragment>
                    <Text
                        fontSize={0}
                        fontWeight="medium"
                        pt={10}
                        pb={10}
                        borderBottom="1px solid"
                        borderColor="#f2f2f2"
                    >
                        Credit/Debit cards
                    </Text>
                    {stripeCards.length ? (
                        <Box pl={14}>
                            <StyledMenu
                                selectedKeys={[
                                    _get(selectedFundingSource, 'id', null),
                                ]}
                                onClick={({ key }) => {
                                    setFundingSource(
                                        normalizedStripeCards[key]
                                    );
                                    setPaymentPlatform('STRIPE');
                                    setVisibility(false);
                                }}
                            >
                                {stripeCards.map(stripeCard => (
                                    <Menu.Item key={stripeCard.id}>
                                        <Text fontSize={0}>
                                            {stripeCard.name}
                                        </Text>
                                    </Menu.Item>
                                ))}
                            </StyledMenu>
                        </Box>
                    ) : (
                        <Text textAlign="center" fontSize={0} pt="10px">
                            No funding source available.
                        </Text>
                    )}
                </Fragment>
            )}
        </Box>
    );
};

FundingSourceSelection.propTypes = {
    mode: PropTypes.string.isRequired,
};

Overlay.propTypes = {
    setVisibility: PropTypes.func.isRequired,
    bankAccounts: PropTypes.arrayOf(
        PropTypes.shape({
            fundingSourceUrl: PropTypes.string,
            name: PropTypes.string,
        })
    ),
};

Overlay.defaultProps = {
    bankAccounts: [],
};

export default FundingSourceSelection;

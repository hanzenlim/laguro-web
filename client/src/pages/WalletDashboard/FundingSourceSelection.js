import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'antd';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import styled from 'styled-components';

import { Button, Text, Icon, Box, Loading } from '../../components';
import { GET_DWOLLA_FUNDING_SOURCES } from './queries';
import { getUser } from '../../util/authUtils';
import { walletClient } from '../../util/apolloClients';
import { WithdrawCreditContext } from './WithdrawCredit/WithdrawCreditModal';
import { AddCreditContext } from './AddCredit/AddCreditModal';

const FundingSourceSelection = ({ mode }) => {
    const isWithdrawCreditMode = mode === 'withdraw credit';

    const [isVisible, setVisibility] = useState(false);
    const { selectedFundingSource } = useContext(
        isWithdrawCreditMode ? WithdrawCreditContext : AddCreditContext
    );
    const { id: userId } = getUser();

    return (
        <Query
            query={GET_DWOLLA_FUNDING_SOURCES}
            variables={{ input: { userId } }}
            client={walletClient}
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

                const bankAccounts = _get(data, 'getDwollaFundingSources', []);

                return (
                    <Dropdown
                        overlay={
                            <Overlay
                                bankAccounts={bankAccounts}
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
        </Query>
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

const Overlay = ({ bankAccounts, setVisibility, isWithdrawCreditMode }) => {
    const { setFundingSource } = useContext(
        isWithdrawCreditMode ? WithdrawCreditContext : AddCreditContext
    );
    const normalizedBankAccounts = _keyBy(
        bankAccounts,
        ({ fundingSourceUrl }) => fundingSourceUrl
    );
    return (
        <Box
            width="100%"
            bg="background.white"
            boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
            borderRadius={25}
            p={22}
        >
            {bankAccounts.length ? (
                <StyledMenu
                    onClick={({ key }) => {
                        setFundingSource(normalizedBankAccounts[key]);
                        setVisibility(false);
                    }}
                >
                    {bankAccounts.map(bankAccount => (
                        <Menu.Item key={bankAccount.fundingSourceUrl}>
                            <Text fontSize={0}>{bankAccount.name}</Text>
                        </Menu.Item>
                    ))}
                </StyledMenu>
            ) : (
                <Text textAlign="center" fontSize={0}>
                    No funding source available.
                </Text>
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

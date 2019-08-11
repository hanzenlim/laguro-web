import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, DatePicker as AntdDatePicker, Select } from 'antd';
import _sum from 'lodash/sum';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import styled from 'styled-components';
import { renderPrice } from '@laguro/basic-components/lib/components/utils/paymentUtils';

import { Text, Box, Flex, Responsive, Loading, Icon } from '../../components';

const { Desktop, TabletMobile } = Responsive;

const CATEGORIES = [
    'All categories',
    'CHAIR_RENTAL',
    'TREATMENT_PLAN',
    'IMAGE_REQUEST',
    'POS_TRANSACTION',
];

const FILTER_BUTTON_STYLES = `
border-radius: 2px;
            box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.09);`;

const StyledMonthPicker = styled(AntdDatePicker.MonthPicker)`
    && {
        width: 100%;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            width: 129px;
        }
        .ant-calendar-picker-input {
            padding: 4px 20px;
            border: none;
            height: 50px;
            box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.09);
            color: ${props => props.theme.colors.text.blue};
            ::placeholder {
                color: ${props => props.theme.colors.text.blue};
            }
        }
        i {
            color: ${props => props.theme.colors.text.blue};
        }
        .anticon-close-circle {
            display: none;
        }
    }
`;

const StyledTable = styled(Table)`
    && {
        font-family: Silka-Bold, Silka;

        .ant-table-thead > tr > th {
            background: ${({ theme }) => theme.colors.background.white};
            font-size: 12px;
        }

        .ant-table-tbody > tr > td {
            font-size: 12px;
        }

        .ant-table-footer {
            background: ${({ theme }) => theme.colors.background.white};
            border-top: 3px solid;
            border-color: ${({ theme }) => theme.colors.divider.gray};
        }
    }
`;

const StyledSelect = styled(Select)`
    && {
        width: 100%;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            width: 165px;
        }
        ${FILTER_BUTTON_STYLES}
        background-color: #ffffff;
        .ant-select-selection {
            border: none;
            box-shadow: none;
        }
        .ant-select-selection-selected-value {
            color: ${props => props.theme.colors.text.blue};
            padding-left: 10px;
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                text-align: center;
                padding-left: unset;
            }
            width: 100%;
        }
        .ant-select-arrow {
            color: ${props => props.theme.colors.text.blue};
        }
        .ant-select-selection__rendered {
            line-height: 50px;
        }
        svg {
            height: 32px;
        }
    }
`;

const renderTransactionPrice = (amount, { isValid = true }) => {
    const textColor = amount < 0 ? 'text.red' : 'text.green';
    return (
        <Text
            color={textColor}
            fontSize={0}
            style={{ textDecoration: isValid ? 'none' : 'line-through' }}
        >
            {amount > 0 ? '+' : ''}
            {renderPrice(amount)}
        </Text>
    );
};

// TODO confirm these string values
const TYPE_TO_FILTER_NAME = {
    TREATMENT_PLAN: 'Treatment',
    IMAGE_REQUEST: 'Images',
    CHAIR_RENTAL: 'Chair Rental',
    POS_TRANSACTION: 'Pos Transactions',
    [`All categories`]: 'All categories',
};

const TYPE_TO_DISPLAY_NAME = {
    TREATMENT_PLAN: 'Treatment',
    IMAGE_REQUEST: 'Images',
    CHAIR_RENTAL: 'Chair Rental',
    POS_TRANSACTION_TYPE: 'Pos Transaction',
    TREATMENT_PLAN_SERVICE_FEE: 'Treatment Service Fee',
    CHAIR_RENTAL_SERVICE_FEE: 'Chair Rental Service Fee',
    TREATMENT_PLAN_PAYMENT: 'Treatment',
    [`All categories`]: 'All categories',
};

const StyledIcon = styled(Icon)`
    && {
        top: 15px;
        right: 7px;
    }
`;

const mapTransactions = transactions =>
    transactions.map(t => ({ ...t, key: t.id })).reverse();

const WalletTransactions = ({
    transactions,
    filteredInfo,
    onMonthChange,
    onCategoryChange,
    monthSelected,
    loading,
}) => {
    const mappedTransactions = mapTransactions(transactions);
    const columns = [
        {
            title: 'Date',
            key: 'dateCreated',
            dataIndex: 'dateCreated',
            width: 150,
            render: dateCreated => moment(dateCreated).format('M/D/YY h:mA'),
        },
        {
            key: 'type',
            title: 'Category',
            dataIndex: 'type',
            filteredValue: filteredInfo.type || null,
            width: 150,
            render: type => TYPE_TO_DISPLAY_NAME[type],
            onFilter: (value, record) =>
                value === 'All categories' ? true : record.type.includes(value),
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            render: (description, { isValid }) =>
                `${description}${!isValid ? ' (Failed)' : ''}`,
        },
        {
            key: 'amount',
            title: 'Amount',
            dataIndex: 'amount',
            width: 150,
            align: 'right',
            render: renderTransactionPrice,
        },
    ];

    const filteredTransactions = mappedTransactions.filter(t =>
        filteredInfo.type[0] === 'All categories'
            ? true
            : t.type.includes(filteredInfo.type[0])
    );
    const filteredAmounts = filteredTransactions.map(t =>
        t.isValid ? t.amount : 0
    );

    return (
        <Fragment>
            <Flex
                justifyContent="space-between"
                flexDirection={['column', '', 'row']}
                alignItems={['unset', '', 'flex-end']}
                mb={11}
            >
                <Text
                    fontSize={1}
                    letterSpacing="-0.39px"
                    color="text.lightGray"
                    mb={[18, '', 'unset']}
                >
                    Transactions
                </Text>
                <Flex
                    width={['100%', '', 'unset']}
                    flexDirection={['column', '', 'row']}
                >
                    <Box mr={14} mb={[6, '', 0]} width={['100%', '', 'unset']}>
                        <StyledMonthPicker
                            onChange={momentDate => {
                                onMonthChange(
                                    momentDate || moment().startOf('month')
                                );
                            }}
                            disabledDate={currentDate =>
                                currentDate.startOf('month').isAfter(moment())
                            }
                            value={monthSelected}
                            placeholder="Select month"
                            format="MMM YYYY"
                            suffixIcon={
                                <StyledIcon
                                    type="calendar"
                                    color="icon.blue"
                                    fontSize="17px"
                                    width={17}
                                    height={17}
                                />
                            }
                        />
                    </Box>
                    <Box mb={[28, '', 0]} width={['100%', '', 'unset']}>
                        <StyledSelect
                            onSelect={key => {
                                onCategoryChange({
                                    dataIndex: 'type',
                                    categories: [key],
                                });
                            }}
                            value={filteredInfo.type[0]}
                        >
                            {CATEGORIES.map(item => (
                                <Select.Option key={item} value={item}>
                                    {TYPE_TO_FILTER_NAME[item]}
                                </Select.Option>
                            ))}
                        </StyledSelect>
                    </Box>
                </Flex>
            </Flex>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <Desktop>
                        <Box
                            boxShadow="0 2px 4px 2px rgba(0, 0, 0, 0.04)"
                            borderRadius={4}
                            px={20}
                        >
                            <StyledTable
                                locale={{
                                    emptyText:
                                        'There are no transactions with the given filters',
                                }}
                                scroll={{ y: 500 }}
                                pagination={false}
                                columns={columns}
                                dataSource={mappedTransactions}
                                footer={() => (
                                    <Text
                                        width="100%"
                                        textAlign="right"
                                        fontSize={1}
                                        letterSpacing="-0.39px"
                                    >
                                        Total:{' '}
                                        {renderPrice(_sum(filteredAmounts))}
                                    </Text>
                                )}
                            />
                        </Box>
                    </Desktop>
                    <TabletMobile>
                        <Box
                            borderRadius={2}
                            boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
                            py={16}
                            px={21}
                            mb={28}
                        >
                            <Box style={{ maxHeight: 500, overflowY: 'auto' }}>
                                {_isEmpty(filteredTransactions) ? (
                                    <Text
                                        fontSize={0}
                                        letterSpacing="-0.39px"
                                        color="text.lightGray"
                                    >
                                        There are no transactions with the given
                                        filters
                                    </Text>
                                ) : (
                                    filteredTransactions.map(t => (
                                        <Flex
                                            key={t.id}
                                            pt={10}
                                            justifyContent="space-between"
                                            borderBottom="solid 0.2px #dbdbdb"
                                        >
                                            <Box
                                                mb={2}
                                                mr={11}
                                                justifyContent="space-between"
                                            >
                                                <Flex>
                                                    <Text
                                                        fontSize={8}
                                                        letterSpacing="-0.22px"
                                                        mr={5}
                                                    >
                                                        {moment(
                                                            t.dateCreated
                                                        ).format('M/D/YY h:mA')}
                                                    </Text>
                                                    <Text
                                                        fontSize={8}
                                                        letterSpacing="-0.22px"
                                                    >
                                                        {
                                                            TYPE_TO_DISPLAY_NAME[
                                                                t.type
                                                            ]
                                                        }
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    mb={13}
                                                    fontSize={0}
                                                    letterSpacing="-0.34"
                                                    fontFamily="'Silka', 'Courier new', sans-serif"
                                                >
                                                    {`${t.description}${
                                                        !t.isValid
                                                            ? ' (Failed)'
                                                            : ''
                                                    }`}
                                                </Text>
                                            </Box>
                                            {renderTransactionPrice(t.amount, {
                                                isValid: t.isValid,
                                            })}
                                        </Flex>
                                    ))
                                )}
                            </Box>
                            {!_isEmpty(filteredTransactions) && (
                                <Text
                                    width="100%"
                                    textAlign="right"
                                    fontSize={0}
                                    letterSpacing="-0.34px"
                                    borderTop="solid 3px #dbdbdb"
                                    pt={10}
                                    mt={-1}
                                >
                                    Total: {renderPrice(_sum(filteredAmounts))}
                                </Text>
                            )}
                        </Box>
                    </TabletMobile>
                </Fragment>
            )}
        </Fragment>
    );
};

WalletTransactions.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number,
            dateCreated: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
            isValid: PropTypes.bool,
            type: PropTypes.string,
        })
    ),
    filteredInfo: PropTypes.shape({
        type: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    monthSelected: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
};

WalletTransactions.defaultProps = {
    transactions: [],
};

export default WalletTransactions;

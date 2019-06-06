import React, { Fragment } from 'react';
import { Table, DatePicker as AntdDatePicker, Select } from 'antd';
import _get from 'lodash/get';
import _sum from 'lodash/sum';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import styled from 'styled-components';
import {
    Text,
    Box,
    Flex,
    Responsive,
    Truncate,
    Loading,
    Icon,
} from '../../components';
import { renderPrice } from '@laguro/basic-components/lib/components/utils/paymentUtils';

const { Desktop, TabletMobile } = Responsive;

const TABLE_DIVIDER_COLOR = 'divider.gray';
const TABLE_BORDER = 'solid 1px';
const TABLE_PX_IN_PIXELS = 45;

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
        .ant-table-header {
            margin-bottom: 0 !important;
        }
        .ant-table-header {
            background-color: transparent;
                        padding: 6px ${TABLE_PX_IN_PIXELS}px 0 ${TABLE_PX_IN_PIXELS}px;
        }
        .ant-table-thead > tr > th {
            border: none;
            &:nth-child(1), &:nth-child(2) {
                div {
                    text-align: center;
                }
            }
            &:last-child {
                div {
                    text-align: right;
                }
            }
            background-color: transparent;
        }
        .ant-table-tbody > tr {
            border-bottom: solid 1px
            border-color: rgba(236,236,236,0.5)
        }
        .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
            background: transparent;
        }
        .ant-table-thead > tr {
            border-bottom: solid 0.5px
            border-color: #c7c7c7;
        }
        .ant-table-thead > tr, .ant-table-tbody > tr {
            width: 100%;
            display: grid;
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                grid-template-columns: 70px 100px auto 110px;
                grid-column-gap: 30px;
            }
        }
        .ant-table-tbody > tr > td,
        .ant-table-thead > tr > th div
         {
            border: none;
            font-family: ${props => props.theme.fontFamily};
            font-size: ${props => props.theme.fontSizes[0]};
            letter-spacing: -0.34px;
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.regular};
        }
        .ant-table-footer {
            background-color: transparent;
            border-top: solid 2px;
            border-top-color: ${props =>
                _get(props.theme.colors, TABLE_DIVIDER_COLOR)};
        }
        td.column-amount > div {
            text-align: right;
        }
        .ant-table-body {
            padding: 0 ${TABLE_PX_IN_PIXELS}px 6px ${TABLE_PX_IN_PIXELS}px;
        }
        .ant-table-tbody {
            tr:last-child {
                border: none;
            }
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

const renderTransactionPrice = (amount, props) => {
    const textColor = amount < 0 ? 'text.red' : 'text.green';

    return (
        <Text
            color={textColor}
            fontSize="inherit"
            fontWeight="inherit"
            {...props}
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
    TREATMENT_PLAN_PAYMENT: 'Payment for Treatment',
    [`All categories`]: 'All categories',
};

const StyledIcon = styled(Icon)`
    && {
        top: 15px;
        right: 7px;
    }
`;

export const WalletTransactions = props => {
    const columns = [
        {
            title: 'Date',
            key: 'dateCreated',
            dataIndex: 'dateCreated',
            className: 'column-date-created',
            render: dateCreated => moment(dateCreated).format('M/D/YY'),
        },
        {
            key: 'type',
            title: 'Category',
            dataIndex: 'type',
            className: 'column-type',
            filteredValue: props.filteredInfo.type || null,
            render: type => {
                return (
                    <Text
                        fontSize="inherit"
                        fontWeight="inherit"
                        textAlign="center"
                    >
                        {TYPE_TO_DISPLAY_NAME[type]}
                    </Text>
                );
            },
            onFilter: (value, record) =>
                value === 'All categories' ? true : record.type.includes(value),
        },
        {
            title: 'Description',
            className: 'column-description',
            dataIndex: 'description',
            render: description => {
                return (
                    <Text fontSize="inherit" fontWeight="inherit">
                        <Truncate lines={1}> {description}</Truncate>
                    </Text>
                );
            },
        },
        {
            title: 'Amount',
            width: 80,
            className: 'column-amount',
            dataIndex: 'amount',
            render: renderTransactionPrice,
        },
    ];

    const filteredTransactions = props.transactions.filter(t =>
        props.filteredInfo.type[0] === 'All categories'
            ? true
            : t.type.includes(props.filteredInfo.type[0])
    );
    const filteredAmounts = filteredTransactions.map(t => parseInt(t.amount));

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
                                props.onMonthChange(
                                    momentDate || moment().startOf('month')
                                );
                            }}
                            disabledDate={currentDate =>
                                currentDate.startOf('month').isAfter(moment())
                            }
                            value={props.monthSelected}
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
                                props.onCategoryChange({
                                    dataIndex: 'type',
                                    categories: [key],
                                });
                            }}
                            value={props.filteredInfo.type[0]}
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
            {props.loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <Desktop>
                        <Box
                            border={TABLE_BORDER}
                            borderColor={TABLE_DIVIDER_COLOR}
                            borderRadius={4}
                        >
                            <StyledTable
                                locale={{
                                    emptyText:
                                        'There are no transactions with the given filters',
                                }}
                                scroll={{ y: 1010 }}
                                pagination={false}
                                columns={columns}
                                dataSource={props.transactions}
                                footer={() => (
                                    <Text
                                        className="footer-content"
                                        width="100%"
                                        textAlign="right"
                                        px={TABLE_PX_IN_PIXELS}
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
                                        mb={10}
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
                                                    ).format('M/D/YY')}
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
                                                <Truncate lines={2}>
                                                    {t.description}
                                                </Truncate>
                                            </Text>
                                        </Box>
                                        {renderTransactionPrice(t.amount, {
                                            fontSize: 0,
                                            letterSpacing: '-0.34px',
                                        })}
                                    </Flex>
                                ))
                            )}
                            {!_isEmpty(filteredTransactions) && (
                                <Text
                                    width="100%"
                                    textAlign="right"
                                    fontSize={0}
                                    letterSpacing="-0.34px"
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

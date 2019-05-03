import React, { Fragment } from 'react';
import { Table } from 'antd';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Text, Box, Responsive } from '../../components';
import { renderPrice } from '@laguro/basic-components/lib/components/utils/paymentUtils';

const { Desktop, TabletMobile } = Responsive;

const TABLE_DIVIDER_COLOR = 'divider.gray';
const TABLE_BORDER = 'solid 1px';
const TABLE_PX_IN_PIXELS = 45;
const TABLET_MOBILE_TABLE_PX_IN_PIXELS = 19;

const StyledTable = styled(Table)`
    && {
        .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
            padding: 9px 0px;
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
               padding: 16px
            }
        }
        .ant-table-thead > tr, .ant-table-tbody > tr {
            width: 100%;
            display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                // grid-column-gap: 30px;
        }
        .ant-table-thead > tr > th {
            background-color: transparent;
            &:last-child {
                div {
                    font-weight: ${props => props.theme.fontWeights.bold};
                }
            }
        }
        .ant-table-tbody > tr > td {
            font-family: ${props => props.theme.fontFamily};
            font-size: ${props => props.theme.fontSizes[0]};
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.light};
            div {
                text-align: center;
            }
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[2]};
            }
        }
        .ant-table-thead > tr > th div {
            font-family: ${props => props.theme.fontFamily};
            font-size: ${props => props.theme.fontSizes[0]};
            color: ${props => props.theme.colors.text.black};
            font-weight: ${props => props.theme.fontWeights.medium};
            text-align: center
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[2]};
            }
        }
        .ant-table-footer {
            margin-top: 6px;
            background-color: transparent;
            border-top: ${TABLE_BORDER}
            border-top-color: ${props =>
                _get(props.theme.colors, TABLE_DIVIDER_COLOR)};
        }
        td.column-amount {
            text-align: right !important;
        }
        .ant-table-body {
            padding: 8px ${TABLET_MOBILE_TABLE_PX_IN_PIXELS}px 8px ${TABLET_MOBILE_TABLE_PX_IN_PIXELS}px;
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 6px ${TABLE_PX_IN_PIXELS}px 6px ${TABLE_PX_IN_PIXELS}px;
            }
        }
        .ant-table-tbody {
            tr:last-child > td {
                border: none;
            }
        }
    }
`;

export const WalletDetails = ({ details }) => {
    const columns = [
        {
            title: 'Pending',
            dataIndex: 'pendingAmount',
            render: pendingAmount => (
                <Text fontSize="inherit" fontWeight="inherit">
                    {renderPrice(pendingAmount)}
                </Text>
            ),
        },
        {
            title: 'Processing',
            dataIndex: 'processingAmount',
            width: 88,
            render: processingAmount => (
                <Text fontSize="inherit" fontWeight="inherit">
                    {renderPrice(processingAmount)}
                </Text>
            ),
        },
        {
            title: 'Available',
            dataIndex: 'availableAmount',
            render: availableAmount => (
                <Text fontSize="inherit" fontWeight="inherit">
                    {renderPrice(availableAmount)}
                </Text>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            render: balance => {
                const textColor = balance < 0 ? 'text.black' : 'text.blue';

                return (
                    <Text
                        color={textColor}
                        fontSize="inherit"
                        fontWeight="bold"
                    >
                        {renderPrice(balance)}
                    </Text>
                );
            },
        },
    ];
    return (
        <Fragment>
            <TabletMobile>
                <Box
                    borderRadius={2}
                    boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
                >
                    <StyledTable
                        pagination={false}
                        columns={columns}
                        dataSource={details}
                    />
                </Box>
            </TabletMobile>
            <Desktop>
                <Box
                    border={TABLE_BORDER}
                    borderColor={TABLE_DIVIDER_COLOR}
                    borderRadius={4}
                >
                    <StyledTable
                        pagination={false}
                        columns={columns}
                        dataSource={details}
                    />
                </Box>
            </Desktop>
        </Fragment>
    );
};

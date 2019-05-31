import * as React from 'react';
import styled from 'styled-components';
import { Checkbox as AntdCheckbox } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { Checkbox, Card, Box, Text } from '@laguro/basic-components';

const CheckboxGroup = AntdCheckbox.Group;

const StyledCheckbox = styled(Checkbox)`
    &&&& {
        span {
            font-size: ${props => props.theme.fontSizes[0]};
            line-height: normal;
        }

        label {
            font-size: ${props => props.theme.fontSizes[0]};
            line-height: normal;
        }

        .ant-checkbox-inner {
            border: 1px solid #000000;
            width: 14px;
            height: 14px;
        }

        .ant-checkbox-inner:after {
            left: 3.48px;
            top: 0.5px;
        }

        span:last-child {
            padding-left: 8px;
        }

        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: #000000;
            opacity: 0.7;
        }
    }
`;

class OfficeFilterView extends React.PureComponent {
    render() {
        const StyledCheckboxGroup = styled(CheckboxGroup)`
            && {
                display: grid;
                grid-row-gap: 2px;

                span {
                    font-size: ${props => props.theme.fontSizes[0]};
                    line-height: normal;
                }

                label {
                    font-size: ${props => props.theme.fontSizes[0]};
                    line-height: normal;
                }

                .ant-checkbox-inner {
                    width: 14px;
                    height: 14px;
                }

                .ant-checkbox-inner:after {
                    left: 3.48px;
                    top: 0.5px;
                }

                ${this.props.offices.map(
                    (o, index) => `.ant-checkbox-group-item:nth-child(${index +
                        1}) {
                .ant-checkbox-checked {
                    .ant-checkbox-inner {
                        background-color: ${this.props.colorMap[o.id]};
                        opacity: 0.7;
                    }
                }

                .ant-checkbox-inner {
                    border-color: ${this.props.colorMap[o.id]};
                }
            }`
                )};
            }
        `;

        return (
            <Card py={10} px={8} width={295}>
                <Text fontSize={[0, '', 1]} mb={4} fontWeight="medium">
                    Offices
                </Text>
                <Box borderBottom="solid 1px #ececec" width="100%" mb={13} />
                {!_isEmpty(this.props.reservations) && (
                    <StyledCheckbox
                        onChange={this.props.onCheckAllChange}
                        checked={this.props.checkAll}
                    >
                        All
                    </StyledCheckbox>
                )}
                <StyledCheckboxGroup
                    value={this.props.checkedList}
                    onChange={this.props.onChange}
                    options={this.props.offices.map(o => ({
                        label: o.name,
                        value: o.id,
                    }))}
                />
                {_isEmpty(this.props.reservations) && (
                    <Text> You have no bookings. </Text>
                )}
            </Card>
        );
    }
}

export default OfficeFilterView;

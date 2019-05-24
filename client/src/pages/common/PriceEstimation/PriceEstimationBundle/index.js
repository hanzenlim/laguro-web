import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styled, { css } from 'styled-components';
import _get from 'lodash/get';
import _truncate from 'lodash/truncate';
import _isEmpty from 'lodash/isEmpty';
import { Button, Flex, Text, Box } from '../../../../components';
import { getProcedureColor } from '../../../../util/dentistUtils';
import { getInsuranceText } from '../../../../util/insuranceUtil';

import SelectProcedureModal from '../../SelectProcedureModal';

const Item = Menu.Item;
const StyledButton = styled(Button)`
    && {
        border-radius: 19.5px;
        line-height: 1.199;
    }

    &&.ant-btn-primary {
        text-shadow: none;

        ${({ theme, bg }) =>
            bg &&
            css`
                background: ${_get(theme, `colors.${bg}`)};
            `}
    }

    && span {
        background: transparent;
    }
`;

class PriceEstimationBundle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: 0, isModalVisible: false };
    }

    handleToggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    handleSelectProcedure = args => {
        const { onSelectProcedure = () => {} } = this.props;
        this.setState({ isModalVisible: !this.state.isModalVisible });
        onSelectProcedure(args);
    };

    render() {
        const {
            procedures = [],
            insurance = [],
            isLoading,
            price,
            insurancePrice,
            selectedInsurance,
            hasCheckedOutOfPocketCost,
            selectedProcedure,
            selectedProcedureName,
            withInsurance,
        } = this.props;

        const { selectedIndex } = this.state;

        const insuranceMenu = (
            <Menu
                onClick={({ key, domEvent }) => {
                    domEvent.stopPropagation();
                    this.setState({
                        selectedInsurance: key,
                    });

                    if (this.props.onAddInsurance) {
                        this.props.onAddInsurance(key);
                    }
                }}
            >
                {insurance.map(item => (
                    <Item key={item}>{getInsuranceText(item)}</Item>
                ))}
            </Menu>
        );

        const isNullSelectedIndex = selectedIndex === null;

        return (
            <Flex
                height="100%"
                width="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="relative"
            >
                <Text
                    maxWidth="200px"
                    fontSize="18px"
                    color="#161616"
                    textAlign="center"
                    whiteSpace="normal"
                    letterSpacing={-0.6}
                >
                    Check out the price estimation for:
                </Text>
                <Box height={8} />
                <SelectProcedureModal
                    procedureList={procedures}
                    isModalVisible={this.state.isModalVisible}
                    onToggleModal={this.handleToggleModal}
                    onSelectBundle={this.handleSelectProcedure}
                />
                <StyledButton
                    type="primary"
                    ghost={isNullSelectedIndex}
                    height="30px"
                    borderColor="#3481f8"
                    fontSize="12px"
                    fontWeight="500"
                    onClick={this.handleToggleModal}
                    color={
                        !isNullSelectedIndex
                            ? 'text.white'
                            : getProcedureColor(selectedProcedure)
                    }
                    bg={
                        !isNullSelectedIndex
                            ? getProcedureColor(selectedProcedure)
                            : 'background.white'
                    }
                >
                    {selectedProcedureName || 'Select procedure'}
                    <Icon
                        type="down"
                        style={{
                            color: isNullSelectedIndex ? '#3481f8' : '#fff',
                            background: 'transparent',
                        }}
                    />
                </StyledButton>
                <Box height={14} />
                <Text
                    opacity={0.5}
                    fontSize="15px"
                    fontWeight="500"
                    letterSpacing={-0.9}
                    color="#303449"
                >
                    {selectedInsurance
                        ? `Regular price: ${price}`
                        : 'Regular price:'}
                </Text>
                <Box height={14} />
                <Text
                    lineHeight={0.62}
                    fontSize="30px"
                    fontWeight="bold"
                    letterSpacing={-1.2}
                    color="#303449"
                >
                    {selectedInsurance ? insurancePrice : price}
                </Text>
                <Box height={14} />
                {!selectedInsurance && !hasCheckedOutOfPocketCost && (
                    <StyledButton
                        type="primary"
                        ghost
                        height="20px"
                        borderColor="#3481f8"
                        fontSize="12px"
                        fontWeight="500"
                        onClick={e => {
                            e.stopPropagation();
                            if (!_isEmpty(insurance)) {
                                if (this.props.onAddInsurance) {
                                    this.props.onAddInsurance(insurance[0]);
                                }
                            }
                        }}
                    >
                        Add insurance
                    </StyledButton>
                )}
                {selectedInsurance && hasCheckedOutOfPocketCost && (
                    <Text
                        fontSize="20px"
                        fontWeight="bold"
                        textAlign="center"
                        lineHeight={1.3}
                        letterSpacing={-0.6}
                        color="#303449"
                        display="flex"
                        flexDirection="row"
                    >
                        with
                        <Text ml={4} color="#3481f8">
                            {getInsuranceText(selectedInsurance)}
                        </Text>
                    </Text>
                )}
                {selectedInsurance && !hasCheckedOutOfPocketCost && (
                    <Dropdown overlay={insuranceMenu}>
                        <Button
                            type="default"
                            ghost
                            width="fit-content"
                            height="fit-content"
                            border="none"
                            borderWidth="0px"
                            borderColor="transparent"
                            bg="transparent"
                            fontSize="12px"
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <Flex
                                width="100%"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <Text
                                    fontSize="20px"
                                    fontWeight="bold"
                                    textAlign="center"
                                    lineHeight={1.3}
                                    letterSpacing={-0.6}
                                    color="#303449"
                                    display="flex"
                                    flexDirection="row"
                                >
                                    with
                                    <Text ml={4} color="#3481f8">
                                        {_truncate(
                                            getInsuranceText(selectedInsurance),
                                            {
                                                length: 24,
                                                separator: ' ',
                                            }
                                        )}
                                    </Text>
                                </Text>
                                <Icon
                                    type="down"
                                    style={{
                                        color: '#3481f8',
                                        background: 'transparent',
                                        fontSize: 12,
                                        marginLeft: 5,
                                    }}
                                />
                            </Flex>
                        </Button>
                    </Dropdown>
                )}
                <Box height={15} />

                <Button
                    loading={isLoading}
                    type="primary"
                    bg={hasCheckedOutOfPocketCost ? '#9ada59' : 'button.blue'}
                    width="254px"
                    height="40px"
                    borderRadius="2px"
                    textAlign="center"
                    onClick={e => {
                        e.stopPropagation();
                        if (!withInsurance && hasCheckedOutOfPocketCost) {
                            if (this.props.redirectToAddInsurance) {
                                this.props.redirectToAddInsurance();
                            }
                        } else {
                            if (this.props.onCheckOutOfPocketCost) {
                                this.props.onCheckOutOfPocketCost();
                            }
                            this.setState({ hasCheckedOutOfPocketCost: true });
                        }
                    }}
                >
                    {!withInsurance && hasCheckedOutOfPocketCost ? (
                        <Text
                            fontSize="14px"
                            color="text.white"
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                        >
                            Add my insurance
                        </Text>
                    ) : (
                        <Text
                            fontSize="14px"
                            color="text.white"
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                        >
                            {hasCheckedOutOfPocketCost ? 'Refresh' : 'Check'} my{' '}
                            <Text mx={4} fontWeight="bold" color="text.white">
                                out-of-pocket
                            </Text>{' '}
                            cost
                        </Text>
                    )}
                </Button>
            </Flex>
        );
    }
}

export default PriceEstimationBundle;

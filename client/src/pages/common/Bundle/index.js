import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styled, { css } from 'styled-components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { Button, Flex, Text, Box } from '../../../components';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

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

class Bundle extends Component {
    state = {
        selectedProcedure: '',
        selectedIndex: null,
        selectedInsurance: '',
    };

    render() {
        const { procedures = [], insurance = [] } = this.props;
        const {
            selectedProcedure,
            selectedIndex,
            selectedInsurance,
        } = this.state;

        const menu = (
            <Menu
                onClick={({ key, item }) => {
                    this.setState({
                        selectedProcedure: key,
                        selectedIndex: item.props.index,
                    });
                }}
            >
                {procedures.map(procedure => (
                    <Item key={procedure}>{procedure}</Item>
                ))}
            </Menu>
        );

        const insuranceMenu = (
            <Menu
                onClick={({ key }) => {
                    this.setState({
                        selectedInsurance: key,
                    });
                }}
            >
                {insurance.map(item => (
                    <Item key={item}>{item}</Item>
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
                pl={['none', '18px']}
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
                <Dropdown overlay={menu}>
                    <StyledButton
                        type="primary"
                        ghost={isNullSelectedIndex}
                        height="20px"
                        borderColor="#3481f8"
                        fontSize="12px"
                        fontWeight="500"
                        color={
                            !isNullSelectedIndex
                                ? 'text.white'
                                : TAG_COLORS[selectedIndex % 4]
                        }
                        bg={
                            !isNullSelectedIndex
                                ? TAG_COLORS[selectedIndex % 4]
                                : 'background.white'
                        }
                    >
                        {selectedProcedure || 'Select procedure'}
                        <Icon
                            type="down"
                            style={{
                                color: isNullSelectedIndex ? '#3481f8' : '#fff',
                                background: 'transparent',
                            }}
                        />
                    </StyledButton>
                </Dropdown>
                <Box height={14} />
                <Text
                    opacity={0.5}
                    fontSize="15px"
                    fontWeight="500"
                    letterSpacing={-0.9}
                    color="#303449"
                >
                    {selectedInsurance
                        ? 'Regular price: $ 500'
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
                    {selectedInsurance ? '$ 200' : '$ 500'}
                </Text>
                <Box height={14} />
                {!selectedInsurance && (
                    <StyledButton
                        type="primary"
                        ghost
                        height="20px"
                        borderColor="#3481f8"
                        fontSize="12px"
                        fontWeight="500"
                        onClick={() => {
                            if (!_isEmpty(insurance)) {
                                this.setState({
                                    selectedInsurance: insurance[0],
                                });
                            }
                        }}
                    >
                        Add insurance
                    </StyledButton>
                )}
                {selectedInsurance && (
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
                                        {selectedInsurance}
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
                    type="primary"
                    width="254px"
                    height="40px"
                    borderRadius="2px"
                    textAlign="center"
                >
                    <Text
                        fontSize="14px"
                        color="text.white"
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        Check my{' '}
                        <Text mx={4} fontWeight="bold" color="text.white">
                            out-of-pocket
                        </Text>{' '}
                        cost
                    </Text>
                </Button>
                <Text
                    position="absolute"
                    bottom="7px"
                    color="#9b9b9b"
                    fontSize="10px"
                    letterSpacing={-0.3}
                >
                    Learn more about price estimations
                </Text>
            </Flex>
        );
    }
}

export default Bundle;

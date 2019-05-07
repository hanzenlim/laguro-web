import React, { Fragment } from 'react';
import { Dropdown, Icon } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components';

import { getProcedureColor } from '../../../util/dentistUtils';
import { getInsuranceText } from '../../../util/insuranceUtil';
import { Button, Flex, Text, Box } from '../../../components';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import history from '../../../history';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

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

const BundleView = ({
    menu,
    isNullSelectedIndex,
    selectedIndex,
    selectedProcedure,
    selectedInsurance,
    insuranceMenu,
    price,
    insurance,
    setInitialInsurance,
    dentistId,
    selectedProcedureGroup,
}) => (
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
        <Dropdown overlay={menu} trigger={['click']}>
            <StyledButton
                type="primary"
                ghost={isNullSelectedIndex}
                height="30px"
                borderColor="#3481f8"
                fontSize="12px"
                fontWeight="500"
                onClick={e => {
                    e.stopPropagation();
                }}
                color={
                    !isNullSelectedIndex
                        ? 'text.white'
                        : TAG_COLORS[selectedIndex % 4]
                }
                bg={getProcedureColor(selectedProcedureGroup)}
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
        {selectedProcedure && (
            <Fragment>
                <Box height={14} />
                <Text
                    opacity={0.5}
                    fontSize="15px"
                    fontWeight="500"
                    letterSpacing={-0.9}
                    color="#303449"
                >
                    {selectedInsurance
                        ? `Regular price: $ ${price / 100}`
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
                    {selectedInsurance
                        ? `$ ${selectedInsurance.price / 100}`
                        : `$ ${price / 100}`}
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
                        onClick={e => {
                            e.stopPropagation();
                            if (!_isEmpty(insurance)) {
                                setInitialInsurance(insurance[0]);
                            }
                        }}
                    >
                        Add insurance
                    </StyledButton>
                )}
                {selectedInsurance && (
                    <Dropdown overlay={insuranceMenu} trigger={['click']}>
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
                                    <Text ml={5} color="#3481f8">
                                        {getInsuranceText(
                                            selectedInsurance.name
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
                    type="primary"
                    width="254px"
                    height="40px"
                    borderRadius="2px"
                    textAlign="center"
                    onClick={e => {
                        e.stopPropagation();

                        const user = getUser();

                        if (user) {
                            history.push(`/dentist/${dentistId}`);
                        } else {
                            emitter.emit('loginModal', {
                                redirectPath: `/dentist/${dentistId}`,
                            });
                        }
                    }}
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
            </Fragment>
        )}
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

export default BundleView;

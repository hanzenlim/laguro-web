import React, { Fragment } from 'react';
import { Dropdown, Icon } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components';

import { getProcedureColor } from '~/util/dentistUtils';
import { getInsuranceText } from '~/util/insuranceUtil';
import { Button, Flex, Text, Responsive } from '../../components';

import SelectProcedureModal from '../SelectProcedureModal';

const { Desktop, Mobile } = Responsive;

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
    isNullSelectedIndex,
    selectedIndex,
    selectedProcedure,
    selectedInsurance,
    insuranceMenu,
    price,
    insurance,
    setInitialInsurance,
    selectedProcedureGroup,
    onLearnMore,
    onCheckOutOfPocket,
    procedureList = [],
    isModalVisible = false,
    onToggleModal = () => {},
    onSelectBundle = () => {},
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
        <SelectProcedureModal
            procedureList={procedureList}
            isModalVisible={isModalVisible}
            onToggleModal={onToggleModal}
            onSelectBundle={onSelectBundle}
        />
        <Text
            maxWidth="200px"
            fontSize={selectedProcedure ? 0 : [0, '', 3]}
            color="#161616"
            textAlign="center"
            whiteSpace="normal"
            letterSpacing={selectedProcedure ? '-0.41px' : '-0.62px'}
            mb={8}
        >
            Check out the price estimation for:
        </Text>
        <StyledButton
            type="primary"
            ghost={isNullSelectedIndex}
            width={190}
            height="30px"
            borderColor="#3481f8"
            fontSize={0}
            fontWeight="medium"
            onClick={onToggleModal}
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
        {selectedProcedure && (
            <Fragment>
                <Text
                    opacity={0.5}
                    fontSize={0}
                    fontWeight="500"
                    letterSpacing="-0.71px"
                    color="#303449"
                    mt={18}
                    mb={10}
                >
                    {selectedInsurance
                        ? `Regular price: $ ${price / 100}`
                        : 'Regular price:'}
                </Text>
                <Text
                    lineHeight="26px"
                    fontSize={5}
                    fontWeight="bold"
                    letterSpacing="-0.84px"
                    color="#303449"
                    mb={14}
                >
                    {selectedInsurance
                        ? `$ ${selectedInsurance.price / 100}`
                        : `$ ${price / 100}`}
                </Text>
                {!selectedInsurance && (
                    <StyledButton
                        type="primary"
                        ghost
                        width={190}
                        height="30px"
                        borderColor="#3481f8"
                        fontSize={0}
                        fontWeight="medium"
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
                            fontSize={0}
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
                                    fontSize={4}
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

                <Button
                    type="ghost"
                    width="228px"
                    height="auto"
                    mt={!selectedInsurance ? 15 : 30}
                    borderRadius="2px"
                    textAlign="center"
                    onClick={onCheckOutOfPocket}
                >
                    <Text
                        bg="background.blue"
                        borderRadius="2px"
                        lineHeight="40px"
                        fontSize={1}
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
        <Mobile>
            {selectedProcedure && (
                <Button type="ghost" height="auto" onClick={onLearnMore}>
                    <Text
                        mt={12}
                        color="text.gray"
                        fontSize={0}
                        letterSpacing={-0.3}
                    >
                        Learn more about price estimations
                    </Text>
                </Button>
            )}
        </Mobile>
        <Desktop>
            <Button
                type="ghost"
                height="auto"
                onClick={onLearnMore}
                position="absolute"
                bottom="7px"
            >
                <Text color="text.gray" fontSize={0} letterSpacing={-0.3}>
                    Learn more about price estimations
                </Text>
            </Button>
        </Desktop>
    </Flex>
);

export default BundleView;

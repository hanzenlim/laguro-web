import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text, Flex, Button, Box, Checkbox, Icon } from '../../../components';
import theme from '../../../components/theme';

const StyledContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3, 33.33%);

    @media (min-width: ${theme.breakpoints[2]}) {
        grid-template-columns: repeat(4, 25%);
    }
`;

const SelectHoursView = props => {
    const {
        formattedDateText,
        priceRangeLength,
        selected,
        list,
        onSelect,
        isAllSelected,
        isOpen,
        onToggleContent,
        onToggleSelectAll,
    } = props;

    return (
        <Box>
            <Flex mb={14} justifyContent="space-between">
                <Text
                    lineHeight="22px"
                    fontSize={[1, '', 2]}
                    color="text.black"
                    fontWeight="bold"
                >
                    {formattedDateText}
                </Text>
                <Button height="20px" type="ghost" onClick={onToggleContent}>
                    {isOpen ? (
                        <Icon type="downArrow" />
                    ) : (
                        <Icon type="upArrow" />
                    )}
                </Button>
            </Flex>
            {isOpen ? (
                <Fragment>
                    <StyledContainer mb={10}>
                        {list.map((item, i) => (
                            <Button
                                height={
                                    priceRangeLength === 1 ? '50px' : '63px'
                                }
                                key={i}
                                type="ghost"
                                border="none"
                                onClick={onSelect}
                                data-key={i}
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    height={
                                        priceRangeLength === 1 ? '50px' : '63px'
                                    }
                                    border="1px solid"
                                    borderColor="divider.blue"
                                    bg={
                                        selected.includes(item.time)
                                            ? 'background.blue'
                                            : 'background.white'
                                    }
                                >
                                    <Box>
                                        <Text
                                            fontSize={[1, '', 2]}
                                            letterSpacing="-0.4px"
                                            color={
                                                selected.includes(item.time)
                                                    ? 'text.white'
                                                    : 'text.black'
                                            }
                                        >
                                            {item.time}
                                        </Text>
                                        {priceRangeLength === 2 && (
                                            <Text
                                                mt={4}
                                                fontWeight="medium"
                                                color={
                                                    selected.includes(item.time)
                                                        ? 'text.white'
                                                        : 'text.gray'
                                                }
                                            >
                                                ${item.price / 100}
                                            </Text>
                                        )}
                                    </Box>
                                </Flex>
                            </Button>
                        ))}
                    </StyledContainer>
                    <Flex>
                        <Checkbox
                            checked={isAllSelected}
                            onChange={onToggleSelectAll}
                        >
                            Select all
                        </Checkbox>
                    </Flex>
                </Fragment>
            ) : null}
        </Box>
    );
};

SelectHoursView.propTypes = {
    selected: PropTypes.string,
    list: PropTypes.array,
    onSelect: PropTypes.func,
    isAllSelected: PropTypes.bool,
    onToggleContent: PropTypes.func,
    onToggleSelectAll: PropTypes.func,
    formattedDateText: PropTypes.string.isRequired,
};

SelectHoursView.defaultProps = {
    selected: null,
    list: [],
    onSelect: () => {},
    onToggleContent: () => {},
    onToggleSelectAll: () => {},
    isAllSelected: false,
};

export default SelectHoursView;

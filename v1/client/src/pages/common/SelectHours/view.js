import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text, Flex, Button, Box, Checkbox, Icon } from '../../../components';

const StyledContainer = styled(Box)`
    display: grid;
    grid-template-columns: auto auto auto auto;
`;

const SelectAppointment = props => {
    const {
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
                    fontSize={2}
                    color="text.black"
                    fontWeight="bold"
                >
                    Wed 8/29
                </Text>
                <Button type="ghost" onClick={onToggleContent}>
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
                                key={i}
                                type="ghost"
                                onClick={onSelect}
                                data-key={i}
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    height="50px"
                                    border="1px solid"
                                    borderColor="divider.green"
                                    bg={
                                        selected.includes(item)
                                            ? 'background.green'
                                            : 'background.white'
                                    }
                                >
                                    <Text
                                        fontSize={2}
                                        letterSpacing="-0.4px"
                                        color={
                                            selected.includes(item)
                                                ? 'text.white'
                                                : 'text.black'
                                        }
                                    >
                                        {item}
                                    </Text>
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

SelectAppointment.propTypes = {
    selected: PropTypes.string,
    list: PropTypes.array,
    onSelect: PropTypes.func,
    isAllSelected: PropTypes.bool,
    onToggleContent: PropTypes.func,
    onToggleSelectAll: PropTypes.func,
};

SelectAppointment.defaultProps = {
    selected: null,
    list: [],
    onSelect: () => {},
    onToggleContent: () => {},
    onToggleSelectAll: () => {},
    isAllSelected: false,
};

export default SelectAppointment;

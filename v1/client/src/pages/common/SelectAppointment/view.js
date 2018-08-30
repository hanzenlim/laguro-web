import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text, Flex, Button, Box } from '../../../components';

const StyledContainer = styled(Box)`
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: auto auto auto;
`;

const SelectAppointment = props => {
    const { selected, list, onSelect } = props;

    return (
        <StyledContainer mb={40}>
            {list.map((item, i) => (
                <Button key={i} type="ghost" onClick={onSelect} data-key={i}>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        width="144px"
                        height="50px"
                        borderRadius="2px"
                        border="1px solid"
                        borderColor="divider.green"
                        bg={
                            selected === item
                                ? 'background.green'
                                : 'background.white'
                        }
                    >
                        <Text
                            fontSize={2}
                            letterSpacing="-0.4px"
                            color={
                                selected === item
                                    ? 'background.white'
                                    : 'background.green'
                            }
                        >
                            {item}
                        </Text>
                    </Flex>
                </Button>
            ))}
        </StyledContainer>
    );
};

SelectAppointment.propTypes = {
    selected: PropTypes.string,
    list: PropTypes.array,
    onSelect: PropTypes.func,
};

SelectAppointment.defaultProps = {
    selected: null,
    list: [],
    onSelect: () => {},
};

export default SelectAppointment;

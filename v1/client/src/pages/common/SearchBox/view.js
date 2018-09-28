import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex, Button, DatePicker, Box, Icon, Text } from '../../../components';
import LocationFilter from '../LocationFilter';

const StyledButton = styled(Button)`
    && {
        border-width: 0;
        border-radius: 2px;
    }
`;

const SearchBox = props => {
    const {
        initialLocationFilterValue,
        initialDateFilterValue,
        onTextChange,
        onLocationFilterChange,
        onDateFilterChange,
        onSubmit,
        size,
    } = props;

    return (
        <Flex justifyContent="center">
            <Box mr={10}>
                <LocationFilter
                    height={60}
                    initialValue={initialLocationFilterValue}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width={size === 'large' ? 710 : 420}
                    withDentists={true}
                />
            </Box>
            <Box mr={10}>
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width={size === 'large' ? 350 : 175}
                />
            </Box>
            <StyledButton
                height="60px"
                width={size === 'large' ? '140px' : '60px'}
                type="default"
                bg="background.green"
                onClick={onSubmit}
                pl={size === 'large' ? 20 : 10}
            >
                <Flex
                    alignItems="center"
                    justifyContent={size === 'large' ? 'flex-start' : 'center'}
                >
                    <Icon
                        fontSize={3}
                        style={{ fontWeight: 'bold' }}
                        color="white"
                        type="search"
                        mr={size === 'large' ? 15 : 0}
                    />
                    {size === 'large' && (
                        <Text fontSize={3} fontWeight="bold" color="white">
                            Search
                        </Text>
                    )}
                </Flex>
            </StyledButton>
        </Flex>
    );
};

SearchBox.defaultProps = {
    onLocationFilterChange: null,
    onDateFilterChange: null,
    onSubmit: null,
};

SearchBox.propTypes = {
    onLocationFilterChange: PropTypes.func,
    onDateFilterChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default SearchBox;

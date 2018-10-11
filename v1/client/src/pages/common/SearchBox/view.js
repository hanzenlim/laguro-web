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
        locationPlaceholder,
        onKeyPress,
    } = props;

    return (
        <Flex
            width={size === 'large' ? '100%' : '53%'}
            justifyContent="center"
            onKeyPress={onKeyPress}
        >
            <Box width={size === 'large' ? '56%' : '62%'} mr={10}>
                <LocationFilter
                    height={60}
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box width={size === 'large' ? '27%' : '26%'} mr={10}>
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width="100%"
                    format={size === 'large' ? 'ddd MM/DD' : 'MM/DD'}
                />
            </Box>
            <StyledButton
                height="60px"
                width={size === 'large' ? '210px' : '60px'}
                type="default"
                bg="background.blue"
                onClick={onSubmit}
                pl={size === 'large' ? 40 : 10}
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
    onKeyPress: null,
};

SearchBox.propTypes = {
    onLocationFilterChange: PropTypes.func,
    onDateFilterChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onKeyPress: PropTypes.func,
};

export default SearchBox;

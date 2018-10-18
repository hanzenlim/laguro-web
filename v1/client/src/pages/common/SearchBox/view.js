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

    const isLarge = size === 'large';
    return (
        <Flex
            width={isLarge ? '100%' : '53%'}
            justifyContent="center"
            onKeyPress={onKeyPress}
            flexDirection={isLarge ? ['column', '', 'row'] : 'row'}
        >
            <Box
                width={isLarge ? ['100%', '', '56%'] : '62%'}
                mr={10}
                mb={[8, 8, 0]}
            >
                <LocationFilter
                    height={isLarge ? [50, 50, 60] : 60}
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box
                width={isLarge ? ['100%', '', '56%'] : '26%'}
                mr={10}
                mb={[8, 8, 0]}
            >
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width="100%"
                    height={isLarge ? [50, 50, 60] : 60}
                    format={isLarge ? 'ddd MM/DD' : 'MM/DD'}
                />
            </Box>
            <StyledButton
                height={['50px', '50px', '60px']}
                width={isLarge ? ['100%', '', '210px'] : '60px'}
                type="default"
                bg="background.blue"
                onClick={onSubmit}
                pl={isLarge ? [10, 10, 40] : 10}
            >
                <Flex
                    alignItems="center"
                    justifyContent={
                        isLarge ? ['center', '', 'flex-start'] : 'center'
                    }
                >
                    <Icon
                        fontSize={3}
                        style={{ fontWeight: 'bold' }}
                        color="white"
                        type="search"
                        mr={isLarge ? 15 : 0}
                    />
                    {isLarge && (
                        <Text
                            fontSize={[0, 0, 3]}
                            fontWeight="bold"
                            color="white"
                        >
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

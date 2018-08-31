import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Button, DatePicker, Box } from '../../../components';
import LocationFilter from '../LocationFilter';

const SearchBox = props => {
    const { onLocationFilterChange, onDateFilterChange, onSubmit } = props;

    return (
        <Flex
            width="1060px"
            p={40}
            borderRadius="4px"
            border="1px solid"
            borderColor="divider.white"
        >
            <Box mr={20}>
                <LocationFilter onChange={onLocationFilterChange} />
            </Box>
            <Box mr={20}>
                <DatePicker onChange={onDateFilterChange} />
            </Box>
            <Button height="80px" fontSize={3} width="150px" onClick={onSubmit}>
                find your smile
            </Button>
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

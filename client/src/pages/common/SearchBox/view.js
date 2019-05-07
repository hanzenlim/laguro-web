import React from 'react';
import PropTypes from 'prop-types';
import _isBoolean from 'lodash/isBoolean';
import { Flex, Button, Box, Icon, Responsive } from '../../../components';
import LocationFilter from '../LocationFilter';

export const DESKTOP_LARGE_SEARCHBOX_WIDTH = 769;

const { withScreenSizes } = Responsive;

export const TABLET_MOBILE_SEARCHBOX_MAX_WIDTH = 590;

const SearchBox = props => {
    const {
        initialLocationFilterValue,
        onQueryString,
        onTextChange,
        onLocationFilterChange,
        locationPlaceholder,
        toggleFilter,
        tabletMobileOnly,
        onSubmit,
    } = props;

    const handleSendAction = event => {
        event.preventDefault();
        onSubmit();
    };

    const hasFilter = _isBoolean(props.hasFilter) ? props.hasFilter : true;

    return (
        <Flex
            is="form"
            position="relative"
            onSubmit={handleSendAction}
            width={['100%', '', '500px']}
            justifyContent="center"
        >
            <Box width="100%">
                <LocationFilter
                    height="50px"
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    onQueryString={onQueryString}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box position="absolute" right="0" zIndex="9999">
                {tabletMobileOnly && hasFilter ? (
                    <Button
                        onClick={toggleFilter}
                        type="ghost"
                        width={50}
                        height={50}
                    >
                        <Icon
                            fontSize={4}
                            style={{ fontWeight: 'bold' }}
                            color="#dbdbdb"
                            type="filter"
                        />
                    </Button>
                ) : (
                    <Button
                        onClick={onSubmit}
                        type="ghost"
                        width={50}
                        height={50}
                    >
                        <Icon
                            fontSize={4}
                            style={{ fontWeight: 'bold' }}
                            color="#dbdbdb"
                            type="search"
                        />
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

SearchBox.defaultProps = {
    onLocationFilterChange: null,
};

SearchBox.propTypes = {
    onLocationFilterChange: PropTypes.func,
};

export default withScreenSizes(SearchBox);

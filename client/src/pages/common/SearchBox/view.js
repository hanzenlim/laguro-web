import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    Flex,
    Button,
    DatePicker,
    Box,
    Icon,
    Text,
    Responsive,
} from '../../../components';
import LocationFilter from '../LocationFilter';

export const DESKTOP_LARGE_SEARCHBOX_WIDTH = 769;

const { Desktop, withScreenSizes } = Responsive;

export const TABLET_MOBILE_SEARCHBOX_MAX_WIDTH = 590;

const StyledButton = styled(Button)`
    && {
        max-width: ${window.location.pathname.includes('/search')
            ? '100%'
            : TABLET_MOBILE_SEARCHBOX_MAX_WIDTH.concat('px')};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            max-width: unset;
        }
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

    // on desktop, search button's width will be 7% of the whole width
    const DESKTOP_SEARCH_BUTTON_WIDTH_RATIO = 0.07;
    // isLarge is true for home page, and false for header searchbox
    const isLarge = size === 'large';
    const heightInHeader = 50;
    const COMPONENT_HEIGHT_IF_ISLARGE = [
        48,
        '',
        DESKTOP_LARGE_SEARCHBOX_WIDTH * 0.07,
    ];
    const isSearch = window.location.pathname.includes('/search');

    return (
        <Flex
            width={[
                '100%',
                '',
                isLarge ? DESKTOP_LARGE_SEARCHBOX_WIDTH : '78%',
            ]}
            maxWidth={[
                isSearch ? '100%' : TABLET_MOBILE_SEARCHBOX_MAX_WIDTH,
                '',
                'unset',
            ]}
            justifyContent="center"
            onKeyPress={onKeyPress}
            flexDirection={['column', '', 'row']}
        >
            <Box
                maxWidth={[
                    isSearch ? '100%' : TABLET_MOBILE_SEARCHBOX_MAX_WIDTH,
                    '',
                    'unset',
                ]}
                width={['100%', '', '61%']}
                mr={[0, '', '1%']}
                mb={[7, '', 0]}
            >
                <LocationFilter
                    height={
                        isLarge ? COMPONENT_HEIGHT_IF_ISLARGE : heightInHeader
                    }
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box
                width={['100%', '', isLarge ? '30%' : '25%']}
                maxWidth={[
                    isSearch ? '100%' : TABLET_MOBILE_SEARCHBOX_MAX_WIDTH,
                    '',
                    'unset',
                ]}
                mr={[0, '', '1%']}
                mb={[7, '', 0]}
            >
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width="100%"
                    disablePastDates
                    format={isLarge ? 'ddd MM/DD/YYYY' : 'MMM D, YYYY'}
                    height={
                        isLarge ? COMPONENT_HEIGHT_IF_ISLARGE : heightInHeader
                    }
                />
            </Box>
            <StyledButton
                width={[
                    '100%',
                    '',
                    isLarge
                        ? `${DESKTOP_SEARCH_BUTTON_WIDTH_RATIO * 100}%`
                        : heightInHeader,
                ]}
                height={isLarge ? COMPONENT_HEIGHT_IF_ISLARGE : heightInHeader}
                onClick={onSubmit}
                pl={[0, '', 10]}
            >
                <Flex justifyContent="center" alignItems="center">
                    <Desktop>
                        <Icon
                            fontSize={4}
                            style={{ fontWeight: 'bold' }}
                            color="white"
                            type="search"
                        />
                    </Desktop>

                    {isLarge && props.tabletMobileOnly && (
                        <Text
                            fontSize={[1, '', 3]}
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

export default withScreenSizes(SearchBox);

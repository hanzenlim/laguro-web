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

const { Desktop, withScreenSizes } = Responsive;

const maxTabletMobileWidth = 590;

const StyledButton = styled(Button)`
    && {
        max-width: ${maxTabletMobileWidth}px;
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

    // isLarge is true for home page, and false for header searchbox
    const isLarge = size === 'large';
    const heightInHeader = 50;
    const heightInHompage = [48, '', 56];

    return (
        <Flex
            width={['100%', '', isLarge ? '100%' : '78%']}
            maxWidth={[maxTabletMobileWidth, '', 'unset']}
            justifyContent="center"
            onKeyPress={onKeyPress}
            flexDirection={['column', '', 'row']}
        >
            <Box
                maxWidth={[maxTabletMobileWidth, '', 'unset']}
                width={['100%', '', isLarge ? 468 : '62%']}
                mr={[0, '', 10]}
                mb={[7, '', 0]}
            >
                <LocationFilter
                    height={isLarge ? heightInHompage : heightInHeader}
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box
                width={['100%', '', isLarge ? 229 : '25%']}
                maxWidth={[maxTabletMobileWidth, '', 'unset']}
                mr={[0, '', 10]}
                mb={[7, '', 0]}
            >
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width="100%"
                    disablePastDates
                    format={isLarge ? 'ddd MM/DD/YYYY' : 'MMM D, YYYY'}
                    height={isLarge ? heightInHompage : heightInHeader}
                />
            </Box>
            <StyledButton
                width={[
                    '100%',
                    '',
                    isLarge ? heightInHompage[2] : heightInHeader,
                ]}
                height={isLarge ? heightInHompage : heightInHeader}
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

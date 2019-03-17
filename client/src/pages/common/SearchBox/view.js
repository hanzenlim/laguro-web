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

const { Desktop } = Responsive;

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

    // isLarge is used for home page
    const isLarge = size === 'large';
    const heightInHeader = 50;
    return (
        <Flex
            width={['100%', '', isLarge ? '100%' : '78%']}
            justifyContent="center"
            onKeyPress={onKeyPress}
            flexDirection={['column', '', 'row']}
        >
            <Box
                width={['100%', '', isLarge ? '56%' : '62%']}
                mr={[0, '', 10]}
                mb={[7, '', 0]}
            >
                <LocationFilter
                    height={isLarge ? [50, 50, 60] : heightInHeader}
                    initialValue={initialLocationFilterValue}
                    placeholder={locationPlaceholder}
                    onTextChange={onTextChange}
                    onLocationChange={onLocationFilterChange}
                    width="100%"
                    withDentists={true}
                />
            </Box>
            <Box
                width={['100%', '', isLarge ? '27%' : '25%']}
                mr={[0, '', 10]}
                mb={[7, '', 0]}
            >
                <DatePicker
                    initialValue={initialDateFilterValue}
                    onDateChange={onDateFilterChange}
                    width="100%"
                    height={isLarge ? [50, 50, 60] : heightInHeader}
                    format={isLarge ? 'ddd MM/DD' : 'MMM D, YYYY'}
                />
            </Box>
            <StyledButton
                width={['100%', '', isLarge ? '210px' : heightInHeader]}
                height={isLarge ? [50, 50, 60] : heightInHeader}
                type="default"
                bg="background.blue"
                onClick={onSubmit}
                pl={[0, '', isLarge ? 40 : 10]}
                border={!isLarge && 'solid 1px #ffffff'}
            >
                <Flex
                    alignItems="center"
                    justifyContent={[
                        'center',
                        '',
                        isLarge ? 'flex-start' : 'center',
                    ]}
                >
                    <Desktop>
                        <Icon
                            fontSize="25px"
                            style={{ fontWeight: 'bold' }}
                            color="white"
                            type="search"
                            mr={isLarge ? 15 : 0}
                        />
                    </Desktop>

                    {isLarge && (
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

export default SearchBox;

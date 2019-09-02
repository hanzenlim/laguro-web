import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Container, Box, Responsive } from '../../components';
import SearchBox from '../common/SearchBox';
import SearchFilter from '../common/SearchFilter';

const { Desktop, TabletMobile } = Responsive;

const DentistSearchFilter = ({ onToggleFilter, isFilterVisible }) => (
    <Flex
        bg={['background.white', '', 'background.blue']}
        height={['auto', '', 120]}
        alignItems="center"
    >
        <Container>
            <TabletMobile>
                <Box mb={20} mt={[20, '', 0]}>
                    <SearchBox
                        size="large"
                        placeholder="Search for dentists by name, location, or specialty"
                        toggleFilter={onToggleFilter}
                    />
                </Box>
            </TabletMobile>

            <Box>
                <TabletMobile>
                    {isFilterVisible ? (
                        <Box mb={20}>
                            <SearchFilter />
                        </Box>
                    ) : null}
                </TabletMobile>
                <Desktop>
                    <SearchFilter />
                </Desktop>
            </Box>
        </Container>
    </Flex>
);

DentistSearchFilter.propTypes = {
    onToggleFilter: PropTypes.func.isRequired,
    isFilterVisible: PropTypes.bool.isRequired,
};

export default DentistSearchFilter;

import React from 'react';
import PropTypes from 'prop-types';
import {
    Flex,
    Container,
    Box,
    Grid,
    Responsive,
    Loading,
} from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';
import SearchFilter from '../common/SearchFilter';
import FeaturedOffices from '../OfficeDetailsPage/FeaturedOffices';

const { Desktop, TabletMobile } = Responsive;

const DentistSearchPageView = props => {
    const { data, total, loading, onToggleFilter, isFilterVisible } = props;

    const transformedData = data.map(dentist => ({
        ...dentist,
        appointmentTimeslotsByOffice: dentist.appointmentTimeslotsByOffice.filter(
            i => i.appointmentTimeslots.length > 0
        ),
    }));

    return (
        <Box height="100%">
            <Container pt={[48, '', total === 0 ? 110 : 84]}>
                <Box mt="20px">
                    <FeaturedOffices />
                </Box>
                <Box>
                    <Desktop>
                        {matches =>
                            matches ? null : (
                                <Box mb={20} mt={[24, '', 0]}>
                                    <SearchBox
                                        size="large"
                                        placeholder="Search for dentists by name, location, or specialty"
                                        toggleFilter={onToggleFilter}
                                    />
                                </Box>
                            )
                        }
                    </Desktop>

                    <Flex width="100%">
                        <TabletMobile>
                            {isFilterVisible ? (
                                <Box mb={20} width="100%">
                                    <SearchFilter />
                                </Box>
                            ) : null}
                        </TabletMobile>
                        <Desktop>
                            <Box mt={34}>
                                <SearchFilter />
                            </Box>
                        </Desktop>
                    </Flex>
                </Box>
                <Box pt={0}>
                    <Grid
                        gridColumnGap={['', '', '10px']}
                        gridTemplateColumns="1fr"
                    >
                        <Box pb="50px">
                            {loading ? (
                                <Box mt="100px">
                                    <Loading />
                                </Box>
                            ) : (
                                <SearchResultsList
                                    data={transformedData}
                                    total={total}
                                />
                            )}
                        </Box>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

DentistSearchPageView.propTypes = {
    data: PropTypes.func,
    defaultPosition: PropTypes.bool,
    mapDimensions: PropTypes.bool,
    total: PropTypes.bool,
    toggleMap: PropTypes.func,
};

export default DentistSearchPageView;

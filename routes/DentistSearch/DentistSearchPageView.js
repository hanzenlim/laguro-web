import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Loading, Text, Flex } from '~/components';
import SearchResultsList from '~/common/SearchResultsList';
import SignUpBanner from './SignupBanner';
import DentistSearchFilter from './DentistSearchFilter';
import QuizPrompt from './QuizPrompt';
import PriceEstimationCarousel from './PriceEstimationCarousel';
import SortSelection from './SortSelection';
import { AppContext } from '../../appContext';

const DentistSearchPageView = ({
    data,
    total,
    loading,
    onToggleFilter,
    isFilterVisible,
    sortBy,
    setSortBy,
}) => {
    const { isAuth, mounted } = useContext(AppContext);

    const transformedData = data.map(dentist => ({
        ...dentist,
        appointmentTimeslotsByOffice: dentist.appointmentTimeslotsByOffice.filter(
            i => i.appointmentTimeslots.length > 0
        ),
    }));

    return (
        <Box height="100%" pt={[48, '', 84]}>
            {!isAuth && <SignUpBanner />}

            {mounted && (
                <DentistSearchFilter
                    onToggleFilter={onToggleFilter}
                    isFilterVisible={isFilterVisible}
                />
            )}

            {mounted && <QuizPrompt />}

            {mounted && (
                <Box my={28}>
                    <PriceEstimationCarousel />
                </Box>
            )}

            {mounted && (
                <Container>
                    <Box pb="50px">
                        {loading ? (
                            <Box mt="100px">
                                <Loading />
                            </Box>
                        ) : (
                            <Box>
                                <Flex
                                    alignItems={[
                                        'flex-start',
                                        'center',
                                        'center',
                                    ]}
                                    justifyContent="space-between"
                                    flexDirection={['column', 'row', 'row']}
                                    mt={30}
                                    mb={30}
                                >
                                    <Text
                                        fontSize={[1, '', 4]}
                                        fontWeight="medium"
                                        mb={[8, 0, 0]}
                                    >
                                        Available dentists
                                    </Text>
                                    <SortSelection
                                        value={sortBy}
                                        onChange={setSortBy}
                                    />
                                </Flex>
                                <SearchResultsList
                                    data={transformedData}
                                    total={total}
                                    onShowMore={() => {}}
                                />
                            </Box>
                        )}
                    </Box>
                </Container>
            )}
        </Box>
    );
};

DentistSearchPageView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onToggleFilter: PropTypes.func.isRequired,
    isFilterVisible: PropTypes.bool.isRequired,
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
};

export default DentistSearchPageView;

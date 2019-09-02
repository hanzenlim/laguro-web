import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Container, Box, Loading, Text } from '../../components';
import SearchResultsList from '../common/SearchResultsList';
import history from '../../history';
import SignUpBanner from './SignupBanner';
import DentistSearchFilter from './DentistSearchFilter';
import QuizPrompt from './QuizPrompt';
import PriceEstimationCarousel from './PriceEstimationCarousel';
import { AuthContext } from '../../App';

const DentistSearchPageView = ({
    data,
    total,
    loading,
    onToggleFilter,
    isFilterVisible,
}) => {
    const { isAuth } = useContext(AuthContext);

    const transformedData = data.map(dentist => ({
        ...dentist,
        appointmentTimeslotsByOffice: dentist.appointmentTimeslotsByOffice.filter(
            i => i.appointmentTimeslots.length > 0
        ),
    }));

    const { hasFinishedSurvey, insuranceProvider } = queryString.parse(
        history.location.search
    );

    const isLoggedInAndHasFinishedSurvey = hasFinishedSurvey && isAuth;
    const isAnonAndHasFinishedSurveyWithInsurance =
        hasFinishedSurvey && insuranceProvider;

    return (
        <Box height="100%" pt={[48, '', 84]}>
            {!isAuth && <SignUpBanner />}

            <DentistSearchFilter
                onToggleFilter={onToggleFilter}
                isFilterVisible={isFilterVisible}
            />

            {!hasFinishedSurvey && <QuizPrompt />}
            {(isAnonAndHasFinishedSurveyWithInsurance ||
                isLoggedInAndHasFinishedSurvey) && (
                <Box my={28}>
                    <PriceEstimationCarousel />
                </Box>
            )}

            <Container>
                <Box pb="50px">
                    {loading ? (
                        <Box mt="100px">
                            <Loading />
                        </Box>
                    ) : (
                        <Box>
                            <Text
                                fontSize={[1, '', 4]}
                                fontWeight="medium"
                                mt={30}
                                mb={[8, '', 30]}
                            >
                                Available dentists
                            </Text>
                            <SearchResultsList
                                data={transformedData}
                                total={total}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

DentistSearchPageView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onToggleFilter: PropTypes.func.isRequired,
    isFilterVisible: PropTypes.bool.isRequired,
};

export default DentistSearchPageView;

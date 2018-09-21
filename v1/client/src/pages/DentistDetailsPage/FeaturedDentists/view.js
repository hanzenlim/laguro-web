import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '../../../components';
import DentistCard from '../DentistCard';

const FeaturedDentistsView = props => {
    const { featuredDentists } = props;

    if (!featuredDentists) return null;

    return (
        <Box mt={40}>
            <Text fontSize={5}>similar dentists</Text>

            <Flex justifyContent="space-between" mt={30}>
                {featuredDentists.map(item => (
                    <Box width="295px">
                        <DentistCard
                            name={item.name}
                            specialty={item.specialty}
                            reviewsCount={item.numReviews}
                            rating={item.totalRating}
                        />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

FeaturedDentistsView.propTypes = {
    featuredDentists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            specialty: PropTypes.string,
            reviewsCount: PropTypes.string,
            numReviews: PropTypes.string,
            totalRating: PropTypes.number,
        })
    ),
};

export default FeaturedDentistsView;
